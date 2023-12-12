import bcrypt from "bcrypt";
import mongoose, { Model, models } from "mongoose";

// Interface of user
export interface IUser {
  name: string;
  email: string;
  password: string;
}

// Interface of user methods
interface Methods {
  comparePassword: (password: string) => Promise<boolean>;
}

// Create user schema
const UserSchema = new mongoose.Schema<IUser, {}, Methods>(
  {
    name: {
      type: String,
      required: [true, "Add name"],
    },
    email: {
      type: String,
      required: [true, "Add email"],
      unique: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Add password"],
      minlength: [6, "Password must be at least 6 characters"],
      maxlength: [20, "Password can not be more than 20 characters"],
      // select: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
  }
);

UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Method for comparing passwords
UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// If model exists, use it, else create it
const UserModel = models.User || mongoose.model("User", UserSchema);

// Export model
export default UserModel as Model<IUser, {}, Methods>;
