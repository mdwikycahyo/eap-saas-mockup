import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Download, BarChart3, PieChart, LineChart, Share2, Users, Calendar } from "lucide-react"

export default function AdminAnalytics() {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track performance metrics and campaign results</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <DatePicker />
            <span className="text-sm text-muted-foreground">to</span>
            <DatePicker />
          </div>
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="creators">Creators</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <MetricCard
                title="Total Reach"
                value="245.8K"
                change="+12.3%"
                trend="up"
                icon={<Share2 className="h-5 w-5 text-blue-500" />}
              />
              <MetricCard
                title="Engagement Rate"
                value="4.2%"
                change="+0.8%"
                trend="up"
                icon={<BarChart3 className="h-5 w-5 text-green-500" />}
              />
              <MetricCard
                title="Active Creators"
                value="42"
                change="-3"
                trend="down"
                icon={<Users className="h-5 w-5 text-purple-500" />}
              />
              <MetricCard
                title="Active Campaigns"
                value="8"
                change="+2"
                trend="up"
                icon={<Calendar className="h-5 w-5 text-amber-500" />}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Over Time</CardTitle>
                  <CardDescription>Daily engagement metrics across all campaigns</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="h-full w-full flex items-center justify-center bg-slate-50 rounded-md border">
                    <LineChart className="h-8 w-8 text-slate-300" />
                    <span className="ml-2 text-muted-foreground">Engagement trend chart</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                  <CardDescription>Comparison of active campaigns</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="h-full w-full flex items-center justify-center bg-slate-50 rounded-md border">
                    <BarChart3 className="h-8 w-8 text-slate-300" />
                    <span className="ml-2 text-muted-foreground">Campaign performance chart</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Distribution</CardTitle>
                  <CardDescription>Content distribution by platform</CardDescription>
                </CardHeader>
                <CardContent className="h-64">
                  <div className="h-full w-full flex items-center justify-center bg-slate-50 rounded-md border">
                    <PieChart className="h-8 w-8 text-slate-300" />
                    <span className="ml-2 text-muted-foreground">Platform distribution chart</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Type Performance</CardTitle>
                  <CardDescription>Engagement by content type</CardDescription>
                </CardHeader>
                <CardContent className="h-64">
                  <div className="h-full w-full flex items-center justify-center bg-slate-50 rounded-md border">
                    <BarChart3 className="h-8 w-8 text-slate-300" />
                    <span className="ml-2 text-muted-foreground">Content type chart</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Creators</CardTitle>
                  <CardDescription>Highest performing advocates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Sarah Johnson", department: "Marketing", engagement: "12.4K" },
                      { name: "Michael Chen", department: "Product", engagement: "9.8K" },
                      { name: "Emily Rodriguez", department: "Customer Success", engagement: "8.5K" },
                      { name: "David Wilson", department: "Sales", engagement: "7.2K" },
                      { name: "Lisa Thompson", department: "HR", engagement: "6.9K" },
                    ].map((creator, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                            <span className="text-xs font-medium">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">{creator.name}</p>
                            <p className="text-xs text-muted-foreground">{creator.department}</p>
                          </div>
                        </div>
                        <div className="text-sm font-medium">{creator.engagement}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Campaign Analytics</CardTitle>
                <CardDescription>Performance metrics for all campaigns</CardDescription>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campaigns</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 p-4 bg-slate-50 text-sm font-medium text-slate-500">
                  <div className="col-span-3">Campaign</div>
                  <div className="col-span-2">Period</div>
                  <div className="col-span-2">Creators</div>
                  <div className="col-span-2">Submissions</div>
                  <div className="col-span-3">Engagement</div>
                </div>

                {[
                  {
                    name: "Summer Product Launch",
                    period: "Jul 1 - Jul 31, 2023",
                    creators: 42,
                    submissions: 28,
                    views: "24.5K",
                    likes: "1.8K",
                    comments: "320",
                  },
                  {
                    name: "Brand Challenge",
                    period: "Jul 15 - Aug 15, 2023",
                    creators: 36,
                    submissions: 15,
                    views: "18.3K",
                    likes: "1.2K",
                    comments: "245",
                  },
                  {
                    name: "Customer Stories",
                    period: "Jul 10 - Aug 10, 2023",
                    creators: 28,
                    submissions: 22,
                    views: "9.8K",
                    likes: "780",
                    comments: "156",
                  },
                  {
                    name: "Product Tutorial",
                    period: "Jul 5 - Aug 5, 2023",
                    creators: 18,
                    submissions: 7,
                    views: "5.6K",
                    likes: "420",
                    comments: "85",
                  },
                  {
                    name: "Behind the Scenes",
                    period: "Jun 15 - Jul 15, 2023",
                    creators: 45,
                    submissions: 38,
                    views: "32.1K",
                    likes: "2.4K",
                    comments: "510",
                  },
                ].map((campaign, index) => (
                  <div key={index} className="grid grid-cols-12 p-4 border-t items-center">
                    <div className="col-span-3">
                      <p className="font-medium">{campaign.name}</p>
                    </div>
                    <div className="col-span-2 text-sm">{campaign.period}</div>
                    <div className="col-span-2">{campaign.creators}</div>
                    <div className="col-span-2">{campaign.submissions}</div>
                    <div className="col-span-3">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                          <span className="text-sm font-medium">{campaign.views}</span>
                          <span className="text-xs text-muted-foreground">Views</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-sm font-medium">{campaign.likes}</span>
                          <span className="text-xs text-muted-foreground">Likes</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-sm font-medium">{campaign.comments}</span>
                          <span className="text-xs text-muted-foreground">Comments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="creators" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Creator Analytics</CardTitle>
                <CardDescription>Performance metrics for all creators</CardDescription>
              </div>
              <Select defaultValue="engagement">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engagement">Highest Engagement</SelectItem>
                  <SelectItem value="posts">Most Posts</SelectItem>
                  <SelectItem value="recent">Recently Active</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 p-4 bg-slate-50 text-sm font-medium text-slate-500">
                  <div className="col-span-3">Creator</div>
                  <div className="col-span-2">Department</div>
                  <div className="col-span-2">Posts</div>
                  <div className="col-span-2">Avg. Engagement</div>
                  <div className="col-span-3">Total Reach</div>
                </div>

                {[
                  {
                    name: "Sarah Johnson",
                    department: "Marketing",
                    role: "Marketing Specialist",
                    posts: 15,
                    avgEngagement: "4.2%",
                    totalReach: "24.5K",
                  },
                  {
                    name: "Michael Chen",
                    department: "Product",
                    role: "Product Manager",
                    posts: 12,
                    avgEngagement: "3.8%",
                    totalReach: "18.3K",
                  },
                  {
                    name: "Emily Rodriguez",
                    department: "Customer Success",
                    role: "Customer Success Manager",
                    posts: 11,
                    avgEngagement: "3.5%",
                    totalReach: "15.7K",
                  },
                  {
                    name: "David Wilson",
                    department: "Sales",
                    role: "Sales Representative",
                    posts: 9,
                    avgEngagement: "3.1%",
                    totalReach: "12.8K",
                  },
                  {
                    name: "Lisa Thompson",
                    department: "HR",
                    role: "HR Manager",
                    posts: 5,
                    avgEngagement: "2.8%",
                    totalReach: "8.4K",
                  },
                ].map((creator, index) => (
                  <div key={index} className="grid grid-cols-12 p-4 border-t items-center">
                    <div className="col-span-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                      <div>
                        <p className="font-medium">{creator.name}</p>
                        <p className="text-xs text-muted-foreground">@{creator.name.toLowerCase().replace(" ", "")}</p>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <p>{creator.department}</p>
                      <p className="text-xs text-muted-foreground">{creator.role}</p>
                    </div>
                    <div className="col-span-2">{creator.posts}</div>
                    <div className="col-span-2">{creator.avgEngagement}</div>
                    <div className="col-span-3">{creator.totalReach}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Content Analytics</CardTitle>
                <CardDescription>Performance metrics by content type</CardDescription>
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="images">Images</SelectItem>
                    <SelectItem value="videos">Videos</SelectItem>
                    <SelectItem value="stories">Stories</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">View Details</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-80 flex items-center justify-center bg-slate-50 rounded-md border">
                  <BarChart3 className="h-8 w-8 text-slate-300" />
                  <span className="ml-2 text-muted-foreground">Content performance by type</span>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Images</h3>
                      <span className="text-sm">65% of content</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Avg. Engagement: 3.8%</span>
                      <span>Total Posts: 48</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Videos</h3>
                      <span className="text-sm">25% of content</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "25%" }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Avg. Engagement: 4.5%</span>
                      <span>Total Posts: 18</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Stories</h3>
                      <span className="text-sm">10% of content</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Avg. Engagement: 2.9%</span>
                      <span>Total Posts: 8</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>Performance metrics by social platform</CardDescription>
              </div>
              <Button variant="outline" className="gap-1">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Instagram</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold">42</span>
                          <span className="text-sm text-muted-foreground">Posts</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold">128.5K</span>
                          <span className="text-sm text-muted-foreground">Reach</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="flex flex-col">
                          <span className="text-lg font-bold">9.8K</span>
                          <span className="text-xs text-muted-foreground">Likes</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-lg font-bold">1.2K</span>
                          <span className="text-xs text-muted-foreground">Comments</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-lg font-bold">3.4K</span>
                          <span className="text-xs text-muted-foreground">Shares</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Engagement Rate</span>
                          <span className="text-sm font-medium">4.2%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-rose-500 rounded-full" style={{ width: "42%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">TikTok</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold">28</span>
                          <span className="text-sm text-muted-foreground">Posts</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold">95.2K</span>
                          <span className="text-sm text-muted-foreground">Reach</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="flex flex-col">
                          <span className="text-lg font-bold">7.5K</span>
                          <span className="text-xs text-muted-foreground">Likes</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-lg font-bold">980</span>
                          <span className="text-xs text-muted-foreground">Comments</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-lg font-bold">4.2K</span>
                          <span className="text-xs text-muted-foreground">Shares</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Engagement Rate</span>
                          <span className="text-sm font-medium">5.1%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500 rounded-full" style={{ width: "51%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Platform Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[220px] flex items-center justify-center bg-slate-50 rounded-md border">
                      <PieChart className="h-8 w-8 text-slate-300" />
                      <span className="ml-2 text-muted-foreground">Platform comparison chart</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MetricCard({ title, value, change, trend, icon }: any) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">{icon}</div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold">{value}</p>
            <p
              className={`text-xs ${
                trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-muted-foreground"
              }`}
            >
              {change} from last month
            </p>
          </div>
          <div className="h-10 w-16 bg-slate-50 rounded"></div>
        </div>
      </CardContent>
    </Card>
  )
}
