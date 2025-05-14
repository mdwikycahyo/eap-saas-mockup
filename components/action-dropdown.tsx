"use client"

import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ActionDropdownProps {
  onViewDetails?: () => void
  onEdit?: () => void
  onDeactivate?: () => void
  viewLabel?: string
  editLabel?: string
  deactivateLabel?: string
}

export function ActionDropdown({
  onViewDetails,
  onEdit,
  onDeactivate,
  viewLabel = "View Details",
  editLabel = "Edit Client",
  deactivateLabel = "Deactivate",
}: ActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onViewDetails && <DropdownMenuItem onClick={onViewDetails}>{viewLabel}</DropdownMenuItem>}
        {onEdit && <DropdownMenuItem onClick={onEdit}>{editLabel}</DropdownMenuItem>}
        {onDeactivate && (
          <DropdownMenuItem onClick={onDeactivate} className="text-red-600 focus:text-red-600">
            {deactivateLabel}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
