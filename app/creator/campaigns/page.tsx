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
    type: "Quick Share",
    status: "Submitted URL Required",
    color: "rose",
    timeRemaining: 5,
    joined: true,
  },
  {
    slug: "brand-challenge",
    title: "Brand Challenge",
    description: "Create a video using our hashtag",
    type: "Creative Challenge",
    status: "Content Required",
    color: "cyan",
    timeRemaining: 12,
    joined: true,
  },
  {
    slug: "customer-stories",
    title: "Customer Stories",
    description: "Share testimonials from happy customers",
    type: "Quick Share",
    status: "Live",
    color: "amber",
    timeRemaining: 8,
    joined: true,
  },
  // Available campaigns
  {
    slug: "sustainability",
    title: "Sustainability Initiative",
    description: "Share our commitment to sustainability",
    type: "Quick Share",
    color: "emerald",
    timeRemaining: 15,
    joined: false,
  },
  {
    slug: "product-tutorial",
    title: "Product Tutorial",
    description: "Create a tutorial showing how to use our products",
    type: "Creative Challenge",
    color: "violet",
    timeRemaining: 10,
    joined: false,
  },
  {
    slug: "behind-scenes",
    title: "Behind the Scenes",
    description: "Share behind-the-scenes content from your workplace",
    type: "Creative Challenge",
    color: "pink",
    timeRemaining: 7,
    joined: false,
  },
  {
    slug: "holiday-special",
    title: "Holiday Special",
    description: "Create content for the upcoming holiday season",
    type: "Quick Share",
    color: "blue",
    timeRemaining: 20,
    joined: false,
  },
  {
    slug: "employee-spotlight",
    title: "Employee Spotlight",
    description: "Share your experience working with our products",
    type: "Creative Challenge",
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
    type: "Quick Share",
    status: "Completed",
    color: "green",
    timeRemaining: 0,
    joined: true,
  },
  {
    slug: "new-year-special",
    title: "New Year Special",
    description: "Special campaign for the new year",
    type: "Creative Challenge",
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
              status: campaign.type === "Quick Share" ? "Submitted URL Required" : "Content Required",
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
    } else if (activeTab === "quick-share") {
      filteredCampaigns = filteredCampaigns.filter((campaign) => campaign.type === "Quick Share")
    } else if (activeTab === "creative") {
      filteredCampaigns = filteredCampaigns.filter((campaign) => campaign.type === "Creative Challenge")
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
          <AlertTitle>Campaign Types</AlertTitle>
          <AlertDescription>
            <div className="grid gap-2 mt-2">
              <div>
                <span className="font-medium">Quick Share:</span> Brand-generated content that you can download and
                publish directly. No approval needed.
              </div>
              <div>
                <span className="font-medium">Creative Challenge:</span> Create your own content based on brand
                guidelines. Requires approval before publishing.
              </div>
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
          <TabsTrigger value="quick-share">Quick Share</TabsTrigger>
          <TabsTrigger value="creative">Creative Challenge</TabsTrigger>
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

        <TabsContent value="quick-share" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filterCampaigns().map((campaign) => (
              <CampaignCard key={campaign.slug} campaign={campaign} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="creative" className="mt-6">
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
