"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, Building, LayoutDashboard, Settings, Users, Gift, CreditCard, ShieldCheck } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function SuperAdminSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      title: "Dashboard",
      href: "/superadmin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Manage Clients",
      href: "/superadmin/clients",
      icon: Building,
    },
    {
      title: "User Administration",
      href: "/superadmin/users",
      icon: Users,
    },
    {
      title: "Reward Catalog",
      href: "/superadmin/rewards",
      icon: Gift,
    },
    {
      title: "Financial Reports",
      href: "/superadmin/finance",
      icon: CreditCard,
    },
    {
      title: "System Configuration",
      href: "/superadmin/config",
      icon: Settings,
    },
    {
      title: "Security",
      href: "/superadmin/security",
      icon: ShieldCheck,
    },
    {
      title: "Reports",
      href: "/superadmin/reports",
      icon: BarChart3,
    },
  ]

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar variant="floating" className="border-r">
        <SidebarHeader className="flex items-center justify-between p-4">
          <Link href="/superadmin/dashboard" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              EA
            </div>
            <span className="text-lg font-bold">Super Admin</span>
          </Link>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {routes.map((route) => (
              <SidebarMenuItem key={route.href}>
                <SidebarMenuButton asChild isActive={pathname === route.href || pathname.startsWith(`${route.href}/`)}>
                  <Link href={route.href}>
                    <route.icon className="h-5 w-5" />
                    <span>{route.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <div className="flex items-center space-x-3 rounded-md bg-muted p-3">
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              SA
            </div>
            <div>
              <p className="text-sm font-medium">Super Admin</p>
              <p className="text-xs text-muted-foreground">superadmin@platform.com</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
