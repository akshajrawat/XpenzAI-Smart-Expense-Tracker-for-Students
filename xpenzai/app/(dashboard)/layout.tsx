import MiniNav from "@/component/MiniNav";
import Sidebar from "@/component/Sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex w-full h-full">
      {/* sidebar */}
      <aside className="hidden md:block">
        <Sidebar />
      </aside>
      <div className="h-full w-full">
        {/* mini nav */}
        <MiniNav />
        {/* main */}
        <div>{children}</div>{" "}
      </div>
    </section>
  );
}
