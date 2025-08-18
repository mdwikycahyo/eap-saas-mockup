"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Pencil, Mail, UserIcon } from "lucide-react"
import { User } from "../../types/user"

interface AdminColumnsProps {
  onViewProfile: (admin: User) => void
  onEditCreator: (admin: User) => void
  onResendInvitation: (admin: User) => void
}

export function getAdminColumns({
  onViewProfile,
  onEditCreator,
  onResendInvitation,
}: AdminColumnsProps): ColumnDef<User>[] {
  return [
    {
      accessorKey: "fullName",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Admin <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue("fullName")}</div>
          <div className="text-xs text-muted-foreground">{row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: "invitationStatus",
      header: "Invitation Status",
      cell: ({ row }) => {
        const status: "Accepted" | "Pending Invitation" = row.getValue("invitationStatus")
        return (
          <Badge
            variant={status === "Accepted" ? "default" : "outline"}
            className={
              status === "Pending Invitation"
                ? "border-amber-500 text-amber-600 bg-amber-50"
                : "bg-green-100 text-green-700"
            }
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <div>
          <div>{row.original.province || "-"}</div>
          <div className="text-xs text-muted-foreground">{row.original.city || "-"}</div>
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="">Actions</div>,
      cell: ({ row }) => {
        const admin = row.original
        return (
          <div className="flex items-center justify-start gap-0.5">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => onViewProfile(admin)}>
                    <UserIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Profile</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => onEditCreator(admin)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit Admin</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onResendInvitation(admin)}
                    disabled={admin.invitationStatus === "Accepted"}
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{admin.invitationStatus === "Accepted" ? "Invitation Accepted" : "Resend Invitation"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )
      },
    },
  ]
}
