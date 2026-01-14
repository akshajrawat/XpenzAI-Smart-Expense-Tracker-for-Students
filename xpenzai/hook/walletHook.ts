"use client";

import { IWallet } from "@/types/walletType";
import axiosInstance from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// GET WALLETS FROM BACKEND
export function useGetWallets(type: string) {
  return useQuery({
    queryKey: ["wallets", type],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/api/wallet/create-get-wallet?type=${type}`
      );
      return response.data.wallets;
    },
    staleTime: 1000 * 60,
  });
}

// GET A SPECIFIC WALLET FROM BACKEND
export function useGetWallet(walletId: string) {
  return useQuery({
    queryKey: ["wallet", walletId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/api/wallet/create-get-wallet/${walletId}`
      );
      return response.data.wallet;
    },
    staleTime: 1000 * 60,
    enabled: !!walletId,
  });
}

// DEPOSITE MONEY OT A SPECIFIC WALLET
export function useDepositeMoney() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      paymentData: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      };
      walletId: string;
      amountToAdd: number;
    }) => {
      const response = await axiosInstance.post("/api/wallet/add-money", data);
      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data.message || "Amount added!!");
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },

    onError: (error: any) => {
      const errorMessage = error.response?.data.message || error.message;
      toast.error(errorMessage);
      console.error("Emailverification error:", errorMessage);
    },
  });
}

// CREATE A NEW WALLET
export function useCreateWallet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IWallet) => {
      const response = await axiosInstance.post(
        "/api/wallet/create-get-wallet",
        data
      );
      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data.message || "Wallet created successfully!!");
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },

    onError: (error: any) => {
      const errorMessage = error.response?.data.message || error.message;
      toast.error(errorMessage);
      console.error("Wallet Creation error :", errorMessage);
    },
  });
}

// GET transactions FROM BACKEND
export function useGetTransactions(walletId: string | undefined) {
  return useQuery({
    queryKey: ["transactions", walletId],
    queryFn: async () => {
      if (!walletId) return [];
      const response = await axiosInstance.get(
        `/api/transaction/get-transactions/${walletId}`
      );
      return response.data.transactions;
    },
    enabled: !!walletId,
    staleTime: 1000 * 60,
  });
}
