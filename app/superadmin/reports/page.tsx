"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Download,
  CreditCard,
  DollarSign,
  ArrowUpRight,
  FileText,
  TrendingUp,
  Building,
  Printer,
  FileSpreadsheet,
  FileIcon as FilePdf,
  Mail,
  Clock,
  RefreshCw,
  Eye,
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock data for charts
const monthlyRevenueData = [
  { name: "Jan", revenue: 18500 },
  { name: "Feb", revenue: 21300 },
  { name: "Mar", revenue: 24800 },
  { name: "Apr", revenue: 22400 },
  { name: "May", revenue: 26700 },
  { name: "Jun", revenue: 32450 },
  { name: "Jul", revenue: 34200 },
  { name: "Aug", revenue: 31800 },
  { name: "Sep", revenue: 38500 },
  { name: "Oct", revenue: 42300 },
  { name: "Nov", revenue: 45200 },
  { name: "Dec", revenue: 48900 },
]

const quarterlyRevenueData = [
  { name: "Q1 2022", revenue: 64600 },
  { name: "Q2 2022", revenue: 81550 },
  { name: "Q3 2022", revenue: 104500 },
  { name: "Q4 2022", revenue: 136400 },
  { name: "Q1 2023", revenue: 152300 },
  { name: "Q2 2023", revenue: 189400 },
]

