import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Upload,
  UserPlus,
  User,
  Shield,
  Key,
  Lock,
  CheckCircle,
  XCircle,
} from "lucide-react"

export default function UserAdministration() {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Administration</h1>
          <p className="text-muted-foreground">Manage users and their access across the platform</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" className="gap-1" asChild>
            <a href="/superadmin/users/import">
              <Upload className="h-4 w-4" />
              Import Users
            </a>
          </Button>
          <Button className="gap-1" asChild>
            <a href="/superadmin/users/create">
              <UserPlus className="h-4 w-4" />
              Add User
            </a>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search users..." className="pl-8" />
          </div>
          <TabsList>
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
            <TabsTrigger value="creators">Creators</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <TabsContent value="all">
          <UserList filter="all" />
        </TabsContent>

        <TabsContent value="admins">
          <UserList filter="admin" />
        </TabsContent>

        <TabsContent value="creators">
          <UserList filter="creator" />
        </TabsContent>

        <TabsContent value="pending">
          <UserList filter="pending" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function UserList({ filter }: { filter: string }) {
  // This would be fetched from an API in a real application
  const users = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "Admin",
      client: "Acme Corp",
      status: "active",
      lastActive: "Today",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.chen@company.com",
      role: "Creator",
      client: "Acme Corp",
      status: "active",
      lastActive: "Yesterday",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@company.com",
      role: "Creator",
      client: "Globex Inc",
      status: "active",
      lastActive: "2 days ago",
    },
    {
      id: "4",
      name: "David Wilson",
      email: "david.wilson@company.com",
      role: "Admin",
      client: "Globex Inc",
      status: "active",
      lastActive: "3 days ago",
    },
    {
      id: "5",
      name: "Lisa Thompson",
      email: "lisa.thompson@company.com",
      role: "Creator",
      client: "Initech",
      status: "inactive",
      lastActive: "2 weeks ago",
    },
    {
      id: "6",
      name: "James Brown",
      email: "james.brown@company.com",
      role: "Creator",
      client: "Acme Corp",
      status: "pending",
      lastActive: "Never",
    },
    {
      id: "7",
      name: "Robert Smith",
      email: "robert.smith@company.com",
      role: "Super Admin",
      client: "System",
      status: "active",
      lastActive: "Today",
    },
  ]

  let filteredUsers = users

  if (filter === "admin") {
    filteredUsers = users.filter((user) => user.role === "Admin" || user.role === "Super Admin")
  } else if (filter === "creator") {
    filteredUsers = users.filter((user) => user.role === "Creator")
  } else if (filter === "pending") {
    filteredUsers = users.filter((user) => user.status === "pending")
  }

  return (
    <Card>
      <CardHeader className="px-6">
        <CardTitle>
          {filter === "all" && "All Users"}
          {filter === "admin" && "Administrators"}
          {filter === "creator" && "Creators"}
          {filter === "pending" && "Pending Users"}
        </CardTitle>
        <CardDescription>
          {filter === "all" && "Manage all users across the platform"}
          {filter === "admin" && "Manage administrator accounts"}
          {filter === "creator" && "Manage creator accounts"}
          {filter === "pending" && "Users awaiting activation"}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <div className="rounded-md border">
          <div className="grid grid-cols-12 p-4 bg-slate-50 text-sm font-medium text-slate-500">
            <div className="col-span-3">User</div>
            <div className="col-span-2">Role</div>
            <div className="col-span-2">Client</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Last Active</div>
            <div className="col-span-2">Actions</div>
          </div>

          {filteredUsers.map((user) => (
            <div key={user.id} className="grid grid-cols-12 p-4 border-t items-center">
              <div className="col-span-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="col-span-2">
                <Badge
                  variant="outline"
                  className={`${
                    user.role === "Super Admin"
                      ? "bg-purple-50 text-purple-600 border-purple-200"
                      : user.role === "Admin"
                        ? "bg-blue-50 text-blue-600 border-blue-200"
                        : "bg-green-50 text-green-600 border-green-200"
                  }`}
                >
                  {user.role}
                </Badge>
              </div>
              <div className="col-span-2">{user.client}</div>
              <div className="col-span-2">
                <Badge
                  variant={user.status === "active" ? "default" : user.status === "pending" ? "outline" : "secondary"}
                  className={
                    user.status === "pending" ? "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-50" : ""
                  }
                >
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </Badge>
              </div>
              <div className="col-span-1">
                <p className="text-sm">{user.lastActive}</p>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <a href={`/superadmin/users/${user.id}`}>View</a>
                </Button>
                <UserActionsMenu user={user} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function UserActionsMenu({ user }: { user: any }) {
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
          Edit Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Shield className="h-4 w-4 mr-2" />
          Change Role
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Key className="h-4 w-4 mr-2" />
          Reset Password
        </DropdownMenuItem>
        {user.status === "active" ? (
          <DropdownMenuItem>
            <Lock className="h-4 w-4 mr-2" />
            Deactivate Account
          </DropdownMenuItem>
        ) : user.status === "inactive" ? (
          <DropdownMenuItem>
            <CheckCircle className="h-4 w-4 mr-2" />
            Activate Account
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem>
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve User
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <XCircle className="h-4 w-4 mr-2" />
              Reject User
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function AddUserDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>Create a new user account and assign roles.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" placeholder="Enter first name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" placeholder="Enter last name" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter email address" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="creator">Creator</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="superadmin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme">Acme Corp</SelectItem>
                  <SelectItem value="globex">Globex Inc</SelectItem>
                  <SelectItem value="initech">Initech</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input id="department" placeholder="Enter department" />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="send-invite" className="h-4 w-4" />
            <Label htmlFor="send-invite">Send welcome email with login instructions</Label>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
