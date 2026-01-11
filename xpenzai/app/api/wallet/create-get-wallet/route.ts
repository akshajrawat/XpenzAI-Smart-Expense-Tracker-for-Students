import connectDb from "@/config/dbConfig";
import User from "@/models/userModel";
import Wallet from "@/models/walletModel";
import { IWalletMembers } from "@/types/walletType";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// CREATE WALLET
export async function POST(request: NextRequest) {
  await connectDb();

  try {
    const reqBody = await request.json();
    const {
      name,
      type,
      members,
    }: { name: string; type: string; members: IWalletMembers[] } = reqBody;
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
    const finalMembers: IWalletMembers[] = Array.from(uniqueMembers).map(
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

// GET ALL THE WALLETS OF THE USER OR IF THE TYPE IS PROVIDED ONLY THE TYPE ONE
export async function GET(request: NextRequest) {
  await connectDb();

  try {
    const id = request.headers.get("x-user-id");
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (!id) {
      return NextResponse.json(
        { message: "Unable to fetch id from headers" },
        { status: 400 }
      );
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "No User Exist" }, { status: 401 });
    }

    // create filter
    const filter: any = {
      "members.userId": id,
    };
    if (type?.trim() !== "") {
      filter.type = type;
    }

    // find wallet
    const wallets = await Wallet.find(filter).lean();

    // return response
    return NextResponse.json(
      {
        message: wallets.length === 0 ? "No wallet found" : "Wallet fetched",
        wallets,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
