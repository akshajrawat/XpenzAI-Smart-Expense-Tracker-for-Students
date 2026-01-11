"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Wallet as WalletIcon,
  Users,
  User,
  MoreVertical,
  Loader2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCreateWallet, useGetWallets } from "@/hook/walletHook";
import Link from "next/link";
import { CURRENCIES, CurrencyCode } from "../overview/page";
import { IWallet } from "@/types/walletType";
import { useUser } from "@/hook/userHook";

const WalletsPage = () => {
  // Fetching personal and share wallets
  const { data: personalWallet, isPending: isPersonalPending } =
    useGetWallets("Personal");
  const {
    data: sharedWallet,
    isPending: isSharedPending,
    refetch: refetchShared,
  } = useGetWallets("Shared");
  const { mutate: createWallet } = useCreateWallet();
  const { data: user } = useUser();
  // currency
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // New Wallet Form State (Only for Shared now)
  const [newWalletName, setNewWalletName] = useState("");

  // useeffect to get the currency from local storage
  useEffect(() => {
    (async () => {
      const savedCurr = localStorage.getItem("currency") as CurrencyCode;
      if (savedCurr && CURRENCIES[savedCurr]) {
        setCurrency(savedCurr);
      } else {
        // Default to USD if nothing is found
        setCurrency("USD");
        localStorage.setItem("currency", "USD");
      }
    })();
  }, []);

  const handleCreateSharedWallet = async () => {
    const data: IWallet = {
      name: newWalletName,
      type: "Shared",
      balanceInMin: 0,
      members: [
        {
          userId: user._id,
          totalContribution: 0,
        },
      ],
    };
    createWallet(data);
    refetchShared();
    setIsCreateOpen(false);
    setNewWalletName("");
  };

  // Changes the balance in minimum in the desired currency
  const getDisplayBalance = (balanceInMin: number | undefined) => {
    if (!balanceInMin) return "0.00";
    // Base is INR paise
    const baseAmount = balanceInMin / 100;
    const converted = baseAmount / CURRENCIES[currency].rate;
    return converted.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8 font-(family-name:--font-baloo-bhai)">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-xl">
              <WalletIcon className="w-8 h-8 text-green-600" />
            </div>
            My Wallets
          </h1>
          <p className="text-slate-500 font-medium mt-1 ml-1">
            Manage your personal funds and shared group expenses.
          </p>
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsCreateOpen(true)}
            className="hidden md:flex bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg shadow-green-600/20 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5 mr-2" /> New Shared Wallet
          </Button>
        </div>
      </div>

      {isPersonalPending ? (
        <div className="h-64 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
          <p className="text-slate-400 font-bold animate-pulse">
            Loading your wallets...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- LEFT COLUMN: PERSONAL WALLET (The "Default") --- */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-lg font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4" /> Personal Account
            </h2>

            {personalWallet ? (
              <Card className="border-2 border-blue-100 bg-linear-to-br from-blue-50 to-white shadow-xl shadow-blue-900/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

                <CardHeader className="pb-2">
                  <Badge className="w-fit bg-blue-100 text-blue-700 hover:bg-blue-100 border-0 mb-2 px-3">
                    Default
                  </Badge>
                  <CardTitle className="text-2xl font-extrabold text-slate-800">
                    {personalWallet[0]?.name}
                  </CardTitle>
                  <CardDescription className="text-slate-500 font-medium">
                    Your private funds
                  </CardDescription>
                </CardHeader>

                <CardContent className="py-6">
                  <div className="text-sm text-slate-400 font-bold uppercase mb-1">
                    Available Balance
                  </div>
                  <div className="text-4xl font-black text-slate-900 tracking-tight flex gap-1">
                    <span>{CURRENCIES[currency].symbol}</span>
                    {getDisplayBalance(personalWallet[0]?.balanceInMin)}
                  </div>
                </CardContent>

                <CardFooter>
                  <Link href={"/overview"}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-600/20">
                      Manage Personal Funds{" "}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ) : (
              <div className="p-6 border-2 border-dashed border-red-200 bg-red-50 rounded-2xl text-red-500 font-bold">
                Error loading personal wallet.
              </div>
            )}
          </div>

          {/* --- RIGHT COLUMN: SHARED WALLETS --- */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4" /> Shared Groups
              </h2>
              {/* Mobile Create Button */}
              <Button
                variant="ghost"
                onClick={() => setIsCreateOpen(true)}
                className="md:hidden text-green-600 font-bold hover:text-green-700"
              >
                <Plus className="w-4 h-4 mr-1" /> New
              </Button>
            </div>

            {!isSharedPending && sharedWallet.length === 0 ? (
              <div className="h-64 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-slate-50/50">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-slate-300">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-700">
                  No shared wallets yet
                </h3>
                <p className="text-slate-400 font-medium max-w-xs mx-auto mb-4">
                  Create a group wallet to split expenses for trips, house rent,
                  or events.
                </p>
                <Button
                  onClick={() => setIsCreateOpen(true)}
                  variant="outline"
                  className="border-green-200 text-green-700 hover:bg-green-50 font-bold"
                >
                  Create Shared Wallet
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {!isSharedPending &&
                  sharedWallet.map((wallet: any) => (
                    <Card
                      key={wallet._id}
                      className="group relative border border-slate-100 hover:border-green-200 transition-all hover:shadow-lg hover:shadow-green-900/5 bg-white rounded-2xl"
                    >
                      {/* Menu Actions */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-slate-400 hover:text-slate-800"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="font-bold"
                          >
                            <DropdownMenuItem className="cursor-pointer">
                              Edit Name
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
                              Leave Wallet
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg mb-3">
                            <Users className="w-5 h-5" />
                          </div>
                        </div>
                        <CardTitle className="text-lg font-extrabold text-slate-800 truncate pr-6">
                          {wallet.name}
                        </CardTitle>
                      </CardHeader>

                      <CardContent>
                        <div className="text-2xl font-bold text-slate-900 tracking-tight">
                          {getDisplayBalance(wallet.balanceInMin)}
                        </div>
                      </CardContent>

                      <CardFooter className="pt-0 border-t border-slate-50 mt-2 p-4 flex justify-between items-center text-xs font-bold text-slate-400">
                        <div className="flex items-center gap-1">
                          <span>{wallet.members?.length} Members</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-700 font-bold p-0 h-auto hover:bg-transparent"
                        >
                          Open &rarr;
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- CREATE SHARED WALLET MODAL --- */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold text-slate-900">
              New Shared Wallet
            </DialogTitle>
            <DialogDescription className="font-semibold text-slate-500">
              Create a shared space to manage group expenses together.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-700 font-bold">
                Group Name
              </Label>
              <Input
                id="name"
                value={newWalletName}
                onChange={(e) => setNewWalletName(e.target.value)}
                placeholder="e.g. Goa Trip, Apartment 302"
                className="h-12 rounded-xl border-slate-200 bg-slate-50 focus-visible:ring-green-600 font-semibold"
              />
            </div>

            {/* Informational Message */}
            <div className="bg-blue-50 p-4 rounded-xl flex gap-3 items-start">
              <Users className="w-5 h-5 text-blue-600 mt-0.5" />
              <p className="text-sm text-blue-700 font-medium leading-relaxed">
                This wallet will be shared. You can invite friends to join after
                creating it.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handleCreateSharedWallet}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-lg shadow-lg shadow-green-600/20 active:scale-95 transition-transform"
            >
              Create Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WalletsPage;
