"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Eye, ThumbsUp, MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

      <Tabs defaultValue="all" className="w-full mb-6">
        <div className="flex flex-col gap-4 mb-6">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search campaigns..." className="pl-8" />
          </div>
          <div className="overflow-x-auto">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="all">
          <CampaignList status="all" />
        </TabsContent>

        <TabsContent value="active">
          <CampaignList status="active" />
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
      likes: 1850,
      comments: 320,
    },
    {
      id: 2,
      title: "Brand Challenge",
      type: "Creative Challenge",
      platforms: ["tiktok"],
      dueDate: "Aug 15, 2023",
      status: "draft",
      participants: 0,
      submissions: 0,
      engagement: "0",
      views: "0",
      likes: 0,
      comments: 0,
    },
    {
      id: 3,
      title: "Customer Stories",
      type: "Quick Share",
      platforms: ["instagram", "tiktok"],
      dueDate: "Aug 10, 2023",
      status: "scheduled",
      participants: 28,
      submissions: 22,
      engagement: "9.8K",
      views: "21.4K",
      likes: 780,
      comments: 95,
    },
    {
      id: 4,
      title: "Sustainability Initiative",
      type: "Quick Share",
      platforms: ["instagram"],
      dueDate: "Aug 20, 2023",
      status: "paused",
      participants: 36,
      submissions: 15,
      engagement: "18.3K",
      views: "32.7K",
      likes: 1240,
      comments: 215,
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
      likes: 420,
      comments: 68,
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
      likes: 2450,
      comments: 380,
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
      likes: 0,
      comments: 0,
    },
  ]

  const filteredCampaigns =
    status === "all"
      ? campaigns.filter((campaign) => ["draft", "active", "completed"].includes(campaign.status))
      : campaigns.filter((campaign) => campaign.status === status)

  return (
    <Card>
      <CardHeader className="px-6">
        <CardTitle>
          {status === "all" ? "All Campaigns" : `${status.charAt(0).toUpperCase() + status.slice(1)} Campaigns`}
        </CardTitle>
        <CardDescription>
          {status === "all" && "All campaigns across all statuses"}
          {status === "active" && "Currently running campaigns"}
          {status === "scheduled" && "Upcoming campaigns"}
          {status === "completed" && "Past campaigns"}
          {status === "draft" && "Campaigns in preparation"}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <div className="rounded-md border overflow-x-auto">
          <div className="min-w-max">
            <div className="grid grid-cols-11 p-4 bg-slate-50 text-sm font-medium text-slate-500">
              <div className="col-span-3">Campaign</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-2">Due Date</div>
              <div className="col-span-2">Participants</div>
              <div className="col-span-2">Performance</div>
              <div className="col-span-1">Actions</div>
            </div>

            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign) => (
                <div key={campaign.id} className="grid grid-cols-11 p-4 border-t items-center">
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
                        ${campaign.status === "completed" ? "bg-gray-50 text-gray-600 border-gray-200" : ""}
                        ${campaign.status === "draft" ? "bg-amber-50 text-amber-600 border-amber-200" : ""}
                      `}
                    >
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className="text-sm">{campaign.dueDate}</span>
                  </div>
                  <div className="col-span-2">
                    <div className="flex flex-col">
                      <span className="font-medium">{campaign.participants} Creators</span>
                      <span className="text-xs text-muted-foreground">{campaign.submissions} Submissions</span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{campaign.status === "draft" ? "0" : campaign.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{campaign.status === "draft" ? "0" : campaign.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{campaign.status === "draft" ? "0" : campaign.comments}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <TooltipProvider>
                      <div className="flex gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => router.push(`/admin/campaigns/${campaign.id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Details</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => router.push(`/admin/campaigns/${campaign.id}/edit`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit Campaign</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">No {status} campaigns found.</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
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
