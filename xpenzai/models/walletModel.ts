import mongoose, { model, Model, Schema } from "mongoose";

export interface walletMembers {
  userId: string;
  totalContribution: number;
}

export interface walletType extends Document {
  name: string;
  type: "Personal" | "Shared";
  balanceInPaise: number;
  members: walletMembers[];
}

const walletSchema = new Schema<walletType>({
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

  balanceInPaise: {
    type: Number,
    default: 0,
  },

  members: {
    type: [
      {
        userId: {
          type: String,
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

const Wallet: Model<walletType> =
  mongoose.models.Wallet || model("Wallet", walletSchema);

export default Wallet;
