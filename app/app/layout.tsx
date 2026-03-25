import { AppBottomNav, AppSidebar } from "@/components/layout/app-nav";
import { AppTopbar } from "@/components/layout/app-topbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh lg:flex">
      <AppSidebar />
      <div className="flex min-h-dvh flex-1 flex-col">
        <AppTopbar />
        <main className="flex-1 px-4 pb-24 pt-6 sm:px-6">{children}</main>
      </div>
      <AppBottomNav />
    </div>
  );
}
