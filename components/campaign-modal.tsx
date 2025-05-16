"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Check,
  Clock,
  Copy,
  Download,
  FileText,
  Share2,
  Plus,
  Upload,
  ChevronLeft,
  ChevronRight,
  LinkIcon,
  Archive,
  AlertTriangle,
} from "lucide-react"
import { CampaignStatusBadge } from "./campaign-status-badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// Mock campaign data - in a real app, this would come from an API
const campaignData = {
  "summer-launch": {
    title: "Summer Product Launch",
    subtitle: "Share our new summer collection",
    description: "Share our new summer collection with your followers and highlight your favorite products.",
    fullDescription:
      "Our summer collection is here! We're looking for creators to share our new products with their followers. Choose your favorite items from the collection and create authentic content that showcases how they fit into your lifestyle.",
    type: "Quick Share",
    status: "URL Required",
    platforms: ["Instagram"],
    timeRemaining: "5 days",
    points: 10,
    assets: [
      {
        name: "Summer Collection Image 1",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800",
        caption:
          "Check out our new summer collection! Perfect for those sunny days ahead. #SummerVibes #BrandCampaign @brandname [Creator: @yourhandle]",
      },
      {
        name: "Summer Collection Image 2",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800&text=Summer+Collection+2",
        caption:
          "Check out our new summer collection! Perfect for those sunny days ahead. #SummerVibes #BrandCampaign @brandname [Creator: @yourhandle]",
      },
      {
        name: "Summer Collection Video",
        type: "VIDEO",
        url: "/placeholder.svg?height=600&width=800&text=Summer+Video",
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
    points: 10,
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
    points: 10,
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
    status: "URL Under Review",
    platforms: ["Instagram"],
    timeRemaining: "15 days",
    points: 10,
    assets: [
      {
        name: "Sustainability Image",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800",
        caption:
          "Proud to partner with a brand that cares about our planet! Check out these eco-friendly products. #GreenLiving #SustainableFuture @brandname [Creator: @yourhandle]",
      },
    ],
    submissionDate: "July 5, 2023",
    publishedUrl: "https://www.instagram.com/p/DEF456",
  },
  "product-tutorial": {
    title: "Product Tutorial",
    description: "Create a tutorial showing how to use our products",
    fullDescription: "We're looking for creative tutorials that showcase the versatility of our products.",
    type: "Creative Challenge",
    status: "Content Under Review",
    platforms: ["TikTok"],
    timeRemaining: "10 days",
    points: 10,
    submittedContent: {
      assets: [
        {
          name: "Tutorial Video",
          type: "VIDEO",
          url: "/placeholder.svg?height=600&width=800&text=Tutorial+Video",
        },
        {
          name: "Tutorial Image 1",
          type: "IMAGE",
          url: "/placeholder.svg?height=600&width=800&text=Tutorial+Image+1",
        },
        {
          name: "Tutorial Image 2",
          type: "IMAGE",
          url: "/placeholder.svg?height=600&width=800&text=Tutorial+Image+2",
        },
      ],
      caption:
        "Here's my tutorial on how to use our amazing products. I've highlighted the key features and provided some tips for beginners. #HowToUse #ProductTutorial @brandname",
    },
    submissionDate: "July 1, 2023",
    textBrief:
      "Create a tutorial video showing how to use our product effectively. Focus on the key features and provide helpful tips for beginners. Make sure to include our hashtag #ProductTutorial and tag our account @brandname.",
  },
  "winter-collection": {
    title: "Winter Collection Preview",
    description: "Be the first to showcase our winter collection",
    fullDescription:
      "Our winter collection is coming soon! We're looking for creators to preview our new products with their followers.",
    type: "Quick Share",
    status: "Available",
    platforms: ["Instagram"],
    timeRemaining: "14 days",
    points: 10,
    assets: [
      {
        name: "Winter Collection Image 1",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800",
        caption:
          "Sneak peek at the upcoming winter collection! Cozy and stylish for the cold months ahead. #WinterVibes #BrandCampaign @brandname [Creator: @yourhandle]",
      },
    ],
  },
  "product-review": {
    title: "Product Review Challenge",
    description: "Create an honest review of our flagship product",
    fullDescription:
      "We want your honest opinion! Create a review of our flagship product and share your experience with your followers.",
    type: "Creative Challenge",
    status: "Available",
    platforms: ["TikTok"],
    timeRemaining: "21 days",
    points: 10,
    assets: [{ name: "Review Brief", type: "PDF", url: "#" }],
    textBrief:
      "Create a 30-90 second review video of our flagship product. Share your honest opinion and highlight at least 3 key features. Include hashtag #HonestReview and tag our account @brandname.",
  },
  "holiday-special": {
    title: "Holiday Special",
    description: "Share how our products make holidays special",
    fullDescription:
      "The holiday season is approaching! Show how our products can make the holidays more special for everyone.",
    type: "Quick Share",
    status: "Available",
    platforms: ["Instagram"],
    timeRemaining: "30 days",
    points: 10,
    assets: [
      {
        name: "Holiday Special Image",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800",
        caption:
          "Make your holidays special with these amazing products! Perfect for gifting or treating yourself. #HolidaySpecial #BrandCampaign @brandname [Creator: @yourhandle]",
      },
    ],
  },
  "brand-ambassador": {
    title: "Brand Ambassador Program",
    description: "Show how you represent our brand in daily life",
    fullDescription:
      "As a brand ambassador, show how you incorporate our products into your daily life and represent our brand values.",
    type: "Creative Challenge",
    status: "URL Required",
    platforms: ["TikTok", "Instagram"],
    timeRemaining: "25 days",
    points: 10,
    submittedContent: {
      assets: [
        {
          name: "Ambassador Video",
          type: "VIDEO",
          url: "/placeholder.svg?height=600&width=800&text=Ambassador+Video",
        },
        {
          name: "Ambassador Image",
          type: "IMAGE",
          url: "/placeholder.svg?height=600&width=800&text=Ambassador+Image",
        },
      ],
      caption:
        "I'm proud to be a brand ambassador for this amazing company! Here's how I incorporate their products into my daily life. #BrandAmbassador #Lifestyle @brandname",
    },
    submissionDate: "July 3, 2023",
    textBrief:
      "Create content that showcases how you represent our brand in your daily life. Focus on authenticity and how our products integrate into your lifestyle. Include hashtag #BrandAmbassador and tag our account @brandname.",
  },
  "user-testimonial": {
    title: "User Testimonial",
    description: "Share your experience with our products",
    fullDescription:
      "We want to hear from you! Share your personal experience with our products and how they've impacted your life.",
    type: "Quick Share",
    status: "Available",
    platforms: ["Instagram"],
    timeRemaining: "18 days",
    points: 10,
    assets: [
      {
        name: "Testimonial Template",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800",
        caption:
          "My experience with these products has been amazing! Here's why I love them... #MyExperience #BrandCampaign @brandname [Creator: @yourhandle]",
      },
    ],
  },
  "fitness-challenge": {
    title: "Fitness Challenge",
    description: "Show how our products help with your fitness journey",
    fullDescription:
      "Demonstrate how our fitness products have helped you achieve your goals and maintain a healthy lifestyle.",
    type: "Creative Challenge",
    status: "Live",
    platforms: ["Instagram", "TikTok"],
    timeRemaining: "20 days",
    points: 10,
    submittedContent: {
      assets: [
        {
          name: "Fitness Video",
          type: "VIDEO",
          url: "/placeholder.svg?height=600&width=800&text=Fitness+Video",
        },
        {
          name: "Before/After Image",
          type: "IMAGE",
          url: "/placeholder.svg?height=600&width=800&text=Before+After+Image",
        },
      ],
      caption:
        "Check out how these amazing fitness products have transformed my workout routine! I've seen incredible results in just a few weeks. #FitnessJourney #HealthyLifestyle @brandname",
    },
    submissionDate: "June 25, 2023",
    publishedUrl: "https://www.instagram.com/p/GHI789",
    textBrief:
      "Create content that shows how our fitness products have helped with your fitness journey. Share your results and how the products have made a difference. Include hashtag #FitnessJourney and tag our account @brandname.",
  },
}

// Define the component function separately
function CampaignModal() {
  const [open, setOpen] = useState(false)
  const [campaignSlug, setCampaignSlug] = useState<string | null>(null)
  const campaign = campaignSlug ? campaignData[campaignSlug as keyof typeof campaignData] : null
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<"full" | "details-only">("full")
  const [caption, setCaption] = useState("")
  const [files, setFiles] = useState<FileList | null>(null)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [platform, setPlatform] = useState("")
  const [currentAssetIndex, setCurrentAssetIndex] = useState(0)
  const [postUrl, setPostUrl] = useState("")

  useEffect(() => {
    const handleOpenModal = (event: Event) => {
      const customEvent = event as CustomEvent
      const { slug, mode } = customEvent.detail
      setCampaignSlug(slug)
      setViewMode(mode || "full")
      setOpen(true)

      // Set platform based on campaign data
      if (campaignData[slug as keyof typeof campaignData]) {
        const campaignPlatforms = campaignData[slug as keyof typeof campaignData].platforms
        if (campaignPlatforms && campaignPlatforms.length > 0) {
          setPlatform(campaignPlatforms[0].toLowerCase())
        }
      }
    }

    window.addEventListener("open-campaign-modal", handleOpenModal as EventListener)
    return () => {
      window.removeEventListener("open-campaign-modal", handleOpenModal as EventListener)
    }
  }, [])

  useEffect(() => {
    // Reset state when modal closes
    if (!open) {
      setCaption("")
      setFiles(null)
      setPreviewUrls([])
      setPostUrl("")
      setCurrentAssetIndex(0)
    }
  }, [open])

  if (!campaign) return null

  const isQuickShare = campaign.type === "Quick Share"
  const isContentRequired = campaign.status === "Content Required"
  const isContentUnderReview = campaign.status === "Content Under Review"
  const isUrlRequired = campaign.status === "URL Required"
  const isUrlUnderReview = campaign.status === "URL Under Review"
  const isAvailable = campaign.status === "Available"
  const isLive = campaign.status === "Live"

  // In the handleCopyCaption function, add a check before accessing campaign.assets[0].caption
  const handleCopyCaption = (caption: string) => {
    navigator.clipboard.writeText(caption)
    setCopiedIndex(0)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

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

  const handleSubmitContent = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({ campaignSlug, platform, caption, files })
    // In a real app, you would upload the files and submit the form data
    setOpen(false)
  }

  const handleSubmitUrl = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle URL submission
    console.log({ campaignSlug, postUrl })
    // In a real app, you would submit the URL
    setOpen(false)
  }

  const handleDownloadAllAssets = () => {
    // In a real app, this would trigger a download of all assets as a zip file
    console.log("Downloading all assets as zip")
    alert("Downloading all assets as a zip file")
  }

  // In the nextAsset function, add proper checks
  const nextAsset = () => {
    if (campaign.assets && currentAssetIndex < campaign.assets.length - 1) {
      setCurrentAssetIndex(currentAssetIndex + 1)
    } else if (campaign.submittedContent?.assets && currentAssetIndex < campaign.submittedContent.assets.length - 1) {
      setCurrentAssetIndex(currentAssetIndex + 1)
    }
  }

  const prevAsset = () => {
    if (currentAssetIndex > 0) {
      setCurrentAssetIndex(currentAssetIndex - 1)
    }
  }

  const getStatusDisplay = () => {
    if (isQuickShare) {
      switch (campaign.status) {
        case "Available":
          return "Available"
        case "URL Required":
          return "URL Required"
        case "URL Under Review":
          return "URL Under Review"
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
        case "Content Under Review":
          return "Content Under Review"
        case "URL Required":
          return "URL Required"
        case "URL Under Review":
          return "URL Under Review"
        case "Live":
          return "Live"
        default:
          return campaign.status
      }
    }
  }

  // In the getCurrentAssets function, ensure we always return an array
  const getCurrentAssets = () => {
    if (campaign.submittedContent?.assets) {
      return campaign.submittedContent.assets
    }
    return campaign.assets || []
  }

  const currentAssets = getCurrentAssets()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <DialogTitle className="text-xl">{campaign.title}</DialogTitle>
          </div>
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
          <TabsList className={`grid ${viewMode === "details-only" ? "grid-cols-2" : "grid-cols-3"} mb-4`}>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            {viewMode === "full" && <TabsTrigger value="submission">Submission</TabsTrigger>}
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

              {/* Add join campaign button for available campaigns */}
              {campaign.status === "Available" && viewMode === "full" && (
                <div className="flex justify-center mt-4">
                  <Button
                    size="lg"
                    className="gap-2"
                    onClick={() => {
                      // Dispatch event to update campaign status
                      const event = new CustomEvent("join-campaign", {
                        detail: campaignSlug,
                      })
                      window.dispatchEvent(event)
                      setOpen(false)
                    }}
                  >
                    <Plus className="h-4 w-4" /> Join This Campaign
                  </Button>
                </div>
              )}
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
                // Quick Share assets with carousel for all statuses (URL Required, URL Under Review, and Live)
                <div className="space-y-6">
                  {campaign.assets && campaign.assets.length > 0 && (
                    <>
                      <div className="relative">
                        <div className="aspect-video bg-slate-100 relative overflow-hidden rounded-md">
                          <img
                            src={campaign.assets[currentAssetIndex]?.url || "/placeholder.svg"}
                            alt={campaign.assets[currentAssetIndex]?.name || "Campaign asset"}
                            className="w-full h-full object-cover"
                          />
                          <Badge className="absolute top-2 right-2">
                            {campaign.assets[currentAssetIndex]?.type || "IMAGE"}
                          </Badge>

                          {/* Navigation arrows */}
                          {campaign.assets.length > 1 && (
                            <>
                              <Button
                                variant="outline"
                                size="icon"
                                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
                                onClick={prevAsset}
                                disabled={currentAssetIndex === 0}
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
                                onClick={nextAsset}
                                disabled={currentAssetIndex === campaign.assets.length - 1}
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>

                        {/* Pagination indicators */}
                        {campaign.assets.length > 1 && (
                          <div className="flex justify-center mt-2 gap-1">
                            {campaign.assets.map((_, index) => (
                              <div
                                key={index}
                                className={`h-1.5 rounded-full ${
                                  index === currentAssetIndex ? "w-4 bg-primary" : "w-1.5 bg-gray-300"
                                }`}
                                onClick={() => setCurrentAssetIndex(index)}
                              ></div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium">Caption</h4>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 p-2"
                              onClick={() =>
                                campaign.assets[0]?.caption && handleCopyCaption(campaign.assets[0].caption)
                              }
                            >
                              {copiedIndex === 0 ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              {copiedIndex === 0 ? "Copied" : "Copy"}
                            </Button>
                          </div>
                        </div>
                        <Textarea readOnly value={campaign.assets[0]?.caption || ""} className="min-h-[80px] text-sm" />
                        {copiedIndex === 0 && <p className="text-xs text-green-600">Caption copied to clipboard!</p>}
                      </div>

                      <div className="flex justify-center mt-4">
                        <Button className="gap-2" onClick={handleDownloadAllAssets}>
                          <Archive className="h-4 w-4" /> Download All Assets
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                // Creative Challenge assets with PDF and text brief - consistent for all statuses
                <div className="space-y-4">
                  {!isQuickShare && (
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Challenge Brief</p>
                              <p className="text-xs text-muted-foreground">PDF file</p>
                            </div>
                          </div>
                          <Button size="sm">Download</Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Campaign Brief</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">
                            {campaign.textBrief ||
                              "Create content that showcases our product in an authentic way. Focus on the key features and benefits that resonate with your audience."}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          {viewMode === "full" && (
            <TabsContent value="submission">
              <div className="space-y-4">
                {isQuickShare ? (
                  // Quick Share workflow
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
                  ) : campaign.status === "URL Under Review" ? (
                    // URL Under Review for Quick Share
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Content Under Review</CardTitle>
                          <CardDescription>Your content URL is being reviewed</CardDescription>
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
                          <Alert className="bg-amber-50 border-amber-200 mt-4">
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                            <AlertTitle className="text-sm font-medium">Under Review</AlertTitle>
                            <AlertDescription className="text-sm">
                              Your submission is currently being reviewed. You'll receive points once it's approved.
                            </AlertDescription>
                          </Alert>
                        </CardContent>
                      </Card>
                    </div>
                  ) : campaign.status === "URL Required" ? (
                    // URL submission form for Quick Share campaigns
                    <form onSubmit={handleSubmitUrl} className="space-y-6">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                          <LinkIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Submit Your Post URL</h3>
                        <p className="text-muted-foreground mb-4">
                          After publishing the content to your social media, submit the URL to earn points.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="post-url">Post URL</Label>
                        <Input
                          id="post-url"
                          placeholder="https://www.instagram.com/p/..."
                          value={postUrl}
                          onChange={(e) => setPostUrl(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Enter the URL of your published post on social media
                        </p>
                      </div>

                      <Button type="submit" className="w-full">
                        Submit URL
                      </Button>
                    </form>
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
                ) : // Creative Challenge workflow
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
                ) : campaign.status === "URL Required" ? (
                  // URL submission form for Creative Challenge campaigns with URL Required status
                  // Now showing both URL submission form AND submitted content review
                  <div className="space-y-6">
                    {/* URL submission form */}
                    <form onSubmit={handleSubmitUrl} className="space-y-6">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                          <LinkIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Submit Your Post URL</h3>
                        <p className="text-muted-foreground mb-4">
                          Your content has been approved! Now publish it to your social media and submit the URL to earn
                          points.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="post-url">Post URL</Label>
                        <Input
                          id="post-url"
                          placeholder="https://www.tiktok.com/@username/video/..."
                          value={postUrl}
                          onChange={(e) => setPostUrl(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Enter the URL of your published post on social media
                        </p>
                      </div>

                      <Button type="submit" className="w-full">
                        Submit URL
                      </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Your Approved Content</span>
                      </div>
                    </div>

                    {/* Show submitted content */}
                    {campaign.submittedContent?.assets && campaign.submittedContent.assets.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="font-medium">Your Submitted Content</h3>

                        {/* Content carousel */}
                        <div className="relative">
                          <div className="aspect-video bg-slate-100 relative overflow-hidden rounded-md">
                            <img
                              src={campaign.submittedContent.assets[currentAssetIndex]?.url || "/placeholder.svg"}
                              alt={campaign.submittedContent.assets[currentAssetIndex]?.name || "Submitted content"}
                              className="w-full h-full object-cover"
                            />
                            <Badge className="absolute top-2 right-2">
                              {campaign.submittedContent.assets[currentAssetIndex]?.type || "IMAGE"}
                            </Badge>

                            {/* Navigation arrows */}
                            {campaign.submittedContent.assets.length > 1 && (
                              <>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
                                  onClick={prevAsset}
                                  disabled={currentAssetIndex === 0}
                                >
                                  <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
                                  onClick={nextAsset}
                                  disabled={currentAssetIndex === campaign.submittedContent.assets.length - 1}
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>

                          {/* Pagination indicators */}
                          {campaign.submittedContent.assets.length > 1 && (
                            <div className="flex justify-center mt-2 gap-1">
                              {campaign.submittedContent.assets.map((_, index) => (
                                <div
                                  key={index}
                                  className={`h-1.5 rounded-full ${
                                    index === currentAssetIndex ? "w-4 bg-primary" : "w-1.5 bg-gray-300"
                                  }`}
                                  onClick={() => setCurrentAssetIndex(index)}
                                ></div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Caption */}
                        <div className="mt-4 space-y-2">
                          <h4 className="text-sm font-medium">Your Caption</h4>
                          <Textarea
                            readOnly
                            value={campaign.submittedContent.caption || ""}
                            className="min-h-[80px] text-sm"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ) : !isQuickShare && campaign.status === "Content Under Review" && campaign.submittedContent ? (
                  // Content Under Review for Creative Challenge - show submitted content
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Content Under Review</CardTitle>
                        <CardDescription>Your content is being reviewed by the brand</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Alert className="bg-amber-50 border-amber-200">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          <AlertTitle className="text-sm font-medium">Under Review</AlertTitle>
                          <AlertDescription className="text-sm">
                            Your submission is currently being reviewed. Once approved, you'll be able to publish it to
                            your social media.
                          </AlertDescription>
                        </Alert>
                      </CardContent>
                    </Card>

                    {/* Show submitted content */}
                    {campaign.submittedContent.assets && campaign.submittedContent.assets.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="font-medium">Your Submitted Content</h3>

                        {/* Content carousel */}
                        <div className="relative">
                          <div className="aspect-video bg-slate-100 relative overflow-hidden rounded-md">
                            <img
                              src={campaign.submittedContent.assets[currentAssetIndex]?.url || "/placeholder.svg"}
                              alt={campaign.submittedContent.assets[currentAssetIndex]?.name || "Submitted content"}
                              className="w-full h-full object-cover"
                            />
                            <Badge className="absolute top-2 right-2">
                              {campaign.submittedContent.assets[currentAssetIndex]?.type || "IMAGE"}
                            </Badge>

                            {/* Navigation arrows */}
                            {campaign.submittedContent.assets.length > 1 && (
                              <>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
                                  onClick={prevAsset}
                                  disabled={currentAssetIndex === 0}
                                >
                                  <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
                                  onClick={nextAsset}
                                  disabled={currentAssetIndex === campaign.submittedContent.assets.length - 1}
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>

                          {/* Pagination indicators */}
                          {campaign.submittedContent.assets.length > 1 && (
                            <div className="flex justify-center mt-2 gap-1">
                              {campaign.submittedContent.assets.map((_, index) => (
                                <div
                                  key={index}
                                  className={`h-1.5 rounded-full ${
                                    index === currentAssetIndex ? "w-4 bg-primary" : "w-1.5 bg-gray-300"
                                  }`}
                                  onClick={() => setCurrentAssetIndex(index)}
                                ></div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Caption */}
                        <div className="mt-4 space-y-2">
                          <h4 className="text-sm font-medium">Your Caption</h4>
                          <Textarea
                            readOnly
                            value={campaign.submittedContent.caption || ""}
                            className="min-h-[80px] text-sm"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ) : campaign.status === "Content Required" ? (
                  // Content submission form for Creative Challenge campaigns
                  <form onSubmit={handleSubmitContent} className="space-y-6">
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
                            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                            <span className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</span>
                            <Button type="button" variant="secondary" size="sm">
                              Select Files
                            </Button>
                          </div>
                        </Label>
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
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

// Export the component both as a named export and as the default export
export { CampaignModal }
export default CampaignModal
