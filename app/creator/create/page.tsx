"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Instagram, Check, Clock } from "lucide-react"
import { TikTokIcon } from "@/components/tik-tok-icon"
import { PointsBalance } from "@/components/points-balance"
import { Badge } from "@/components/ui/badge"

// Define campaign data outside the component to avoid re-creation on each render
const campaigns = [
  {
    value: "brand-challenge",
    label: "Brand Challenge",
    description: "Create a video using our hashtag #BrandChallenge",
    type: "Creative Challenge",
    platform: "tiktok",
    image: "/placeholder.svg?height=300&width=600&text=Brand+Challenge",
    timeRemaining: 12,
    points: 250,
  },
  {
    value: "sustainability",
    label: "Sustainability Initiative",
    description: "Showcase our commitment to sustainability",
    type: "Creative Challenge",
    platform: "instagram",
    image: "/placeholder.svg?height=300&width=600&text=Sustainability",
    timeRemaining: 15,
    points: 200,
  },
]

export default function CreateContentPage() {
  const [selectedCampaign, setSelectedCampaign] = useState("")
  const [platform, setPlatform] = useState("instagram")
  const [caption, setCaption] = useState("")
  const [files, setFiles] = useState<FileList | null>(null)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  // Get URL parameters only once on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const campaignParam = params.get("campaign")
    if (campaignParam) {
      setSelectedCampaign(campaignParam)
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(e.target.files)

      // Create preview URLs
      const urls = []
      for (let i = 0; i < e.target.files.length; i++) {
        urls.push(URL.createObjectURL(e.target.files[i]))
      }
      setPreviewUrls(urls)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({ selectedCampaign, platform, caption, files })
    // In a real app, you would upload the files and submit the form data
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create Content</h1>
          <p className="text-muted-foreground">Submit content for your campaigns</p>
        </div>
        <PointsBalance points={3250} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Submission</CardTitle>
          <CardDescription>Create and submit content for your selected Creative Challenge campaign.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="campaign">Select Campaign</Label>
              <div className="h-[400px] overflow-y-auto pr-2">
                <div className="grid grid-cols-2 gap-4">
                  {campaigns.map((campaign) => (
                    <div
                      key={campaign.value}
                      className={`
                        relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all
                        ${
                          selectedCampaign === campaign.value
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-border hover:border-primary/50"
                        }
                      `}
                      onClick={() => setSelectedCampaign(campaign.value)}
                    >
                      {selectedCampaign === campaign.value && (
                        <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1 z-10">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                      <div className="relative aspect-[16/9]">
                        <img
                          src={campaign.image || "/placeholder.svg"}
                          alt={campaign.label}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge
                            variant={campaign.type === "Quick Share" ? "secondary" : "outline"}
                            className={
                              campaign.type === "Quick Share" ? "" : "bg-violet-50 text-violet-600 border-violet-200"
                            }
                          >
                            {campaign.type}
                          </Badge>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                          <h3 className="font-medium text-white">{campaign.label}</h3>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{campaign.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{campaign.timeRemaining} days left</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="caption">Caption</Label>
              <Textarea
                id="caption"
                placeholder="Write your caption here..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="media">Upload Media</Label>
              <div className="border-2 border-dashed rounded-md p-6 text-center">
                <input
                  type="file"
                  id="media"
                  className="hidden"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileChange}
                />
                <Label htmlFor="media" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</span>
                    <Button type="button" variant="secondary" size="sm">
                      Select Files
                    </Button>
                  </div>
                </Label>
              </div>
            </div>

            {previewUrls.length > 0 && (
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="aspect-square rounded-md overflow-hidden bg-slate-100">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={!selectedCampaign || !caption || !files}>
              Submit Content
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
