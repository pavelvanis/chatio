import { Model, Schema, models } from "mongoose";
import UserModel from "./user";
import mongoose from "mongoose";

export interface IMessage {
  id?: string;
  content: string;
  timestamp: Schema.Types.Date;
  userId: Schema.Types.ObjectId;
  serverId: Schema.Types.ObjectId;
}

interface IMethods {}

const MessageSchema = new Schema<IMessage, {}, IMethods>(
  {
    content: {
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
    serverId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      // ref: UserModel,
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
  const existingUser = await UserModel.findById(this.userId);
  if (!existingUser) {
    const error = new mongoose.Error.ValidationError();

    error.message = "This user does not exist";

    throw error;
  }
  next();
});

const MessageModel = models.message || mongoose.model("message", MessageSchema);

export default MessageModel as Model<IMessage, {}, IMethods>;
