"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Download, ArrowLeft, FileText, ImageIcon, VideoIcon, ChevronRight, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { CustomPagination } from "@/components/ui/custom-pagination"

interface CampaignDetailProps {
  params: {
    id: string
  }
}

interface CampaignCreator {
  id: string
  name: string
  email: string
  status: string // "URL Required", "URL Under Review", "Approved", "Rejected"
  province: string
  city: string
  statusColor: string // Tailwind color name e.g. "green", "amber", "blue", "red"
}

interface CampaignAsset {
  id: string
  type: "image" | "video" | "document"
  name: string
  url?: string // for download
  previewUrl?: string // for display
}

interface Campaign {
  id: string
  title: string
  description: string
  platforms: string[]
  startDate: string
  endDate: string
  statusLabel: string // e.g. "Active", "Draft"
  statusColor: string // e.g. "green"
  invited: number
  participants: number
  posted: number // Number of approved content
  submissions: {
    total: number // Total URLs submitted
    approved: number
    pending: number
    rejected: number
  }
  engagement: {
    views: number
    likes: number
    comments: number
    shares: number
  }
  assets: CampaignAsset[]
  creators: CampaignCreator[]
}

const allCampaignsData: Campaign[] = [
  {
    id: "1",
    title: "Summer Product Launch",
    description:
      "Share our new summer collection with your followers and highlight your favorite products. This campaign aims to increase awareness of our latest seasonal offerings. Use the provided assets or create your own content that showcases our products in authentic ways.",
    platforms: ["instagram", "tiktok"],
    startDate: "July 1, 2023",
    endDate: "July 31, 2023",
    statusLabel: "Active",
    statusColor: "green",
    invited: 60,
    participants: 50,
    posted: 28,
    submissions: {
      total: 30,
      approved: 22,
      pending: 4,
      rejected: 4,
    },
    engagement: { views: 24500, likes: 1850, comments: 320, shares: 175 },
    assets: [
      { id: "asset1", type: "image", name: "product_image_1.jpg", previewUrl: "/placeholder.svg?height=100&width=100" },
      { id: "asset2", type: "image", name: "product_image_2.jpg", previewUrl: "/placeholder.svg?height=100&width=100" },
      { id: "asset3", type: "video", name: "promo_video.mp4", previewUrl: "/placeholder.svg?height=100&width=180" },
    ],
    creators: [
      {
        id: "c1",
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        status: "Approved",
        province: "DKI Jakarta",
        city: "Jakarta Selatan",
        statusColor: "green",
      },
      {
        id: "c2",
        name: "Michael Chen",
        email: "michael.c@example.com",
        status: "URL Required",
        province: "West Java",
        city: "Bandung",
        statusColor: "amber",
      },
      {
        id: "c3",
        name: "Emily Rodriguez",
        email: "emily.r@example.com",
        status: "URL Under Review",
        province: "East Java",
        city: "Surabaya",
        statusColor: "blue",
      },
      {
        id: "c4",
        name: "David Wilson",
        email: "david.w@example.com",
        status: "Approved",
        province: "Bali",
        city: "Denpasar",
        statusColor: "green",
      },
      {
        id: "c5_rejected",
        name: "Kevin Rejected",
        email: "kevin.rejected@example.com",
        status: "Rejected",
        province: "Banten",
        city: "Tangerang",
        statusColor: "red",
      },
    ],
  },
  {
    id: "2",
    title: "Brand Challenge",
    description:
      "Unleash your creativity and showcase how our brand inspires you! This campaign is all about authentic storytelling and unique content. Share your personal connection with our brand and how it fits into your lifestyle.",
    platforms: ["tiktok", "instagram"],
    startDate: "August 5, 2023",
    endDate: "September 5, 2023",
    statusLabel: "Active",
    statusColor: "green",
    invited: 50,
    participants: 45,
    posted: 25,
    submissions: {
      total: 30,
      approved: 15,
      pending: 8,
      rejected: 7,
    },
    engagement: { views: 32000, likes: 2500, comments: 450, shares: 200 },
    assets: [
      { id: "asset_brief", type: "document", name: "Campaign_Guidelines.pdf", url: "#" },
    ],
    creators: [
      {
        id: "cc1",
        name: "Alex Green",
        email: "alex.g@example.com",
        status: "URL Required",
        province: "DKI Jakarta",
        city: "Jakarta Pusat",
        statusColor: "amber",
      },
      {
        id: "cc2",
        name: "Brenda Blue",
        email: "brenda.b@example.com",
        status: "URL Under Review",
        province: "West Java",
        city: "Bekasi",
        statusColor: "blue",
      },
      {
        id: "cc3",
        name: "Charles Crimson",
        email: "charles.c@example.com",
        status: "URL Required",
        province: "Central Java",
        city: "Semarang",
        statusColor: "amber",
      },
      {
        id: "cc4",
        name: "Diana Yellow",
        email: "diana.y@example.com",
        status: "URL Under Review",
        province: "Yogyakarta",
        city: "Yogyakarta",
        statusColor: "blue",
      },
      {
        id: "cc5",
        name: "Edward Fuchsia",
        email: "edward.f@example.com",
        status: "Approved",
        province: "East Java",
        city: "Malang",
        statusColor: "green",
      },
      {
        id: "cc6_rejected",
        name: "Gina Rejected",
        email: "gina.rc@example.com",
        status: "Rejected",
        province: "North Sumatra",
        city: "Medan",
        statusColor: "red",
      },
    ],
  },
];

