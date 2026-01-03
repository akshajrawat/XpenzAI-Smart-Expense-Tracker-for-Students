"use client";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Menu } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ScrollArea } from "@/components/ui/scroll-area";
import Logo from "./Logo";
import { sidebarLinks } from "./Sidebar";
import { cn } from "@/lib/utils";

const MiniNav = () => {
  const pathname = usePathname();
  // Get the first part of the path for the title (e.g., /home -> HOME)
  const pageTitle = pathname.split("/")[1]?.toUpperCase() || "DASHBOARD";

  return (
    <div className="py-2.5 flex justify-between items-center px-3 font-semibold text-lg md:text-2xl border-b-2 md:py-3.5 lg:py-4 md:px-6 md:font-bold">
      {/* Mobile Sidebar Trigger */}
      <div className="md:hidden flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 hover:bg-green-50 rounded-lg transition-colors group">
              <Menu className="w-6 h-6 text-slate-600 group-hover:text-green-600" />
            </button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="p-0 w-72 bg-white border-r border-green-100"
          >
            <VisuallyHidden>
              <SheetTitle>Navigation Menu</SheetTitle>
            </VisuallyHidden>

            {/* Logo Section inside Sheet */}
            <div className="p-6 border-b border-slate-50">
              <Logo href="/home" />
            </div>

            <ScrollArea className="h-[calc(100vh-80px)] p-4">
              <div className="flex flex-col gap-2">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.id}
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 h-14 px-4 rounded-xl transition-all font-bold",
                        isActive
                          ? "bg-green-600 text-white shadow-md shadow-green-600/20"
                          : "text-slate-500 hover:bg-green-50 hover:text-green-600"
                      )}
                    >
                      <span
                        className={cn(
                          "w-5 h-5",
                          isActive ? "text-white" : "text-slate-400"
                        )}
                      >
                        {link.icon}
                      </span>
                      {link.title}
                    </Link>
                  );
                })}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Page Title Display */}
      <div className="flex-1 md:flex-none">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
          {pageTitle}
        </h2>
      </div>

      {/* Profile Placeholder (Keeps title centered on mobile) */}
      <div className="w-10 h-10 rounded-full bg-green-100 border border-green-200 md:hidden" />
    </div>
  );
};

export default MiniNav;
