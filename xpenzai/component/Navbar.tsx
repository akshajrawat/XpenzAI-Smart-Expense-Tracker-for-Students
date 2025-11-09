const Navbar = () => {
  return (
    <div className=" h-full flex px-3 md:px-6 items-center justify-between">
      {/* logo */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex  justify-center items-center text-[#001845]">
        Xpenz
        <p className="text-green-700">AI</p>
      </h1>
      {/* get started  */}
      <button className="bg-green-600 text-white py-1 sm:py-2 xl:py-3 w-30 xl:w-35 rounded-full font-bold shadow-sm">
        Get Started
      </button>
    </div>
  );
};

export default Navbar;
