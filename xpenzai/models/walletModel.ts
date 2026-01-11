import { IWallet } from "@/types/walletType";
import mongoose, { model, Model, Schema, Types } from "mongoose";

interface IWalletDocument extends IWallet, Document {}

const walletSchema = new Schema<IWalletDocument>({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    unique: [true, "Name should be unique"],
  },

  type: {
    type: String,
    enum: ["Personal", "Shared"],
    required: true,
  },

  balanceInMin: {
    type: Number,
    default: 0,
  },

  members: {
    type: [
      {
        userId: {
          type: Types.ObjectId,
          ref: "User",
          required: true,
        },
        totalContribution: {
          type: Number,
          default: 0,
        },
      },
    ],
    required: true,
  },
});

const Wallet: Model<IWalletDocument> =
  mongoose.models.Wallet || model("Wallet", walletSchema);

export default Wallet;
