import connectDb from "@/config/dbConfig";
import User from "@/models/userModel";
import Wallet, { walletMembers } from "@/models/walletModel";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDb();

  try {
    const reqBody = await request.json();
    const {
      name,
      type,
      members,
    }: { name: string; type: string; members: walletMembers[] } = reqBody;
    const headerId = request.headers.get("x-user-id");

    if (!headerId) {
      return NextResponse.json(
        { message: "Unable to fetch id from headers" },
        { status: 400 }
      );
    }

    const id: Types.ObjectId = new Types.ObjectId(headerId);
    // check if all the field are present
    if (!name || !type) {
      return NextResponse.json(
        { message: "All fields are mandatory" },
        { status: 400 }
      );
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { message: "Unable to fetch user from the user-id" },
        { status: 400 }
      );
    }

    // add initial userId if not added yet
    const uniqueMembers = new Set(members.map((m) => m.userId));
    uniqueMembers.add(id);

    // convert back to array
    const finalMembers: walletMembers[] = Array.from(uniqueMembers).map(
      (userId) => ({ userId, totalContribution: 0 })
    );

    // create a new wallet
    const newWallet = await Wallet.create({
      name,
      type,
      balanceInMin: 0,
      members: finalMembers,
    });

    // return response
    return NextResponse.json(
      { message: "Wallet created successfully!", wallet: newWallet },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// GET ALL THE WALLETS OF THE USER
export async function GET(request: NextRequest) {
  await connectDb();

  try {
    const id = request.headers.get("x-user-id");

    if (!id) {
      return NextResponse.json(
        { message: "Unable to fetch id from headers" },
        { status: 400 }
      );
    }

    // find wallet
    const wallets = await Wallet.find({
      "members.userId": id,
    });

    if (!wallets) {
      return NextResponse.json(
        { message: "User does not have a wallet yet." },
        { status: 400 }
      );
    }

    // return response
    return NextResponse.json(
      { message: "Wallets fetched", wallets },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
