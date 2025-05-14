"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, FileText, LayoutDashboard, MessageSquare, Settings, Users } from "lucide-react"
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

export function AdminSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Campaigns",
      href: "/admin/campaigns",
      icon: FileText,
    },
    {
      title: "Approval",
      href: "/admin/moderation",
      icon: MessageSquare,
    },
    {
      title: "Creators",
      href: "/admin/creators",
      icon: Users,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar variant="floating" className="border-r">
        <SidebarHeader className="flex items-center justify-between p-4">
          <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              EA
            </div>
            <span className="text-lg font-bold">Admin Portal</span>
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
              AC
            </div>
            <div>
              <p className="text-sm font-medium">Admin Client</p>
              <p className="text-xs text-muted-foreground">admin@company.com</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
