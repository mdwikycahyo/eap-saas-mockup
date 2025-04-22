"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Award, MessageSquare, BarChart3, Plus, Upload, User } from "lucide-react"

export default function CreatorManagement() {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Creator Management</h1>
          <p className="text-muted-foreground">Manage and monitor your employee advocates</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" className="gap-1">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            Add Creator
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search creators..." className="pl-8" />
          </div>
          <TabsList>
            <TabsTrigger value="all">All Creators</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="top">Top Performers</TabsTrigger>
          </TabsList>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <TabsContent value="all">
          <CreatorList filter="all" />
        </TabsContent>

        <TabsContent value="active">
          <CreatorList filter="active" />
        </TabsContent>

        <TabsContent value="inactive">
          <CreatorList filter="inactive" />
        </TabsContent>

        <TabsContent value="top">
          <CreatorList filter="top" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CreatorList({ filter }: { filter: string }) {
  // This would be fetched from an API in a real application
  const creators = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      department: "Marketing",
      role: "Marketing Specialist",
      status: "active",
      points: 4250,
      posts: 15,
      tier: "Silver",
      engagement: "High",
      lastActive: "Today",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.chen@company.com",
      department: "Product",
      role: "Product Manager",
      status: "active",
      points: 3820,
      posts: 12,
      tier: "Silver",
      engagement: "High",
      lastActive: "Yesterday",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@company.com",
      department: "Customer Success",
      role: "Customer Success Manager",
      status: "active",
      points: 3540,
      posts: 11,
      tier: "Silver",
      engagement: "Medium",
      lastActive: "2 days ago",
    },
    {
      id: "4",
      name: "David Wilson",
      email: "david.wilson@company.com",
      department: "Sales",
      role: "Sales Representative",
      status: "active",
      points: 3125,
      posts: 9,
      tier: "Bronze",
      engagement: "Medium",
      lastActive: "3 days ago",
    },
    {
      id: "5",
      name: "Lisa Thompson",
      email: "lisa.thompson@company.com",
      department: "HR",
      role: "HR Manager",
      status: "inactive",
      points: 1850,
      posts: 5,
      tier: "Bronze",
      engagement: "Low",
      lastActive: "2 weeks ago",
    },
    {
      id: "6",
      name: "James Brown",
      email: "james.brown@company.com",
      department: "Engineering",
      role: "Software Engineer",
      status: "active",
      points: 2750,
      posts: 8,
      tier: "Bronze",
      engagement: "Medium",
      lastActive: "1 week ago",
    },
  ]

  let filteredCreators = creators

  if (filter === "active") {
    filteredCreators = creators.filter((creator) => creator.status === "active")
  } else if (filter === "inactive") {
    filteredCreators = creators.filter((creator) => creator.status === "inactive")
  } else if (filter === "top") {
    filteredCreators = creators.sort((a, b) => b.points - a.points).slice(0, 3)
  }

  return (
    <Card>
      <CardHeader className="px-6">
        <CardTitle>
          {filter === "all" && "All Creators"}
          {filter === "active" && "Active Creators"}
          {filter === "inactive" && "Inactive Creators"}
          {filter === "top" && "Top Performing Creators"}
        </CardTitle>
        <CardDescription>
          {filter === "all" && "Manage all employee advocates"}
          {filter === "active" && "Creators who are actively participating"}
          {filter === "inactive" && "Creators who haven't been active recently"}
          {filter === "top" && "Your highest performing advocates"}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <div className="rounded-md border">
          <div className="grid grid-cols-12 p-4 bg-slate-50 text-sm font-medium text-slate-500">
            <div className="col-span-3">Creator</div>
            <div className="col-span-2">Department</div>
            <div className="col-span-2">Points</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Last Active</div>
            <div className="col-span-2">Actions</div>
          </div>

          {filteredCreators.map((creator) => (
            <div key={creator.id} className="grid grid-cols-12 p-4 border-t items-center">
              <div className="col-span-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                <div>
                  <p className="font-medium">{creator.name}</p>
                  <p className="text-xs text-muted-foreground">{creator.email}</p>
                </div>
              </div>
              <div className="col-span-2">
                <p>{creator.department}</p>
                <p className="text-xs text-muted-foreground">{creator.role}</p>
              </div>
              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-slate-400" />
                  <span className="font-medium">{creator.points.toLocaleString()}</span>
                </div>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="text-xs">
                    {creator.tier} Tier
                  </Badge>
                </div>
              </div>
              <div className="col-span-2">
                <Badge variant={creator.status === "active" ? "default" : "secondary"} className="capitalize">
                  {creator.status}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">{creator.posts} posts</p>
              </div>
              <div className="col-span-1">
                <p className="text-sm">{creator.lastActive}</p>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <a href={`/admin/creators/${creator.id}`}>View</a>
                </Button>
                <CreatorActionsMenu creator={creator} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function CreatorActionsMenu({ creator }: { creator: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <User className="h-4 w-4 mr-2" />
          View Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BarChart3 className="h-4 w-4 mr-2" />
          View Analytics
        </DropdownMenuItem>
        <AdjustPointsDialog creator={creator} />
        <DropdownMenuItem>
          <Badge className="h-4 w-4 mr-2" />
          Change Tier
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function AdjustPointsDialog({ creator }: { creator: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Award className="h-4 w-4 mr-2" />
          Adjust Points
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adjust Points</DialogTitle>
          <DialogDescription>Add or remove points for {creator.name}.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-200"></div>
            <div>
              <p className="font-medium">{creator.name}</p>
              <p className="text-sm text-muted-foreground">Current Points: {creator.points}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="points">Points</Label>
              <Input id="points" type="number" defaultValue="100" />
            </div>
            <div>
              <Label htmlFor="action">Action</Label>
              <select
                id="action"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="add">Add Points</option>
                <option value="remove">Remove Points</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="reason">Reason</Label>
            <Input id="reason" placeholder="Reason for adjusting points" />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="button">Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
