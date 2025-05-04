"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Check, Clock, Copy, Download, FileText, Share2 } from "lucide-react"
import { CampaignStatusBadge } from "./campaign-status-badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"

// Mock campaign data - in a real app, this would come from an API
const campaignData = {
  "summer-launch": {
    title: "Summer Product Launch",
    description: "Share our new summer collection with your followers and highlight your favorite products.",
    fullDescription:
      "Our summer collection is here! We're looking for creators to share our new products with their followers. Choose your favorite items from the collection and create authentic content that showcases how they fit into your lifestyle.",
    type: "Quick Share",
    status: "Submitted URL Required",
    platforms: ["Instagram"],
    timeRemaining: "5 days",
    points: 250,
    requirements: [
      "Post must include product from our summer collection",
      "Include hashtag #SummerVibes",
      "Tag our brand account @brandname",
    ],
    assets: [
      {
        name: "Summer Collection Image 1",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800",
        caption:
          "Check out our new summer collection! Perfect for those sunny days ahead. #SummerVibes #BrandCampaign @brandname [Creator: @yourhandle]",
      },
      {
        name: "Summer Collection Video",
        type: "VIDEO",
        url: "/placeholder.svg?height=600&width=800",
        caption:
          "Excited to share this amazing summer collection with you all! The colors are vibrant and the quality is amazing. #SummerVibes #BrandCampaign @brandname [Creator: @yourhandle]",
      },
    ],
    submissionDate: "June 15, 2023",
  },
  "brand-challenge": {
    title: "Brand Challenge",
    description: "Create a video using our branded hashtag and show how you use our products in your daily life.",
    fullDescription:
      "We're challenging creators to show how our products fit into their daily routines. Create an engaging video that demonstrates the benefits of our products in a creative way.",
    type: "Creative Challenge",
    status: "Content Required",
    platforms: ["TikTok"],
    timeRemaining: "12 days",
    points: 350,
    requirements: ["Video must be 15-60 seconds long", "Include hashtag #BrandChallenge", "Demonstrate product usage"],
    assets: [{ name: "Challenge Brief", type: "PDF", url: "#" }],
    textBrief:
      "Create a 15-60 second video showing how our product fits into your daily routine. Focus on the benefits and unique features. Make sure to include our hashtag #BrandChallenge and tag our account @brandname.",
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
      {
        name: "Customer Testimonial Image",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800",
        caption:
          "Hear what our customers are saying! 'This product changed my life!' - Jane D. #RealResults #CustomerStories @brandname [Creator: @yourhandle]",
      },
    ],
    submissionDate: "June 10, 2023",
    publishedUrl: "https://www.instagram.com/p/ABC123",
  },
  sustainability: {
    title: "Sustainability Initiative",
    description: "Share our commitment to sustainability",
    fullDescription: "Help us spread the word about our sustainability initiatives and eco-friendly products.",
    type: "Quick Share",
    status: "Available",
    platforms: ["Instagram"],
    timeRemaining: "15 days",
    points: 200,
    requirements: ["Include hashtag #GreenLiving", "Tag our brand account @brandname"],
    assets: [
      {
        name: "Sustainability Image",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800",
        caption:
          "Proud to partner with a brand that cares about our planet! Check out these eco-friendly products. #GreenLiving #SustainableFuture @brandname [Creator: @yourhandle]",
      },
    ],
  },
  "product-tutorial": {
    title: "Product Tutorial",
    description: "Create a tutorial showing how to use our products",
    fullDescription: "We're looking for creative tutorials that showcase the versatility of our products.",
    type: "Creative Challenge",
    status: "Available",
    platforms: ["TikTok"],
    timeRemaining: "10 days",
    points: 300,
    requirements: ["Video must be 30-90 seconds long", "Include hashtag #HowToUse", "Demonstrate at least 3 features"],
    assets: [{ name: "Tutorial Brief", type: "PDF", url: "#" }],
    textBrief:
      "Create a 30-90 second tutorial video showing how to use our product effectively. Highlight at least 3 key features and provide tips for beginners. Include hashtag #HowToUse and tag our account @brandname.",
  },
}

