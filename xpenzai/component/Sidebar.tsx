"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import {
  Home,
  Wallet,
  Users,
  PlusCircle,
  PieChart,
  Settings,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils"; // shadcn utility for conditional classes
import { useUser } from "@/hook/userHook";

export const sidebarLinks = [
  {
    id: 1,
    title: "Overview",
    icon: <Home className="w-5 h-5" />,
    href: "/overview",
  },
  {
    id: 2,
    title: "My Wallets",
    icon: <Wallet className="w-5 h-5" />,
    href: "/wallets",
  },
  {
    id: 4,
    title: "Analytics",
    icon: <PieChart className="w-5 h-5" />,
    href: "/analytics",
  },
  {
    id: 5,
    title: "Settings",
    icon: <Settings className="w-5 h-5" />,
    href: "/settings",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  const { data: user, isLoading } = useUser();
  console.log(user);
  return (
    <div className="hidden md:flex md:flex-col w-64 lg:w-72 border-r bg-white min-h-screen font-(family-name:--font-baloo-bhai)">
      {/* Header / Logo */}
      <div className="p-3 border-b">
        <Logo href="/home" />
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="flex flex-col gap-2 py-6">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.id}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 h-12 px-4 rounded-xl transition-all duration-200 font-bold tracking-tight group",
                  isActive
                    ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                    : "text-slate-500 hover:bg-green-50 hover:text-green-600"
                )}
              >
                <span
                  className={cn(
                    "transition-transform group-hover:scale-110",
                    isActive
                      ? "text-white"
                      : "text-slate-400 group-hover:text-green-600"
                  )}
                >
                  {link.icon}
                </span>
                <span className="text-base lg:text-lg">{link.title}</span>
              </Link>
            );
          })}
        </div>
      </ScrollArea>

      {/* Sidebar Footer / User Profile Brief */}
      <div className="p-4 border-t bg-slate-50/50">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-slate-200">
          <div className="w-10 h-10 rounded-full bg-green-100 border border-green-200 flex items-center justify-center text-green-700 font-bold">
            JD
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-slate-700 truncate">
              {!isLoading ? user.username : ""}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
              Personal Account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
