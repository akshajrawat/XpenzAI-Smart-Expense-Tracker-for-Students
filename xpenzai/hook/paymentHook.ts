import axiosInstance from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDepositeMoney } from "./walletHook";

// CREATE AN ORDER FOR RAZORPAY
export function useCreateOrder() {
  const { mutate: depositeMoney } = useDepositeMoney();
  return useMutation({
    mutationFn: async (data: { amount: number; walletId: string }) => {
      const response = await axiosInstance.post(
        "/api/payment/create-order",
        data
      );
      return response.data;
    },

    onSuccess: (data, variables) => {
      toast.success(data.message || "Order Created!");
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "XpenzAI",
        description: "Wallet Deposit",
        order_id: data.orderId,
        handler: async function (response: any) {
          console.log("Success Object:", response);
          depositeMoney({
            paymentData: {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            walletId: variables.walletId,
            amountToAdd: data.amount,
          });
        },
        theme: { color: "#16a34a" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    },

    onError: (error: any) => {
      const errorMessage = error.response?.data.message || error.message;
      toast.error(errorMessage);
      console.error("Order Creation error:", errorMessage);
    },
  });
}