export default function CampaignDetail({ params }: CampaignDetailProps) {
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  const [creatorsCurrentPage, setCreatorsCurrentPage] = useState(1);
  const [creatorsItemsPerPage, setCreatorsItemsPerPage] = useState(5);

  useEffect(() => {
    const foundCampaign = allCampaignsData.find((c) => c.id === params.id);
    if (foundCampaign) {
      setCampaign(foundCampaign);
    } else {
      setCampaign(null);
    }
    setLoading(false);
    setCreatorsCurrentPage(1); // Reset page on campaign change
  }, [params.id]);

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return <div className="p-6 text-center">Loading campaign details...</div>;
  }

  if (!campaign) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Campaign Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The campaign you are looking for does not exist or could not be loaded.
        </p>
        <Button onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  const totalCreatorItems = campaign.creators.length;
  const totalCreatorPages = Math.ceil(totalCreatorItems / creatorsItemsPerPage);
  const paginatedCreators = campaign.creators.slice(
    (creatorsCurrentPage - 1) * creatorsItemsPerPage,
    creatorsCurrentPage * creatorsItemsPerPage,
  );

  const getStatusBadgeClasses = (color: string) => {
    // Mapping for Tailwind JIT compiler
    // bg-green-50 text-green-600 border-green-200
    // bg-amber-50 text-amber-600 border-amber-200
    // bg-blue-50 text-blue-600 border-blue-200
    // bg-purple-50 text-purple-600 border-purple-200
    // bg-indigo-50 text-indigo-600 border-indigo-200
    // bg-red-50 text-red-600 border-red-200
    // bg-slate-50 text-slate-600 border-slate-200
    return `bg-${color}-50 text-${color}-600 border-${color}-200`;
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">{campaign.title}</h1>
            <Badge className={getStatusBadgeClasses(campaign.statusColor)}>{campaign.statusLabel}</Badge>
          </div>
          <p className="text-muted-foreground ml-11">Campaign management and performance tracking</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full" onValueChange={() => setCreatorsCurrentPage(1)}>
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
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Campaign Period</h3>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {campaign.startDate} - {campaign.endDate}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Platforms</h3>
                        <div className="flex gap-2">
                          {campaign.platforms.map((platform) => (
                            <Badge key={platform} variant="outline" className="capitalize">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Description & Brief</h3>
                      <p>{campaign.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Creator Participation</CardTitle>
                    <CardDescription>Campaign funnel from invitation to content creation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
                      {/* Step 1: Invited */}
                      <div className="flex-1 p-4 border rounded-lg text-center flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-center mb-3">
                            <span className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold">
                              1
                            </span>
                          </div>
                          <h4 className="font-semibold text-base mb-1">Creators Invited</h4>
                          <p className="text-xs text-muted-foreground mb-2">Total creators approached for campaign</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold mb-1">{campaign.invited}</p>
                          <p className="text-xs text-muted-foreground">Total approached</p>
                        </div>
                      </div>

                      <div className="hidden md:flex items-center justify-center text-muted-foreground">
                        <ChevronRight className="h-6 w-6" />
                      </div>
                      <div className="flex md:hidden items-center justify-center text-muted-foreground my-2">
                        <ChevronDown className="h-6 w-6" />
                      </div>

                      {/* Step 2: Joined */}
                      <div className="flex-1 p-4 border rounded-lg text-center flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-center mb-3">
                            <span className="bg-amber-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold">
                              2
                            </span>
                          </div>
                          <h4 className="font-semibold text-base mb-1">Creators Joined</h4>
                          <p className="text-xs text-muted-foreground mb-2">Accepted invitation and joined campaign</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold mb-1">{campaign.participants}</p>
                          <p className="text-xs text-muted-foreground">
                            {campaign.invited > 0 ? Math.round((campaign.participants / campaign.invited) * 100) : 0}% of invited
                          </p>
                        </div>
                      </div>

                      <div className="hidden md:flex items-center justify-center text-muted-foreground">
                        <ChevronRight className="h-6 w-6" />
                      </div>
                      <div className="flex md:hidden items-center justify-center text-muted-foreground my-2">
                        <ChevronDown className="h-6 w-6" />
                      </div>

                      {/* Step 3: Approved Content */}
                      <div className="flex-1 p-4 border rounded-lg text-center flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-center mb-3">
                            <span className="bg-green-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold">
                              3
                            </span>
                          </div>
                          <h4 className="font-semibold text-base mb-1">Creators with Approved Content</h4>
                          <p className="text-xs text-muted-foreground mb-2">Creators who have published approved content</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold mb-1">{campaign.posted}</p>
                          <p className="text-xs text-muted-foreground">
                            {campaign.participants > 0 ? Math.round((campaign.posted / campaign.participants) * 100) : 0}% of joined
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
                      {campaign.platforms.includes("instagram") && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm font-medium">Instagram</span>
                            <Badge variant="outline" className="bg-rose-50 text-rose-600 border-rose-200">
                              {campaign.submissions.approved} Posts
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div className="p-3 bg-slate-50 rounded-md text-center">
                              <p className="text-xs text-muted-foreground mb-1">Views</p>
                              <p className="text-lg font-bold">{campaign.engagement.views.toLocaleString()}</p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-md text-center">
                              <p className="text-xs text-muted-foreground mb-1">Likes</p>
                              <p className="text-lg font-bold">{campaign.engagement.likes.toLocaleString()}</p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-md text-center">
                              <p className="text-xs text-muted-foreground mb-1">Comments</p>
                              <p className="text-lg font-bold">{campaign.engagement.comments.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {campaign.platforms.includes("tiktok") && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm font-medium">TikTok</span>
                            <Badge variant="outline" className="bg-cyan-50 text-cyan-600 border-cyan-200">
                              {campaign.submissions.approved} Posts
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div className="p-3 bg-slate-50 rounded-md text-center">
                              <p className="text-xs text-muted-foreground mb-1">Views</p>
                              <p className="text-lg font-bold">{campaign.engagement.views.toLocaleString()}</p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-md text-center">
                              <p className="text-xs text-muted-foreground mb-1">Likes</p>
                              <p className="text-lg font-bold">{campaign.engagement.likes.toLocaleString()}</p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-md text-center">
                              <p className="text-xs text-muted-foreground mb-1">Comments</p>
                              <p className="text-lg font-bold">{campaign.engagement.comments.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      )}
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
                        <Badge className={getStatusBadgeClasses(campaign.statusColor)}>{campaign.statusLabel}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {campaign.startDate} - {campaign.endDate}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 border rounded-md">
                      <h3 className="font-medium mb-3">Performance Summary</h3>
                      <div className="p-3 bg-slate-50 rounded-md text-center">
                        <p className="text-xs text-muted-foreground">Overall Participation Rate</p>
                        <p className="text-lg font-bold">
                          {campaign.invited > 0 ? Math.round((campaign.posted / campaign.invited) * 100) : 0}%
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Invited to Published & Approved</p>
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
              {campaign.assets.length > 0 ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Images & Videos</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {campaign.assets
                        .filter((asset) => asset.type === "image" || asset.type === "video")
                        .map((asset) => (
                          <div key={asset.id} className="border rounded-md p-2">
                            {asset.previewUrl && asset.previewUrl.startsWith("/placeholder.svg") ? (
                              <img
                                src={asset.previewUrl || "/placeholder.svg"}
                                alt={asset.name}
                                className={`w-full ${asset.type === "image" ? "h-24 aspect-square" : "h-24 aspect-video"} object-cover rounded-md mb-2`}
                              />
                            ) : asset.type === "image" ? (
                              <ImageIcon className="w-full h-24 object-cover rounded-md mb-2 text-slate-300" />
                            ) : (
                              <VideoIcon className="w-full h-24 object-cover rounded-md mb-2 text-slate-300" />
                            )}
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground truncate w-3/4">{asset.name}</span>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  {campaign.assets
                    .filter((asset) => asset.type === "document")
                    .map((asset) => (
                      <div key={asset.id}>
                        <h3 className="text-sm font-medium mb-3">Campaign Guidelines</h3>
                        <div className="border rounded-md p-4 mb-4">
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                              <span className="font-medium">{asset.name}</span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                              onClick={() => asset.url && window.open(asset.url, "_blank")}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="aspect-[3/4] bg-slate-100 rounded-md flex items-center justify-center">
                            <p className="text-muted-foreground">PDF Preview (Placeholder)</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No assets provided for this campaign.</p>
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
                  <div className="col-span-3">Creator</div>
                  <div className="col-span-3">Email</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Province/City</div>
                </div>

                {paginatedCreators.map((creator) => (
                  <div key={creator.id} className="grid grid-cols-10 p-4 border-t items-center">
                    <div className="col-span-3">
                      <p className="font-medium">{creator.name}</p>
                    </div>
                    <div className="col-span-3">{creator.email}</div>
                    <div className="col-span-2">
                      <Badge variant="outline" className={getStatusBadgeClasses(creator.statusColor)}>
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
                {paginatedCreators.length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">No creators found for this campaign.</div>
                )}
              </div>
              {totalCreatorItems > 0 && totalCreatorPages > 1 && (
                <CustomPagination
                  currentPage={creatorsCurrentPage}
                  totalPages={totalCreatorPages}
                  totalItems={totalCreatorItems}
                  itemsPerPage={creatorsItemsPerPage}
                  onPageChange={setCreatorsCurrentPage}
                  onItemsPerPageChange={(newItemsPerPage) => {
                    setCreatorsItemsPerPage(newItemsPerPage);
                    setCreatorsCurrentPage(1); // Reset to first page when items per page changes
                  }}
                  itemName="creators"
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
