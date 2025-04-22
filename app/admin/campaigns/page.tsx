import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Calendar,
  BarChart3,
  Copy,
  Edit,
  Trash2,
  Eye,
  Instagram,
  TwitterIcon as TikTok,
  CheckCircle,
  XCircle,
} from "lucide-react"

export default function AdminCampaigns() {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Campaign Management</h1>
          <p className="text-muted-foreground">Create and manage advocacy campaigns</p>
        </div>
        <div className="mt-4 md:mt-0">
          <CreateCampaignDialog />
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search campaigns..." className="pl-8" />
          </div>
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <TabsContent value="active">
          <CampaignList status="active" />
        </TabsContent>

        <TabsContent value="scheduled">
          <CampaignList status="scheduled" />
        </TabsContent>

        <TabsContent value="completed">
          <CampaignList status="completed" />
        </TabsContent>

        <TabsContent value="drafts">
          <CampaignList status="draft" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CampaignList({ status }: { status: string }) {
  // This would be fetched from an API in a real application
  const campaigns = [
    {
      id: 1,
      title: "Summer Product Launch",
      type: "Quick Share",
      platforms: ["instagram"],
      startDate: "Jul 1, 2023",
      endDate: "Jul 31, 2023",
      status: "active",
      participants: 42,
      submissions: 28,
      engagement: "24.5K",
    },
    {
      id: 2,
      title: "Brand Challenge",
      type: "Creative Challenge",
      platforms: ["tiktok"],
      startDate: "Jul 15, 2023",
      endDate: "Aug 15, 2023",
      status: "active",
      participants: 36,
      submissions: 15,
      engagement: "18.3K",
    },
    {
      id: 3,
      title: "Customer Stories",
      type: "Quick Share",
      platforms: ["instagram", "tiktok"],
      startDate: "Jul 10, 2023",
      endDate: "Aug 10, 2023",
      status: "active",
      participants: 28,
      submissions: 22,
      engagement: "9.8K",
    },
    {
      id: 4,
      title: "Sustainability Initiative",
      type: "Quick Share",
      platforms: ["instagram"],
      startDate: "Jul 20, 2023",
      endDate: "Aug 20, 2023",
      status: "scheduled",
      participants: 0,
      submissions: 0,
      engagement: "0",
    },
    {
      id: 5,
      title: "Product Tutorial",
      type: "Creative Challenge",
      platforms: ["tiktok"],
      startDate: "Jul 5, 2023",
      endDate: "Aug 5, 2023",
      status: "active",
      participants: 18,
      submissions: 7,
      engagement: "5.6K",
    },
    {
      id: 6,
      title: "Behind the Scenes",
      type: "Creative Challenge",
      platforms: ["instagram", "tiktok"],
      startDate: "Jun 15, 2023",
      endDate: "Jul 15, 2023",
      status: "completed",
      participants: 45,
      submissions: 38,
      engagement: "32.1K",
    },
    {
      id: 7,
      title: "Holiday Campaign",
      type: "Quick Share",
      platforms: ["instagram"],
      startDate: "Dec 1, 2023",
      endDate: "Dec 31, 2023",
      status: "draft",
      participants: 0,
      submissions: 0,
      engagement: "0",
    },
  ]

  const filteredCampaigns = campaigns.filter((campaign) => campaign.status === status)

  return (
    <Card>
      <CardHeader className="px-6">
        <CardTitle>{status.charAt(0).toUpperCase() + status.slice(1)} Campaigns</CardTitle>
        <CardDescription>
          {status === "active" && "Currently running campaigns"}
          {status === "scheduled" && "Upcoming campaigns"}
          {status === "completed" && "Past campaigns"}
          {status === "draft" && "Campaigns in preparation"}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <div className="rounded-md border">
          <div className="grid grid-cols-12 p-4 bg-slate-50 text-sm font-medium text-slate-500">
            <div className="col-span-4">Campaign</div>
            <div className="col-span-2">Period</div>
            <div className="col-span-2">Participants</div>
            <div className="col-span-2">Engagement</div>
            <div className="col-span-2">Actions</div>
          </div>

          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="grid grid-cols-12 p-4 border-t items-center">
                <div className="col-span-4 flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded bg-${getPlatformColor(campaign.platforms[0])}-100 flex items-center justify-center`}
                  >
                    {campaign.platforms.includes("instagram") && (
                      <Instagram className={`h-5 w-5 text-${getPlatformColor("instagram")}-600`} />
                    )}
                    {campaign.platforms.includes("tiktok") && !campaign.platforms.includes("instagram") && (
                      <TikTok className={`h-5 w-5 text-${getPlatformColor("tiktok")}-600`} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{campaign.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {campaign.type}
                      </Badge>
                      {campaign.platforms.map((platform) => (
                        <Badge
                          key={platform}
                          variant="outline"
                          className={`text-xs text-${getPlatformColor(platform)}-600 border-${getPlatformColor(platform)}-200`}
                        >
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-span-2 flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span className="text-sm">
                    {campaign.startDate} - {campaign.endDate}
                  </span>
                </div>
                <div className="col-span-2">
                  <div className="flex flex-col">
                    <span className="font-medium">{campaign.participants} creators</span>
                    <span className="text-xs text-muted-foreground">{campaign.submissions} submissions</span>
                  </div>
                </div>
                <div className="col-span-2 flex items-center gap-1">
                  <BarChart3 className="h-4 w-4 text-slate-400" />
                  <span>{campaign.engagement}</span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`/admin/campaigns/${campaign.id}`}>Manage</a>
                  </Button>
                  <CampaignActionsMenu campaign={campaign} />
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">No {status} campaigns found.</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function CampaignActionsMenu({ campaign }: { campaign: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit className="h-4 w-4 mr-2" />
          Edit Campaign
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy className="h-4 w-4 mr-2" />
          Duplicate
        </DropdownMenuItem>
        {campaign.status === "active" && (
          <DropdownMenuItem>
            <XCircle className="h-4 w-4 mr-2" />
            Deactivate
          </DropdownMenuItem>
        )}
        {campaign.status === "scheduled" ||
          (campaign.status === "draft" && (
            <DropdownMenuItem>
              <CheckCircle className="h-4 w-4 mr-2" />
              Activate
            </DropdownMenuItem>
          ))}
        <DropdownMenuItem className="text-red-600">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function CreateCampaignDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
          <DialogDescription>Set up a new advocacy campaign for your creators.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="campaign-name">Campaign Name</Label>
            <Input id="campaign-name" placeholder="Enter campaign name" />
          </div>

          <div className="grid gap-2">
            <Label>Campaign Type</Label>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <input type="radio" id="quick-share" name="campaign-type" className="h-4 w-4" />
                <Label htmlFor="quick-share">Quick Share</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="creative-challenge" name="campaign-type" className="h-4 w-4" />
                <Label htmlFor="creative-challenge">Creative Challenge</Label>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Platforms</Label>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="instagram" name="platforms" className="h-4 w-4" />
                <Label htmlFor="instagram">Instagram</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="tiktok" name="platforms" className="h-4 w-4" />
                <Label htmlFor="tiktok">TikTok</Label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input id="start-date" type="date" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input id="end-date" type="date" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Campaign Description</Label>
            <Textarea id="description" placeholder="Describe the campaign objectives and guidelines" />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="save-as-draft" />
            <Label htmlFor="save-as-draft">Save as draft</Label>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create Campaign</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function getPlatformColor(platform: string) {
  switch (platform) {
    case "instagram":
      return "rose"
    case "tiktok":
      return "cyan"
    default:
      return "slate"
  }
}
