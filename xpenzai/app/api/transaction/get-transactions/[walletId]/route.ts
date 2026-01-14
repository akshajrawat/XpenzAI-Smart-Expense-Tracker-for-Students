import connectDb from "@/config/dbConfig";
import Transaction from "@/models/transactionModel";
import User from "@/models/userModel";
import Wallet from "@/models/walletModel";
import { NextRequest, NextResponse } from "next/server";

interface contextType {
  params: Promise<{ walletId: string }> | { walletId: string };
}
export async function GET(request: NextRequest, context: contextType) {
  try {
    await connectDb();
    const { walletId } = await context.params;
    const userIdHeader: string | null = request.headers.get("x-user-id");

    // find the wallet with member as userIdHeader
    const wallet = await Wallet.findOne({
      _id: walletId,
      "members.userId": userIdHeader,
    });

    if (!wallet) {
      return NextResponse.json(
        {
          message: "No wallet found with the user as member!",
        },
        { status: 404 }
      );
    }

    // get transactions
    const transactions = await Transaction.find({
      walletId: walletId,
    })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    // return the final response
    return NextResponse.json(
      {
        message:
          transactions.length === 0
            ? "No transaction found yet!"
            : "transaction fetched!",
        transactions,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
