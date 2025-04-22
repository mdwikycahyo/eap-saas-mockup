"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ArrowLeft, Calendar, Clock, Download, Copy, FileText, Instagram } from "lucide-react"
import { CampaignStatusBadge } from "@/components/campaign-status-badge"
import { TikTokIcon } from "@/components/tik-tok-icon"

export function CampaignModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [campaignSlug, setCampaignSlug] = useState("")
  const [campaignData, setCampaignData] = useState<any>(null)

  useEffect(() => {
    // Listen for custom event to open modal
    const handleOpenModal = (e: CustomEvent) => {
      setCampaignSlug(e.detail)
      setIsOpen(true)
    }

    window.addEventListener("open-campaign-modal", handleOpenModal as EventListener)

    return () => {
      window.removeEventListener("open-campaign-modal", handleOpenModal as EventListener)
    }
  }, [])

  useEffect(() => {
    if (campaignSlug) {
      // In a real app, we would fetch campaign data based on the slug
      // For this demo, we'll use hardcoded data
      setCampaignData(getCampaignData(campaignSlug))
    }
  }, [campaignSlug])

  if (!campaignData) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center">
          <div className="flex-1">
            <DialogTitle className="text-xl">{campaignData.title}</DialogTitle>
            <DialogDescription>{campaignData.subtitle}</DialogDescription>
          </div>
          <div className="flex items-center gap-2">
            <CampaignStatusBadge status={campaignData.status} />
            <Badge variant="secondary">{campaignData.type}</Badge>
          </div>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-3 mt-4">
          <div className="md:col-span-2">
            <div
              className={`h-64 rounded-md bg-gradient-to-r from-${campaignData.color}-400 to-${campaignData.color}-600`}
            ></div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Campaign Details</h2>
              <p className="mb-6">{campaignData.description}</p>

              <div className="grid gap-4 sm:grid-cols-2 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Campaign Period</p>
                    <p className="text-sm text-muted-foreground">{campaignData.period}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Time Remaining</p>
                    <p className="text-sm text-muted-foreground">Ends in {campaignData.timeRemaining} days</p>
                  </div>
                </div>
              </div>

              {campaignData.type === "Quick Share" ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Campaign Assets</h3>
                  <Tabs defaultValue="images">
                    <TabsList>
                      <TabsTrigger value="images">Images</TabsTrigger>
                      <TabsTrigger value="videos">Videos</TabsTrigger>
                      <TabsTrigger value="captions">Captions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="images" className="pt-4">
                      <div className="grid gap-4 grid-cols-2">
                        <div className="border rounded-md p-2">
                          <div className="aspect-square bg-slate-100 rounded-md mb-2"></div>
                          <Button variant="outline" size="sm" className="w-full gap-1">
                            <Download className="h-4 w-4" /> Download
                          </Button>
                        </div>
                        <div className="border rounded-md p-2">
                          <div className="aspect-square bg-slate-100 rounded-md mb-2"></div>
                          <Button variant="outline" size="sm" className="w-full gap-1">
                            <Download className="h-4 w-4" /> Download
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="videos" className="pt-4">
                      <div className="grid gap-4 grid-cols-1">
                        <div className="border rounded-md p-2">
                          <div className="aspect-video bg-slate-100 rounded-md mb-2"></div>
                          <Button variant="outline" size="sm" className="w-full gap-1">
                            <Download className="h-4 w-4" /> Download
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="captions" className="pt-4">
                      <div className="border rounded-md p-4 bg-slate-50">
                        <p className="text-sm mb-4">{campaignData.caption}</p>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Copy className="h-4 w-4" /> Copy Caption
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Challenge Brief</h3>
                  <div className="border rounded-md p-4 bg-slate-50">
                    <p className="text-sm mb-4">{campaignData.brief}</p>
                    <Button variant="outline" size="sm" className="gap-1">
                      <FileText className="h-4 w-4" /> Download Brief PDF
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-3">Available Platforms</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {campaignData.platforms.includes("instagram") && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-slate-100 rounded-full">
                    <Instagram className="h-3.5 w-3.5" />
                    <span className="text-sm">Instagram</span>
                  </div>
                )}
                {campaignData.platforms.includes("tiktok") && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-slate-100 rounded-full">
                    <TikTokIcon className="h-3.5 w-3.5" />
                    <span className="text-sm">TikTok</span>
                  </div>
                )}
              </div>
            </div>

            <div className="border rounded-md p-4 mt-4">
              <h3 className="font-medium mb-3">Points System</h3>
              <p className="text-sm text-muted-foreground mb-2">Base points for posting + engagement bonus</p>
              <ul className="text-sm space-y-1">
                <li>• Base posting: 100 points</li>
                <li>• Every 1,000 views: +50 points</li>
                <li>• Every 100 likes: +25 points</li>
              </ul>
            </div>

            <div className="border rounded-md p-4 mt-4">
              <h3 className="font-medium mb-3">Requirements</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                {campaignData.requirements.map((req: string, index: number) => (
                  <li key={index}>• {req}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              {campaignData.status === "Joined" && <Button className="w-full">Create Content Now</Button>}

              {campaignData.status === "Submitted" && (
                <div className="text-center text-sm text-muted-foreground p-3 border rounded-md">
                  Your submission is under review
                </div>
              )}

              {campaignData.status === "Approved" && <Button className="w-full">Submit Post URL</Button>}

              {campaignData.status === "Live" && (
                <Button variant="outline" className="w-full">
                  View Analytics
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function getCampaignData(slug: string) {
  // This would be fetched from an API in a real application
  const campaigns = {
    "summer-launch": {
      title: "Summer Product Launch",
      subtitle: "Share our new summer collection",
      description:
        "Share our new summer collection with your followers and highlight your favorite products. This campaign aims to increase awareness of our latest seasonal offerings.",
      type: "Quick Share",
      platforms: ["instagram", "tiktok"],
      color: "rose",
      period: "July 1 - July 31, 2023",
      timeRemaining: 5,
      status: "Submitted",
      caption:
        "Summer is here and so is the new collection from @brandname! 🌞 Check out these amazing new products that are perfect for the season. #SummerCollection #BrandNameSummer #NewArrivals",
      requirements: [
        "Post must include product images provided",
        "Caption must include #SummerCollection hashtag",
        "Tag @brandname in your post",
      ],
    },
    "brand-challenge": {
      title: "Brand Challenge",
      subtitle: "Create a video using our hashtag",
      description:
        "Create a video using our branded hashtag and show how you use our products in your daily life. Be creative and authentic to connect with your audience.",
      type: "Creative Challenge",
      platforms: ["instagram", "tiktok"],
      color: "cyan",
      period: "July 15 - August 15, 2023",
      timeRemaining: 12,
      status: "Joined",
      brief:
        "Create a 15-60 second video showing how our products fit into your daily routine. Focus on authentic usage scenarios that will resonate with your audience. The most creative submissions will be featured on our official brand account.",
      requirements: [
        "Video length: 15-60 seconds",
        "Must include #BrandChallenge hashtag",
        "Must feature at least one product",
        "Content must be original and created specifically for this challenge",
      ],
    },
    "customer-stories": {
      title: "Customer Stories",
      subtitle: "Share testimonials from happy customers",
      description:
        "Share testimonials from happy customers and highlight how our products have made a difference in their lives. Real stories create authentic connections.",
      type: "Quick Share",
      platforms: ["instagram", "tiktok"],
      color: "amber",
      period: "July 10 - August 10, 2023",
      timeRemaining: 8,
      status: "Live",
      caption:
        "Our customers love our products, and here's why! 💯 These testimonials show the real impact our solutions have made. What's your experience been like? #CustomerStories #RealResults #BrandName",
      requirements: [
        "Use provided testimonial graphics",
        "Include #CustomerStories hashtag",
        "Add a personal note about your own experience",
      ],
    },
    sustainability: {
      title: "Sustainability Initiative",
      subtitle: "Share our commitment to sustainability",
      description:
        "Share our commitment to sustainability and how we're reducing our environmental impact. Help spread awareness about our eco-friendly practices.",
      type: "Quick Share",
      platforms: ["instagram", "tiktok"],
      color: "emerald",
      period: "July 20 - August 20, 2023",
      timeRemaining: 15,
      status: "Joined",
      caption:
        "Proud to be part of a company that prioritizes our planet! 🌎 Check out how @brandname is making a difference with sustainable practices and eco-friendly products. #SustainabilityMatters #EcoFriendly #GreenBusiness",
      requirements: [
        "Use provided sustainability infographics",
        "Include #SustainabilityMatters hashtag",
        "Mention at least one specific sustainability initiative",
      ],
    },
    "product-tutorial": {
      title: "Product Tutorial",
      subtitle: "Create a tutorial showing how to use our products",
      description:
        "Create a tutorial showing how to use our products effectively and share your tips and tricks. Help others get the most out of their purchase.",
      type: "Creative Challenge",
      platforms: ["instagram", "tiktok"],
      color: "violet",
      period: "July 5 - August 5, 2023",
      timeRemaining: 10,
      status: "Joined",
      brief:
        "Create a step-by-step tutorial demonstrating how to use one of our products. Focus on helpful tips, creative uses, or solutions to common problems. Your tutorial should be informative yet engaging.",
      requirements: [
        "Video length: 30-90 seconds",
        "Must include clear step-by-step instructions",
        "Include #ProductTutorial hashtag",
        "Demonstrate at least one unique tip or trick",
      ],
    },
    "behind-scenes": {
      title: "Behind the Scenes",
      subtitle: "Share behind-the-scenes content from your workplace",
      description:
        "Share behind-the-scenes content from your workplace and how you use our products professionally. Give your audience a glimpse into your work life.",
      type: "Creative Challenge",
      platforms: ["instagram", "tiktok"],
      color: "pink",
      period: "July 15 - August 15, 2023",
      timeRemaining: 7,
      status: "Joined",
      brief:
        "Create content that shows a day in your work life and how our products help you succeed. This could be a photo series, a short video, or a combination of both. Focus on authentic moments that showcase your professional environment.",
      requirements: [
        "Must show workplace environment",
        "Feature product being used in professional context",
        "Include #BehindTheScenes hashtag",
        "Tag @brandname in your post",
      ],
    },
  }

  return campaigns[slug as keyof typeof campaigns] || campaigns["summer-launch"]
}
