"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"

interface SubmitUrlModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (url: string) => void
  campaign: string
}

export function SubmitUrlModal({ isOpen, onClose, onSubmit, campaign }: SubmitUrlModalProps) {
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = () => {
    // Simple URL validation
    if (!url) {
      setError("Please enter a URL")
      return
    }

    try {
      // Check if it's a valid URL
      new URL(url)

      // Check if it's an Instagram or TikTok URL
      if (!url.includes("instagram.com") && !url.includes("tiktok.com")) {
        setError("Please enter a valid Instagram or TikTok URL")
        return
      }

      onSubmit(url)
      setUrl("")
      setError("")
    } catch (e) {
      setError("Please enter a valid URL")
    }
  }

  const handleClose = () => {
    setUrl("")
    setError("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Submit Post URL</DialogTitle>
          <DialogDescription>Enter the URL of your published post for the campaign "{campaign}"</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              Post URL
            </Label>
            <div className="col-span-3">
              <Input
                id="url"
                placeholder="https://www.instagram.com/p/..."
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value)
                  setError("")
                }}
                className={error ? "border-red-500" : ""}
              />
              {error && (
                <div className="flex items-center gap-1 mt-1 text-xs text-red-500">
                  <AlertCircle className="h-3 w-3" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-4 text-sm text-muted-foreground">
            <p>Please ensure that:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>The content is published on your account</li>
              <li>The post is public and accessible</li>
              <li>The URL is correct and leads directly to your post</li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
