"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Users, Eye, ThumbsUp, Instagram, ChevronLeft, ChevronRight } from "lucide-react"
import { TikTokIcon } from "@/components/tik-tok-icon"
import { CampaignModal } from "@/components/campaign-modal"
import { CampaignCard } from "@/components/campaign-card"
import { Button } from "@/components/ui/button"

// Active campaigns data
const activeCampaigns = [
  {
    slug: "summer-launch",
    title: "Summer Product Launch",
    description: "Share our new summer collection",
    type: "Quick Share",
    status: "Submitted",
    color: "rose",
    timeRemaining: 5,
    joined: true,
  },
  {
    slug: "brand-challenge",
    title: "Brand Challenge",
    description: "Create a video using our hashtag",
    type: "Creative Challenge",
    status: "Joined",
    color: "cyan",
    timeRemaining: 12,
    joined: true,
  },
  {
    slug: "customer-stories",
    title: "Customer Stories",
    description: "Share testimonials from happy customers.",
    type: "Quick Share",
    status: "Live",
    color: "amber",
    timeRemaining: 8,
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
    color: "blue",
    timeRemaining: 14,
    joined: false,
  },
  {
    slug: "product-review",
    title: "Product Review Challenge",
    description: "Create an honest review of our flagship product",
    type: "Creative Challenge",
    status: "Available",
    color: "purple",
    timeRemaining: 21,
    joined: false,
  },
  {
    slug: "holiday-special",
    title: "Holiday Special",
    description: "Share how our products make holidays special",
    type: "Quick Share",
    status: "Available",
    color: "green",
    timeRemaining: 30,
    joined: false,
  },
  {
    slug: "brand-ambassador",
    title: "Brand Ambassador Program",
    description: "Show how you represent our brand in daily life",
    type: "Creative Challenge",
    status: "Available",
    color: "indigo",
    timeRemaining: 25,
    joined: false,
  },
  {
    slug: "user-testimonial",
    title: "User Testimonial",
    description: "Share your experience with our products",
    type: "Quick Share",
    status: "Available",
    color: "pink",
    timeRemaining: 18,
    joined: false,
  },
]

export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState("all")
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
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

      {/* Active Campaigns */}
      <h2 className="text-xl font-semibold mb-4">Active Campaigns</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {activeCampaigns.map((campaign) => (
          <CampaignCard key={campaign.slug} campaign={campaign} />
        ))}
      </div>

      {/* Available Campaigns - Horizontally Scrollable */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Available Campaigns</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={scrollLeft} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollRight} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {availableCampaigns.map((campaign) => (
            <div key={campaign.slug} className="min-w-[300px] md:min-w-[350px]">
              <CampaignCard campaign={campaign} />
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Modal */}
      <CampaignModal />
    </div>
  )
}
