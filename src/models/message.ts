import { Model, Schema, models } from "mongoose";
import UserModel from "./user";
import mongoose from "mongoose";
import { Mode } from "fs";

export interface IMessage {
  id?: string;
  text: string;
  timestamp: Schema.Types.Date;
  user: Schema.Types.ObjectId;
}

interface IMethods {}

const MessageSchema = new Schema<IMessage, {}, IMethods>(
  {
    text: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 500,
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: UserModel,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

MessageSchema.pre("save", async function (next) {
  const existingUser = await UserModel.findById(this.user);
  if (!existingUser) {
    const error = new mongoose.Error.ValidationError();

    error.message = "This user does not exist";

    throw error;
  }
  next();
});

const MessageModel = models.Message || mongoose.model("message", MessageSchema);

export default MessageModel as Model<IMessage, {}, IMethods>;
