import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Gift,
  ShoppingBag,
  Award,
  CreditCard,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react"

export default function RewardsManagement() {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Rewards Management</h1>
          <p className="text-muted-foreground">Manage rewards catalog and redemptions</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" asChild>
            <a href="/admin/rewards/redemptions">View Redemptions</a>
          </Button>
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            Add Reward
          </Button>
        </div>
      </div>

      <Tabs defaultValue="catalog" className="w-full mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search rewards..." className="pl-8" />
          </div>
          <TabsList>
            <TabsTrigger value="catalog">Catalog</TabsTrigger>
            <TabsTrigger value="redemptions">Redemptions</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <TabsContent value="catalog">
          <RewardsCatalog />
        </TabsContent>

        <TabsContent value="redemptions">
          <RedemptionsList />
        </TabsContent>

        <TabsContent value="budget">
          <BudgetManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RewardsCatalog() {
  // This would be fetched from an API in a real application
  const rewards = [
    {
      id: "1",
      name: "Company Branded T-Shirt",
      category: "Merchandise",
      points: 500,
      stock: 45,
      status: "active",
      redemptions: 28,
    },
    {
      id: "2",
      name: "Wireless Earbuds",
      category: "Electronics",
      points: 2500,
      stock: 12,
      status: "active",
      redemptions: 8,
    },
    {
      id: "3",
      name: "Coffee Shop Gift Card",
      category: "Gift Cards",
      points: 1000,
      stock: 50,
      status: "active",
      redemptions: 15,
    },
    {
      id: "4",
      name: "Premium Notebook Set",
      category: "Office Supplies",
      points: 750,
      stock: 30,
      status: "active",
      redemptions: 12,
    },
    {
      id: "5",
      name: "Weekend Getaway",
      category: "Experiences",
      points: 10000,
      stock: 3,
      status: "active",
      redemptions: 1,
    },
    {
      id: "6",
      name: "Limited Edition Hoodie",
      category: "Merchandise",
      points: 1200,
      stock: 0,
      status: "out_of_stock",
      redemptions: 20,
    },
  ]

  return (
    <Card>
      <CardHeader className="px-6">
        <CardTitle>Rewards Catalog</CardTitle>
        <CardDescription>Manage available rewards for creators</CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <div className="rounded-md border">
          <div className="grid grid-cols-12 p-4 bg-slate-50 text-sm font-medium text-slate-500">
            <div className="col-span-4">Reward</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Points</div>
            <div className="col-span-2">Stock</div>
            <div className="col-span-2">Actions</div>
          </div>

          {rewards.map((reward) => (
            <div key={reward.id} className="grid grid-cols-12 p-4 border-t items-center">
              <div className="col-span-4 flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded bg-${getCategoryColor(reward.category)}-100 flex items-center justify-center`}
                >
                  {getCategoryIcon(reward.category)}
                </div>
                <div>
                  <p className="font-medium">{reward.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={reward.status === "active" ? "default" : "secondary"}
                      className={
                        reward.status === "out_of_stock" ? "bg-amber-100 text-amber-800 hover:bg-amber-100" : ""
                      }
                    >
                      {reward.status === "active" ? "Active" : "Out of Stock"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{reward.redemptions} redemptions</span>
                  </div>
                </div>
              </div>
              <div className="col-span-2">{reward.category}</div>
              <div className="col-span-2 flex items-center gap-1">
                <Award className="h-4 w-4 text-slate-400" />
                <span>{reward.points.toLocaleString()}</span>
              </div>
              <div className="col-span-2">
                {reward.stock > 0 ? (
                  <span>{reward.stock} available</span>
                ) : (
                  <span className="text-amber-600">Out of stock</span>
                )}
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
                <RewardActionsMenu reward={reward} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function RedemptionsList() {
  // This would be fetched from an API in a real application
  const redemptions = [
    {
      id: "1",
      creator: {
        name: "Sarah Johnson",
        department: "Marketing",
      },
      reward: "Company Branded T-Shirt",
      points: 500,
      status: "fulfilled",
      requestedAt: "Jul 15, 2023",
      fulfilledAt: "Jul 18, 2023",
    },
    {
      id: "2",
      creator: {
        name: "Michael Chen",
        department: "Product",
      },
      reward: "Coffee Shop Gift Card",
      points: 1000,
      status: "pending",
      requestedAt: "Jul 20, 2023",
      fulfilledAt: null,
    },
    {
      id: "3",
      creator: {
        name: "Emily Rodriguez",
        department: "Customer Success",
      },
      reward: "Wireless Earbuds",
      points: 2500,
      status: "processing",
      requestedAt: "Jul 18, 2023",
      fulfilledAt: null,
    },
    {
      id: "4",
      creator: {
        name: "David Wilson",
        department: "Sales",
      },
      reward: "Premium Notebook Set",
      points: 750,
      status: "fulfilled",
      requestedAt: "Jul 10, 2023",
      fulfilledAt: "Jul 14, 2023",
    },
    {
      id: "5",
      creator: {
        name: "Lisa Thompson",
        department: "HR",
      },
      reward: "Coffee Shop Gift Card",
      points: 1000,
      status: "rejected",
      requestedAt: "Jul 5, 2023",
      fulfilledAt: null,
      rejectionReason: "Insufficient points at time of request",
    },
  ]

  return (
    <Card>
      <CardHeader className="px-6">
        <CardTitle>Recent Redemptions</CardTitle>
        <CardDescription>Recent reward redemption requests</CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <div className="rounded-md border">
          <div className="grid grid-cols-12 p-4 bg-slate-50 text-sm font-medium text-slate-500">
            <div className="col-span-3">Creator</div>
            <div className="col-span-3">Reward</div>
            <div className="col-span-2">Points</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Actions</div>
          </div>

          {redemptions.map((redemption) => (
            <div key={redemption.id} className="grid grid-cols-12 p-4 border-t items-center">
              <div className="col-span-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                <div>
                  <p className="font-medium">{redemption.creator.name}</p>
                  <p className="text-xs text-muted-foreground">{redemption.creator.department}</p>
                </div>
              </div>
              <div className="col-span-3">{redemption.reward}</div>
              <div className="col-span-2 flex items-center gap-1">
                <Award className="h-4 w-4 text-slate-400" />
                <span>{redemption.points.toLocaleString()}</span>
              </div>
              <div className="col-span-2">
                <Badge
                  variant="outline"
                  className={`bg-${getStatusColor(redemption.status)}-50 text-${getStatusColor(
                    redemption.status,
                  )}-600 border-${getStatusColor(redemption.status)}-200`}
                >
                  {redemption.status.charAt(0).toUpperCase() + redemption.status.slice(1)}
                </Badge>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  Details
                </Button>
                <RedemptionActionsMenu redemption={redemption} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function BudgetManagement() {
  // This would be fetched from an API in a real application
  const budgetData = {
    totalBudget: 5000000,
    allocated: 3250000,
    remaining: 1750000,
    currency: "IDR",
    monthlyAllocation: 1000000,
    monthlySpent: 750000,
    categories: [
      { name: "Merchandise", allocated: 1500000, spent: 950000 },
      { name: "Electronics", allocated: 1000000, spent: 750000 },
      { name: "Gift Cards", allocated: 500000, spent: 350000 },
      { name: "Experiences", allocated: 1500000, spent: 1000000 },
      { name: "Office Supplies", allocated: 500000, spent: 200000 },
    ],
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Budget Overview</CardTitle>
          <CardDescription>Reward budget allocation and spending</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total Budget</h3>
              <p className="text-2xl font-bold">
                {budgetData.currency} {budgetData.totalBudget.toLocaleString()}
              </p>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${(budgetData.allocated / budgetData.totalBudget) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span>
                  {budgetData.currency} {budgetData.allocated.toLocaleString()} allocated
                </span>
                <span>
                  {budgetData.currency} {budgetData.remaining.toLocaleString()} remaining
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Monthly Budget</h3>
              <p className="text-2xl font-bold">
                {budgetData.currency} {budgetData.monthlyAllocation.toLocaleString()}
              </p>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(budgetData.monthlySpent / budgetData.monthlyAllocation) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span>
                  {budgetData.currency} {budgetData.monthlySpent.toLocaleString()} spent this month
                </span>
                <span>
                  {budgetData.currency} {budgetData.monthlyAllocation - budgetData.monthlySpent} remaining
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <Button className="mb-2">Adjust Budget</Button>
              <Button variant="outline">View Spending History</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budget by Category</CardTitle>
          <CardDescription>Budget allocation and spending by reward category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {budgetData.categories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <h3 className="font-medium">{category.name}</h3>
                  <span className="text-sm">
                    {budgetData.currency} {category.spent.toLocaleString()} / {budgetData.currency}{" "}
                    {category.allocated.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-${getCategoryColor(category.name)}-500 rounded-full`}
                    style={{ width: `${(category.spent / category.allocated) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{Math.round((category.spent / category.allocated) * 100)}% used</span>
                  <span>
                    {budgetData.currency} {category.allocated - category.spent} remaining
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function RewardActionsMenu({ reward }: { reward: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Edit className="h-4 w-4 mr-2" />
          Edit Reward
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Plus className="h-4 w-4 mr-2" />
          Add Stock
        </DropdownMenuItem>
        {reward.status === "active" ? (
          <DropdownMenuItem>
            <XCircle className="h-4 w-4 mr-2" />
            Deactivate
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <CheckCircle className="h-4 w-4 mr-2" />
            Activate
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="text-red-600">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function RedemptionActionsMenu({ redemption }: { redemption: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {redemption.status === "pending" && (
          <>
            <DropdownMenuItem>
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem>
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </DropdownMenuItem>
          </>
        )}
        {redemption.status === "processing" && (
          <DropdownMenuItem>
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark as Fulfilled
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <CreditCard className="h-4 w-4 mr-2" />
          View Transaction
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function getCategoryColor(category: string) {
  switch (category) {
    case "Merchandise":
      return "blue"
    case "Electronics":
      return "purple"
    case "Gift Cards":
      return "green"
    case "Experiences":
      return "amber"
    case "Office Supplies":
      return "rose"
    default:
      return "slate"
  }
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "Merchandise":
      return <ShoppingBag className={`h-5 w-5 text-blue-600`} />
    case "Electronics":
      return <Gift className={`h-5 w-5 text-purple-600`} />
    case "Gift Cards":
      return <CreditCard className={`h-5 w-5 text-green-600`} />
    case "Experiences":
      return <Award className={`h-5 w-5 text-amber-600`} />
    case "Office Supplies":
      return <ShoppingBag className={`h-5 w-5 text-rose-600`} />
    default:
      return <Gift className={`h-5 w-5 text-slate-600`} />
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "fulfilled":
      return "green"
    case "pending":
      return "amber"
    case "processing":
      return "blue"
    case "rejected":
      return "red"
    default:
      return "slate"
  }
}
