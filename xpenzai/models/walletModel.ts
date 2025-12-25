import mongoose, { model, Model, Schema, Types } from "mongoose";

export interface walletMembers {
  userId: Types.ObjectId;
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

const Wallet: Model<walletType> =
  mongoose.models.Wallet || model("Wallet", walletSchema);

export default Wallet;
