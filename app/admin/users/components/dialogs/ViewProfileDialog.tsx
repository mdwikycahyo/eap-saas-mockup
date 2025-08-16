"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { User, CampaignParticipation, PointHistoryEntry } from "../../types/user"

interface ViewProfileDialogProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  user: User | null
}

export function ViewProfileDialog({ isOpen, onOpenChange, user }: ViewProfileDialogProps) {
  if (!user) return null

  // Only show campaign participation and point history for accepted users
  const mockCampaigns: CampaignParticipation[] =
    user.invitationStatus === "Accepted"
      ? user.campaignsParticipated || [
          {
            id: "1",
            campaignName: "Summer Sale UGC",
            status: "Completed",
            pointsEarned: 250,
            submissionDate: "2025-05-15",
          },
          {
            id: "2",
            campaignName: "New Feature TikTok Challenge",
            status: "Active",
            pointsEarned: 0,
            submissionDate: "2025-06-01",
          },
        ]
      : []

  const mockPointHistory: PointHistoryEntry[] =
    user.invitationStatus === "Accepted"
      ? user.pointHistory || [
          {
            id: "h1",
            date: "2025-05-16",
            description: "Points for Summer Sale UGC",
            points: 250,
            balance: user.points || 250,
          },
          {
            id: "h2",
            date: "2025-04-10",
            description: "Welcome Bonus",
            points: 100,
            balance: (user.points || 250) - 150,
          },
        ]
      : []

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>Details for {user.fullName}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold">{user.fullName}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground">{user.phoneNumber}</p>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <span className="font-medium">Role:</span> {user.role}
              </div>
              <div>
                <span className="font-medium">Invitation:</span>{" "}
                <Badge
                  variant={user.invitationStatus === "Accepted" ? "default" : "outline"}
                  className={
                    user.invitationStatus === "Pending Invitation"
                      ? "border-amber-500 text-amber-600 bg-amber-50"
                      : "bg-green-100 text-green-700"
                  }
                >
                  {user.invitationStatus}
                </Badge>
              </div>
              <div>
                <span className="font-medium">Province:</span> {user.province}
              </div>
              <div>
                <span className="font-medium">City:</span> {user.city}
              </div>
              {user.role === "Creator" && (
                <>
                  <div>
                    <span className="font-medium">Points:</span> {user.points?.toLocaleString() || 0}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {user.role === "Creator" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Participation</CardTitle>
                </CardHeader>
                <CardContent>
                  {user.invitationStatus === "Pending Invitation" ? (
                    <p className="text-sm text-muted-foreground">
                      No campaign participation data available. User has not accepted invitation yet.
                    </p>
                  ) : mockCampaigns.length > 0 ? (
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {mockCampaigns.map((campaign) => (
                        <div key={campaign.id} className="p-3 border rounded-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-medium">{campaign.campaignName}</h5>
                              <p className="text-xs text-muted-foreground">
                                Submitted on {new Date(campaign.submissionDate).toLocaleDateString("en-GB")}
                              </p>
                            </div>
                            <Badge
                              variant={
                                campaign.status === "Active"
                                  ? "default"
                                  : campaign.status === "Completed"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {campaign.status}
                            </Badge>
                          </div>
                          <div className="mt-1 text-sm">
                            <p>
                              {campaign.pointsEarned > 0
                                ? `${campaign.pointsEarned} points earned`
                                : "Awaiting review/points"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No campaign participation data.</p>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Point History</CardTitle>
                </CardHeader>
                <CardContent className="max-h-60 overflow-y-auto">
                  {user.invitationStatus === "Pending Invitation" ? (
                    <p className="text-sm text-muted-foreground">
                      No point history available. User has not accepted invitation yet.
                    </p>
                  ) : mockPointHistory.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Points</TableHead>
                          <TableHead className="text-right">Balance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockPointHistory.map((entry) => (
                          <TableRow key={entry.id}>
                            <TableCell className="text-xs">
                              {new Date(entry.date).toLocaleDateString("en-GB")}
                            </TableCell>
                            <TableCell>{entry.description}</TableCell>
                            <TableCell
                              className={`text-right font-medium ${entry.points >= 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {entry.points >= 0 ? `+${entry.points}` : entry.points}
                            </TableCell>
                            <TableCell className="text-right">{entry.balance.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-sm text-muted-foreground">No point history data.</p>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
