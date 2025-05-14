"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Award,
  Users,
  Eye,
  ThumbsUp,
  Instagram,
  ChevronLeft,
  ChevronRight,
  Clock,
  ArrowRight,
  ExternalLink,
  BarChart,
  AlertTriangle,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { TikTokIcon } from "@/components/tik-tok-icon"
import { CampaignModal } from "@/components/campaign-modal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Active campaigns data
const activeCampaigns = [
  {
    id: 1,
    slug: "summer-launch",
    title: "Summer Product Launch",
    description: "Share our new summer collection",
    type: "Quick Share",
    status: "URL Required",
    platform: "instagram",
    image: "/placeholder.svg?height=300&width=600&text=Summer+Collection",
    timeRemaining: 5,
    date: "July 15, 2023",
    points: 0,
    joined: true,
  },
  {
    id: 2,
    slug: "brand-challenge",
    title: "Brand Challenge",
    description: "Create a video using our hashtag",
    type: "Creative Challenge",
    status: "Content Required",
    platform: "tiktok",
    image: "/placeholder.svg?height=300&width=600&text=Brand+Challenge",
    timeRemaining: 12,
    date: "July 10, 2023",
    points: 0,
    joined: true,
  },
  {
    id: 3,
    slug: "customer-stories",
    title: "Customer Stories",
    description: "Share testimonials from happy customers.",
    type: "Quick Share",
    status: "Live",
    platform: "instagram",
    image: "/placeholder.svg?height=300&width=600&text=Customer+Stories",
    timeRemaining: 8,
    date: "July 8, 2023",
    points: 250,
    joined: true,
    engagement: {
      views: 1500,
      likes: 85,
      comments: 12,
    },
    postUrl: "https://www.instagram.com/p/ABC123",
  },
  {
    id: 4,
    slug: "sustainability",
    title: "Sustainability Initiative",
    description: "Share our commitment to sustainability",
    type: "Quick Share",
    status: "URL Under Review",
    platform: "instagram",
    image: "/placeholder.svg?height=300&width=600&text=Sustainability",
    timeRemaining: 15,
    date: "July 5, 2023",
    points: 0,
    joined: true,
    postUrl: "https://www.instagram.com/p/DEF456",
  },
  {
    id: 5,
    slug: "product-tutorial",
    title: "Product Tutorial",
    description: "Create a tutorial showing how to use our products",
    type: "Creative Challenge",
    status: "Content Under Review",
    platform: "tiktok",
    image: "/placeholder.svg?height=300&width=600&text=Product+Tutorial",
    timeRemaining: 10,
    date: "July 1, 2023",
    points: 0,
    joined: true,
  },
]

// Available campaigns data
const availableCampaigns = [
  {
    slug: "winter-collection",
    title: "Winter Collection Preview",
    description: "Be the first to showcase our winter collection",
    type: "Quick Share",
    status: "Available",
    image: "/placeholder.svg?height=300&width=600&text=Winter+Collection",
    timeRemaining: 14,
    joined: false,
  },
  {
    slug: "product-review",
    title: "Product Review Challenge",
    description: "Create an honest review of our flagship product",
    type: "Creative Challenge",
    status: "Available",
    image: "/placeholder.svg?height=300&width=600&text=Product+Review",
    timeRemaining: 21,
    joined: false,
  },
  {
    slug: "holiday-special",
    title: "Holiday Special",
    description: "Share how our products make holidays special",
    type: "Quick Share",
    status: "Available",
    image: "/placeholder.svg?height=300&width=600&text=Holiday+Special",
    timeRemaining: 30,
    joined: false,
  },
  {
    slug: "brand-ambassador",
    title: "Brand Ambassador Program",
    description: "Show how you represent our brand in daily life",
    type: "Creative Challenge",
    status: "Available",
    image: "/placeholder.svg?height=300&width=600&text=Brand+Ambassador",
    timeRemaining: 25,
    joined: false,
  },
  {
    slug: "user-testimonial",
    title: "User Testimonial",
    description: "Share your experience with our products",
    type: "Quick Share",
    status: "Available",
    image: "/placeholder.svg?height=300&width=600&text=User+Testimonial",
    timeRemaining: 18,
    joined: false,
  },
]

