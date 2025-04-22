"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Instagram } from "lucide-react"
import { TikTokIcon } from "@/components/tik-tok-icon"
import { PointsBalance } from "@/components/points-balance"

// Define campaign data outside the component to avoid re-creation on each render
const campaigns = [
  { value: "summer-launch", label: "Summer Product Launch" },
  { value: "brand-challenge", label: "Brand Challenge" },
  { value: "customer-stories", label: "Customer Stories" },
  { value: "sustainability", label: "Sustainability Initiative" },
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
          <CardDescription>Create and submit content for your selected campaign</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="campaign">Select Campaign</Label>
              <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                <SelectTrigger id="campaign">
                  <SelectValue placeholder="Select a campaign" />
                </SelectTrigger>
                <SelectContent>
                  {campaigns.map((campaign) => (
                    <SelectItem key={campaign.value} value={campaign.value}>
                      {campaign.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Platform</Label>
              <Tabs defaultValue={platform} onValueChange={setPlatform} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="instagram" className="flex items-center gap-2">
                    <Instagram className="h-4 w-4" /> Instagram
                  </TabsTrigger>
                  <TabsTrigger value="tiktok" className="flex items-center gap-2">
                    <TikTokIcon className="h-4 w-4" /> TikTok
                  </TabsTrigger>
                </TabsList>
              </Tabs>
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

            <Button type="submit" className="w-full">
              Submit Content
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
