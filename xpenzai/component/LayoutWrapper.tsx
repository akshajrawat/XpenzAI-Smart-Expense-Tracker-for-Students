"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

const LayoutWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const isAuth = pathname.startsWith("/auth") || pathname === "/";
  return (
    <>
      {isAuth && (
        <header className="h-[8vh] lg:h-[10vh]">
          <Navbar />
        </header>
      )}
      <main className=" flex-1 min-h-[92vh] lg:min-h-[90vh]">
        {children}
      </main>
      {/* authfooter */}
      {isAuth && (
        <footer className="bg-linear-to-br from-gray-950 via-gray-900 to-green-950 text-gray-300 border-t border-green-800">
          <Footer />
        </footer>
      )}
    </>
  );
};

export default LayoutWrapper;
