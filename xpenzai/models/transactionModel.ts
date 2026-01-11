import mongoose, { model, Model, models, Schema } from "mongoose";

export interface transactionType {
  walletId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  amountInMin: number;
  type: "expense" | "income";
  category: string;
  description?: string;
}

const transactionModel = new Schema<transactionType>(
  {
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amountInMin: {
      type: Number,
      default: 0,
    },

    type: {
      type: String,
      enum: ["expense", "income"],
      required: true,
    },

    category: {
      type: String,
      default: "Uncategorized",
    },

    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction: Model<transactionType> =
  models.Transaction || model("Transaction", transactionModel);

export default Transaction;
