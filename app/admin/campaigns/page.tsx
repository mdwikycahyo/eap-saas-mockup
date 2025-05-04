"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  MoreHorizontal,
  Calendar,
  BarChart3,
  Copy,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminCampaigns() {
  const router = useRouter()

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
  const router = useRouter()

  // This would be fetched from an API in a real application
  const campaigns = [
    {
      id: 1,
      title: "Summer Product Launch",
      type: "Quick Share",
      platforms: ["instagram"],
      dueDate: "Jul 31, 2023",
      status: "active",
      participants: 42,
      submissions: 28,
      engagement: "24.5K",
      views: "45.2K",
    },
    {
      id: 2,
      title: "Brand Challenge",
      type: "Creative Challenge",
      platforms: ["tiktok"],
      dueDate: "Aug 15, 2023",
      status: "active",
      participants: 36,
      submissions: 15,
      engagement: "18.3K",
      views: "32.7K",
    },
    {
      id: 3,
      title: "Customer Stories",
      type: "Quick Share",
      platforms: ["instagram", "tiktok"],
      dueDate: "Aug 10, 2023",
      status: "active",
      participants: 28,
      submissions: 22,
      engagement: "9.8K",
      views: "21.4K",
    },
    {
      id: 4,
      title: "Sustainability Initiative",
      type: "Quick Share",
      platforms: ["instagram"],
      dueDate: "Aug 20, 2023",
      status: "scheduled",
      participants: 0,
      submissions: 0,
      engagement: "0",
      views: "0",
    },
    {
      id: 5,
      title: "Product Tutorial",
      type: "Creative Challenge",
      platforms: ["tiktok"],
      dueDate: "Aug 5, 2023",
      status: "active",
      participants: 18,
      submissions: 7,
      engagement: "5.6K",
      views: "12.8K",
    },
    {
      id: 6,
      title: "Behind the Scenes",
      type: "Creative Challenge",
      platforms: ["instagram", "tiktok"],
      dueDate: "Jul 15, 2023",
      status: "completed",
      participants: 45,
      submissions: 38,
      engagement: "32.1K",
      views: "58.9K",
    },
    {
      id: 7,
      title: "Holiday Campaign",
      type: "Quick Share",
      platforms: ["instagram"],
      dueDate: "Dec 31, 2023",
      status: "draft",
      participants: 0,
      submissions: 0,
      engagement: "0",
      views: "0",
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
        <div className="rounded-md border overflow-hidden">
          <div className="grid grid-cols-12 p-4 bg-slate-50 text-sm font-medium text-slate-500">
            <div className="col-span-3">Campaign</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2">Due Date</div>
            <div className="col-span-2">Participants</div>
            <div className="col-span-1">Views</div>
            <div className="col-span-2">Engagement</div>
            <div className="col-span-1">Actions</div>
          </div>

          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="grid grid-cols-12 p-4 border-t items-center">
                <div className="col-span-3">
                  <p className="font-medium truncate">{campaign.title}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {campaign.type}
                  </Badge>
                </div>
                <div className="col-span-1">
                  <Badge
                    className={`
                    ${campaign.status === "active" ? "bg-green-50 text-green-600 border-green-200" : ""}
                    ${campaign.status === "scheduled" ? "bg-blue-50 text-blue-600 border-blue-200" : ""}
                    ${campaign.status === "completed" ? "bg-gray-50 text-gray-600 border-gray-200" : ""}
                    ${campaign.status === "draft" ? "bg-amber-50 text-amber-600 border-amber-200" : ""}
                  `}
                  >
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </Badge>
                </div>
                <div className="col-span-2 flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span className="text-sm">{campaign.dueDate}</span>
                </div>
                <div className="col-span-2">
                  <div className="flex flex-col">
                    <span className="font-medium">{campaign.participants} Creators</span>
                    <span className="text-xs text-muted-foreground">{campaign.submissions} Submissions</span>
                  </div>
                </div>
                <div className="col-span-1">
                  <span>{campaign.views}</span>
                </div>
                <div className="col-span-2 flex items-center gap-1">
                  <BarChart3 className="h-4 w-4 text-slate-400" />
                  <span>{campaign.engagement}</span>
                </div>
                <div className="col-span-1 flex items-center">
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
  const router = useRouter()

  const handleViewDetails = () => {
    router.push(`/admin/campaigns/${campaign.id}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleViewDetails}>
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/admin/campaigns/${campaign.id}/edit`)}>
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
  const router = useRouter()

  return (
    <Button className="gap-1" onClick={() => router.push("/admin/campaign-create")}>
      <Plus className="h-4 w-4" />
      New Campaign
    </Button>
  )
}
