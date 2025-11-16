"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
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
import { Button } from "@/components/ui/button";
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
    <>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger className="px-2 py-3">
            <Menu />
          </SheetTrigger>
          <SheetContent side="left">
            <VisuallyHidden>
              <SheetTitle></SheetTitle>
            </VisuallyHidden>

            {/* logo */}
            <div className="p-3">
              <Logo href="/home" />
            </div>

            {/* components */}
            <ScrollArea>
              <div className="flex flex-col gap-2">
                {sidebarLinks.map((comp) => {
                  return (
                    <button
                      className="w-full h-14 px-4 py-2 hover:bg-[#d8d8d863]"
                      key={comp.id}
                    >
                      <Link
                        className="flex gap-3 justify-start items-center font-semibold"
                        href={comp.href}
                      >
                        {comp.icon}
                        {comp.title}
                      </Link>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
      {/* Desktop permanent sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 border-r bg-white">
        <div className="p-3">
          <Logo href="/home" />
        </div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-2 p-2">
            {sidebarLinks.map((comp) => (
              <Link
                key={comp.id}
                href={comp.href}
                className="flex items-center gap-3 h-12 px-4 rounded-md hover:bg-muted font-medium"
              >
                {comp.icon}
                {comp.title}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};

export default Sidebar;
