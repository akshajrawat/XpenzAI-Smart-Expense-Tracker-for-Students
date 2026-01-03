import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/config/dbConfig";
import { Types } from "mongoose";
import Wallet from "@/models/walletModel";

export async function POST(request: NextRequest) {
  await connectDb();
  try {
    const reqBody = await request.json();
    const { walletId, amountToAdd } = reqBody;
    const userIdHeader = request.headers.get("x-user-id");

    if (!walletId || !amountToAdd) {
      return NextResponse.json(
        {
          message: "Please add amount and walletId",
        },
        { status: 400 }
      );
    }

    if (!userIdHeader) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 400 }
      );
    }

    const userId = new Types.ObjectId(userIdHeader);

    const wallet = await Wallet.findOne({
      _id: walletId,
      "members.userId": userId,
    });

    if (!wallet) {
      return NextResponse.json(
        {
          message: "Wallet not found!",
        },
        { status: 404 }
      );
    }

    // update wallet balance
    wallet.balanceInMin += amountToAdd;
    await wallet.save();

    return NextResponse.json(
      {
        message: "Successfully added amount to the wallet!!",
        amount: amountToAdd,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
