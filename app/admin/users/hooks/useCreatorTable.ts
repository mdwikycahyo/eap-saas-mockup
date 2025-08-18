"use client"

import { useState, useMemo } from "react"
import { type SortingState, useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table"
import { User } from "../types/user"
import { getCreatorColumns } from "../components/tables/CreatorColumns"

interface UseCreatorTableProps {
  creators: User[]
  onViewProfile: (creator: User) => void
  onEditCreator: (creator: User) => void
  onResendInvitation: (creator: User) => void
  onAdjustPoints: (creator: User) => void
}

export function useCreatorTable({ creators, onViewProfile, onEditCreator, onResendInvitation, onAdjustPoints }: UseCreatorTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [invitationStatusFilter, setInvitationStatusFilter] = useState<string>("all")

  const filteredCreators = useMemo(() => {
    let data = [...creators]
    if (invitationStatusFilter !== "all") {
      data = data.filter((c) => c.invitationStatus === invitationStatusFilter)
    }
    if (globalFilter) {
      data = data.filter(
        (creator) =>
          creator.fullName.toLowerCase().includes(globalFilter.toLowerCase()) ||
          creator.email.toLowerCase().includes(globalFilter.toLowerCase())
      )
    }
    return data
  }, [creators, invitationStatusFilter, globalFilter])

  const columns = getCreatorColumns({
    onViewProfile,
    onEditCreator,
    onResendInvitation,
    onAdjustPoints,
  })

  const table = useReactTable({
    data: filteredCreators,
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
    filteredCreators,
    globalFilter,
    setGlobalFilter,
    invitationStatusFilter,
    setInvitationStatusFilter,
    columns,
  }
}
