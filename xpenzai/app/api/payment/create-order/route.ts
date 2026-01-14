import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

// Initialize Razorpay with your keys from .env
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { amount, walletId } = reqBody;

    // 1. Validate the amount and walletId
    if (!amount || amount < 0) {
      return NextResponse.json(
        {
          message: "Invalid amount!",
        },
        { status: 400 }
      );
    }

    if (!walletId) {
      return NextResponse.json(
        {
          message: "Wallet ID is required",
        },
        { status: 400 }
      );
    }

    // 2. Prepare options for Razorpay
    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        walletId: walletId,
      },
    };

    // 3. Create the order
    const order = await razorpay.orders.create(options);

    // 4. Send the Order ID back to the frontend
    return NextResponse.json(
      {
        message: "Order created successfully!",
        orderId: order.id,
        amount: options.amount,
        Currency: options.currency,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      {
        message: "Something went wrong while creating order",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
