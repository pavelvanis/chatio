import mongoose, { Model, Schema, models } from "mongoose";
import UserModel from "./user";

// Interface of Server
export interface IServer {
  name: string;
  description: string;
  members: mongoose.Types.ObjectId[];
  admins: mongoose.Types.ObjectId[];
  owner: mongoose.Types.ObjectId;
  private: boolean;
  inviteCode: string;
}

// Interface of Server methods
interface Methods {}

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
    members: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      required: [true, "Add members"],
    },
    admins: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      required: [true, "Add admins"],
    },
    owner: {
      type: Schema.Types.ObjectId,
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

// Check if users exist before saving
ServerSchema.pre("save", async function (next) {
  const existingMembers = await UserModel.find({ _id: { $in: this.members } });
  const existingAdmins = await UserModel.find({ _id: { $in: this.admins } });
  const existingOwner = await UserModel.findOne({ _id: this.owner });

  if (
    existingMembers.length !== this.members.length ||
    existingAdmins.length !== this.admins.length ||
    !existingOwner
  ) {
    const error = new mongoose.Error.ValidationError();

    error.message = "One or more users do not exist";

    return next(error);
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

// If model exists, use it, else create it
const ServerModel = models.Server || mongoose.model("Server", ServerSchema);

// Export model
export default ServerModel as Model<IServer, {}, Methods>;
