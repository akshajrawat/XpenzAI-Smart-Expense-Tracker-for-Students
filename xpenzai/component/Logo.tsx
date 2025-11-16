import Link from "next/link";

const Logo = ({ href }: { href: string }) => {
  return (
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex  justify-center items-center text-[#001845]">
      <Link href={href}>Xpenz</Link>
      <p className="text-green-700">AI</p>
    </h1>
  );
};

export default Logo;
