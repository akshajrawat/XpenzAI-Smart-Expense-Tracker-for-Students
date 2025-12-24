"use client";
import Link from "next/link";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="h-full w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center">
        <Logo href="/" />
      </div>

      {/* Navigation Actions */}
      <div className="flex items-center gap-4">
        {/* We use a shadcn-styled button but keep your color scheme */}
        <Button
          asChild
          className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-2 sm:py-5 font-bold shadow-lg shadow-green-600/20 transition-all duration-300 hover:scale-105 active:scale-95 border-none"
        >
          <Link href="/auth/login">Get Started</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
