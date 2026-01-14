import connectDb from "@/config/dbConfig";
import Wallet from "@/models/walletModel";
import { NextRequest, NextResponse } from "next/server";

// GET A SPECIFIC WALLET OF THE USER
export async function GET(request: NextRequest, { params }: any) {
  await connectDb();

  try {
    const { walletId } = await params;

    if (!walletId) {
      return NextResponse.json(
        { message: "Unable to fetch id from headers" },
        { status: 400 }
      );
    }

    // find wallet
    const wallet = await Wallet.findById(walletId);

    if (!wallet) {
      return NextResponse.json(
        { message: "User does not have a wallet yet." },
        { status: 400 }
      );
    }

    // return response
    return NextResponse.json(
      { message: "Wallet fetched", wallet },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
