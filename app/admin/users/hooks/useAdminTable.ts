"use client"

import { useState, useMemo } from "react"
import { type SortingState, useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table"
import { User } from "../types/user"
import { getAdminColumns } from "../components/tables/AdminColumns"

interface UseAdminTableProps {
  admins: User[]
  onViewProfile: (admin: User) => void
  onEditCreator: (admin: User) => void
  onResendInvitation: (admin: User) => void
}

export function useAdminTable({ admins, onViewProfile, onEditCreator, onResendInvitation }: UseAdminTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [invitationStatusFilter, setInvitationStatusFilter] = useState<string>("all")

  const filteredAdmins = useMemo(() => {
    let data = [...admins]
    if (invitationStatusFilter !== "all") {
      data = data.filter((c) => c.invitationStatus === invitationStatusFilter)
    }
    if (globalFilter) {
      data = data.filter(
        (admin) =>
          admin.fullName.toLowerCase().includes(globalFilter.toLowerCase()) ||
          admin.email.toLowerCase().includes(globalFilter.toLowerCase())
      )
    }
    return data
  }, [admins, invitationStatusFilter, globalFilter])

  const columns = getAdminColumns({
    onViewProfile,
    onEditCreator,
    onResendInvitation,
  })

  const table = useReactTable({
    data: filteredAdmins,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    initialState: { pagination: { pageSize: 5 } },
  })

  return {
    table,
    filteredAdmins,
    globalFilter,
    setGlobalFilter,
    invitationStatusFilter,
    setInvitationStatusFilter,
    columns,
  }
}
