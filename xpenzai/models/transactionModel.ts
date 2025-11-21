import mongoose, { model, Model, models, Schema } from "mongoose";

export interface transactionType {
  walletId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  balanceInPaise: number;
  type: "Expense" | "Add_Money" | "Contribution";
  category: string;
}

const transactionModel = new Schema<transactionType>({
  walletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  balanceInPaise: {
    type: Number,
    default: 0,
  },

  type: {
    type: String,
    enum: ["Expense", "Add_Money", "Contribution"],
    required: true,
  },

  category: {
    type: String,
    default: "Anonymous",
  },
});

const Transaction: Model<transactionType> =
  models.Transaction || model("Transaction", transactionModel);

export default Transaction;
