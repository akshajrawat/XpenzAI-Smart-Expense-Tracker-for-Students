import Sidebar from "@/component/Sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex w-full">
      {/* sidebar */}
      <aside>
        <Sidebar />
      </aside>
      <div className="h-full w-full">
        {/* mini nav */}
        <div className="py-3 flex justify-end px-2"> Hi this is mini nav </div>
        {/* main */}
        <div>{children}</div>{" "}
      </div>
    </section>
  );
}