const segmentData = [
  { name: "Enterprise", value: 63 },
  { name: "Business", value: 27 },
  { name: "Small Business", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const clientGrowthData = [
  { name: "Jan", newClients: 5, churnedClients: 1 },
  { name: "Feb", newClients: 8, churnedClients: 2 },
  { name: "Mar", newClients: 12, churnedClients: 3 },
  { name: "Apr", newClients: 7, churnedClients: 2 },
  { name: "May", newClients: 10, churnedClients: 1 },
  { name: "Jun", newClients: 15, churnedClients: 2 },
]

const revenueByPlanData = [
  { name: "Basic", value: 15 },
  { name: "Standard", value: 35 },
  { name: "Premium", value: 40 },
  { name: "Enterprise", value: 10 },
]

export default function FinancialReportingHub() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [reportData, setReportData] = useState<any>(null)

  const handleGenerateReport = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setShowPreview(true)

      // Generate mock report data based on selected report type
      if (selectedReport === "revenue") {
        setReportData({
          title: "Revenue Report - Q2 2023",
          date: "May 3, 2023",
          scope: "All Clients",
          summary:
            "Total revenue for Q2 2023 was $189,400.00, representing a 24.3% increase from the previous quarter. The platform added 42 new subscriptions, with a slight increase in churn rate to 1.2% (+0.1%). Average revenue per client increased by 5.2% to $1,893.42.",
          charts: {
            breakdown: true,
            trend: true,
            topClients: true,
          },
        })
      } else if (selectedReport === "subscription") {
        setReportData({
          title: "Subscription Report - Q2 2023",
          date: "May 3, 2023",
          scope: "All Clients",
          summary:
            "Total active subscriptions at the end of Q2 2023 were 2,350, representing a growth of 8.3% from the previous quarter. New subscription acquisition increased by 15.2%, while churn decreased by 0.3%. The most popular subscription tier remains Premium at 40% of all subscriptions.",
          charts: {
            breakdown: true,
            growth: true,
            planDistribution: true,
          },
        })
      } else if (selectedReport === "churn") {
        setReportData({
          title: "Churn Analysis - Q2 2023",
          date: "May 3, 2023",
          scope: "All Clients",
          summary:
            "Overall churn rate for Q2 2023 was 1.2%, a slight increase of 0.1% from Q1. Enterprise segment showed the lowest churn at 0.5%, while Small Business segment had the highest at 2.8%. The primary reasons for churn were budget constraints (45%) and lack of feature utilization (30%).",
          charts: {
            trend: true,
            segmentAnalysis: true,
            reasons: true,
          },
        })
      } else if (selectedReport === "client") {
        setReportData({
          title: "Client Financial Report - Q2 2023",
          date: "May 3, 2023",
          scope: "All Clients",
          summary:
            "Average revenue per client increased to $1,893.42 in Q2 2023, up 5.2% from Q1. Enterprise clients showed the highest growth at 7.3%, while Small Business clients grew by 3.1%. Client acquisition cost decreased by 8.5% to $450 per client.",
          charts: {
            revenuePerClient: true,
            clientGrowth: true,
            lifetimeValue: true,
          },
        })
      } else if (selectedReport === "forecast") {
        setReportData({
          title: "Financial Forecast - Q3-Q4 2023",
          date: "May 3, 2023",
          scope: "All Clients",
          summary:
            "Based on current growth trends, projected revenue for Q3 2023 is $215,000 (+13.5%) and Q4 2023 is $245,000 (+14%). Subscription growth is expected to continue at 7-9% per quarter, with churn stabilizing around 1.1%. Enterprise segment is projected to be the fastest growing at 18% YoY.",
          charts: {
            revenueForecast: true,
            subscriptionForecast: true,
            segmentGrowth: true,
          },
        })
      }
    }, 1500)
  }

  const openFullPreview = () => {
    setPreviewOpen(true)
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reporting Hub</h1>
          <p className="text-muted-foreground">Comprehensive financial analytics and reporting across the platform</p>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$189,400.00</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                +24.3% <ArrowUpRight className="h-3 w-3 ml-1" />
              </span>
              from last quarter
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                +42 <ArrowUpRight className="h-3 w-3 ml-1" />
              </span>
              new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Revenue Per Client</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,893.42</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                +5.2% <ArrowUpRight className="h-3 w-3 ml-1" />
              </span>
              from last quarter
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 flex items-center">
                +0.1% <ArrowUpRight className="h-3 w-3 ml-1" />
              </span>
              from last quarter
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different financial sections */}
      <Tabs defaultValue="invoices" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>Manage and track all client invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search invoices..." className="pl-8" />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV-001</TableCell>
                    <TableCell>Acme Corp</TableCell>
                    <TableCell>$2,500.00</TableCell>
                    <TableCell>2023-06-15</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Paid
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV-002</TableCell>
                    <TableCell>TechNova Inc.</TableCell>
                    <TableCell>$1,800.00</TableCell>
                    <TableCell>2023-06-20</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Pending
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV-003</TableCell>
                    <TableCell>Global Retail Group</TableCell>
                    <TableCell>$950.00</TableCell>
                    <TableCell>2023-05-28</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Overdue
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV-004</TableCell>
                    <TableCell>HealthPlus Medical</TableCell>
                    <TableCell>$3,200.00</TableCell>
                    <TableCell>2023-06-10</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Paid
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV-005</TableCell>
                    <TableCell>EcoSolutions Ltd.</TableCell>
                    <TableCell>$1,500.00</TableCell>
                    <TableCell>2023-06-25</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Pending
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">Showing 1-5 of 25 invoices</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="bg-slate-100">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions">
          <Card>
            <CardHeader>
              <CardTitle>Subscriptions</CardTitle>
              <CardDescription>Manage client subscription plans and billing cycles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search subscriptions..." className="pl-8" />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Plans</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="trial">Trial</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Billing Cycle</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Next Billing</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Acme Corp</TableCell>
                    <TableCell>Enterprise</TableCell>
                    <TableCell>Annual</TableCell>
                    <TableCell>$25,000.00</TableCell>
                    <TableCell>2024-01-15</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Active
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">TechNova Inc.</TableCell>
                    <TableCell>Business</TableCell>
                    <TableCell>Monthly</TableCell>
                    <TableCell>$1,800.00</TableCell>
                    <TableCell>2023-07-20</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Active
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Global Retail Group</TableCell>
                    <TableCell>Trial</TableCell>
                    <TableCell>N/A</TableCell>
                    <TableCell>$0.00</TableCell>
                    <TableCell>2023-07-10</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Trial
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">HealthPlus Medical</TableCell>
                    <TableCell>Business</TableCell>
                    <TableCell>Annual</TableCell>
                    <TableCell>$19,200.00</TableCell>
                    <TableCell>N/A</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Expired
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">EcoSolutions Ltd.</TableCell>
                    <TableCell>Business</TableCell>
                    <TableCell>Monthly</TableCell>
                    <TableCell>$1,500.00</TableCell>
                    <TableCell>2023-07-25</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Active
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>Detailed breakdown of revenue streams and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Select defaultValue="quarter">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Client Segment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Clients</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="small">Small Business</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2 ml-auto">
                  <Download className="h-4 w-4" />
                  Export Data
                </Button>
              </div>

              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Revenue by Month</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyRevenueData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                        <Legend />
                        <Bar dataKey="revenue" name="Revenue" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Revenue by Client Segment</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={segmentData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {segmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Revenue Metrics</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$32,450.00</div>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-green-500">+12.5%</span> from last month
                        </p>
                        <div className="h-[100px] mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlyRevenueData.slice(-6)}>
                              <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} dot={false} />
                              <XAxis dataKey="name" hide />
                              <YAxis hide />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Annual Recurring Revenue</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$389,400.00</div>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-green-500">+8.3%</span> from last year
                        </p>
                        <div className="h-[100px] mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={quarterlyRevenueData}>
                              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} dot={false} />
                              <XAxis dataKey="name" hide />
                              <YAxis hide />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Customer Lifetime Value</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$15,890.00</div>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-green-500">+5.7%</span> from last quarter
                        </p>
                        <div className="h-[100px] mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={[
                                { name: "2021", value: 12400 },
                                { name: "2022", value: 14200 },
                                { name: "2023", value: 15890 },
                              ]}
                            >
                              <Bar dataKey="value" fill="#ff8042" />
                              <XAxis dataKey="name" hide />
                              <YAxis hide />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Report Generator</CardTitle>
                <CardDescription>Create custom financial reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="report-type">Report Type</Label>
                  <Select onValueChange={setSelectedReport}>
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue">Revenue Report</SelectItem>
                      <SelectItem value="subscription">Subscription Report</SelectItem>
                      <SelectItem value="churn">Churn Analysis</SelectItem>
                      <SelectItem value="client">Client Financial Report</SelectItem>
                      <SelectItem value="forecast">Financial Forecast</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="date-range">Date Range</Label>
                  <Select defaultValue="this-quarter">
                    <SelectTrigger id="date-range">
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="this-month">This Month</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="this-quarter">This Quarter</SelectItem>
                      <SelectItem value="last-quarter">Last Quarter</SelectItem>
                      <SelectItem value="this-year">This Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="client-filter">Client Filter</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="client-filter">
                      <SelectValue placeholder="All Clients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Clients</SelectItem>
                      <SelectItem value="active">Active Clients Only</SelectItem>
                      <SelectItem value="inactive">Inactive Clients Only</SelectItem>
                      <SelectItem value="specific">Specific Client</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Include in Report</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="charts" defaultChecked />
                      <label
                        htmlFor="charts"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Charts and Graphs
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="tables" defaultChecked />
                      <label
                        htmlFor="tables"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Data Tables
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="summary" defaultChecked />
                      <label
                        htmlFor="summary"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Executive Summary
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="trends" defaultChecked />
                      <label
                        htmlFor="trends"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Trend Analysis
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Export Format</Label>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <FilePdf className="h-4 w-4" />
                      PDF
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <FileSpreadsheet className="h-4 w-4" />
                      Excel
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      CSV
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Button variant="outline">Save Template</Button>
                <Button disabled={!selectedReport || isGenerating} onClick={handleGenerateReport} className="gap-2">
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4" />
                      Generate Report
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Report Preview</CardTitle>
                  <CardDescription>Preview of your selected report</CardDescription>
                </div>
                {showPreview && (
                  <Button variant="outline" size="sm" className="gap-1" onClick={openFullPreview}>
                    <Eye className="h-4 w-4" />
                    Full Preview
                  </Button>
                )}
              </CardHeader>
              <CardContent className="min-h-[400px]">
                {!selectedReport && !showPreview ? (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center">
                    <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Select a report type to preview</h3>
                    <p className="text-muted-foreground max-w-md">
                      Choose a report type and configuration options from the left panel to generate a preview.
                    </p>
                  </div>
                ) : isGenerating ? (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center">
                    <RefreshCw className="h-16 w-16 text-primary animate-spin mb-4" />
                    <h3 className="text-lg font-medium mb-2">Generating Report Preview</h3>
                    <p className="text-muted-foreground">This may take a few moments...</p>
                  </div>
                ) : showPreview && reportData ? (
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold mb-2">{reportData.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Generated on {reportData.date} • {reportData.scope}
                        </p>

                        <div className="bg-muted p-4 rounded-md mb-6">
                          <h4 className="font-medium mb-2">Executive Summary</h4>
                          <p className="text-sm">{reportData.summary}</p>
                        </div>

                        {reportData.charts.breakdown && (
                          <div className="mb-6">
                            <h4 className="font-medium mb-2">Revenue Breakdown</h4>
                            <div className="h-[250px] w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                <RechartsPieChart>
                                  <Pie
                                    data={segmentData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                  >
                                    {segmentData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                  </Pie>
                                  <Tooltip />
                                  <Legend />
                                </RechartsPieChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        )}

                        {reportData.charts.trend && (
                          <div className="mb-6">
                            <h4 className="font-medium mb-2">Quarterly Revenue Trend</h4>
                            <div className="h-[250px] w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                  data={quarterlyRevenueData}
                                  margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                  }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                                  <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        )}

                        {reportData.charts.planDistribution && (
                          <div className="mb-6">
                            <h4 className="font-medium mb-2">Revenue by Plan</h4>
                            <div className="h-[250px] w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                <RechartsPieChart>
                                  <Pie
                                    data={revenueByPlanData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                  >
                                    {revenueByPlanData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                  </Pie>
                                  <Tooltip />
                                  <Legend />
                                </RechartsPieChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        )}

                        {reportData.charts.clientGrowth && (
                          <div className="mb-6">
                            <h4 className="font-medium mb-2">Client Growth vs Churn</h4>
                            <div className="h-[250px] w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                  data={clientGrowthData}
                                  margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                  }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip />
                                  <Legend />
                                  <Bar dataKey="newClients" name="New Clients" fill="#82ca9d" />
                                  <Bar dataKey="churnedClients" name="Churned Clients" fill="#ff8042" />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        )}

                        {reportData.charts.topClients && (
                          <div>
                            <h4 className="font-medium mb-2">Top 5 Clients by Revenue</h4>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Client</TableHead>
                                  <TableHead>Revenue</TableHead>
                                  <TableHead>% of Total</TableHead>
                                  <TableHead>YoY Change</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium">Acme Corp</TableCell>
                                  <TableCell>$32,450.00</TableCell>
                                  <TableCell>17.1%</TableCell>
                                  <TableCell className="text-green-600">+15.3%</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">TechNova Inc.</TableCell>
                                  <TableCell>$28,920.00</TableCell>
                                  <TableCell>15.3%</TableCell>
                                  <TableCell className="text-green-600">+22.1%</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">Global Retail Group</TableCell>
                                  <TableCell>$26,780.00</TableCell>
                                  <TableCell>14.1%</TableCell>
                                  <TableCell className="text-red-600">-3.2%</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">HealthPlus Medical</TableCell>
                                  <TableCell>$25,340.00</TableCell>
                                  <TableCell>13.4%</TableCell>
                                  <TableCell className="text-green-600">+8.7%</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">EcoSolutions Ltd.</TableCell>
                                  <TableCell>$24,560.00</TableCell>
                                  <TableCell>13.0%</TableCell>
                                  <TableCell className="text-green-600">+31.5%</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </div>
                    </div>
                  </ScrollArea>
                ) : null}
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1" disabled={!showPreview}>
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1" disabled={!showPreview}>
                    <Clock className="h-4 w-4" />
                    Schedule
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled={!showPreview}>
                    <Printer className="h-4 w-4" />
                    Print
                  </Button>
                  <Button size="sm" disabled={!showPreview}>
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

      </Tabs>

      {/* Full Report Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{reportData?.title || "Report Preview"}</DialogTitle>
            <DialogDescription>Generated on {reportData?.date || "May 3, 2023"}</DialogDescription>
          </DialogHeader>

          {reportData && (
            <div className="space-y-8 py-4">
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Executive Summary</h4>
                <p>{reportData.summary}</p>
              </div>

              {reportData.charts.breakdown && (
                <div>
                  <h4 className="font-medium mb-4">Revenue Breakdown</h4>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={segmentData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {segmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {reportData.charts.trend && (
                <div>
                  <h4 className="font-medium mb-4">Quarterly Revenue Trend</h4>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={quarterlyRevenueData}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                        <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {reportData.charts.clientGrowth && (
                <div>
                  <h4 className="font-medium mb-4">Client Growth vs Churn</h4>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={clientGrowthData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="newClients" name="New Clients" fill="#82ca9d" />
                        <Bar dataKey="churnedClients" name="Churned Clients" fill="#ff8042" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {reportData.charts.topClients && (
                <div>
                  <h4 className="font-medium mb-4">Top 5 Clients by Revenue</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>% of Total</TableHead>
                        <TableHead>YoY Change</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Acme Corp</TableCell>
                        <TableCell>$32,450.00</TableCell>
                        <TableCell>17.1%</TableCell>
                        <TableCell className="text-green-600">+15.3%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">TechNova Inc.</TableCell>
                        <TableCell>$28,920.00</TableCell>
                        <TableCell>15.3%</TableCell>
                        <TableCell className="text-green-600">+22.1%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Global Retail Group</TableCell>
                        <TableCell>$26,780.00</TableCell>
                        <TableCell>14.1%</TableCell>
                        <TableCell className="text-red-600">-3.2%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">HealthPlus Medical</TableCell>
                        <TableCell>$25,340.00</TableCell>
                        <TableCell>13.4%</TableCell>
                        <TableCell className="text-green-600">+8.7%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">EcoSolutions Ltd.</TableCell>
                        <TableCell>$24,560.00</TableCell>
                        <TableCell>13.0%</TableCell>
                        <TableCell className="text-green-600">+31.5%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              )}

              <div className="flex justify-between pt-4 border-t">
                <Button variant="outline" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Email Report
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Printer className="h-4 w-4" />
                    Print
                  </Button>
                  <Button className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
