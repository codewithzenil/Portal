import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background text-foreground">
        <AdminSidebar />
        <div className="flex flex-col md:pl-12 group-data-[collapsible=icon]:md:pl-12 group-data-[state=expanded]:md:pl-64 transition-[padding-left] duration-200 ease-linear">
          <AdminHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
