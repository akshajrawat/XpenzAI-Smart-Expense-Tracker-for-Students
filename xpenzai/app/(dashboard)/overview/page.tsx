"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet as WalletIcon,
  ChevronDown,
  Check,
  Loader2,
  Users,
  Landmark,
  Info, // Added for the spinner
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetTransactions, useGetWallets } from "@/hook/walletHook";
import TransactionItem from "@/component/TransactionItem";
import { useCreateOrder } from "@/hook/paymentHook";
import { ItransactionType } from "@/types/transactionTypes";

// 1. Define Currency Config
export const CURRENCIES = {
  USD: { label: "USD", symbol: "$", rate: 90 },
  INR: { label: "INR", symbol: "₹", rate: 1 },
  EUR: { label: "EUR", symbol: "€", rate: 105 },
};

export type CurrencyCode = keyof typeof CURRENCIES;

const Overview = () => {
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [amount, setAmount] = useState("0");

  // calls query to get personal wallet
  const {
    data: wallet,
    isPending: isPendingPersonalWallet,
    refetch,
  } = useGetWallets("Personal");

  // 2. SAFELY derive the ID (Prevents the crash!)
  const activeWalletId = wallet?.[0]?._id;

  // 3. Fetch Transactions (Only runs when activeWalletId exists)
  const { data: transactions, isPending: isPendingTransactions } =
    useGetTransactions(activeWalletId);

  // Get the mutate functions for depositing of money form query
  const { mutate: createOrder } = useCreateOrder();

  // Currency State
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

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

  console.log(transactions);
  // Helper to Convert Balance
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

  // handel amount addition
  const handleSetAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // 1. If user deletes everything, reset to "0"
    if (value === "") {
      setAmount("0");
      return;
    }

    // remove leading 0 if its not decimal
    if (value.length > 1 && value.startsWith("0") && value[1] !== ".") {
      value = value.replace(/^0+/, "");
    }

    // prevent negative numbers
    if (parseFloat(value) <= 0) {
      setAmount("0");
    } else {
      setAmount(value);
    }
  };

  // handles deposite of the amount
  const handleDeposite = async () => {
    try {
      let amountInPaise: number =
        parseFloat(amount) * CURRENCIES[currency].rate * 100;
      const data: { amount: number; walletId: string } = {
        amount: amountInPaise,
        walletId: wallet[0]?._id,
      };

      // Create order
      createOrder(data);
      setIsAddMoneyOpen(false);
    } catch (error: any) {
      setIsAddMoneyOpen(false);
      console.error(error);
    }
  };

  // handle currency change
  const handleCurrencyChange = (code: CurrencyCode) => {
    setCurrency(code);
    localStorage.setItem("currency", code);
  };

  return (
    <div className="p-2 md:p-4 space-y-6 font-(family-name:--font-baloo-bhai)">
      {/* Wallet Section */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg lg:text-2xl text-slate-800 ml-1 flex items-center gap-2">
            <WalletIcon className="w-5 h-5 text-green-600" />
            My Wallet
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Balance Card */}
          <Card className="lg:col-span-2 border-2 border-slate-100 shadow-sm rounded-2xl overflow-hidden bg-white">
            <CardContent className="flex flex-col justify-center h-48 md:h-56 p-6 md:p-10">
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-1">
                Total Balance
              </p>

              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-4xl tabular-nums md:text-6xl font-extrabold text-slate-900 flex items-center">
                  <span className="text-3xl md:text-5xl mr-1 text-slate-400">
                    {CURRENCIES[currency].symbol}
                  </span>
                  {!isPendingPersonalWallet
                    ? getDisplayBalance(wallet[0]?.balanceInMin)
                    : "0.00"}
                </h2>

                {/* Currency Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 hover:bg-transparent outline-none"
                    >
                      <span className="text-slate-400 font-bold text-lg flex items-center gap-1 hover:text-green-600 transition-colors">
                        {currency} <ChevronDown className="w-4 h-4 mt-0.5" />
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="font-bold min-w-[140px]"
                  >
                    {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                      <DropdownMenuItem
                        key={code}
                        onClick={() => handleCurrencyChange(code)}
                        className="cursor-pointer flex items-center justify-between gap-4 py-2.5"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-slate-400 w-5">
                            {CURRENCIES[code].symbol}
                          </span>
                          {code}
                        </span>
                        {currency === code && (
                          <Check className="w-4 h-4 text-green-600" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex gap-3">
                {/* ADD MONEY POPUP */}
                <Card className="border-0 shadow-none p-0 bg-transparent">
                  <Dialog
                    open={isAddMoneyOpen}
                    onOpenChange={setIsAddMoneyOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 rounded-xl h-11 transition-all active:scale-95 shadow-sm shadow-green-600/20">
                        <Plus className="w-4 h-4 mr-1" /> Add Money
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      aria-describedby={undefined}
                      className="sm:max-w-[420px] rounded-4xl border-2 border-slate-100 p-8"
                    >
                      <DialogHeader className="flex flex-col items-center text-center">
                        <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                          <Plus className="w-7 h-7 text-green-600 stroke-[3px]" />
                        </div>
                        <DialogTitle className="text-2xl font-extrabold text-slate-900">
                          Add Money
                        </DialogTitle>
                        <p className="text-slate-500 font-bold text-sm">
                          Enter amount in {currency}
                        </p>
                      </DialogHeader>

                      <div className="py-6 space-y-2">
                        <Label
                          htmlFor="amount"
                          className="text-slate-700 font-bold ml-1"
                        >
                          Amount ({currency})
                        </Label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg group-focus-within:text-green-600 transition-colors pointer-events-none">
                            {CURRENCIES[currency].symbol}
                          </div>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={handleSetAmount}
                            className="h-14 pl-11 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus-visible:ring-green-600 font-bold text-xl outline-none"
                          />
                        </div>
                        <p className="text-xs text-slate-400 font-semibold ml-1">
                          Note: This will be converted to paise for storage.
                        </p>
                      </div>

                      <DialogFooter>
                        <Button
                          className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-2xl shadow-lg shadow-green-600/20 transition-all active:scale-95"
                          onClick={handleDeposite}
                        >
                          Confirm Deposit
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </Card>

                {/* INFO / DETAILS POPUP */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-2 border-slate-100 text-slate-600 font-bold px-6 rounded-xl h-11 hover:bg-slate-50 transition-all gap-2"
                    >
                      <Info className="w-4 h-4" /> Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] rounded-xl border-2 border-slate-100 p-8">
                    <DialogHeader className="mb-4">
                      <DialogTitle className="text-2xl font-extrabold text-slate-900 flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                          <Info className="w-5 h-5 text-slate-600" />
                        </div>
                        How it Works
                      </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                      <p className="text-slate-500 font-medium leading-relaxed">
                        Your{" "}
                        <span className="font-bold text-slate-800">
                          Personal Wallet
                        </span>{" "}
                        acts as your central hub. Money must be added here first
                        before it can be moved to groups.
                      </p>

                      {/* Visual Flow Steps */}
                      <div className="relative space-y-4">
                        {/* Step 1 */}
                        <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 items-start">
                          <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm shrink-0">
                            <Landmark className="w-5 h-5 text-purple-500" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 mb-1">
                              1. Top Up
                            </h4>
                            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                              Add money from your Bank Account, UPI, or Card via
                              Razorpay into this Personal Wallet.
                            </p>
                          </div>
                        </div>

                        {/* Connector Arrow */}
                        <div className="absolute left-[26px] top-[70px] h-6 border-l-2 border-dashed border-slate-300 z-0 hidden sm:block"></div>

                        {/* Step 2 */}
                        <div className="flex gap-4 p-4 bg-green-50 rounded-2xl border border-green-100 items-start z-10 relative">
                          <div className="bg-white p-2.5 rounded-xl border border-green-100 shadow-sm shrink-0">
                            <Users className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 mb-1">
                              2. Distribute
                            </h4>
                            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                              Once money is here, you can instantly transfer it
                              to any
                              <span className="font-bold text-green-700">
                                {" "}
                                Shared Wallet{" "}
                              </span>
                              without using a payment gateway again.
                            </p>
                          </div>
                        </div>
                      </div>

                      <DialogFooter>
                        <div className="w-full bg-slate-100 rounded-xl p-3 text-center">
                          <p className="text-xs font-bold text-slate-500">
                            Internal transfers are instant & fee-free.
                          </p>
                        </div>
                      </DialogFooter>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="flex flex-col gap-4 justify-between">
            <Card className="flex-1 border-2 border-slate-100 shadow-sm rounded-2xl p-4 flex items-center gap-4 bg-white">
              <div className="bg-green-100 p-3 rounded-xl flex items-center justify-center">
                <ArrowUpRight className="text-green-600 w-6 h-6 stroke-[3px]" />
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                  Income
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {CURRENCIES[currency].symbol} 0.00
                </p>
              </div>
            </Card>

            <Card className="flex-1 border-2 border-slate-100 shadow-sm rounded-2xl p-4 flex items-center gap-4 bg-white">
              <div className="bg-red-100 p-3 rounded-xl flex items-center justify-center">
                <ArrowDownLeft className="text-red-600 w-6 h-6 stroke-[3px]" />
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                  Expenses
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {CURRENCIES[currency].symbol} 0.00
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Recent Transactions Section */}
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

        {/* --- TRANSACTION LIST RENDERING WITH LOADING SPINNER --- */}
        <div className="flex flex-col gap-3">
          {isPendingTransactions ? (
            /* Loading State */
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
              <p className="text-slate-500 font-bold mt-2">
                Fetching your transactions...
              </p>
            </div>
          ) : transactions?.length > 0 ? (
            /* Data State */
            transactions.map((txn: ItransactionType) => (
              <TransactionItem key={txn._id} data={txn} currency={currency} />
            ))
          ) : (
            /* Empty State */
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
