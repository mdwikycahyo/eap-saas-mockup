"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Award,
  Users,
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
  TrendingUp,
} from "lucide-react"
import { TikTokIcon } from "@/components/tik-tok-icon"
import { CampaignModal } from "@/components/campaign-modal"
import { JoinCampaignModal } from "@/components/join-campaign-modal"
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
  {
    id: 6,
    slug: "brand-ambassador",
    title: "Brand Ambassador Program",
    description: "Show how you represent our brand in daily life",
    type: "Creative Challenge",
    status: "URL Required",
    platform: "tiktok",
    image: "/placeholder.svg?height=300&width=600&text=Brand+Ambassador",
    timeRemaining: 25,
    date: "July 3, 2023",
    points: 0,
    joined: true,
  },
  {
    id: 7,
    slug: "fitness-challenge",
    title: "Fitness Challenge",
    description: "Show how our products help with your fitness journey",
    type: "Creative Challenge",
    status: "Live",
    platform: "instagram",
    image: "/placeholder.svg?height=300&width=600&text=Fitness+Challenge",
    timeRemaining: 20,
    date: "June 25, 2023",
    points: 400,
    joined: true,
    engagement: {
      views: 2500,
      likes: 320,
      comments: 45,
    },
    postUrl: "https://www.instagram.com/p/GHI789",
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
  const activeScrollContainerRef = useRef<HTMLDivElement>(null)
  const availableScrollContainerRef = useRef<HTMLDivElement>(null)
  const [availableCampaignsList, setAvailableCampaignsList] = useState(availableCampaigns)
  const [activeCampaignsList, setActiveCampaignsList] = useState(activeCampaigns)

  // Join campaign modal state
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  const [campaignToJoin, setCampaignToJoin] = useState<(typeof availableCampaigns)[0] | null>(null)

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

  // Performance metrics
  const metrics = {
    points: { value: 3250, change: "+350 this month" },
    content: { value: 28, change: "+5 this month" },
    views: { value: "12.4K", change: "+2.3K this month" },
    likes: { value: 1842, change: "+342 this month" },
  }

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

  const handleCardClick = (slug: string, isActive: boolean) => {
    // Dispatch custom event to open the campaign modal
    const event = new CustomEvent("open-campaign-modal", {
      detail: {
        slug,
        mode: isActive ? "full" : "details-only",
      },
    })
    window.dispatchEvent(event)
  }

  const handleJoinClick = (e: React.MouseEvent, campaign: (typeof availableCampaigns)[0]) => {
    e.stopPropagation() // Prevent card click from triggering

    // Open the join confirmation modal
    setCampaignToJoin(campaign)
    setIsJoinModalOpen(true)
  }

  const handleConfirmJoin = () => {
    if (campaignToJoin) {
      // Close the modal
      setIsJoinModalOpen(false)

      // Dispatch event to join the campaign
      const event = new CustomEvent("join-campaign", {
        detail: campaignToJoin.slug,
      })
      window.dispatchEvent(event)

      // Reset the campaign to join
      setCampaignToJoin(null)
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Creator Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Sarah! Here's your advocacy overview.</p>
      </div>

      {/* New Dashboard Layout */}
      <div className="grid gap-6 md:grid-cols-12 mb-6">
        {/* Top Row - First Card - Points from sketch */}
        <Card className="md:col-span-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-white">Total Points</CardTitle>
              <Award className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-1">3250</div>
            <div className="flex items-center gap-1 text-sm text-white/90 mb-4">
              <TrendingUp className="h-3 w-3" />
              +350 this month
            </div>
            <div className="h-2 bg-white/20 rounded-full mb-2">
              <div className="h-full bg-white rounded-full" style={{ width: "65%" }}></div>
            </div>
            <p className="text-sm text-white/90">Silver Tier (750 points until Gold)</p>
          </CardContent>
        </Card>

        {/* Top Row - Second Card - Content Published from sketch */}
        <Card className="md:col-span-4">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Content Published</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="text-4xl font-bold">28</div>
              <div className="flex items-center gap-1 text-sm text-green-500">
                <TrendingUp className="h-3 w-3" />
                +5 this month
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex items-center gap-2 bg-pink-50 p-3 rounded-lg flex-1">
                <div className="text-pink-500">
                  <Instagram className="h-4 w-4" />
                </div>
                <div className="text-lg font-medium">18</div>
                <div className="text-sm text-muted-foreground">Instagram</div>
              </div>

              <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg flex-1">
                <TikTokIcon className="h-4 w-4" />
                <div className="text-lg font-medium">10</div>
                <div className="text-sm text-muted-foreground">TikTok</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Row - Third Card - Engagement with new layout from sketch */}
        <Card className="md:col-span-4">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {/* Main metrics row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">12.4K</div>
                <div className="text-sm text-amber-500">Views</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">1,842</div>
                <div className="text-sm text-green-500">Likes</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">580</div>
                <div className="text-sm text-blue-500">Comments</div>
              </div>
            </div>

            {/* Platform breakdown */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-pink-500">
                    <Instagram className="h-4 w-4" />
                  </div>
                  <span className="text-sm">Instagram</span>
                </div>
                <div className="text-sm text-muted-foreground">8.2K / 1,245 / 380</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TikTokIcon className="h-4 w-4" />
                  <span className="text-sm">TikTok</span>
                </div>
                <div className="text-sm text-muted-foreground">4.2K / 597 / 200</div>
              </div>
            </div>
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
                  onClick={() => handleCardClick(campaign.slug, true)}
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
                onClick={() => handleCardClick(campaign.slug, false)}
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
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCardClick(campaign.slug, false)
                    }}
                  >
                    View Details <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" className="gap-1" onClick={(e) => handleJoinClick(e, campaign)}>
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

      {/* Join Campaign Confirmation Modal */}
      <JoinCampaignModal
        isOpen={isJoinModalOpen}
        onClose={() => {
          setIsJoinModalOpen(false)
          setCampaignToJoin(null)
        }}
        onConfirm={handleConfirmJoin}
        campaign={campaignToJoin}
      />
    </div>
  )
}
