import Link from "next/link";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <div className=" h-full flex px-3 md:px-6 items-center justify-between">
      {/* logo */}
      <Logo href="/" />
      {/* get started  */}
      <button className="bg-green-600 hover:bg-green-700 text-white py-1 sm:py-2 xl:py-3 w-30 xl:w-35 rounded-full font-bold shadow-sm transition-colors duration-200">
        <Link href="/login">Get Started</Link>
      </button>
    </div>
  );
};

export default Navbar;
