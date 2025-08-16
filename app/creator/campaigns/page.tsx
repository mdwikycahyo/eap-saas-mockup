"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CampaignCard } from "@/components/campaign-card"
import { CampaignModal } from "@/components/campaign-modal"
import { PointsBalance } from "@/components/points-balance"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

// Sample campaign data
const allCampaigns = [
  // Joined campaigns
  {
    slug: "summer-launch",
    title: "Summer Product Launch",
    description: "Share our new summer collection",
    status: "URL Required",
    color: "rose",
    timeRemaining: 5,
    joined: true,
  },
  {
    slug: "brand-challenge",
    title: "Brand Challenge",
    description: "Create a video using our hashtag",
    status: "URL Required",
    color: "cyan",
    timeRemaining: 12,
    joined: true,
  },
  {
    slug: "customer-stories",
    title: "Customer Stories",
    description: "Share testimonials from happy customers",
    status: "Approved",
    color: "amber",
    timeRemaining: 8,
    joined: true,
  },
  // Available campaigns
  {
    slug: "sustainability",
    title: "Sustainability Initiative",
    description: "Share our commitment to sustainability",
    color: "emerald",
    timeRemaining: 15,
    joined: false,
  },
  {
    slug: "product-tutorial",
    title: "Product Tutorial",
    description: "Create a tutorial showing how to use our products",
    color: "violet",
    timeRemaining: 10,
    joined: false,
  },
  {
    slug: "behind-scenes",
    title: "Behind the Scenes",
    description: "Share behind-the-scenes content from your workplace",
    color: "pink",
    timeRemaining: 7,
    joined: false,
  },
  {
    slug: "holiday-special",
    title: "Holiday Special",
    description: "Create content for the upcoming holiday season",
    color: "blue",
    timeRemaining: 20,
    joined: false,
  },
  {
    slug: "employee-spotlight",
    title: "Employee Spotlight",
    description: "Share your experience working with our products",
    color: "orange",
    timeRemaining: 14,
    joined: false,
  },
]

// Completed campaigns
const completedCampaigns = [
  {
    slug: "spring-collection",
    title: "Spring Collection",
    description: "Our spring collection campaign",
    status: "Completed",
    color: "green",
    timeRemaining: 0,
    joined: true,
  },
  {
    slug: "new-year-special",
    title: "New Year Special",
    description: "Special campaign for the new year",
    status: "Completed",
    color: "purple",
    timeRemaining: 0,
    joined: true,
  },
]

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showCampaignInfo, setShowCampaignInfo] = useState(true)
  const [campaigns, setCampaigns] = useState(allCampaigns)

  // Listen for custom events to update campaign status
  useEffect(() => {
    const handleJoinCampaign = (event: Event) => {
      const customEvent = event as CustomEvent
      const slug = customEvent.detail

      setCampaigns((prevCampaigns) =>
        prevCampaigns.map((campaign) => {
          if (campaign.slug === slug) {
            return {
              ...campaign,
              joined: true,
              status: "URL Required",
            }
          }
          return campaign
        }),
      )
    }

    window.addEventListener("join-campaign", handleJoinCampaign as EventListener)
    return () => {
      window.removeEventListener("join-campaign", handleJoinCampaign as EventListener)
    }
  }, [])

  // Filter campaigns based on search query and active tab
  const filterCampaigns = () => {
    let filteredCampaigns = [...campaigns]

    // Filter by tab
    if (activeTab === "active") {
      filteredCampaigns = filteredCampaigns.filter((campaign) => campaign.joined)
    } else if (activeTab === "available") {
      filteredCampaigns = filteredCampaigns.filter((campaign) => !campaign.joined)
    } else if (activeTab === "completed") {
      return completedCampaigns
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredCampaigns = filteredCampaigns.filter(
        (campaign) =>
          campaign.title.toLowerCase().includes(query) || campaign.description.toLowerCase().includes(query),
      )
    }

    return filteredCampaigns
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Campaign Browser</h1>
          <p className="text-muted-foreground">Discover and join advocacy campaigns</p>
        </div>
        <PointsBalance points={3250} />
      </div>

      {showCampaignInfo && (
        <Alert className="mb-6">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>How Campaigns Work</AlertTitle>
          <AlertDescription>
            <div className="mt-2">
              Join campaigns to share content about our brand on your social media. You can use provided assets or create your own content. Simply submit the URL of your published post for approval.
            </div>
            <button
              className="text-xs text-muted-foreground hover:underline mt-2"
              onClick={() => setShowCampaignInfo(false)}
            >
              Dismiss
            </button>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search campaigns..."
            className="w-full bg-background pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Campaigns</TabsTrigger>
          <TabsTrigger value="active">My Campaigns</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filterCampaigns().map((campaign) => (
              <CampaignCard key={campaign.slug} campaign={campaign} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filterCampaigns().map((campaign) => (
              <CampaignCard key={campaign.slug} campaign={campaign} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="available" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filterCampaigns().map((campaign) => (
              <CampaignCard key={campaign.slug} campaign={campaign} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filterCampaigns().map((campaign) => (
              <CampaignCard key={campaign.slug} campaign={campaign} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Campaign Modal Component - will be shown when triggered */}
      <CampaignModal />
    </div>
  )
}
