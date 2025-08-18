"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Pencil, Mail, Coins, UserIcon, Instagram } from "lucide-react"
import { TikTokIcon } from "@/components/tik-tok-icon"
import { User } from "../../types/user"

interface CreatorColumnsProps {
  onViewProfile: (creator: User) => void
  onEditCreator: (creator: User) => void
  onResendInvitation: (creator: User) => void
  onAdjustPoints: (creator: User) => void
}

export function getCreatorColumns({
  onViewProfile,
  onEditCreator,
  onResendInvitation,
  onAdjustPoints,
}: CreatorColumnsProps): ColumnDef<User>[] {
  return [
    {
      accessorKey: "fullName",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Creator <CaretSortIcon className="ml-2 h-4 w-4" />
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
      accessorKey: "points",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Total Points <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const points = row.original.points
        return <div className="font-medium">{points.toLocaleString()}</div>
      },
    },
    {
      accessorKey: "socialMedia",
      header: "Social Media",
      cell: ({ row }) => {
        const creator = row.original
        const igUsername = creator.instagramUsername
        const ttUsername = creator.tiktokUsername
        return (
          <div className="flex flex-col space-y-1 text-xs">
            {igUsername && (
              <a
                href={`https://instagram.com/${igUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <Instagram className="h-3.5 w-3.5" />
                {igUsername}
              </a>
            )}
            {ttUsername && (
              <a
                href={`https://tiktok.com/@${ttUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <TikTokIcon className="h-3.5 w-3.5" />
                {ttUsername}
              </a>
            )}
            {!igUsername && !ttUsername && <span className="text-muted-foreground">N/A</span>}
          </div>
        )
      },
    },
    {
      id: "actions",
      header: () => <div className="">Actions</div>,
      cell: ({ row }) => {
        const creator = row.original
        return (
          <div className="flex items-center justify-start gap-0.5">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => onViewProfile(creator)}>
                    <UserIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Profile</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => onEditCreator(creator)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit Creator</p>
                </TooltipContent>
              </Tooltip>
              {creator.invitationStatus === "Pending Invitation" && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => onResendInvitation(creator)}>
                      <Mail className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Resend Invitation</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {creator.invitationStatus === "Accepted" && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => onAdjustPoints(creator)}>
                      <Coins className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Adjust Points</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </TooltipProvider>
          </div>
        )
      },
    },
  ]
}
