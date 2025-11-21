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
const MiniNav = () => {
  const pathname = usePathname().split("/")[1].toUpperCase();

  return (
    <div
      className="py-2.5 flex justify-between items-center px-3 font-semibold text-lg md:text-2xl border-b-2 md:py-4 md:px-6 md:font-bold
    "
    >
      {/* side bar */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger className="pt-2">
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
      {pathname}
    </div>
  );
};

export default MiniNav;
