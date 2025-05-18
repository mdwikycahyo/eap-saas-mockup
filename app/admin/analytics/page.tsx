import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, BarChart3, Users, Calendar, Award } from "lucide-react"

export default function AdminAnalytics() {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track performance metrics and generate reports</p>
        </div>
      </div>

      <Tabs defaultValue="creators" className="w-full mb-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="creators">Creator Participation</TabsTrigger>
          <TabsTrigger value="campaigns">Campaign Performance</TabsTrigger>
          <TabsTrigger value="rewards">Reward History</TabsTrigger>
        </TabsList>

        <TabsContent value="creators" className="mt-6">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                title="Active Creators"
                value="42"
                change="+5"
                trend="up"
                icon={<Users className="h-5 w-5 text-purple-500" />}
              />
              <MetricCard
                title="Participation Rate"
                value="68%"
                change="+12%"
                trend="up"
                icon={<BarChart3 className="h-5 w-5 text-green-500" />}
              />
              <MetricCard
                title="Active Campaigns"
                value="8"
                change="+2"
                trend="up"
                icon={<Calendar className="h-5 w-5 text-amber-500" />}
              />
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Creator Participation</CardTitle>
                  <CardDescription>Participation metrics for all creators</CardDescription>
                </div>
                <Button variant="outline" className="gap-1">
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 bg-slate-50 text-sm font-medium text-slate-500">
                    <div className="col-span-3">Creator</div>
                    <div className="col-span-2">Department</div>
                    <div className="col-span-2">Campaigns Joined</div>
                    <div className="col-span-2">Submissions</div>
                    <div className="col-span-3">Points Earned</div>
                  </div>

                  {[
                    {
                      name: "Sarah Johnson",
                      department: "Marketing",
                      role: "Marketing Specialist",
                      campaignsJoined: 8,
                      submissions: 15,
                      pointsEarned: 2450,
                    },
                    {
                      name: "Michael Chen",
                      department: "Product",
                      role: "Product Manager",
                      campaignsJoined: 6,
                      submissions: 12,
                      pointsEarned: 1830,
                    },
                    {
                      name: "Emily Rodriguez",
                      department: "Customer Success",
                      role: "Customer Success Manager",
                      campaignsJoined: 5,
                      submissions: 11,
                      pointsEarned: 1570,
                    },
                    {
                      name: "David Wilson",
                      department: "Sales",
                      role: "Sales Representative",
                      campaignsJoined: 4,
                      submissions: 9,
                      pointsEarned: 1280,
                    },
                    {
                      name: "Lisa Thompson",
                      department: "HR",
                      role: "HR Manager",
                      campaignsJoined: 3,
                      submissions: 5,
                      pointsEarned: 840,
                    },
                  ].map((creator, index) => (
                    <div key={index} className="grid grid-cols-12 p-4 border-t items-center">
                      <div className="col-span-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                        <div>
                          <p className="font-medium">{creator.name}</p>
                          <p className="text-xs text-muted-foreground">{creator.role}</p>
                        </div>
                      </div>
                      <div className="col-span-2">{creator.department}</div>
                      <div className="col-span-2">{creator.campaignsJoined}</div>
                      <div className="col-span-2">{creator.submissions}</div>
                      <div className="col-span-3 flex items-center gap-1">
                        <Award className="h-4 w-4 text-amber-500" />
                        <span>{creator.pointsEarned.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Performance metrics for all campaigns</CardDescription>
              </div>
              <Button variant="outline" className="gap-1">
                <Download className="h-4 w-4" />
                Download Report
              </Button>
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

        <TabsContent value="rewards" className="mt-6">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                title="Total Points Issued"
                value="125.4K"
                change="+15.2K"
                trend="up"
                icon={<Award className="h-5 w-5 text-amber-500" />}
              />
              <MetricCard
                title="Points Redeemed"
                value="78.6K"
                change="+8.3K"
                trend="up"
                icon={<Award className="h-5 w-5 text-green-500" />}
              />
              <MetricCard
                title="Reward Redemptions"
                value="42"
                change="+7"
                trend="up"
                icon={<Award className="h-5 w-5 text-blue-500" />}
              />
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Reward Balance Top-up History</CardTitle>
                  <CardDescription>History of reward balance top-ups</CardDescription>
                </div>
                <Button variant="outline" className="gap-1">
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 bg-slate-50 text-sm font-medium text-slate-500">
                    <div className="col-span-3">Date</div>
                    <div className="col-span-3">Transaction ID</div>
                    <div className="col-span-3">Amount</div>
                    <div className="col-span-3">Status</div>
                  </div>

                  {[
                    {
                      date: "Aug 15, 2023",
                      transactionId: "TRX-2023081501",
                      amount: "50,000 points",
                      status: "Completed",
                    },
                    {
                      date: "Jul 30, 2023",
                      transactionId: "TRX-2023073001",
                      amount: "25,000 points",
                      status: "Completed",
                    },
                    {
                      date: "Jul 15, 2023",
                      transactionId: "TRX-2023071501",
                      amount: "30,000 points",
                      status: "Completed",
                    },
                    {
                      date: "Jun 30, 2023",
                      transactionId: "TRX-2023063001",
                      amount: "20,000 points",
                      status: "Completed",
                    },
                    {
                      date: "Jun 15, 2023",
                      transactionId: "TRX-2023061501",
                      amount: "15,000 points",
                      status: "Completed",
                    },
                  ].map((transaction, index) => (
                    <div key={index} className="grid grid-cols-12 p-4 border-t items-center">
                      <div className="col-span-3">{transaction.date}</div>
                      <div className="col-span-3">
                        <code className="text-xs bg-slate-100 p-1 rounded">{transaction.transactionId}</code>
                      </div>
                      <div className="col-span-3">{transaction.amount}</div>
                      <div className="col-span-3">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Reward Redemption History</CardTitle>
                  <CardDescription>History of rewards redeemed by creators</CardDescription>
                </div>
                <Button variant="outline" className="gap-1">
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 bg-slate-50 text-sm font-medium text-slate-500">
                    <div className="col-span-2">Date</div>
                    <div className="col-span-3">Creator</div>
                    <div className="col-span-3">Reward</div>
                    <div className="col-span-2">Points</div>
                    <div className="col-span-2">Status</div>
                  </div>

                  {[
                    {
                      date: "Aug 12, 2023",
                      creator: "Sarah Johnson",
                      reward: "Company Branded T-Shirt",
                      points: 500,
                      status: "Fulfilled",
                    },
                    {
                      date: "Aug 10, 2023",
                      creator: "Michael Chen",
                      reward: "Coffee Shop Gift Card",
                      points: 1000,
                      status: "Processing",
                    },
                    {
                      date: "Aug 5, 2023",
                      creator: "Emily Rodriguez",
                      reward: "Wireless Earbuds",
                      points: 2500,
                      status: "Fulfilled",
                    },
                    {
                      date: "Jul 28, 2023",
                      creator: "David Wilson",
                      reward: "Premium Notebook Set",
                      points: 750,
                      status: "Fulfilled",
                    },
                    {
                      date: "Jul 20, 2023",
                      creator: "Lisa Thompson",
                      reward: "Coffee Shop Gift Card",
                      points: 1000,
                      status: "Fulfilled",
                    },
                  ].map((redemption, index) => (
                    <div key={index} className="grid grid-cols-12 p-4 border-t items-center">
                      <div className="col-span-2">{redemption.date}</div>
                      <div className="col-span-3">{redemption.creator}</div>
                      <div className="col-span-3">{redemption.reward}</div>
                      <div className="col-span-2 flex items-center gap-1">
                        <Award className="h-4 w-4 text-amber-500" />
                        <span>{redemption.points.toLocaleString()}</span>
                      </div>
                      <div className="col-span-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            redemption.status === "Fulfilled"
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {redemption.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
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
        </div>
      </CardContent>
    </Card>
  )
}
