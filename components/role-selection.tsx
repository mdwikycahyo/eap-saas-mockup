"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserCircle, Building2, ShieldCheck } from "lucide-react"

export function RoleSelection() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)

    // Store the role in localStorage for persistence
    localStorage.setItem("userRole", role)

    // Navigate to the appropriate dashboard
    switch (role) {
      case "creator":
        router.push("/creator/dashboard")
        break
      case "admin":
        router.push("/admin/dashboard")
        break
      case "superadmin":
        router.push("/superadmin/dashboard")
        break
    }
  }

  return (
    <div className="w-full max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Employee Advocacy Platform</h1>
      <p className="text-center text-slate-600 mb-10">Select your role to continue</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RoleCard
          title="Super Admin"
          description="Platform-wide management"
          icon={<ShieldCheck className="h-12 w-12 text-violet-500" />}
          isSelected={selectedRole === "superadmin"}
          onClick={() => handleRoleSelect("superadmin")}
        />

        <RoleCard
          title="Admin Client"
          description="Manage campaigns and creators"
          icon={<Building2 className="h-12 w-12 text-emerald-500" />}
          isSelected={selectedRole === "admin"}
          onClick={() => handleRoleSelect("admin")}
        />

        <RoleCard
          title="Creator"
          description="Share content and earn rewards"
          icon={<UserCircle className="h-12 w-12 text-rose-500" />}
          isSelected={selectedRole === "creator"}
          onClick={() => handleRoleSelect("creator")}
        />
      </div>
    </div>
  )
}

interface RoleCardProps {
  title: string
  description: string
  icon: React.ReactNode
  isSelected: boolean
  onClick: () => void
}

function RoleCard({ title, description, icon, isSelected, onClick }: RoleCardProps) {
  return (
    <Card
      className={`transition-all cursor-pointer hover:shadow-md ${
        isSelected ? "ring-2 ring-offset-2 ring-slate-900" : ""
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-center mb-4">{icon}</div>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center pt-2">
        <Button variant={isSelected ? "default" : "outline"} className="w-full">
          {isSelected ? "Selected" : "Select Role"}
        </Button>
      </CardFooter>
    </Card>
  )
}