export function CampaignModal() {
  const [open, setOpen] = useState(false)
  const [campaignSlug, setCampaignSlug] = useState<string | null>(null)
  const campaign = campaignSlug ? campaignData[campaignSlug as keyof typeof campaignData] : null
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

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

  const isQuickShare = campaign.type === "Quick Share"

  const handleCopyCaption = (caption: string, index: number) => {
    navigator.clipboard.writeText(caption)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const getStatusDisplay = () => {
    if (isQuickShare) {
      switch (campaign.status) {
        case "Available":
          return "Available"
        case "Submitted URL Required":
          return "Submitted URL Required"
        case "Live":
          return "Live"
        default:
          return campaign.status
      }
    } else {
      switch (campaign.status) {
        case "Available":
          return "Available"
        case "Content Required":
          return "Content Required"
        case "Under Review":
          return "Under Review"
        case "Live":
          return "Live"
        default:
          return campaign.status
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <DialogTitle className="text-xl">{campaign.title}</DialogTitle>
          </div>
          <DialogDescription>{campaign.description}</DialogDescription>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge
              variant={isQuickShare ? "secondary" : "outline"}
              className={isQuickShare ? "" : "bg-violet-50 text-violet-600 border-violet-200"}
            >
              {campaign.type}
            </Badge>
            <CampaignStatusBadge status={getStatusDisplay()} />
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
              <Alert className={isQuickShare ? "bg-blue-50 border-blue-200" : "bg-violet-50 border-violet-200"}>
                <FileText className={isQuickShare ? "text-blue-600" : "text-violet-600"} />
                <AlertTitle className="text-sm font-medium">
                  {isQuickShare ? "Quick Share Campaign" : "Creative Challenge Campaign"}
                </AlertTitle>
                <AlertDescription className="text-sm">
                  {isQuickShare
                    ? "This is a brand-generated content campaign. Download assets and publish directly to your social media with the provided caption and hashtags."
                    : "This is a creator-generated content campaign. Create your own content based on the brief and submit for approval before publishing."}
                </AlertDescription>
              </Alert>

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
                {isQuickShare
                  ? "Download these assets to publish on your social media accounts. They include ready-to-use content and captions."
                  : "Download these assets to help you create your content for this campaign."}
              </p>

              {isQuickShare ? (
                // Quick Share assets with images/videos and captions
                <div className="space-y-6">
                  {campaign.assets.map((asset, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="aspect-video bg-slate-100 relative">
                        <img
                          src={asset.url || "/placeholder.svg"}
                          alt={asset.name}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-2 right-2">{asset.type}</Badge>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{asset.name}</h3>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" /> Download
                          </Button>
                        </div>

                        <div className="mt-4 space-y-2">
                          <h4 className="text-sm font-medium">Caption</h4>
                          <div className="relative">
                            <Textarea readOnly value={asset.caption} className="min-h-[80px] text-sm pr-10" />
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute top-2 right-2 h-8 w-8 p-0"
                              onClick={() => handleCopyCaption(asset.caption, index)}
                            >
                              {copiedIndex === index ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                          {copiedIndex === index && (
                            <p className="text-xs text-green-600">Caption copied to clipboard!</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                // Creative Challenge assets with PDF and text brief
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{campaign.assets[0].name}</p>
                          <p className="text-xs text-muted-foreground">{campaign.assets[0].type} file</p>
                        </div>
                      </div>
                      <Button size="sm">Download</Button>
                    </CardContent>
                  </Card>

                  {campaign.textBrief && (
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Campaign Brief</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{campaign.textBrief}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="submission">
            <div className="space-y-4">
              {isQuickShare ? (
                // Quick Share workflow - no approval needed
                campaign.status === "Live" ? (
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
                ) : campaign.status === "Submitted URL Required" ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                      <Share2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">URL Submission Required</h3>
                    <p className="text-muted-foreground mb-4">
                      You've joined this campaign. Now publish the content to your social media and submit the URL to
                      earn points.
                    </p>
                    <Button>Submit URL</Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                      <Download className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Ready to Publish</h3>
                    <p className="text-muted-foreground mb-4">
                      Download the assets, publish to your social media, and submit the URL to earn points.
                    </p>
                    <div className="flex flex-col gap-2 items-center">
                      <Button>Download Assets</Button>
                      <Button variant="outline">Submit Published URL</Button>
                    </div>
                  </div>
                )
              ) : // Creative Challenge workflow - requires approval
              campaign.status === "Live" ? (
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
              ) : campaign.status === "Under Review" ? (
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
              ) : campaign.status === "Content Required" ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-violet-100 mb-4">
                    <FileText className="h-6 w-6 text-violet-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Content Required</h3>
                  <p className="text-muted-foreground mb-4">
                    You've joined this campaign. Now create content based on the brief and submit for approval.
                  </p>
                  <Button>Create Content</Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium mb-2">Ready to Submit?</h3>
                  <p className="text-muted-foreground mb-4">
                    Create content based on the brief and submit for approval before publishing.
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
