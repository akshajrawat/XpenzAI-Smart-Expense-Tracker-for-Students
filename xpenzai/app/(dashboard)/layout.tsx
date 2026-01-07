import MiniNav from "@/component/MiniNav";
import Sidebar from "@/component/Sidebar";
import { fetchUser } from "@/hook/userHook";
import QueryProvider from "@/providers/QueryProvider";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(cookieString),
  });

  return (
    <QueryProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <section className="flex w-full h-full">
          {/* sidebar */}
          <aside className="hidden md:block">
            <Sidebar />
          </aside>
          <div className="max-h-screen w-full overflow-y-scroll">
            {/* mini nav */}
            <MiniNav />
            {/* main */}
            <div className="p-6">{children}</div>{" "}
          </div>
        </section>
      </HydrationBoundary>
    </QueryProvider>
  );
}
