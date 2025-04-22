import type React from "react"
import { SuperAdminLayout } from "@/components/layout/superadmin-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SuperAdminLayout>{children}</SuperAdminLayout>
}
