import { Types } from "mongoose";

// Wallet member type
export interface IWalletMembers {
  userId: Types.ObjectId | string;
  totalContribution: number;
}

//  Wallet Type
export interface IWallet {
  name: string;
  type: "Personal" | "Shared";
  balanceInMin: number;
  members: IWalletMembers[];
}