export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState("all")
  const activeScrollContainerRef = useRef<HTMLDivElement>(null)
  const availableScrollContainerRef = useRef<HTMLDivElement>(null)
  const [availableCampaignsList, setAvailableCampaignsList] = useState(availableCampaigns)
  const [activeCampaignsList, setActiveCampaignsList] = useState(activeCampaigns)

  // Listen for join campaign events
  useEffect(() => {
    const handleJoinCampaign = (event: Event) => {
      const customEvent = event as CustomEvent
      const slug = customEvent.detail

      // Find the campaign in available campaigns
      const campaignToJoin = availableCampaignsList.find((c) => c.slug === slug)

      if (campaignToJoin) {
        // Remove from available campaigns
        setAvailableCampaignsList((prev) => prev.filter((c) => c.slug !== slug))

        // Add to active campaigns with appropriate status
        const newCampaign = {
          ...campaignToJoin,
          joined: true,
          status: campaignToJoin.type === "Quick Share" ? "URL Required" : "Content Required",
        }

        setActiveCampaignsList((prev) => [...prev, newCampaign])
      }
    }

    window.addEventListener("join-campaign", handleJoinCampaign as EventListener)
    return () => {
      window.removeEventListener("join-campaign", handleJoinCampaign as EventListener)
    }
  }, [availableCampaignsList])

  // Platform-specific metrics
  const metrics = {
    all: {
      points: { value: 3250, change: "+350 this month" },
      content: { value: 28, change: "+5 this month" },
      views: { value: "12.4K", change: "+2.3K this month" },
      likes: { value: 1842, change: "+342 this month" },
    },
    instagram: {
      points: { value: 2150, change: "+250 this month" },
      content: { value: 18, change: "+3 this month" },
      views: { value: "8.2K", change: "+1.5K this month" },
      likes: { value: 1245, change: "+220 this month" },
    },
    tiktok: {
      points: { value: 1100, change: "+100 this month" },
      content: { value: 10, change: "+2 this month" },
      views: { value: "4.2K", change: "+800 this month" },
      likes: { value: 597, change: "+122 this month" },
    },
  }

  const currentMetrics = metrics[activeTab as keyof typeof metrics]

  const scrollLeft = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const handleCardClick = (slug: string) => {
    // Dispatch custom event to open the campaign modal
    const event = new CustomEvent("open-campaign-modal", {
      detail: slug,
    })
    window.dispatchEvent(event)
  }

  const handleJoinClick = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation() // Prevent card click from triggering

    // Dispatch event to join the campaign
    const event = new CustomEvent("join-campaign", {
      detail: slug,
    })
    window.dispatchEvent(event)
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Creator Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Sarah! Here's your advocacy overview.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setActiveTab(value)}>
            <TabsList>
              <TabsTrigger value="all">All Platforms</TabsTrigger>
              <TabsTrigger value="instagram" className="flex items-center gap-1">
                <Instagram className="h-4 w-4" />
                Instagram
              </TabsTrigger>
              <TabsTrigger value="tiktok" className="flex items-center gap-1">
                <TikTokIcon className="h-4 w-4" />
                TikTok
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg border-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Points</CardTitle>
            <Award className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.points.value}</div>
            <p className="text-xs text-white/80">{currentMetrics.points.change}</p>
            <div className="mt-3 h-2 bg-white/20 rounded-full">
              <div className="h-full bg-white rounded-full" style={{ width: "65%" }}></div>
            </div>
            <p className="text-xs text-white/80 mt-2">Silver Tier (750 points until Gold)</p>
          </CardContent>
        </Card>
        <Card className="bg-cyan-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Content Published</CardTitle>
            <Users className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.content.value}</div>
            <p className="text-xs text-muted-foreground">{currentMetrics.content.change}</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Views</CardTitle>
            <Eye className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.views.value}</div>
            <p className="text-xs text-muted-foreground">{currentMetrics.views.change}</p>
          </CardContent>
        </Card>
        <Card className="bg-emerald-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Likes</CardTitle>
            <ThumbsUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.likes.value}</div>
            <p className="text-xs text-muted-foreground">{currentMetrics.likes.change}</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Campaigns - Horizontally Scrollable */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Active Campaigns</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollLeft(activeScrollContainerRef)}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollRight(activeScrollContainerRef)}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={activeScrollContainerRef}
          className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {activeCampaignsList.map((campaign) => {
            const isQuickShare = campaign.type === "Quick Share"

            // Determine status icon and color (similar to submission page)
            let StatusIcon = Clock
            let statusColor = "text-blue-500"
            let statusBgColor = "bg-blue-50"
            let statusBorderColor = "border-blue-200"

            if (campaign.status === "Content Approved") {
              StatusIcon = CheckCircle
              statusColor = "text-purple-500"
              statusBgColor = "bg-purple-50"
              statusBorderColor = "border-purple-200"
            } else if (campaign.status === "Rejected") {
              StatusIcon = XCircle
              statusColor = "text-red-500"
              statusBgColor = "bg-red-50"
              statusBorderColor = "border-red-200"
            } else if (campaign.status === "Live") {
              StatusIcon = BarChart
              statusColor = "text-green-500"
              statusBgColor = "bg-green-50"
              statusBorderColor = "border-green-200"
            } else if (campaign.status === "Completed") {
              StatusIcon = CheckCircle
              statusColor = "text-slate-500"
              statusBgColor = "bg-slate-50"
              statusBorderColor = "border-slate-200"
            } else if (campaign.status === "URL Required" || campaign.status === "Content Required") {
              StatusIcon = AlertTriangle
              statusColor = "text-amber-500"
              statusBgColor = "bg-amber-50"
              statusBorderColor = "border-amber-200"
            } else if (campaign.status === "Content Under Review" || campaign.status === "URL Under Review") {
              StatusIcon = FileText
              statusColor = "text-blue-500"
              statusBgColor = "bg-blue-50"
              statusBorderColor = "border-blue-200"
            }

            return (
              <div key={campaign.id} className="min-w-[300px] md:min-w-[350px]">
                <Card
                  className="overflow-hidden bg-white hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col"
                  onClick={() => handleCardClick(campaign.slug)}
                >
                  <div className="relative">
                    <img
                      src={campaign.image || "/placeholder.svg"}
                      alt={campaign.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge
                        variant={isQuickShare ? "secondary" : "outline"}
                        className={isQuickShare ? "" : "bg-violet-50 text-violet-600 border-violet-200"}
                      >
                        {isQuickShare ? "Quick Share" : "Creative Challenge"}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className={`${statusBgColor} ${statusColor} ${statusBorderColor}`}>
                        <StatusIcon className={`h-3.5 w-3.5 mr-1 ${statusColor}`} />
                        {campaign.status}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4 flex-1 flex flex-col">
                    <div className="mb-2">
                      <h3 className="font-medium text-base">{campaign.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span>{campaign.date}</span>
                        <span>•</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="mt-2 text-sm text-muted-foreground">
                        <p>{campaign.description}</p>
                      </div>

                      {campaign.engagement && (
                        <div className="mt-2 flex justify-between gap-2 text-sm">
                          <div className="text-center">
                            <p className="font-medium">{campaign.engagement.views.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Views</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium">{campaign.engagement.likes.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Likes</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium">{campaign.engagement.comments.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Comments</p>
                          </div>
                        </div>
                      )}

                      {campaign.postUrl && (
                        <div className="mt-2">
                          <a
                            href={campaign.postUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm flex items-center gap-1 text-blue-600 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View Post <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button size="sm" variant="outline" className="gap-1">
                        View Details <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>

      {/* Available Campaigns - Horizontally Scrollable */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Available Campaigns</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollLeft(availableScrollContainerRef)}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollRight(availableScrollContainerRef)}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={availableScrollContainerRef}
          className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {availableCampaignsList.map((campaign) => (
            <div key={campaign.slug} className="min-w-[300px] md:min-w-[350px]">
              <Card
                className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col"
                onClick={() => handleCardClick(campaign.slug)}
              >
                <div className="relative">
                  <img
                    src={campaign.image || "/placeholder.svg"}
                    alt={campaign.title}
                    className="w-full h-48 object-cover"
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
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                      Available
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4 flex-1">
                  <h3 className="font-semibold text-lg mb-1">{campaign.title}</h3>
                  <p className="text-muted-foreground text-sm">{campaign.description}</p>
                  <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{campaign.timeRemaining} days remaining</span>
                  </div>
                </CardContent>
                <CardContent className="px-4 pb-4 pt-0 flex justify-between">
                  <Button size="sm" variant="outline" className="gap-1">
                    View Details <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" className="gap-1" onClick={(e) => handleJoinClick(e, campaign.slug)}>
                    Join Campaign
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Modal */}
      <CampaignModal />
    </div>
  )
}
