"use client"

import { useState, useMemo } from "react"
import { toast } from "@/hooks/use-toast"
import { User } from "../types/user"
import { initialMockUsers } from "../data/mockUsers"

export function useUserManagement() {
  const [users, setUsers] = useState<User[]>(initialMockUsers)

  // Split users by role
  const creatorUsers = useMemo(() => users.filter((u) => u.role === "Creator"), [users])
  const adminUsers = useMemo(() => users.filter((u) => u.role === "Admin"), [users])

  const handleAddUser = (newUser: User) => {
    setUsers((prev) => [newUser, ...prev])
  }

  const handleUpdateUser = (updatedUser: User) => {
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)))
  }

  const handlePointsAdjusted = (userId: string, newPoints: number) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, points: newPoints } : u)))
  }

  const handleResendInvitation = (user: User) => {
    toast({
      title: "Invitation Resent",
      description: `Invitation has been resent to ${user.fullName}.`,
    })
  }

  return {
    users,
    creatorUsers,
    adminUsers,
    handleAddUser,
    handleUpdateUser,
    handlePointsAdjusted,
    handleResendInvitation,
  }
}
