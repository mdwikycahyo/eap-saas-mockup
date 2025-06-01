"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Megaphone, CheckSquare, Users, BarChart, Settings, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      label: "Manage User",
      href: "/admin/creators",
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: "Campaigns",
      href: "/admin/campaigns",
      icon: <Megaphone className="h-5 w-5" />,
    },
    {
      label: "Approval",
      href: "/admin/moderation",
      icon: <CheckSquare className="h-5 w-5" />,
    }
  ]

  if (!isClient) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="w-64 border-r bg-white">
          <div className="flex h-16 items-center border-b px-6">
            <h1 className="text-lg font-semibold">Admin Portal</h1>
          </div>
          <nav className="flex flex-col gap-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  pathname === item.href
                    ? "bg-slate-100 text-slate-900 font-medium"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <div className="mt-auto pt-4">
              <Link href="/">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <LogOut className="h-4 w-4" />
                  Switch Role
                </Button>
              </Link>
            </div>
          </nav>
        </aside>
      )}

      {/* Mobile Header & Sidebar */}
      {isMobile && (
        <>
          <header className="fixed top-0 left-0 right-0 h-14 border-b bg-white z-10 flex items-center justify-between px-4">
            <h1 className="text-lg font-semibold">Admin Portal</h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex h-14 items-center border-b px-6">
                  <h1 className="text-lg font-semibold">Admin Portal</h1>
                </div>
                <nav className="flex flex-col gap-2 p-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                        pathname === item.href
                          ? "bg-slate-100 text-slate-900 font-medium"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                  <div className="mt-auto pt-4">
                    <Link href="/">
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <LogOut className="h-4 w-4" />
                        Switch Role
                      </Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </header>
          <div className="h-14"></div> {/* Spacer for fixed header */}
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
