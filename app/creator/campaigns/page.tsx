import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CampaignCard } from "@/components/campaign-card"
import { CampaignModal } from "@/components/campaign-modal"
import { PointsBalance } from "@/components/points-balance"

// Sample campaign data
const campaigns = [
  {
    slug: "summer-launch",
    title: "Summer Product Launch",
    subtitle: "Share our new summer collection",
    type: "Quick Share",
    status: "Submitted",
    color: "rose",
    timeRemaining: 5,
  },
  {
    slug: "brand-challenge",
    title: "Brand Challenge",
    subtitle: "Create a video using our hashtag",
    type: "Creative Challenge",
    status: "Joined",
    color: "cyan",
    timeRemaining: 12,
  },
  {
    slug: "customer-stories",
    title: "Customer Stories",
    subtitle: "Share testimonials from happy customers",
    type: "Quick Share",
    status: "Live",
    color: "amber",
    timeRemaining: 8,
  },
  {
    slug: "sustainability",
    title: "Sustainability Initiative",
    subtitle: "Share our commitment to sustainability",
    type: "Quick Share",
    status: "Joined",
    color: "amber",
    timeRemaining: 15,
  },
  {
    slug: "product-tutorial",
    title: "Product Tutorial",
    subtitle: "Create a tutorial showing how to use our products",
    type: "Creative Challenge",
    status: "Joined",
    color: "cyan",
    timeRemaining: 10,
  },
  {
    slug: "behind-scenes",
    title: "Behind the Scenes",
    subtitle: "Share behind-the-scenes content from your workplace",
    type: "Creative Challenge",
    status: "Joined",
    color: "rose",
    timeRemaining: 7,
  },
]

export default function CampaignsPage() {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">Browse and join campaigns from your brands</p>
        </div>
        <PointsBalance points={3250} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search campaigns..." className="w-full bg-background pl-8" />
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Campaigns</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.slug} campaign={campaign} />
        ))}
      </div>

      {/* Campaign Modal Component - will be shown when triggered */}
      <CampaignModal />
    </div>
  )
}
