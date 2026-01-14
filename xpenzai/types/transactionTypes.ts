import { transactionType } from "@/models/transactionModel";

export interface ItransactionType extends transactionType {
  _id: string;
  createdAt: Date;
}
