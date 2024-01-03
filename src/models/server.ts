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

ServerSchema.pre("save", async function (next) {
  const existingMembers = await UserModel.find({ _id: { $in: this.members } });
  const existingAdmins = await UserModel.find({ _id: { $in: this.admins } });

  if (
    existingMembers.length !== this.members.length ||
    existingAdmins.length !== this.admins.length
  ) {
    const error = new mongoose.Error("One or more users do not exist");

    // Přidání dalších vlastností chyby, pokud je to potřeba
    error.message = "One or more users do not exist";

    console.log("MESSAGE   " + error.message);

    return next(error);
  }

  next();
});

// If model exists, use it, else create it
const ServerModel = models.Server || mongoose.model("Server", ServerSchema);

// Export model
export default ServerModel as Model<IServer, {}, Methods>;
