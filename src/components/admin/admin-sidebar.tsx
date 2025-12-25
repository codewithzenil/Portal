'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/shared/logo";
import { Award, LayoutDashboard, PlusCircle } from "lucide-react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSidebar } from "../ui/sidebar";

export function AdminSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/admin' || pathname.startsWith('/admin/dashboard')}
              tooltip={state === 'collapsed' ? 'Dashboard' : undefined}
            >
              <Link href="/admin">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith('/admin/certificates')}
              tooltip={state === 'collapsed' ? 'Certificates' : undefined}
            >
              <Link href="/admin/certificates">
                <Award />
                <span>Certificates</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/admin/certificates/new'}
              tooltip={state === 'collapsed' ? 'Add Certificate' : undefined}
            >
              <Link href="/admin/certificates/new">
                <PlusCircle />
                <span>Add Certificate</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
