import MiniNav from "@/component/MiniNav";
import Sidebar from "@/component/Sidebar";
import UserProvider from "@/providers/UserProvider";
import axiosInstance from "@/utils/axios";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  let user = null;
  try {
    const res = await axiosInstance.get("/api/users/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    user = res.data.user;
    console.log("success");
  } catch (error: any) {
    console.log(error.response.data.message || "problem in layout");
  }
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
        <div className="p-6">
          <UserProvider initialUser={user}>{children}</UserProvider>
        </div>{" "}
      </div>
    </section>
  );
}
