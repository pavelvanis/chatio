import mongoose from "mongoose";

export interface IMembership {
  server: mongoose.Types.ObjectId; // Reference to a Server document
  user: mongoose.Types.ObjectId; // Reference to a User document
  role: "member" | "admin";
}

interface Methods {}

const MemberShipSchema = new mongoose.Schema<IMembership, {}, Methods>(
  {
    server: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Add server"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Add user"],
    },
    role: {
      type: String,
      required: [true, "Add role"],
      enum: ["member", "admin"],
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
