import mongoose, { Model, Schema, models } from "mongoose";
import UserModel from "./user";
import MemberShipModel from "./member-ship";

// Interface of Server
export interface IServer {
  id?: string;
  name: string;
  description: string;
  private: boolean;
  inviteCode: string;
  owner: mongoose.Types.ObjectId; // Reference to a User document
}

// Interface of Server methods
interface Methods {
  checkUsersExistence: () => Promise<void>;
  addMember: (userId: mongoose.Types.ObjectId) => Promise<void>;
  removeMember: (userId: mongoose.Types.ObjectId) => Promise<void>;
  addAdmin: (userId: mongoose.Types.ObjectId) => Promise<void>;
  removeAdmin: (userId: mongoose.Types.ObjectId) => Promise<void>;
}

// Create Server schema
const ServerSchema = new mongoose.Schema<IServer, {}, Methods>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Add name"],
    },
    description: {
      type: String,
      required: [true, "Add description"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: UserModel,
      required: [true, "Add owner"],
    },
    private: {
      type: Boolean,
      required: [true, "Add private"],
    },
    inviteCode: {
      type: String,
      // required: [true, "Add inviteCode"],
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
  }
);

ServerSchema.methods.addMember = async function (userId) {
  const existingUser = await UserModel.findOne({ _id: userId });

  if (existingUser) {
    await MemberShipModel.create({
      server: this._id,
      user: userId,
      role: "member",
    });
  } else {
    const error = new mongoose.Error.ValidationError();

    error.message = "This user does not exist";

    throw error;
  }
};

ServerSchema.methods.removeMember = async function (userId) {
  const existingUser = await UserModel.findOne({ _id: userId });

  if (existingUser) {
    await MemberShipModel.deleteOne({ server: this._id, user: userId });
  } else {
    const error = new mongoose.Error.ValidationError();

    error.message = "This user does not exist";

    throw error;
  }
};

ServerSchema.methods.addAdmin = async function (userId) {
  const existingUser = await UserModel.findOne({ _id: userId });

  if (existingUser) {
    await MemberShipModel.updateOne(
      { server: this._id, user: userId },
      { role: "admin" },
      { new: true }
    );
  } else {
    const error = new mongoose.Error.ValidationError();

    error.message = "This user does not exist";

    throw error;
  }
};

ServerSchema.methods.removeAdmin = async function (userId) {
  const existingUser = await UserModel.findOne({ _id: userId });

  if (existingUser) {
    await MemberShipModel.updateOne(
      { server: this._id, user: userId },
      { role: "member" },
      { new: true }
    );
  } else {
    const error = new mongoose.Error.ValidationError();

    error.message = "This user does not exist";

    throw error;
  }
};

// Generate invite code before saving
ServerSchema.pre("save", async function (next) {
  if (!this.inviteCode) {
    const generatedCode = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();
    this.inviteCode = generatedCode;
  }

  next();
});

// Check if server with same name exists before saving
ServerSchema.pre("save", async function (next) {
  const existingServers = await ServerModel.find({ name: this.name });

  if (existingServers.length > 0) {
    const error = new mongoose.Error.ValidationError();

    error.message = "Server with this name already exists";

    return next(error);
  }

  next();
});

// Save server owner as a member
ServerSchema.pre("save", async function (next) {
  const existingOwner = await UserModel.findOne({ _id: this.owner });

  if (existingOwner) {
    MemberShipModel.create({
      server: this._id,
      user: this.owner,
      role: "owner",
    });
    console.log("Owner created");
    next();
  } else {
    const error = new mongoose.Error.ValidationError();

    error.message = "This owner does not exist";

    return next(error);
  }
});

// Check if users exist before saving
ServerSchema.pre("save", async function (next) {
  await this.checkUsersExistence();
  next();
});

ServerSchema.pre("findOneAndUpdate", async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  await docToUpdate.checkUsersExistence();
  next();
});

ServerSchema.methods.checkUsersExistence = async function () {
  const existingOwner = await UserModel.findOne({ _id: this.owner });

  if (!existingOwner) {
    const error = new mongoose.Error.ValidationError();

    error.message = "Owner does not exist";

    throw error;
  }
};

// If model exists, use it, else create it
const ServerModel = models.server || mongoose.model("server", ServerSchema);

// Export model
export default ServerModel as Model<IServer, {}, Methods>;
