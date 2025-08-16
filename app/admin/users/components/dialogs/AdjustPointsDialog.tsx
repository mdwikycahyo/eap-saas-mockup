"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { User } from "../../types/user"

interface AdjustPointsDialogProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  user: User | null
  onPointsAdjusted: (userId: string, newPoints: number) => void
}

export function AdjustPointsDialog({ isOpen, onOpenChange, user, onPointsAdjusted }: AdjustPointsDialogProps) {
  const [pointsToAdjust, setPointsToAdjust] = useState(100)
  const [action, setAction] = useState<"add" | "remove">("add")
  const [reason, setReason] = useState("")

  useEffect(() => {
    if (isOpen) {
      setPointsToAdjust(100)
      setAction("add")
      setReason("")
    }
  }, [isOpen])

  const handleSubmit = () => {
    if (!user) return
    const currentPoints = user.points || 0
    let newPoints = action === "add" ? currentPoints + pointsToAdjust : currentPoints - pointsToAdjust
    if (newPoints < 0) newPoints = 0

    onPointsAdjusted(user.id, newPoints)
    toast({
      title: "Points Adjusted",
      description: `${pointsToAdjust} points ${action === "add" ? "added to" : "removed from"} ${user.fullName}. New balance: ${newPoints}. Reason: ${reason || "N/A"}`,
    })
    onOpenChange(false)
  }

  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adjust Points</DialogTitle>
          <DialogDescription>
            For {user.fullName} (Current: {user.points.toLocaleString()} points)
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="points-adjust">Points</Label>
              <Input
                id="points-adjust"
                type="number"
                value={pointsToAdjust}
                onChange={(e) => setPointsToAdjust(Math.max(0, Number.parseInt(e.target.value) || 0))}
              />
            </div>
            <div>
              <Label htmlFor="action-adjust">Action</Label>
              <Select value={action} onValueChange={(value: "add" | "remove") => setAction(value)}>
                <SelectTrigger id="action-adjust">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add Points</SelectItem>
                  <SelectItem value="remove">Remove Points</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="reason-adjust">Reason (Optional)</Label>
            <Input
              id="reason-adjust"
              placeholder="Reason for adjustment"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-gray-800 hover:bg-gray-600 text-white" onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
