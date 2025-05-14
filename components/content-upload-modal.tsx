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
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Upload, FileVideo } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ContentUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { imageUrl: string; caption: string }) => void
  campaign: string
}

export function ContentUploadModal({ isOpen, onClose, onSubmit, campaign }: ContentUploadModalProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [caption, setCaption] = useState("")
  const [error, setError] = useState("")
  const [contentType, setContentType] = useState<"image" | "video">("image")

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
    // Check if file is an image or video based on the selected content type
    if (contentType === "image" && !file.type.startsWith("image/")) {
      setError("Please upload an image file")
      return
    }

    if (contentType === "video" && !file.type.startsWith("video/")) {
      setError("Please upload a video file")
      return
    }

    // Check file size (max 10MB for images, 50MB for videos)
    const maxSize = contentType === "image" ? 10 * 1024 * 1024 : 50 * 1024 * 1024
    if (file.size > maxSize) {
      setError(`File size should be less than ${contentType === "image" ? "10MB" : "50MB"}`)
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
      setError(`Please upload ${contentType === "image" ? "an image" : "a video"}`)
      return
    }

    if (!caption.trim()) {
      setError("Please enter a caption")
      return
    }

    // In a real app, we would upload the file to a server here
    // For now, we'll just use the preview URL
    if (previewUrl) {
      onSubmit({ imageUrl: previewUrl, caption })
    }
  }

  const handleClose = () => {
    setFile(null)
    setPreviewUrl(null)
    setCaption("")
    setError("")
    setContentType("image")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Submit Content</DialogTitle>
          <DialogDescription>Upload content for the campaign "{campaign}"</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Tabs defaultValue="image" onValueChange={(value) => setContentType(value as "image" | "video")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="image">Image</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid gap-2">
            <Label htmlFor="file-upload">Upload {contentType === "image" ? "Image" : "Video"}</Label>
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
                  {contentType === "image" ? (
                    <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="max-h-48 mx-auto rounded-md" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <FileVideo className="h-12 w-12 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Video selected</p>
                      <p className="text-xs text-muted-foreground mt-1">{file?.name}</p>
                    </div>
                  )}
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
                  <p className="text-xs text-muted-foreground">
                    {contentType === "image" ? "PNG, JPG or JPEG (max 10MB)" : "MP4, MOV or WebM (max 50MB)"}
                  </p>
                </div>
              )}
              <input
                id="file-upload"
                type="file"
                accept={contentType === "image" ? "image/*" : "video/*"}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              placeholder="Write a caption for your content..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              Include relevant hashtags and mentions to increase engagement.
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-1 mt-1 text-xs text-red-500">
              <AlertCircle className="h-3 w-3" />
              <span>{error}</span>
            </div>
          )}
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
