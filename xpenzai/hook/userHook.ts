"use client";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

// FUNCTION TO FETCH USER FROM THE BACKEND
export const fetchUser = async (cookieHeader?: string) => {
  const header = cookieHeader
    ? {
        headers: {
          Cookie: cookieHeader,
        },
      }
    : {};
  const res = await axiosInstance.get("/api/users/me", header);
  return res.data.user;
};

// HOOK TO GET USER FROM THE DATABASE
export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
  });
}
