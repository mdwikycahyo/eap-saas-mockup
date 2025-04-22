"use client"

import type React from "react"

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
import { Label } from "@/components/ui/label"
import { AlertCircle, Upload } from "lucide-react"

interface ResubmitModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (imageUrl: string) => void
  campaign: string
  feedback?: string
}

export function ResubmitModal({ isOpen, onClose, onSubmit, campaign, feedback }: ResubmitModalProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState("")

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file")
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB")
      return
    }

    setFile(file)
    setError("")

    // Create preview URL
    const reader = new FileReader()
    reader.onload = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    if (!file) {
      setError("Please upload an image")
      return
    }

    // In a real app, we would upload the file to a server here
    // For now, we'll just use the preview URL
    if (previewUrl) {
      onSubmit(previewUrl)
    }
  }

  const handleClose = () => {
    setFile(null)
    setPreviewUrl(null)
    setError("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Resubmit Content</DialogTitle>
          <DialogDescription>Upload new content for the campaign "{campaign}"</DialogDescription>
        </DialogHeader>

        {feedback && (
          <div className="p-3 bg-red-50 text-red-800 rounded-md text-sm mb-4">
            <p className="font-medium">Previous Feedback:</p>
            <p>{feedback}</p>
          </div>
        )}

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="image">Upload Image</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary"
              } ${error ? "border-red-500" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              {previewUrl ? (
                <div className="relative">
                  <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="max-h-48 mx-auto rounded-md" />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      setFile(null)
                      setPreviewUrl(null)
                    }}
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Click to upload</span> or drag and drop
                  </div>
                  <p className="text-xs text-muted-foreground">PNG, JPG or JPEG (max 5MB)</p>
                </div>
              )}
              <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>
            {error && (
              <div className="flex items-center gap-1 mt-1 text-xs text-red-500">
                <AlertCircle className="h-3 w-3" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!file}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
