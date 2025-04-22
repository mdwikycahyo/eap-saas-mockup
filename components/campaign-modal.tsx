"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, FileText, Instagram, Share2 } from "lucide-react"
import { TikTokIcon } from "./tik-tok-icon"
import { CampaignStatusBadge } from "./campaign-status-badge"

// Mock campaign data - in a real app, this would come from an API
const campaignData = {
  "summer-launch": {
    title: "Summer Product Launch",
    description: "Share our new summer collection with your followers and highlight your favorite products.",
    fullDescription:
      "Our summer collection is here! We're looking for creators to share our new products with their followers. Choose your favorite items from the collection and create authentic content that showcases how they fit into your lifestyle.",
    type: "Quick Share",
    status: "Submitted",
    platforms: ["Instagram"],
    timeRemaining: "5 days",
    points: 250,
    requirements: [
      "Post must include product from our summer collection",
      "Include hashtag #SummerVibes",
      "Tag our brand account @brandname",
    ],
    assets: [
      { name: "Product Catalog", type: "PDF" },
      { name: "Brand Guidelines", type: "PDF" },
      { name: "Product Images", type: "ZIP" },
    ],
    submissionDate: "June 15, 2023",
  },
  "brand-challenge": {
    title: "Brand Challenge",
    description: "Create a video using our branded hashtag and show how you use our products in your daily life.",
    fullDescription:
      "We're challenging creators to show how our products fit into their daily routines. Create an engaging video that demonstrates the benefits of our products in a creative way.",
    type: "Creative Challenge",
    status: "Joined",
    platforms: ["TikTok"],
    timeRemaining: "12 days",
    points: 350,
    requirements: ["Video must be 15-60 seconds long", "Include hashtag #BrandChallenge", "Demonstrate product usage"],
    assets: [
      { name: "Challenge Brief", type: "PDF" },
      { name: "Brand Guidelines", type: "PDF" },
      { name: "Music Options", type: "MP3" },
    ],
    submissionDate: null,
  },
  "customer-stories": {
    title: "Customer Stories",
    description: "Share testimonials from happy customers and highlight how our products have made a difference.",
    fullDescription:
      "Help us showcase the real impact our products have on people's lives. Share authentic testimonials from customers who have experienced positive results with our products.",
    type: "Quick Share",
    status: "Live",
    platforms: ["Instagram", "TikTok"],
    timeRemaining: "8 days",
    points: 300,
    requirements: [
      "Include at least one customer testimonial",
      "Show before/after if applicable",
      "Include hashtag #RealResults",
    ],
    assets: [
      { name: "Testimonial Collection", type: "PDF" },
      { name: "Brand Guidelines", type: "PDF" },
    ],
    submissionDate: "June 10, 2023",
    publishedUrl: "https://www.instagram.com/p/ABC123",
  },
}

export function CampaignModal() {
  const [open, setOpen] = useState(false)
  const [campaignSlug, setCampaignSlug] = useState<string | null>(null)
  const campaign = campaignSlug ? campaignData[campaignSlug as keyof typeof campaignData] : null

  useEffect(() => {
    const handleOpenModal = (event: Event) => {
      const customEvent = event as CustomEvent
      const slug = customEvent.detail
      setCampaignSlug(slug)
      setOpen(true)
    }

    window.addEventListener("open-campaign-modal", handleOpenModal as EventListener)
    return () => {
      window.removeEventListener("open-campaign-modal", handleOpenModal as EventListener)
    }
  }, [])

  if (!campaign) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpen(false)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-xl">{campaign.title}</DialogTitle>
          </div>
          <DialogDescription>{campaign.description}</DialogDescription>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">{campaign.type}</Badge>
            <CampaignStatusBadge status={campaign.status} />
            {campaign.platforms.map((platform) => (
              <Badge key={platform} variant="outline">
                {platform === "Instagram" ? (
                  <Instagram className="h-3 w-3 mr-1" />
                ) : (
                  <TikTokIcon className="h-3 w-3 mr-1" />
                )}
                {platform}
              </Badge>
            ))}
          </div>
        </DialogHeader>

        <Tabs defaultValue="details">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="submission">Submission</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="space-y-4">
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <h3 className="font-medium">Campaign Description</h3>
                  <p className="text-sm text-muted-foreground">{campaign.fullDescription}</p>
                </div>

                <div className="grid gap-2">
                  <h3 className="font-medium">Requirements</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    {campaign.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Points</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{campaign.points}</span>
                      <span className="text-muted-foreground">points upon approval</span>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Timeline</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Ends in {campaign.timeRemaining}</span>
                      </div>
                      {campaign.submissionDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Submitted on {campaign.submissionDate}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="assets">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Download these assets to help you create your content for this campaign.
              </p>
              <div className="grid gap-2">
                {campaign.assets.map((asset, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{asset.name}</p>
                          <p className="text-xs text-muted-foreground">{asset.type} file</p>
                        </div>
                      </div>
                      <Button size="sm">Download</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="submission">
            <div className="space-y-4">
              {campaign.status === "Live" ? (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Content Published</CardTitle>
                      <CardDescription>Your content is live and being tracked</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-4">
                        <Share2 className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={campaign.publishedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {campaign.publishedUrl}
                        </a>
                      </div>
                      <Button variant="outline" className="w-full">
                        Update Published URL
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ) : campaign.status === "Submitted" ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Submission Under Review</h3>
                  <p className="text-muted-foreground mb-4">
                    Your content has been submitted and is currently being reviewed by the brand.
                  </p>
                  <Button variant="outline">View Submission</Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium mb-2">Ready to Submit?</h3>
                  <p className="text-muted-foreground mb-4">
                    Create and submit your content for this campaign to earn points.
                  </p>
                  <Button>Create Content</Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
