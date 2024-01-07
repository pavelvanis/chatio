import mongoose, { Model, models } from "mongoose";
import ServerModel from "./server";
import UserModel from "./user";

export interface IMembership {
  server: mongoose.Types.ObjectId; // Reference to a Server document
  user: mongoose.Types.ObjectId; // Reference to a User document
  role: "member" | "admin" | "owner";
}

interface Methods {}

const MemberShipSchema = new mongoose.Schema<IMembership, {}, Methods>(
  {
    server: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: ServerModel,
      required: [true, "Add server"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel,
      required: [true, "Add user"],
    },
    role: {
      type: String,
      required: [true, "Add role"],
      enum: ["member", "admin", "owner"],
      default: "member",
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

// Check if User or Server exist before saving ...
// ...

const MemberShipModel = models.membership || mongoose.model("membership", MemberShipSchema);

export default MemberShipModel as Model<IMembership, {}, Methods>;
