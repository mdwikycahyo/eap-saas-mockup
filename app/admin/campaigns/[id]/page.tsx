"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Download, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

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
    invited: 60,
    participants: 42,
    posted: 28,
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
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Assets</TabsTrigger>
          <TabsTrigger value="creators">Creators</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
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
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Participation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <h3 className="text-sm font-medium">Creators Status</h3>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 bg-blue-50 rounded-md text-center">
                          <p className="text-xs text-muted-foreground mb-1">Invited</p>
                          <p className="text-lg font-bold text-blue-600">{campaign.invited}</p>
                          <p className="text-xs text-muted-foreground">100% - Base</p>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-md text-center">
                          <p className="text-xs text-muted-foreground mb-1">Joined</p>
                          <p className="text-lg font-bold text-amber-600">{campaign.participants}</p>
                          <p className="text-xs text-muted-foreground">
                            {Math.round((campaign.participants / campaign.invited) * 100)}% of Invited
                          </p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-md text-center">
                          <p className="text-xs text-muted-foreground mb-1">Posted</p>
                          <p className="text-lg font-bold text-green-600">{campaign.posted}</p>
                          <p className="text-xs text-muted-foreground">
                            {Math.round((campaign.posted / campaign.participants) * 100)}% of Joined
                          </p>
                        </div>
                      </div>

                      <h3 className="text-sm font-medium">Content Status</h3>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-3 bg-green-50 rounded-md">
                          <p className="text-xs text-muted-foreground mb-1">Approved</p>
                          <p className="text-lg font-bold text-green-600">{campaign.submissions.approved}</p>
                          <p className="text-xs text-muted-foreground">
                            {Math.round((campaign.submissions.approved / campaign.submissions.total) * 100)}% of
                            submissions
                          </p>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-md">
                          <p className="text-xs text-muted-foreground mb-1">Pending</p>
                          <p className="text-lg font-bold text-amber-600">{campaign.submissions.pending}</p>
                          <p className="text-xs text-muted-foreground">
                            {Math.round((campaign.submissions.pending / campaign.submissions.total) * 100)}% of
                            submissions
                          </p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-md">
                          <p className="text-xs text-muted-foreground mb-1">Rejected</p>
                          <p className="text-lg font-bold text-red-600">{campaign.submissions.rejected}</p>
                          <p className="text-xs text-muted-foreground">
                            {Math.round((campaign.submissions.rejected / campaign.submissions.total) * 100)}% of
                            submissions
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Platform Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm font-medium">Instagram</span>
                          <Badge variant="outline" className="bg-rose-50 text-rose-600 border-rose-200">
                            22 Posts
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="p-3 bg-slate-50 rounded-md text-center">
                            <p className="text-xs text-muted-foreground mb-1">Views</p>
                            <p className="text-lg font-bold">24.5K</p>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-md text-center">
                            <p className="text-xs text-muted-foreground mb-1">Likes</p>
                            <p className="text-lg font-bold">1.85K</p>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-md text-center">
                            <p className="text-xs text-muted-foreground mb-1">Comments</p>
                            <p className="text-lg font-bold">320</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm font-medium">TikTok</span>
                          <Badge variant="outline" className="bg-cyan-50 text-cyan-600 border-cyan-200">
                            0 Posts
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="p-3 bg-slate-50 rounded-md text-center">
                            <p className="text-xs text-muted-foreground mb-1">Views</p>
                            <p className="text-lg font-bold">0</p>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-md text-center">
                            <p className="text-xs text-muted-foreground mb-1">Likes</p>
                            <p className="text-lg font-bold">0</p>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-md text-center">
                            <p className="text-xs text-muted-foreground mb-1">Comments</p>
                            <p className="text-lg font-bold">0</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge className="bg-green-50 text-green-600 border-green-200">Active</Badge>
                        <span className="text-sm text-muted-foreground">
                          {campaign.startDate} - {campaign.endDate}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Campaign is active for 31 days</span>
                      </div>
                    </div>

                    <div className="p-4 border rounded-md">
                      <h3 className="font-medium mb-3">Performance Summary</h3>
                      <div className="p-2 bg-slate-50 rounded-md text-center">
                        <p className="text-xs text-muted-foreground">Approval Rate</p>
                        <p className="text-lg font-bold">
                          {Math.round((campaign.submissions.approved / campaign.submissions.total) * 100)}%
                        </p>
                      </div>
                    </div>
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
              {campaign.type === "Quick Share" ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Images & Videos</h3>
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
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Caption</h3>
                    <Textarea
                      className="min-h-[120px]"
                      defaultValue="Summer is here and so is the new collection from @brandname! 🌞 Check out these amazing new products that are perfect for the season. #SummerCollection #BrandNameSummer #NewArrivals"
                      disabled
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Campaign Brief</h3>
                    <div className="border rounded-md p-4 mb-4">
                      <div className="flex justify-between mb-4">
                        <span className="font-medium">Campaign Brief Document</span>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-4 w-4" />
                          Download PDF
                        </Button>
                      </div>
                      <div className="aspect-[3/4] bg-slate-100 rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground">PDF Preview</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Replace PDF
                      </Button>
                      <Button size="sm">Upload New Version</Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Campaign Brief Text</h3>
                    <Textarea
                      className="min-h-[200px]"
                      defaultValue="This campaign aims to showcase our new summer collection through authentic employee advocacy. Creators should highlight their favorite products from the collection and share how they incorporate them into their summer activities.

Key Messaging Points:
- Emphasize the versatility of the products
- Highlight sustainable materials and production
- Share personal experiences with the products
- Create authentic, relatable content"
                    />
                    <div className="flex justify-end mt-2">
                      <Button size="sm">Save Brief</Button>
                    </div>
                  </div>
                </div>
              )}
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
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-10 p-4 bg-slate-50 text-sm font-medium text-slate-500">
                  <div className="col-span-4">Creator</div>
                  <div className="col-span-2">Department</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Province/City</div>
                </div>

                {[
                  {
                    name: "Sarah Johnson",
                    department: "Marketing",
                    status: "Approved",
                    province: "Jakarta",
                    city: "Jakarta Selatan",
                    statusColor: "green",
                  },
                  {
                    name: "Michael Chen",
                    department: "Product",
                    status: "Pending",
                    province: "West Java",
                    city: "Bandung",
                    statusColor: "amber",
                  },
                  {
                    name: "Emily Rodriguez",
                    department: "Customer Success",
                    status: "Approved",
                    province: "East Java",
                    city: "Surabaya",
                    statusColor: "green",
                  },
                  {
                    name: "David Wilson",
                    department: "Sales",
                    status: "Rejected",
                    province: "Bali",
                    city: "Denpasar",
                    statusColor: "red",
                  },
                  {
                    name: "Lisa Thompson",
                    department: "HR",
                    status: "Not Started",
                    province: "Central Java",
                    city: "Semarang",
                    statusColor: "slate",
                  },
                ].map((creator, index) => (
                  <div key={index} className="grid grid-cols-10 p-4 border-t items-center">
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                      <div>
                        <p className="font-medium">{creator.name}</p>
                        <p className="text-xs text-muted-foreground">@{creator.name.toLowerCase().replace(" ", "")}</p>
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
                    <div className="col-span-2">
                      <div>
                        <p className="text-sm">{creator.province}</p>
                        <p className="text-xs text-muted-foreground">{creator.city}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
