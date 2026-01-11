import { IUser } from "@/types/userTypes";
import mongoose, { Schema, Model, Document, Types } from "mongoose";

// defining the type Safety for user
interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
  password: string;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
}

const userSchema = new Schema<IUserDocument>({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "Username should be unique"],
  },

  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "Email should be unique"],
  },

  password: {
    type: String,
    required: [true, "Please provide an email"],
  },

  isWalletCreated: {
    type: Boolean,
    default: false,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  forgotPasswordToken: {
    type: String,
    select: false,
  },
  forgotPasswordTokenExpiry: {
    type: Date,
    select: false,
  },
  verifyToken: {
    type: String,
    select: false,
  },
  verifyTokenExpiry: {
    type: Date,
    select: false,
  },
});

// NextJs works at edge computing so it usually does not know if the model is already created or is to be created, So in nextjs we export like this :-
const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>("User", userSchema);
export default User;
