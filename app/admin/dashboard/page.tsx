import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Users,
  Megaphone,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Instagram,
  TwitterIcon as TikTok,
  ArrowRight,
  Plus,
  DollarSign,
  CreditCard,
} from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your advocacy program.</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" className="gap-1">
            <BarChart3 className="h-4 w-4" />
            Reports
          </Button>
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Creators</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
            <div className="mt-3 flex items-center text-xs text-green-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              10.3% increase
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 ending this week</p>
            <div className="mt-3 flex items-center text-xs">
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />3 scheduled
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Reward Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 25.5M</div>
            <p className="text-xs text-muted-foreground">Available for redemption</p>
            <div className="mt-3 flex items-center text-xs">
              <Badge variant="outline" className="text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                Budget: Rp 50M
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Redeemed Rewards</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 12.8M</div>
            <p className="text-xs text-muted-foreground">+Rp 3.2M from last month</p>
            <div className="mt-3 flex items-center text-xs text-green-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              33.4% increase
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Campaign Performance */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Top performing campaigns by engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-rose-500 mr-2"></div>
                    <span className="font-medium text-sm">Summer Product Launch</span>
                  </div>
                  <span className="text-sm">24.5K</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></div>
                    <span className="font-medium text-sm">Brand Challenge</span>
                  </div>
                  <span className="text-sm">18.3K</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                    <span className="font-medium text-sm">Customer Stories</span>
                  </div>
                  <span className="text-sm">9.8K</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                    <span className="font-medium text-sm">Sustainability Initiative</span>
                  </div>
                  <span className="text-sm">5.6K</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "25%" }}></div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline" className="w-full" asChild>
                <a href="/admin/campaigns">View All Campaigns</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Content waiting for your review</CardDescription>
            </div>
            <Badge variant="outline" className="ml-2">
              32 Pending
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center">
                  <Instagram className="h-6 w-6 text-slate-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-sm">Sarah Johnson</p>
                      <p className="text-xs text-muted-foreground">Summer Product Launch</p>
                    </div>
                    <Badge>High Priority</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Submitted 2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center">
                  <TikTok className="h-6 w-6 text-slate-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-sm">Michael Chen</p>
                      <p className="text-xs text-muted-foreground">Brand Challenge</p>
                    </div>
                    <Badge variant="outline">Normal</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Submitted 4 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center">
                  <Instagram className="h-6 w-6 text-slate-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-sm">Emily Rodriguez</p>
                      <p className="text-xs text-muted-foreground">Customer Stories</p>
                    </div>
                    <Badge variant="outline">Normal</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Submitted 5 hours ago</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button className="w-full gap-1" asChild>
                <a href="/admin/moderation">
                  Review All <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Top Creators */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Top Creators</CardTitle>
            <CardDescription>Highest performing employee advocates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                  <div>
                    <p className="font-medium text-sm">Sarah Johnson</p>
                    <p className="text-xs text-muted-foreground">Marketing Specialist</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">4,250 pts</p>
                  <p className="text-xs text-muted-foreground">15 posts</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                  <div>
                    <p className="font-medium text-sm">Michael Chen</p>
                    <p className="text-xs text-muted-foreground">Product Manager</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">3,820 pts</p>
                  <p className="text-xs text-muted-foreground">12 posts</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                  <div>
                    <p className="font-medium text-sm">Emily Rodriguez</p>
                    <p className="text-xs text-muted-foreground">Customer Success</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">3,540 pts</p>
                  <p className="text-xs text-muted-foreground">11 posts</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                  <div>
                    <p className="font-medium text-sm">David Wilson</p>
                    <p className="text-xs text-muted-foreground">Sales Representative</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">3,125 pts</p>
                  <p className="text-xs text-muted-foreground">9 posts</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline" className="w-full" asChild>
                <a href="/admin/creators">View All Creators</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in your advocacy program</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="rounded-full bg-green-100 p-2 h-8 w-8 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Content approved</span> for Sarah Johnson
                  </p>
                  <p className="text-xs text-muted-foreground">10 minutes ago</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="rounded-full bg-blue-100 p-2 h-8 w-8 flex items-center justify-center">
                  <Megaphone className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">New campaign created</span> - Product Tutorial
                  </p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="rounded-full bg-amber-100 p-2 h-8 w-8 flex items-center justify-center">
                  <Users className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">5 new creators joined</span> the program
                  </p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="rounded-full bg-red-100 p-2 h-8 w-8 flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Content rejected</span> for David Wilson
                  </p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline" className="w-full" asChild>
                <a href="/admin/activity">View All Activity</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
