import { CURRENCIES, CurrencyCode } from "@/app/(dashboard)/overview/page";
import { ItransactionType } from "@/types/transactionTypes";
import { ArrowDownLeft, ArrowUpRight, Hash } from "lucide-react"; // Added Hash icon

const TransactionItem = ({
  data,
  currency,
}: {
  data: ItransactionType;
  currency: CurrencyCode;
}) => {
  const isIncome = data.type === "income";

  const formattedDate = new Date(data.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Currency Logic
  const amount = data.amountInMin / 100 / CURRENCIES[currency].rate;

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-green-200 transition-all hover:shadow-md group">
      <div className="flex items-center gap-4">
        {/* Uniform Arrow Icon */}
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors border-2 ${
            isIncome
              ? "bg-green-50 border-green-100 text-green-600 group-hover:bg-green-100 group-hover:border-green-200"
              : "bg-red-50 border-red-100 text-red-500 group-hover:bg-red-100 group-hover:border-red-200"
          }`}
        >
          {isIncome ? (
            <ArrowUpRight className="w-6 h-6 stroke-[3px]" />
          ) : (
            <ArrowDownLeft className="w-6 h-6 stroke-[3px]" />
          )}
        </div>

        {/* Text Info */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <p className="font-extrabold text-slate-800 text-base capitalize leading-none">
              {data.type}
            </p>
            {/* Payment ID Display */}
            {data.description && (
              <span className="flex items-center gap-0.5 text-[10px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                <Hash className="w-2.5 h-2.5" />
                {data.description.slice(-8)}{" "}
                {/* Shows last 8 chars to keep it clean */}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-slate-200">
              {data.category}
            </span>
            <span className="text-xs font-semibold text-slate-300">
              • {formattedDate}
            </span>
          </div>
        </div>
      </div>

      {/* Amount Info */}
      <div className="text-right">
        <p
          className={`text-lg font-black tracking-tight ${
            isIncome ? "text-green-600" : "text-slate-900"
          }`}
        >
          {isIncome ? "+" : "-"} {CURRENCIES[currency].symbol}
          {amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
