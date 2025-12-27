"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet as WalletIcon,
  DollarSign,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { walletType } from "@/models/walletModel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/providers/UserProvider";

const Overview = () => {
  const [wallets, setWallets] = useState<walletType[]>([]);
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [amount, setAmount] = useState("");

  // get user
  const { user } = useUser();
  console.log(user);
  // Fetching data
  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("/api/wallet/create-get-wallet");
        setWallets(res.data.wallets);
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || "Error while fetching wallet"
        );
      }
    })();
  }, []);

  const personalWallet = wallets.find((wallet) => wallet.type === "Personal");

  return (
    <div className="p-2 md:p-4 space-y-6 font-(family-name:--font-baloo-bhai)">
      {/* Wallet Section */}
      <div className="flex flex-col gap-4">
        <p className="font-bold text-lg lg:text-2xl text-slate-800 ml-1 flex items-center gap-2">
          <WalletIcon className="w-5 h-5 text-green-600" />
          My Wallet
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Balance Card */}
          <Card className="lg:col-span-2 border-2 border-slate-100 shadow-sm rounded-2xl overflow-hidden bg-white">
            <CardContent className="flex flex-col justify-center h-48 md:h-56 p-6 md:p-10">
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-1">
                Total Balance
              </p>
              <div className="flex items-baseline gap-2 mb-6">
                <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900">
                  {personalWallet?.balanceInMin
                    ? (personalWallet.balanceInMin / 100).toFixed(2)
                    : "0.00"}
                </h2>
                <span className="text-slate-400 font-bold text-lg">USD</span>
              </div>

              <div className="flex gap-3">
                {/* ADD MONEY POPUP */}
                <Dialog open={isAddMoneyOpen} onOpenChange={setIsAddMoneyOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 rounded-xl h-11 transition-all active:scale-95 shadow-sm shadow-green-600/20">
                      <Plus className="w-4 h-4 mr-1" /> Add Money
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[420px] rounded-4xl border-2 border-slate-100 p-8">
                    <DialogHeader className="flex flex-col items-center text-center">
                      <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                        <Plus className="w-7 h-7 text-green-600 stroke-[3px]" />
                      </div>
                      <DialogTitle className="text-2xl font-extrabold text-slate-900">
                        Add Money
                      </DialogTitle>
                      <p className="text-slate-500 font-bold text-sm">
                        Enter the amount to add to your wallet
                      </p>
                    </DialogHeader>

                    <div className="py-6 space-y-2">
                      <Label
                        htmlFor="amount"
                        className="text-slate-700 font-bold ml-1"
                      >
                        Amount (USD)
                      </Label>
                      <div className="relative group">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-600 transition-colors" />
                        <Input
                          id="amount"
                          type="number"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="h-14 pl-11 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus-visible:ring-green-600 font-bold text-xl outline-none"
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button
                        className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-2xl shadow-lg shadow-green-600/20 transition-all active:scale-95"
                        onClick={() => {
                          console.log("Amount to add:", amount);
                          setIsAddMoneyOpen(false);
                        }}
                      >
                        Confirm Deposit
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  className="border-2 border-slate-100 text-slate-600 font-bold px-6 rounded-xl h-11 hover:bg-slate-50 transition-all"
                >
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="flex flex-col gap-4 justify-between">
            <Card className="flex-1 border-2 border-slate-100 shadow-sm rounded-2xl p-4 flex items-center gap-4 bg-white">
              <div className="bg-green-100 p-3 rounded-xl">
                <ArrowUpRight className="text-green-600 w-6 h-6 stroke-[3px]" />
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                  Income
                </p>
                <p className="text-2xl font-bold text-slate-900">$ 0.00</p>
              </div>
            </Card>

            <Card className="flex-1 border-2 border-slate-100 shadow-sm rounded-2xl p-4 flex items-center gap-4 bg-white">
              <div className="bg-red-100 p-3 rounded-xl">
                <ArrowDownLeft className="text-red-600 w-6 h-6 stroke-[3px]" />
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                  Expenses
                </p>
                <p className="text-2xl font-bold text-slate-900">$ 0.00</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Recent Transactions Placeholder */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="font-bold text-xl text-slate-800">
            Recent Transactions
          </h3>
          <Link
            href="/analytics"
            className="text-green-600 font-bold text-sm hover:underline underline-offset-4"
          >
            See all activity
          </Link>
        </div>

        <Card className="border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-2xl h-44 flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-400 font-bold italic">
              No transactions found for this wallet.
            </p>
            <Button
              variant="link"
              className="text-green-600 font-bold mt-1 h-auto p-0"
            >
              Create your first entry
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
