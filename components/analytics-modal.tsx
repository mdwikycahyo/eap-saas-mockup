"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Instagram, TrendingUp, Users, MessageSquare, Eye, ThumbsUp } from "lucide-react"
import { TikTokIcon } from "@/components/tik-tok-icon"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AnalyticsModalProps {
  isOpen: boolean
  onClose: () => void
  submission: {
    id: number
    campaign: string
    platform: string
    status: string
    date: string
    image: string
    points: number
    engagement?: {
      views: number
      likes: number
      comments: number
    }
    postUrl?: string
  }
}

export function AnalyticsModal({ isOpen, onClose, submission }: AnalyticsModalProps) {
  // Generate some random data for the charts
  const dailyData = Array.from({ length: 7 }, (_, i) => ({
    day: i,
    views: Math.floor(Math.random() * 500) + 100,
    likes: Math.floor(Math.random() * 50) + 10,
    comments: Math.floor(Math.random() * 10) + 1,
  }))

  const demographicData = {
    age: [
      { group: "18-24", percentage: 35 },
      { group: "25-34", percentage: 40 },
      { group: "35-44", percentage: 15 },
      { group: "45+", percentage: 10 },
    ],
    gender: [
      { group: "Female", percentage: 65 },
      { group: "Male", percentage: 35 },
    ],
    location: [
      { country: "Indonesia", percentage: 75 },
      { country: "Singapore", percentage: 10 },
      { country: "Malaysia", percentage: 8 },
      { country: "Other", percentage: 7 },
    ],
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {submission.platform === "instagram" ? (
              <>
                <Instagram className="h-4 w-4" /> Instagram Post Analytics
              </>
            ) : (
              <>
                <TikTokIcon className="h-4 w-4" /> TikTok Video Analytics
              </>
            )}
          </DialogTitle>
          <DialogDescription>Performance metrics for your {submission.campaign} campaign post</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Views</CardDescription>
                  <CardTitle className="text-2xl flex items-center">
                    <Eye className="h-4 w-4 mr-2 text-muted-foreground" />
                    {submission.engagement?.views.toLocaleString() || "0"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12%</span> from average
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Likes</CardDescription>
                  <CardTitle className="text-2xl flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-2 text-muted-foreground" />
                    {submission.engagement?.likes.toLocaleString() || "0"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+8%</span> from average
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Comments</CardDescription>
                  <CardTitle className="text-2xl flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                    {submission.engagement?.comments.toLocaleString() || "0"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+15%</span> from average
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Daily engagement metrics for the past week</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Analytics chart would be displayed here</p>
                  <p className="text-sm">Showing data for views, likes, and comments over time</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Rate</CardTitle>
                <CardDescription>How users are interacting with your content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Like Rate</span>
                      <span className="text-sm font-medium">
                        {Math.round(((submission.engagement?.likes || 0) / (submission.engagement?.views || 1)) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${Math.round(((submission.engagement?.likes || 0) / (submission.engagement?.views || 1)) * 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Comment Rate</span>
                      <span className="text-sm font-medium">
                        {Math.round(
                          ((submission.engagement?.comments || 0) / (submission.engagement?.views || 1)) * 100,
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{
                          width: `${Math.round(((submission.engagement?.comments || 0) / (submission.engagement?.views || 1)) * 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="text-sm font-medium mb-2">Engagement by Time of Day</h4>
                    <div className="h-[200px] flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <p>Time of day chart would be displayed here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audience" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
                <CardDescription>Who is engaging with your content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Age Distribution</h4>
                    {demographicData.age.map((item) => (
                      <div key={item.group} className="mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">{item.group}</span>
                          <span className="text-sm font-medium">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Gender Distribution</h4>
                    <div className="flex items-center h-[100px] mb-4">
                      <div
                        className="bg-blue-500 h-full rounded-l-lg"
                        style={{ width: `${demographicData.gender[1].percentage}%` }}
                      ></div>
                      <div
                        className="bg-pink-500 h-full rounded-r-lg"
                        style={{ width: `${demographicData.gender[0].percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                        <span>Male ({demographicData.gender[1].percentage}%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-pink-500 rounded-full mr-1"></div>
                        <span>Female ({demographicData.gender[0].percentage}%)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Top Locations</h4>
                  <div className="space-y-2">
                    {demographicData.location.map((item) => (
                      <div key={item.country} className="flex items-center justify-between">
                        <span className="text-sm">{item.country}</span>
                        <span className="text-sm font-medium">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audience Insights</CardTitle>
                <CardDescription>Additional information about your audience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[200px]">
                  <div className="text-center text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Audience insights would be displayed here</p>
                    <p className="text-sm">Including interests, behaviors, and other demographic data</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
