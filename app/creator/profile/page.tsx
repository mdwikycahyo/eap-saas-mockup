import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Settings, Clock, CheckCircle, XCircle, Gift } from "lucide-react"

export default function Profile() {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">Manage your account and view your activity</p>
        </div>
        <div className="mt-4 md:mt-0 p-4 bg-slate-100 rounded-lg flex items-center gap-3">
          <Award className="h-5 w-5 text-slate-600" />
          <div>
            <p className="text-sm font-medium">Your Points Balance</p>
            <p className="text-2xl font-bold">3,250</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Sarah Johnson</CardTitle>
            <CardDescription>Marketing Specialist</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-slate-200 mb-4"></div>
              <Badge className="mb-2">Silver Tier</Badge>
              <p className="text-sm text-muted-foreground mb-4">Member since July 2023</p>
              <Button variant="outline" className="w-full gap-1">
                <Settings className="h-4 w-4" /> Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <Tabs defaultValue="stats">
            <TabsList className="mb-4">
              <TabsTrigger value="stats">Performance Stats</TabsTrigger>
              <TabsTrigger value="content">Content History</TabsTrigger>
              <TabsTrigger value="rewards">Reward History</TabsTrigger>
              <TabsTrigger value="settings">Account Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="stats">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Statistics</CardTitle>
                  <CardDescription>Your advocacy performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Total Points Earned</p>
                          <p className="font-medium">3,250</p>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-700 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground">750 points until Gold Tier</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Content Published</p>
                          <p className="font-medium">28</p>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-700 rounded-full" style={{ width: "56%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Campaigns Joined</p>
                          <p className="font-medium">12</p>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-700 rounded-full" style={{ width: "48%" }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Total Views</p>
                          <p className="font-medium">12.4K</p>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-700 rounded-full" style={{ width: "72%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Total Likes</p>
                          <p className="font-medium">1,842</p>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-700 rounded-full" style={{ width: "62%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Approval Rate</p>
                          <p className="font-medium">92%</p>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-700 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Content Publication History</CardTitle>
                  <CardDescription>Your published content across platforms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-slate-100 rounded-md flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                          <div>
                            <h3 className="font-medium">Customer Stories</h3>
                            <p className="text-sm text-muted-foreground">Instagram • July 15, 2023</p>
                          </div>
                          <Badge className="mt-2 sm:mt-0 bg-blue-50 text-blue-600 border-blue-200">Approved</Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-3">
                          <div className="text-xs bg-slate-100 px-2 py-1 rounded-full">1,245 views</div>
                          <div className="text-xs bg-slate-100 px-2 py-1 rounded-full">87 likes</div>
                          <div className="text-xs bg-slate-100 px-2 py-1 rounded-full">12 comments</div>
                          <div className="text-xs bg-slate-100 px-2 py-1 rounded-full">225 points earned</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-slate-100 rounded-md flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                          <div>
                            <h3 className="font-medium">Summer Product Launch</h3>
                            <p className="text-sm text-muted-foreground">Instagram • July 10, 2023</p>
                          </div>
                          <Badge className="mt-2 sm:mt-0 bg-green-50 text-green-600 border-green-200">Submitted</Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-3">
                          <div className="text-xs bg-slate-100 px-2 py-1 rounded-full">Pending approval</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-slate-100 rounded-md flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                          <div>
                            <h3 className="font-medium">Product Feature</h3>
                            <p className="text-sm text-muted-foreground">TikTok • July 5, 2023</p>
                          </div>
                          <Badge className="mt-2 sm:mt-0 bg-red-50 text-red-600 border-red-200">Rejected</Badge>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-red-600">
                            The video quality is too low. Please resubmit with better lighting.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rewards">
              <Card>
                <CardHeader>
                  <CardTitle>Reward Redemption History</CardTitle>
                  <CardDescription>Your redeemed rewards and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="rounded-full bg-amber-100 p-3 flex-shrink-0">
                        <Gift className="h-6 w-6 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                          <div>
                            <h3 className="font-medium">Rp 500.000 Gift Card</h3>
                            <p className="text-sm text-muted-foreground">Redeemed on July 3, 2023</p>
                          </div>
                          <Badge className="mt-2 sm:mt-0 bg-green-50 text-green-600 border-green-200">Fulfilled</Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-3">
                          <div className="text-xs bg-slate-100 px-2 py-1 rounded-full">2,500 points</div>
                          <div className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                            <CheckCircle className="h-3 w-3 inline mr-1" />
                            Delivered on July 5, 2023
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="rounded-full bg-amber-100 p-3 flex-shrink-0">
                        <Gift className="h-6 w-6 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                          <div>
                            <h3 className="font-medium">Company Branded Backpack</h3>
                            <p className="text-sm text-muted-foreground">Redeemed on June 15, 2023</p>
                          </div>
                          <Badge className="mt-2 sm:mt-0 bg-amber-50 text-amber-600 border-amber-200">Processing</Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-3">
                          <div className="text-xs bg-slate-100 px-2 py-1 rounded-full">1,000 points</div>
                          <div className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                            <Clock className="h-3 w-3 inline mr-1" />
                            Estimated delivery: July 25, 2023
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="rounded-full bg-amber-100 p-3 flex-shrink-0">
                        <Gift className="h-6 w-6 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                          <div>
                            <h3 className="font-medium">Movie Tickets</h3>
                            <p className="text-sm text-muted-foreground">Redeemed on May 20, 2023</p>
                          </div>
                          <Badge className="mt-2 sm:mt-0 bg-red-50 text-red-600 border-red-200">Cancelled</Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-3">
                          <div className="text-xs bg-slate-100 px-2 py-1 rounded-full">500 points</div>
                          <div className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                            <XCircle className="h-3 w-3 inline mr-1" />
                            Points refunded
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full p-2 border rounded-md"
                        defaultValue="Sarah Johnson"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full p-2 border rounded-md"
                        defaultValue="sarah.johnson@company.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="department" className="text-sm font-medium">
                        Department
                      </label>
                      <input
                        id="department"
                        type="text"
                        className="w-full p-2 border rounded-md"
                        defaultValue="Marketing"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="social-handles" className="text-sm font-medium">
                        Social Media Handles
                      </label>
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Instagram:</span>
                          <input type="text" className="flex-1 p-2 border rounded-md" defaultValue="@sarah_johnson" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">TikTok:</span>
                          <input type="text" className="flex-1 p-2 border rounded-md" defaultValue="@sarahjohnson" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
