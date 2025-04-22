import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Building,
  Users,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  ArrowRight,
  Settings,
  Shield,
  Activity,
} from "lucide-react"

export default function SuperAdminDashboard() {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform-wide overview and management</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" className="gap-1">
            <Settings className="h-4 w-4" />
            System Settings
          </Button>
          <Button className="gap-1">
            <Building className="h-4 w-4" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Time Period Tabs */}
      <Tabs defaultValue="30days" className="w-full mb-6">
        <TabsList>
          <TabsTrigger value="7days">Last 7 Days</TabsTrigger>
          <TabsTrigger value="30days">Last 30 Days</TabsTrigger>
          <TabsTrigger value="90days">Last 90 Days</TabsTrigger>
          <TabsTrigger value="year">Year to Date</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
            <div className="mt-3 flex items-center text-xs text-green-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              14.3% increase
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,842</div>
            <p className="text-xs text-muted-foreground">+256 from last month</p>
            <div className="mt-3 flex items-center text-xs text-green-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              7.1% increase
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.7%</div>
            <p className="text-xs text-muted-foreground">Uptime this month</p>
            <div className="mt-3 flex items-center text-xs">
              <Badge variant="outline" className="text-xs text-green-500 border-green-500">
                <CheckCircle className="h-3 w-3 mr-1" />
                All Systems Operational
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Platform Usage</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2M</div>
            <p className="text-xs text-muted-foreground">API requests today</p>
            <div className="mt-3 flex items-center text-xs text-green-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              23.5% increase
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Client Overview */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Client Overview</CardTitle>
            <CardDescription>Status of client accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-slate-200 flex items-center justify-center">
                    <Building className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Acme Corporation</p>
                    <div className="flex items-center">
                      <Badge variant="outline" className="text-xs text-green-500 border-green-500 mr-2">
                        Active
                      </Badge>
                      <span className="text-xs text-muted-foreground">Enterprise Plan</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">342 users</p>
                  <p className="text-xs text-muted-foreground">12 campaigns</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-slate-200 flex items-center justify-center">
                    <Building className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">TechNova Inc.</p>
                    <div className="flex items-center">
                      <Badge variant="outline" className="text-xs text-green-500 border-green-500 mr-2">
                        Active
                      </Badge>
                      <span className="text-xs text-muted-foreground">Business Plan</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">128 users</p>
                  <p className="text-xs text-muted-foreground">8 campaigns</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-slate-200 flex items-center justify-center">
                    <Building className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Global Retail Group</p>
                    <div className="flex items-center">
                      <Badge variant="outline" className="text-xs text-amber-500 border-amber-500 mr-2">
                        Trial
                      </Badge>
                      <span className="text-xs text-muted-foreground">14 days left</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">56 users</p>
                  <p className="text-xs text-muted-foreground">3 campaigns</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-slate-200 flex items-center justify-center">
                    <Building className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">HealthPlus Medical</p>
                    <div className="flex items-center">
                      <Badge variant="outline" className="text-xs text-red-500 border-red-500 mr-2">
                        Expired
                      </Badge>
                      <span className="text-xs text-muted-foreground">Renewal needed</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">98 users</p>
                  <p className="text-xs text-muted-foreground">0 campaigns</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline" className="w-full gap-1">
                View All Clients <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Recent system notifications</CardDescription>
            </div>
            <Badge variant="outline" className="ml-2">
              3 New
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3 p-3 rounded-lg border border-amber-200 bg-amber-50">
                <div className="rounded-full bg-amber-100 p-2 h-8 w-8 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">High API Usage Detected</p>
                  <p className="text-xs text-muted-foreground">TechNova Inc. has exceeded 90% of their API quota</p>
                  <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
                </div>
              </div>

              <div className="flex gap-3 p-3 rounded-lg border">
                <div className="rounded-full bg-green-100 p-2 h-8 w-8 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Database Backup Completed</p>
                  <p className="text-xs text-muted-foreground">Daily backup completed successfully</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>

              <div className="flex gap-3 p-3 rounded-lg border border-red-200 bg-red-50">
                <div className="rounded-full bg-red-100 p-2 h-8 w-8 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Security Alert</p>
                  <p className="text-xs text-muted-foreground">
                    Multiple failed login attempts detected for admin account
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                </div>
              </div>

              <div className="flex gap-3 p-3 rounded-lg border">
                <div className="rounded-full bg-blue-100 p-2 h-8 w-8 flex items-center justify-center">
                  <Building className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">New Client Onboarded</p>
                  <p className="text-xs text-muted-foreground">Global Retail Group has been successfully onboarded</p>
                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline" className="w-full">
                View All Alerts
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Platform Analytics */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Platform Analytics</CardTitle>
            <CardDescription>Usage metrics across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">API Requests</p>
                  <span className="text-sm">1.2M / day</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground">75% of capacity</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Storage Usage</p>
                  <span className="text-sm">4.2TB / 5TB</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "84%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground">84% of capacity</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Active Sessions</p>
                  <span className="text-sm">1,245</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "42%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground">42% of capacity</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Database Load</p>
                  <span className="text-sm">65%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 rounded-full" style={{ width: "65%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground">Normal operating range</p>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline" className="w-full">
                View Detailed Analytics
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform-wide actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="rounded-full bg-blue-100 p-2 h-8 w-8 flex items-center justify-center">
                  <Building className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">New client added</span> - Global Retail Group
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="rounded-full bg-green-100 p-2 h-8 w-8 flex items-center justify-center">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">User bulk import completed</span> for TechNova Inc.
                  </p>
                  <p className="text-xs text-muted-foreground">4 hours ago</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="rounded-full bg-violet-100 p-2 h-8 w-8 flex items-center justify-center">
                  <Settings className="h-4 w-4 text-violet-600" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">System settings updated</span> - API rate limits increased
                  </p>
                  <p className="text-xs text-muted-foreground">6 hours ago</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="rounded-full bg-amber-100 p-2 h-8 w-8 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Security policy updated</span> - Password requirements enhanced
                  </p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
