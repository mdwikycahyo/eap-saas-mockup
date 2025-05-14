"use client"
import { useState } from "react"
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
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Award, Plus, User, History, Clock, Pencil, Mail, MoreHorizontal } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function CreatorManagement() {
  const [isAddCreatorOpen, setIsAddCreatorOpen] = useState(false)

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Creator Management</h1>
          <p className="text-muted-foreground">Manage and monitor your employee advocates</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button className="gap-1" onClick={() => setIsAddCreatorOpen(true)}>
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
            <TabsTrigger value="pending">Invitation Pending</TabsTrigger>
            <TabsTrigger value="top">Top Performers</TabsTrigger>
          </TabsList>
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

        <TabsContent value="pending">
          <CreatorList filter="pending" />
        </TabsContent>

        <TabsContent value="top">
          <CreatorList filter="top" />
        </TabsContent>
      </Tabs>

      {/* Add Creator Dialog */}
      <Dialog open={isAddCreatorOpen} onOpenChange={setIsAddCreatorOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[70vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Creator</DialogTitle>
            <DialogDescription>Add a new employee advocate to your program.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter first name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter last name" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="employee@company.com" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="customer_success">Customer Success</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" placeholder="Job title" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="province">Province</Label>
                <Select>
                  <SelectTrigger id="province">
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jakarta">DKI Jakarta</SelectItem>
                    <SelectItem value="west_java">West Java</SelectItem>
                    <SelectItem value="east_java">East Java</SelectItem>
                    <SelectItem value="central_java">Central Java</SelectItem>
                    <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
                    <SelectItem value="banten">Banten</SelectItem>
                    <SelectItem value="bali">Bali</SelectItem>
                    <SelectItem value="north_sumatra">North Sumatra</SelectItem>
                    <SelectItem value="south_sulawesi">South Sulawesi</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Select>
                  <SelectTrigger id="city">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jakarta">Jakarta</SelectItem>
                    <SelectItem value="bandung">Bandung</SelectItem>
                    <SelectItem value="surabaya">Surabaya</SelectItem>
                    <SelectItem value="semarang">Semarang</SelectItem>
                    <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
                    <SelectItem value="medan">Medan</SelectItem>
                    <SelectItem value="makassar">Makassar</SelectItem>
                    <SelectItem value="denpasar">Denpasar</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="initialPoints">Initial Points</Label>
              <Input id="initialPoints" type="number" defaultValue="0" />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span>Send invitation email</span>
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCreatorOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Creator added",
                  description: "The new creator has been added successfully.",
                })
                setIsAddCreatorOpen(false)
              }}
            >
              Add Creator
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
      province: "DKI Jakarta",
      city: "Jakarta",
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
      province: "West Java",
      city: "Bandung",
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
      province: "East Java",
      city: "Surabaya",
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
      province: "Bali",
      city: "Denpasar",
      status: "pending",
      points: 0,
      posts: 0,
      tier: "",
      engagement: "",
      lastActive: "Never",
    },
    {
      id: "5",
      name: "Lisa Thompson",
      email: "lisa.thompson@company.com",
      department: "HR",
      role: "HR Manager",
      province: "Yogyakarta",
      city: "Yogyakarta",
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
      province: "Central Java",
      city: "Semarang",
      status: "pending",
      points: 0,
      posts: 0,
      tier: "",
      engagement: "",
      lastActive: "Never",
    },
  ]

  let filteredCreators = creators

  if (filter === "active") {
    filteredCreators = creators.filter((creator) => creator.status === "active")
  } else if (filter === "inactive") {
    filteredCreators = creators.filter((creator) => creator.status === "inactive")
  } else if (filter === "pending") {
    filteredCreators = creators.filter((creator) => creator.status === "pending")
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
          {filter === "pending" && "Invitation Pending"}
          {filter === "top" && "Top Performing Creators"}
        </CardTitle>
        <CardDescription>
          {filter === "all" && "Manage all employee advocates"}
          {filter === "active" && "Creators who are actively participating"}
          {filter === "inactive" && "Creators who haven't been active recently"}
          {filter === "pending" && "Creators who have been invited but haven't accepted yet"}
          {filter === "top" && "Your highest performing advocates"}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <div className="overflow-x-auto">
          <div className="rounded-md border min-w-[900px]">
            <div className="grid grid-cols-12 p-4 bg-slate-50 text-sm font-medium text-slate-500">
              <div className="col-span-3">Name</div>
              <div className="col-span-2">Department</div>
              <div className="col-span-2">Points</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Last Active</div>
              <div className="col-span-1 text-center">Actions</div>
            </div>

            {filteredCreators.map((creator) => (
              <div key={creator.id} className="grid grid-cols-12 p-4 border-t items-center">
                <div className="col-span-3 flex items-center gap-3">
                  <div>
                    <p className="font-medium">{creator.name}</p>
                    <p className="text-xs text-muted-foreground">{creator.email}</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <p>{creator.department}</p>
                </div>
                <div className="col-span-2">
                  {creator.status !== "pending" ? (
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-slate-400" />
                      <span className="font-medium">{creator.points.toLocaleString()}</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </div>
                <div className="col-span-2">
                  <Badge
                    variant={
                      creator.status === "active" ? "default" : creator.status === "pending" ? "outline" : "secondary"
                    }
                    className={`capitalize ${creator.status === "pending" ? "border-amber-500 text-amber-500" : ""}`}
                  >
                    {creator.status === "pending" ? "Invitation Pending" : creator.status}
                  </Badge>
                  {creator.status !== "pending" && (
                    <p className="text-xs text-muted-foreground mt-1">{creator.posts} posts</p>
                  )}
                </div>
                <div className="col-span-2">
                  <p className="text-sm">{creator.lastActive}</p>
                </div>
                <div className="col-span-1 flex justify-center">
                  {creator.status === "pending" ? (
                    <PendingCreatorActions creator={creator} />
                  ) : (
                    <RegularCreatorActions creator={creator} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PendingCreatorActions({ creator }: { creator: any }) {
  const [isViewProfileOpen, setIsViewProfileOpen] = useState(false)
  const [isEditCreatorOpen, setIsEditCreatorOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsViewProfileOpen(true)}>
            <User className="h-4 w-4 mr-2" />
            View Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsEditCreatorOpen(true)}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit Creator
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              toast({
                title: "Invitation resent",
                description: `Invitation has been resent to ${creator.name}.`,
              })
            }}
          >
            <Mail className="h-4 w-4 mr-2" />
            Resend Invitation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View Profile Dialog */}
      <Dialog open={isViewProfileOpen} onOpenChange={setIsViewProfileOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[70vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Creator Profile</DialogTitle>
            <DialogDescription>View detailed information about {creator.name}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-slate-200"></div>
              <div>
                <h3 className="text-xl font-semibold">{creator.name}</h3>
                <p className="text-sm text-muted-foreground">{creator.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="border-amber-500 text-amber-500">
                    Invitation Pending
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Department</h4>
                <p>{creator.department}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Role</h4>
                <p>{creator.role}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Province</h4>
                <p>{creator.province}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">City</h4>
                <p>{creator.city}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Invitation Status</h4>
                <p>Pending</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Invitation Sent</h4>
                <p>May 10, 2025</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewProfileOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setIsEditCreatorOpen(true)}>Edit Profile</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Creator Dialog */}
      <Dialog open={isEditCreatorOpen} onOpenChange={setIsEditCreatorOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[70vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Creator</DialogTitle>
            <DialogDescription>Update information for {creator.name}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-firstName">First Name</Label>
                <Input id="edit-firstName" defaultValue={creator.name.split(" ")[0]} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-lastName">Last Name</Label>
                <Input id="edit-lastName" defaultValue={creator.name.split(" ")[1] || ""} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email">Email Address</Label>
              <Input id="edit-email" type="email" defaultValue={creator.email} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-department">Department</Label>
                <Select defaultValue={creator.department.toLowerCase()}>
                  <SelectTrigger id="edit-department">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="customer_success">Customer Success</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Input id="edit-role" defaultValue={creator.role} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-province">Province</Label>
                <Select defaultValue={creator.province.toLowerCase().replace(" ", "_")}>
                  <SelectTrigger id="edit-province">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dki_jakarta">DKI Jakarta</SelectItem>
                    <SelectItem value="west_java">West Java</SelectItem>
                    <SelectItem value="east_java">East Java</SelectItem>
                    <SelectItem value="central_java">Central Java</SelectItem>
                    <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
                    <SelectItem value="banten">Banten</SelectItem>
                    <SelectItem value="bali">Bali</SelectItem>
                    <SelectItem value="north_sumatra">North Sumatra</SelectItem>
                    <SelectItem value="south_sulawesi">South Sulawesi</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-city">City</Label>
                <Select defaultValue={creator.city.toLowerCase()}>
                  <SelectTrigger id="edit-city">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jakarta">Jakarta</SelectItem>
                    <SelectItem value="bandung">Bandung</SelectItem>
                    <SelectItem value="surabaya">Surabaya</SelectItem>
                    <SelectItem value="semarang">Semarang</SelectItem>
                    <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
                    <SelectItem value="medan">Medan</SelectItem>
                    <SelectItem value="makassar">Makassar</SelectItem>
                    <SelectItem value="denpasar">Denpasar</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCreatorOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Creator updated",
                  description: "The creator has been updated successfully.",
                })
                setIsEditCreatorOpen(false)
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

function RegularCreatorActions({ creator }: { creator: any }) {
  const [isViewProfileOpen, setIsViewProfileOpen] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [isEditCreatorOpen, setIsEditCreatorOpen] = useState(false)
  const [isAdjustPointsOpen, setIsAdjustPointsOpen] = useState(false)
  const [points, setPoints] = useState(100)
  const [action, setAction] = useState("add")
  const [reason, setReason] = useState("")

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsViewProfileOpen(true)}>
            <User className="h-4 w-4 mr-2" />
            View Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsEditCreatorOpen(true)}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit Creator
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsHistoryOpen(true)}>
            <History className="h-4 w-4 mr-2" />
            History Point
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsAdjustPointsOpen(true)}>
            <Award className="h-4 w-4 mr-2" />
            Adjust Points
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View Profile Dialog */}
      <Dialog open={isViewProfileOpen} onOpenChange={setIsViewProfileOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[70vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Creator Profile</DialogTitle>
            <DialogDescription>View detailed information about {creator.name}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-slate-200"></div>
              <div>
                <h3 className="text-xl font-semibold">{creator.name}</h3>
                <p className="text-sm text-muted-foreground">{creator.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={creator.status === "active" ? "default" : "secondary"} className="capitalize">
                    {creator.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Department</h4>
                <p>{creator.department}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Role</h4>
                <p>{creator.role}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Province</h4>
                <p>{creator.province}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">City</h4>
                <p>{creator.city}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Points</h4>
                <p className="font-semibold">{creator.points.toLocaleString()}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Posts</h4>
                <p>{creator.posts}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Last Active</h4>
                <p>{creator.lastActive}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Engagement</h4>
                <p>{creator.engagement}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Submitted content for Campaign X - 2 days ago</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Earned 250 points from Campaign Y - 4 days ago</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Joined Campaign Z - 1 week ago</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Campaign Participation</h4>
              <div className="space-y-3">
                <div className="p-3 border rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium">Summer Product Launch</h5>
                      <p className="text-xs text-muted-foreground">Participated on Apr 15, 2025</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>2 submissions • 450 points earned</p>
                  </div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium">Company Anniversary</h5>
                      <p className="text-xs text-muted-foreground">Participated on Mar 10, 2025</p>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>1 submission • 200 points earned</p>
                  </div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium">Winter Sale</h5>
                      <p className="text-xs text-muted-foreground">Participated on Jan 5, 2025</p>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>3 submissions • 600 points earned</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewProfileOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setIsEditCreatorOpen(true)}>Edit Profile</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Creator Dialog */}
      <Dialog open={isEditCreatorOpen} onOpenChange={setIsEditCreatorOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[70vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Creator</DialogTitle>
            <DialogDescription>Update information for {creator.name}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-firstName">First Name</Label>
                <Input id="edit-firstName" defaultValue={creator.name.split(" ")[0]} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-lastName">Last Name</Label>
                <Input id="edit-lastName" defaultValue={creator.name.split(" ")[1] || ""} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email">Email Address</Label>
              <Input id="edit-email" type="email" defaultValue={creator.email} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-department">Department</Label>
                <Select defaultValue={creator.department.toLowerCase()}>
                  <SelectTrigger id="edit-department">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="customer_success">Customer Success</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Input id="edit-role" defaultValue={creator.role} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-province">Province</Label>
                <Select defaultValue={creator.province.toLowerCase().replace(" ", "_")}>
                  <SelectTrigger id="edit-province">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dki_jakarta">DKI Jakarta</SelectItem>
                    <SelectItem value="west_java">West Java</SelectItem>
                    <SelectItem value="east_java">East Java</SelectItem>
                    <SelectItem value="central_java">Central Java</SelectItem>
                    <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
                    <SelectItem value="banten">Banten</SelectItem>
                    <SelectItem value="bali">Bali</SelectItem>
                    <SelectItem value="north_sumatra">North Sumatra</SelectItem>
                    <SelectItem value="south_sulawesi">South Sulawesi</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-city">City</Label>
                <Select defaultValue={creator.city.toLowerCase()}>
                  <SelectTrigger id="edit-city">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jakarta">Jakarta</SelectItem>
                    <SelectItem value="bandung">Bandung</SelectItem>
                    <SelectItem value="surabaya">Surabaya</SelectItem>
                    <SelectItem value="semarang">Semarang</SelectItem>
                    <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
                    <SelectItem value="medan">Medan</SelectItem>
                    <SelectItem value="makassar">Makassar</SelectItem>
                    <SelectItem value="denpasar">Denpasar</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select defaultValue={creator.status}>
                <SelectTrigger id="edit-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCreatorOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Creator updated",
                  description: "The creator has been updated successfully.",
                })
                setIsEditCreatorOpen(false)
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* History Point Dialog */}
      <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[70vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>History Point</DialogTitle>
            <DialogDescription>Point transaction history for {creator.name}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-slate-200"></div>
              <div>
                <p className="font-medium">{creator.name}</p>
                <p className="text-xs text-muted-foreground">
                  Current Balance: {creator.points.toLocaleString()} points
                </p>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="grid grid-cols-12 p-3 bg-slate-50 text-sm font-medium text-slate-500">
                <div className="col-span-2">Date</div>
                <div className="col-span-3">Campaign</div>
                <div className="col-span-4">Description</div>
                <div className="col-span-2">Points</div>
                <div className="col-span-1">Balance</div>
              </div>

              <div className="grid grid-cols-12 p-3 border-t items-center">
                <div className="col-span-2 text-sm">May 4, 2025</div>
                <div className="col-span-3">Summer Launch</div>
                <div className="col-span-4">Content submission approved</div>
                <div className="col-span-2 text-green-600">+250</div>
                <div className="col-span-1">{creator.points.toLocaleString()}</div>
              </div>

              <div className="grid grid-cols-12 p-3 border-t items-center">
                <div className="col-span-2 text-sm">Apr 28, 2025</div>
                <div className="col-span-3">Company Anniversary</div>
                <div className="col-span-4">Content submission approved</div>
                <div className="col-span-2 text-green-600">+200</div>
                <div className="col-span-1">{(creator.points - 250).toLocaleString()}</div>
              </div>

              <div className="grid grid-cols-12 p-3 border-t items-center">
                <div className="col-span-2 text-sm">Apr 15, 2025</div>
                <div className="col-span-3">Quarterly Bonus</div>
                <div className="col-span-4">Quarterly engagement bonus</div>
                <div className="col-span-2 text-green-600">+500</div>
                <div className="col-span-1">{(creator.points - 450).toLocaleString()}</div>
              </div>

              <div className="grid grid-cols-12 p-3 border-t items-center">
                <div className="col-span-2 text-sm">Apr 10, 2025</div>
                <div className="col-span-3">Rewards Store</div>
                <div className="col-span-4">Redeemed Company Swag</div>
                <div className="col-span-2 text-red-600">-300</div>
                <div className="col-span-1">{(creator.points - 950).toLocaleString()}</div>
              </div>

              <div className="grid grid-cols-12 p-3 border-t items-center">
                <div className="col-span-2 text-sm">Mar 22, 2025</div>
                <div className="col-span-3">Product Launch</div>
                <div className="col-span-4">Content submission approved</div>
                <div className="col-span-2 text-green-600">+250</div>
                <div className="col-span-1">{(creator.points - 650).toLocaleString()}</div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsHistoryOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Report downloaded",
                  description: "Point history report has been downloaded",
                })
              }}
            >
              Download Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Adjust Points Dialog */}
      <Dialog open={isAdjustPointsOpen} onOpenChange={setIsAdjustPointsOpen}>
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
                <Input
                  id="points"
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(Number.parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="action">Action</Label>
                <select
                  id="action"
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="add">Add Points</option>
                  <option value="remove">Remove Points</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="reason">Reason</Label>
              <Input
                id="reason"
                placeholder="Reason for adjusting points"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAdjustPointsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                const actionText = action === "add" ? "added to" : "removed from"
                toast({
                  title: "Points adjusted",
                  description: `${points} points have been ${actionText} ${creator.name}'s account.`,
                })
                setIsAdjustPointsOpen(false)
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
