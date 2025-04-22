"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Users, Eye, ThumbsUp, Instagram, ArrowRight, Gift } from "lucide-react"
import { CampaignStatusBadge } from "@/components/campaign-status-badge"
import { TikTokIcon } from "@/components/tik-tok-icon"
import { CampaignModal } from "@/components/campaign-modal"

export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState("all")

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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.points.value}</div>
            <p className="text-xs text-muted-foreground">{currentMetrics.points.change}</p>
            <Progress value={65} className="h-2 mt-3" />
            <p className="text-xs text-muted-foreground mt-2">Silver Tier (750 points until Gold)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Content Published</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.content.value}</div>
            <p className="text-xs text-muted-foreground">{currentMetrics.content.change}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.views.value}</div>
            <p className="text-xs text-muted-foreground">{currentMetrics.views.change}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Likes</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
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
        <Card className="overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-rose-400 to-rose-600 relative">
            <div className="absolute bottom-3 left-3">
              <Badge variant="secondary">Quick Share</Badge>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Summer Product Launch</h3>
                <p className="text-sm text-muted-foreground">Share our new summer collection</p>
              </div>
              <CampaignStatusBadge status="Submitted" />
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">Ends in 5 days</div>
              <Button
                size="sm"
                className="gap-1"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-campaign-modal", { detail: "summer-launch" }))
                }
              >
                View <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-cyan-400 to-cyan-600 relative">
            <div className="absolute bottom-3 left-3">
              <Badge variant="secondary">Creative Challenge</Badge>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Brand Challenge</h3>
                <p className="text-sm text-muted-foreground">Create a video using our hashtag</p>
              </div>
              <CampaignStatusBadge status="Joined" />
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">Ends in 12 days</div>
              <Button
                size="sm"
                className="gap-1"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-campaign-modal", { detail: "brand-challenge" }))
                }
              >
                View <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-amber-400 to-amber-600 relative">
            <div className="absolute bottom-3 left-3">
              <Badge variant="secondary">Quick Share</Badge>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Customer Stories</h3>
                <p className="text-sm text-muted-foreground">Share testimonials from happy customers</p>
              </div>
              <CampaignStatusBadge status="Live" />
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">Ends in 8 days</div>
              <Button
                size="sm"
                className="gap-1"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-campaign-modal", { detail: "customer-stories" }))
                }
              >
                View <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <Card>
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
          <CardDescription>Your recent advocacy activities and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 border-b pb-4">
              <div className="rounded-full bg-rose-100 p-2">
                <Instagram className="h-4 w-4 text-rose-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">Instagram post approved</h4>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your post for the Summer Product Launch campaign has been approved. +250 points awarded!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 border-b pb-4">
              <div className="rounded-full bg-cyan-100 p-2">
                <TikTokIcon className="h-4 w-4 text-cyan-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">New TikTok campaign available</h4>
                  <span className="text-sm text-muted-foreground">Yesterday</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  A new Brand Challenge campaign is now available for TikTok. Join now to participate!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 border-b pb-4">
              <div className="rounded-full bg-emerald-100 p-2">
                <Award className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">Level up!</h4>
                  <span className="text-sm text-muted-foreground">3 days ago</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Congratulations! You've reached Silver Tier. New rewards are now available in the catalog.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-amber-100 p-2">
                <Gift className="h-4 w-4 text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">Reward redeemed</h4>
                  <span className="text-sm text-muted-foreground">1 week ago</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  You've redeemed a Rp 500.000 gift card. Your reward will be processed within 2 business days.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Modal */}
      <CampaignModal />
    </div>
  )
}
