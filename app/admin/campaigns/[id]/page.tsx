"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Users,
  Eye,
  ThumbsUp,
  MessageCircle,
  BarChart3,
  Edit,
  Copy,
  Trash2,
  Instagram,
  Download,
  Upload,
  FileText,
  ArrowLeft,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { TikTokIcon } from "@/components/tik-tok-icon"

interface CampaignDetailProps {
  params: {
    id: string
  }
}

export default function CampaignDetail({ params }: CampaignDetailProps) {
  const router = useRouter()

  // This would be fetched from an API in a real application
  const campaign = {
    id: params.id,
    title: "Summer Product Launch",
    description:
      "Share our new summer collection with your followers and highlight your favorite products. This campaign aims to increase awareness of our latest seasonal offerings.",
    type: "Quick Share",
    platforms: ["instagram"],
    startDate: "July 1, 2023",
    endDate: "July 31, 2023",
    status: "active",
    participants: 42,
    submissions: {
      total: 28,
      approved: 22,
      pending: 4,
      rejected: 2,
    },
    engagement: {
      views: 24500,
      likes: 1850,
      comments: 320,
      shares: 175,
    },
    assets: {
      images: 4,
      videos: 1,
      captions: 3,
    },
    requirements: [
      "Post must include product images provided",
      "Caption must include #SummerCollection hashtag",
      "Tag @brandname in your post",
    ],
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">{campaign.title}</h1>
            <Badge className={`bg-green-50 text-green-600 border-green-200`}>Active</Badge>
          </div>
          <p className="text-muted-foreground ml-11">Campaign management and performance tracking</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" className="gap-1">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" className="gap-1">
            <Copy className="h-4 w-4" />
            Duplicate
          </Button>
          <Button variant="destructive" className="gap-1">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="creators">Creators</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Campaign Type</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{campaign.type}</Badge>
                            {campaign.platforms.map((platform) => (
                              <Badge
                                key={platform}
                                className={`bg-${platform === "instagram" ? "rose" : "cyan"}-50 text-${platform === "instagram" ? "rose" : "cyan"}-600 border-${platform === "instagram" ? "rose" : "cyan"}-200`}
                              >
                                {platform === "instagram" ? (
                                  <Instagram className="h-3 w-3 mr-1" />
                                ) : (
                                  <TikTokIcon className="h-3 w-3 mr-1" />
                                )}
                                {platform.charAt(0).toUpperCase() + platform.slice(1)}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Campaign Period</h3>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {campaign.startDate} - {campaign.endDate}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                        <p>{campaign.description}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Requirements</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {campaign.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Participation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Creators Joined</span>
                            <span className="text-sm font-medium">{campaign.participants}</span>
                          </div>
                          <Progress value={70} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">70% of invited creators</p>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Content Submissions</span>
                            <span className="text-sm font-medium">{campaign.submissions.total}</span>
                          </div>
                          <Progress value={67} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">
                            67% of participants have submitted content
                          </p>
                        </div>

                        <div className="pt-2 grid grid-cols-3 gap-2 text-center">
                          <div className="p-2 bg-green-50 rounded-md">
                            <p className="text-sm font-medium text-green-600">{campaign.submissions.approved}</p>
                            <p className="text-xs text-muted-foreground">Approved</p>
                          </div>
                          <div className="p-2 bg-amber-50 rounded-md">
                            <p className="text-sm font-medium text-amber-600">{campaign.submissions.pending}</p>
                            <p className="text-xs text-muted-foreground">Pending</p>
                          </div>
                          <div className="p-2 bg-red-50 rounded-md">
                            <p className="text-sm font-medium text-red-600">{campaign.submissions.rejected}</p>
                            <p className="text-xs text-muted-foreground">Rejected</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Engagement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col items-center p-3 bg-slate-50 rounded-md">
                            <Eye className="h-5 w-5 text-slate-600 mb-1" />
                            <p className="text-lg font-bold">{campaign.engagement.views.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Views</p>
                          </div>
                          <div className="flex flex-col items-center p-3 bg-slate-50 rounded-md">
                            <ThumbsUp className="h-5 w-5 text-slate-600 mb-1" />
                            <p className="text-lg font-bold">{campaign.engagement.likes.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Likes</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col items-center p-3 bg-slate-50 rounded-md">
                            <MessageCircle className="h-5 w-5 text-slate-600 mb-1" />
                            <p className="text-lg font-bold">{campaign.engagement.comments.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Comments</p>
                          </div>
                          <div className="flex flex-col items-center p-3 bg-slate-50 rounded-md">
                            <BarChart3 className="h-5 w-5 text-slate-600 mb-1" />
                            <p className="text-lg font-bold">{campaign.engagement.shares.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Shares</p>
                          </div>
                        </div>

                        <Button variant="outline" className="w-full" asChild>
                          <a href="/admin/campaigns/1/analytics">View Detailed Analytics</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="content" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Assets</CardTitle>
                  <CardDescription>Manage the content assets for this campaign</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="images">
                    <TabsList>
                      <TabsTrigger value="images">Images ({campaign.assets.images})</TabsTrigger>
                      <TabsTrigger value="videos">Videos ({campaign.assets.videos})</TabsTrigger>
                      <TabsTrigger value="captions">Captions ({campaign.assets.captions})</TabsTrigger>
                      <TabsTrigger value="brief">Campaign Brief</TabsTrigger>
                    </TabsList>

                    <TabsContent value="images" className="mt-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Array.from({ length: campaign.assets.images }).map((_, index) => (
                          <div key={index} className="border rounded-md p-2">
                            <div className="aspect-square bg-slate-100 rounded-md mb-2"></div>
                            <div className="flex justify-between">
                              <span className="text-xs text-muted-foreground">image-{index + 1}.jpg</span>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <div className="border border-dashed rounded-md p-2 flex flex-col items-center justify-center">
                          <Upload className="h-6 w-6 text-muted-foreground mb-1" />
                          <span className="text-xs text-muted-foreground">Upload Image</span>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="videos" className="mt-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Array.from({ length: campaign.assets.videos }).map((_, index) => (
                          <div key={index} className="border rounded-md p-2">
                            <div className="aspect-video bg-slate-100 rounded-md mb-2"></div>
                            <div className="flex justify-between">
                              <span className="text-xs text-muted-foreground">video-{index + 1}.mp4</span>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <div className="border border-dashed rounded-md p-2 flex flex-col items-center justify-center">
                          <Upload className="h-6 w-6 text-muted-foreground mb-1" />
                          <span className="text-xs text-muted-foreground">Upload Video</span>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="captions" className="mt-6">
                      <div className="space-y-4">
                        {Array.from({ length: campaign.assets.captions }).map((_, index) => (
                          <div key={index} className="border rounded-md p-4">
                            <div className="flex justify-between mb-2">
                              <span className="font-medium">Caption {index + 1}</span>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Summer is here and so is the new collection from @brandname! 🌞 Check out these amazing
                              new products that are perfect for the season. #SummerCollection #BrandNameSummer
                              #NewArrivals
                            </p>
                          </div>
                        ))}
                        <div className="border border-dashed rounded-md p-4 flex flex-col items-center justify-center">
                          <FileText className="h-6 w-6 text-muted-foreground mb-1" />
                          <span className="text-xs text-muted-foreground">Add Caption</span>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="brief" className="mt-6">
                      <div className="border rounded-md p-4">
                        <div className="flex justify-between mb-4">
                          <span className="font-medium">Campaign Brief Document</span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-1">
                              <Download className="h-4 w-4" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1">
                              <Edit className="h-4 w-4" />
                              Edit
                            </Button>
                          </div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-md">
                          <h3 className="font-medium mb-2">Summer Product Launch Brief</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            This campaign aims to showcase our new summer collection through authentic employee
                            advocacy. Creators should highlight their favorite products from the collection and share
                            how they incorporate them into their summer activities.
                          </p>
                          <h4 className="font-medium text-sm mb-1">Key Messaging Points:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                            <li>Emphasize the versatility of the products</li>
                            <li>Highlight sustainable materials and production</li>
                            <li>Share personal experiences with the products</li>
                            <li>Create authentic, relatable content</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="creators" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Participating Creators</CardTitle>
                    <CardDescription>Creators who have joined this campaign</CardDescription>
                  </div>
                  <Button size="sm" className="gap-1">
                    <Users className="h-4 w-4" />
                    Invite Creators
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 p-4 bg-slate-50 text-sm font-medium text-slate-500">
                      <div className="col-span-4">Creator</div>
                      <div className="col-span-2">Department</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-2">Engagement</div>
                      <div className="col-span-2">Actions</div>
                    </div>

                    {[
                      {
                        name: "Sarah Johnson",
                        department: "Marketing",
                        status: "Approved",
                        engagement: "2.4K",
                        statusColor: "green",
                      },
                      {
                        name: "Michael Chen",
                        department: "Product",
                        status: "Pending",
                        engagement: "1.8K",
                        statusColor: "amber",
                      },
                      {
                        name: "Emily Rodriguez",
                        department: "Customer Success",
                        status: "Approved",
                        engagement: "3.2K",
                        statusColor: "green",
                      },
                      {
                        name: "David Wilson",
                        department: "Sales",
                        status: "Rejected",
                        engagement: "0",
                        statusColor: "red",
                      },
                      {
                        name: "Lisa Thompson",
                        department: "HR",
                        status: "Not Started",
                        engagement: "0",
                        statusColor: "slate",
                      },
                    ].map((creator, index) => (
                      <div key={index} className="grid grid-cols-12 p-4 border-t items-center">
                        <div className="col-span-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                          <div>
                            <p className="font-medium">{creator.name}</p>
                            <p className="text-xs text-muted-foreground">
                              @{creator.name.toLowerCase().replace(" ", "")}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-2">{creator.department}</div>
                        <div className="col-span-2">
                          <Badge
                            variant="outline"
                            className={`bg-${creator.statusColor}-50 text-${creator.statusColor}-600 border-${creator.statusColor}-200`}
                          >
                            {creator.status}
                          </Badge>
                        </div>
                        <div className="col-span-2">{creator.engagement}</div>
                        <div className="col-span-2 flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>Campaign engagement and performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-6 border rounded-md bg-slate-50">
                      <h3 className="font-medium mb-4">Engagement Over Time</h3>
                      <div className="h-64 bg-white rounded-md border p-4 flex items-center justify-center">
                        <BarChart3 className="h-8 w-8 text-slate-300" />
                        <span className="ml-2 text-muted-foreground">Chart visualization would appear here</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 border rounded-md">
                        <h3 className="font-medium mb-4">Platform Breakdown</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <div className="flex items-center">
                                <Instagram className="h-4 w-4 mr-2 text-rose-500" />
                                <span className="text-sm">Instagram</span>
                              </div>
                              <span className="text-sm font-medium">24.5K</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-rose-500 rounded-full" style={{ width: "100%" }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <div className="flex items-center">
                                <TikTokIcon className="h-4 w-4 mr-2 text-cyan-500" />
                                <span className="text-sm">TikTok</span>
                              </div>
                              <span className="text-sm font-medium">0</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-cyan-500 rounded-full" style={{ width: "0%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 border rounded-md">
                        <h3 className="font-medium mb-4">Content Type Performance</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Images</span>
                              <span className="text-sm font-medium">18.3K</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "75%" }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Videos</span>
                              <span className="text-sm font-medium">6.2K</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 rounded-full" style={{ width: "25%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="gap-1">
                        <Download className="h-4 w-4" />
                        Export Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Campaign Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-1">Status</h3>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-50 text-green-600 border-green-200">Active</Badge>
                    <Button variant="outline" size="sm">
                      Change Status
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-1">Timeline</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm">Start Date</p>
                        <p className="text-sm font-medium">{campaign.startDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm">End Date</p>
                        <p className="text-sm font-medium">{campaign.endDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-1">Quick Stats</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-slate-50 rounded-md text-center">
                      <p className="text-xs text-muted-foreground">Participants</p>
                      <p className="text-lg font-bold">{campaign.participants}</p>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-md text-center">
                      <p className="text-xs text-muted-foreground">Submissions</p>
                      <p className="text-lg font-bold">{campaign.submissions.total}</p>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-md text-center">
                      <p className="text-xs text-muted-foreground">Approval Rate</p>
                      <p className="text-lg font-bold">
                        {Math.round((campaign.submissions.approved / campaign.submissions.total) * 100)}%
                      </p>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-md text-center">
                      <p className="text-xs text-muted-foreground">Avg. Engagement</p>
                      <p className="text-lg font-bold">
                        {Math.round(campaign.engagement.views / campaign.submissions.approved).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Users className="h-4 w-4" />
                      Invite Creators
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Upload className="h-4 w-4" />
                      Add Assets
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <BarChart3 className="h-4 w-4" />
                      View Analytics
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
