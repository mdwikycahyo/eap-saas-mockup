"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, ExternalLink } from "lucide-react"

interface EngagementData {
  views: string
  likes: string
  comments: string
}

interface PostData {
  id: number
  creator: string
  postUrl: string
  company: string
  campaign: string
  lastChecked: string
  checkedToday: boolean
  engagement: EngagementData
}

interface EngagementManagementPanelProps {
  isOpen: boolean
  onClose: () => void
  postData: PostData | null
  onSave: (id: number, newEngagement: EngagementData) => void
}

export function EngagementManagementPanel({
  isOpen,
  onClose,
  postData,
  onSave,
}: EngagementManagementPanelProps) {
  const [formData, setFormData] = useState<EngagementData>({
    views: "",
    likes: "",
    comments: "",
  })

  const [originalData, setOriginalData] = useState<EngagementData>({
    views: "",
    likes: "",
    comments: "",
  })

  // Update form data when postData changes
  useEffect(() => {
    if (postData) {
      const cleanEngagement = {
        views: postData.engagement.views.replace(/[KMkm,]/g, '').replace(/\./g, ''),
        likes: postData.engagement.likes.replace(/[KMkm,]/g, '').replace(/\./g, ''),
        comments: postData.engagement.comments.replace(/[KMkm,]/g, '').replace(/\./g, ''),
      }
      
      // Convert K/M suffixes to actual numbers
      const convertToNumber = (value: string, originalValue: string) => {
        const numValue = parseFloat(value)
        if (originalValue.toLowerCase().includes('k')) {
          return (numValue * 1000).toString()
        }
        if (originalValue.toLowerCase().includes('m')) {
          return (numValue * 1000000).toString()
        }
        return numValue.toString()
      }

      const engagement = {
        views: convertToNumber(cleanEngagement.views, postData.engagement.views),
        likes: convertToNumber(cleanEngagement.likes, postData.engagement.likes),
        comments: convertToNumber(cleanEngagement.comments, postData.engagement.comments),
      }

      setFormData(engagement)
      setOriginalData(engagement)
    }
  }, [postData])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  const handleInputChange = (field: keyof EngagementData, value: string) => {
    // Only allow numeric input
    const numericValue = value.replace(/[^0-9]/g, '')
    setFormData(prev => ({
      ...prev,
      [field]: numericValue
    }))
  }

  const handleSave = () => {
    if (postData) {
      // Convert back to display format (with K/M suffixes)
      const formatNumber = (num: string) => {
        const value = parseInt(num)
        if (value >= 1000000) {
          return `${(value / 1000000).toFixed(1)}M`.replace('.0', '')
        }
        if (value >= 1000) {
          return `${(value / 1000).toFixed(1)}K`.replace('.0', '')
        }
        return value.toLocaleString()
      }

      const displayEngagement = {
        views: formatNumber(formData.views),
        likes: formatNumber(formData.likes),
        comments: formatNumber(formData.comments),
      }

      onSave(postData.id, displayEngagement)
      onClose()
    }
  }

  const handleReset = () => {
    setFormData(originalData)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleNewTab = () => {
    if (postData) {
      window.open(`https://${postData.postUrl}`, '_blank')
    }
  }

  if (!isOpen || !postData) return null

  return (
    <div
      className="fixed inset-0 z-50 flex"
      onClick={handleBackdropClick}
      style={{ margin: 0, padding: 0 }}
    >
      {/* Backdrop */}
      <div className="flex-1 bg-black/20" />
      
      {/* Panel */}
      <div className="w-[45%] h-screen bg-white shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="border-b p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Avatar placeholder */}
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm font-medium">
                  {postData.creator.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h2 className="font-semibold text-lg">{postData.creator}</h2>
                <p className="text-sm text-muted-foreground">{postData.company}</p>
                <p className="text-sm text-blue-600 font-medium">{postData.campaign}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Post URL and New Tab button */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-muted-foreground flex-1 truncate">
              https://{postData.postUrl}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNewTab}
              className="shrink-0"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              New Tab
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-6">Edit Engagement</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="views" className="text-base text-muted-foreground">
                  Views
                </Label>
                <Input
                  id="views"
                  type="text"
                  value={formData.views}
                  onChange={(e) => handleInputChange('views', e.target.value)}
                  className="mt-2"
                  placeholder="120000"
                />
              </div>

              <div>
                <Label htmlFor="likes" className="text-base text-muted-foreground">
                  Likes
                </Label>
                <Input
                  id="likes"
                  type="text"
                  value={formData.likes}
                  onChange={(e) => handleInputChange('likes', e.target.value)}
                  className="mt-2"
                  placeholder="25000"
                />
              </div>

              <div>
                <Label htmlFor="comments" className="text-base text-muted-foreground">
                  Comments
                </Label>
                <Input
                  id="comments"
                  type="text"
                  value={formData.comments}
                  onChange={(e) => handleInputChange('comments', e.target.value)}
                  className="mt-2"
                  placeholder="5300"
                />
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Supports raw numbers or suffixes: k, m. Values are rounded to whole numbers.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSave}
              className="bg-gray-800 hover:bg-gray-600 text-white"
            >
              Save
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
