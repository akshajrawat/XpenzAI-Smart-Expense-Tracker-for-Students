"use client";

import { LoginInputs } from "@/app/auth/login/page";
import { RegisterInputs } from "@/app/auth/register/page";
import axiosInstance from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// REGISTER USER
export function useRegisterUser() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (credentials: RegisterInputs) => {
      const response = await axiosInstance.post(
        "/api/users/signup",
        credentials
      );
      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data.message || "Account created successfully!");
      router.push("/auth/login");
    },

    onError: (error: any) => {
      const errorMessage = error.response?.data.message || error.message;
      toast.error(errorMessage);
      console.error("Error in register.tsx :- ", errorMessage);
    },
  });
}

// VERIFY USER TOKEN
export function useVerifyToken() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (token: string) => {
      const response = await axiosInstance.post("/api/users/verifyemail", {
        token,
      });
      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data.message || "Email verified successfully!");
      router.push("/auth/login");
    },

    onError: (error: any) => {
      const errorMessage = error.response?.data.message || error.message;
      toast.error(errorMessage);
      console.error("Emailverification error:", errorMessage);
    },
  });
}

// LOGIN USER
export function useLoginUser() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginInputs) => {
      const response = await axiosInstance.post(
        "/api/users/login",
        credentials
      );
      return response.data;
    },

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      toast.success(data.message || "Logged in successfully!");
      router.push("/");
    },

    onError: (error: any) => {
      const errorMessage = error.response?.data.message || error.message;
      toast.error(errorMessage);
      console.error("Login error:", errorMessage);
    },
  });
}
