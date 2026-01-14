"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Wallet,
  Plus,
  Send,
  UserPlus,
  Users,
  Search,
  MoreVertical,
  ArrowUpRight,
  ArrowDownLeft,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetWallet } from "@/hook/walletHook";
import { CURRENCIES, CurrencyCode } from "../../overview/page"; // Adjust path as needed
import { IWallet } from "@/types/walletType";

export default function SharedWalletDetails() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  // 1. Fetch Backend Data
  const { data: walletData, isPending } = useGetWallet(params.id) as {
    data: IWallet;
    isPending: boolean;
  };

  // 2. Currency State (Sync with your Overview page logic)
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  useEffect(() => {
    const savedCurr = localStorage.getItem("currency") as CurrencyCode;
    if (savedCurr && CURRENCIES[savedCurr]) {
      setCurrency(savedCurr);
    }
  }, []);

  // 3. Helper to Convert Balance
  const getDisplayBalance = (balanceInMin: number | undefined) => {
    if (balanceInMin === undefined) return "0.00";
    const baseAmount = balanceInMin / 100; // to main unit
    const converted = baseAmount / CURRENCIES[currency].rate;
    return converted.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // 4. Loading State
  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-green-600" />
        <p className="ml-2 font-bold text-slate-500">Loading Wallet...</p>
      </div>
    );
  }

  // Handle case where wallet doesn't exist
  if (!walletData)
    return <div className="p-10 text-center">Wallet not found.</div>;

  return (
    <div className="min-h-screen bg-slate-50/50 p-2 md:p-6 font-(family-name:--font-baloo-bhai)">
      {/* 1. HEADER & NAVIGATION */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-xl hover:bg-white hover:shadow-sm"
        >
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </Button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 leading-none">
            {walletData.name}
          </h1>
          <p className="text-xs font-bold text-slate-400 mt-1 flex items-center gap-1">
            <Users className="w-3 h-3" /> {walletData.members?.length || 0}{" "}
            Members
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. LEFT COLUMN: HERO CARD + TRANSACTIONS */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-lg shadow-slate-200/50 bg-slate-900 text-white rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>

            <CardContent className="p-8 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">
                    Total Pool Balance
                  </p>
                  <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-1">
                    {CURRENCIES[currency].symbol}
                    {getDisplayBalance(walletData.balanceInMin)}
                  </h2>
                </div>
                <div className="bg-slate-800 p-2 rounded-xl">
                  <Wallet className="w-6 h-6 text-slate-400" />
                </div>
              </div>

              {/* ACTION BUTTONS GRID */}
              <div className="grid grid-cols-3 gap-3 mt-8">
                <Button className="h-auto py-3 flex flex-col gap-2 bg-green-500 hover:bg-green-600 text-white border-0 rounded-2xl">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold">Add Money</span>
                </Button>

                <Button className="h-auto py-3 flex flex-col gap-2 bg-white/10 hover:bg-white/20 text-white border-0 rounded-2xl backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Send className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold">Pay Expense</span>
                </Button>

                <Button className="h-auto py-3 flex flex-col gap-2 bg-white/10 hover:bg-white/20 text-white border-0 rounded-2xl backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold">Add Member</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* TRANSACTIONS LIST */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-slate-800">
                Activity
              </h3>
              <Button
                variant="ghost"
                className="text-slate-400 hover:text-slate-600"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {walletData.transactions?.length > 0 ? (
                walletData.transactions.map((txn: any) => (
                  <div key={txn._id} className="...">
                    {" "}
                    {/* Map your transaction items here */}{" "}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-3xl border-2 border-dashed border-slate-100">
                  <p className="text-slate-400 font-bold italic">
                    No transactions yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. RIGHT COLUMN: MEMBERS & INFO */}
        <div className="space-y-6">
          <Card className="border-2 border-slate-100 shadow-sm rounded-3xl overflow-hidden bg-white">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-extrabold text-slate-800">
                Group Members
              </CardTitle>
              <Badge className="bg-slate-200 text-slate-600">
                {walletData.members?.length || 0}
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50">
                {walletData.members?.map((member: any) => (
                  <div
                    key={member._id}
                    className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-indigo-100 text-indigo-600 font-bold uppercase">
                          {member.name ? member.name[0] : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">
                          {member.name || "User"}
                        </p>
                        <p className="text-xs font-bold text-slate-400 capitalize">
                          {member.role || "Member"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-100 shadow-sm rounded-3xl bg-slate-50/50">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">
                  Created On
                </span>
                <span className="text-sm font-bold text-slate-700">
                  {new Date(walletData.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">
                  Wallet ID
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-500 bg-white px-2 py-1 rounded border border-slate-200 uppercase">
                  #{walletData._id.slice(-10)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
