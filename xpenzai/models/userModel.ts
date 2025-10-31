import mongoose, { Schema, Model, Document } from "mongoose";

// defining the type Safety for user
export interface UserType extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
}

const userSchema = new Schema<UserType>({
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

  isVerified: {
    type: Boolean,
    default: false,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// NextJs works at edge computing so it usually does not know if the model is already created or is to be created, So in nextjs we export like this :-
const User: Model<UserType> =
  mongoose.models.User || mongoose.model<UserType>("User", userSchema);
export default User;
