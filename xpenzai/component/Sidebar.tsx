"use client";

import Logo from "./Logo";
import {
  Home,
  Wallet,
  Users,
  PlusCircle,
  PieChart,
  Settings,
  Menu,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export const sidebarLinks = [
  {
    id: 1,
    title: "Overview",
    icon: <Home />,
    href: "/home",
  },
  {
    id: 2,
    title: "My Wallets",
    icon: <Wallet />,
    href: "/wallets",
  },
  {
    id: 3,
    title: "Shared Wallets",
    icon: <Users />,
    href: "/shared",
  },
  {
    id: 4,
    title: "Add Expense",
    icon: <PlusCircle />,
    href: "/add-expense",
  },
  {
    id: 5,
    title: "Analytics",
    icon: <PieChart />,
    href: "/analytics",
  },
  {
    id: 6,
    title: "Settings",
    icon: <Settings />,
    href: "/settings",
  },
];
const Sidebar = () => {
  return (
    <div className="hidden md:flex md:flex-col w-64 border-r gap-2 bg-white h-full">
      <div className="p-3 border-b-2">
        <Logo href="/overview" />
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 md:gap-5 p-2">
          {sidebarLinks.map((comp) => (
            <Link
              key={comp.id}
              href={comp.href}
              className="flex items-center gap-3 h-12 px-4 rounded-md hover:bg-muted font-medium md:font-semibold md:text-lg"
            >
              {comp.icon}
              {comp.title}
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
