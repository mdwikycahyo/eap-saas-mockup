"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MoreHorizontal,
  UserPlus,
  RefreshCw,
  Download,
  Upload,
  FileDown,
  CheckCircle,
  Eye,
  Edit,
  AlertTriangle,
  Mail,
  Phone,
  MapPin,
  Building,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock data for users
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@acme.com",
    role: "Admin",
    company: "Acme Corporation",
    status: "Active",
    lastActive: "2023-05-15",
    phoneNumber: "+1 (555) 123-4567",
    city: "New York",
    stateProvince: "NY",
    invitationStatus: "Confirmed",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@acme.com",
    role: "Creator",
    company: "Acme Corporation",
    status: "Active",
    lastActive: "2023-05-14",
    phoneNumber: "+1 (555) 987-6543",
    city: "Los Angeles",
    stateProvince: "CA",
    invitationStatus: "Confirmed",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@technova.io",
    role: "Admin",
    company: "TechNova Inc.",
    status: "Active",
    lastActive: "2023-05-15",
    phoneNumber: "+1 (555) 234-5678",
    city: "San Francisco",
    stateProvince: "CA",
    invitationStatus: "Confirmed",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@technova.io",
    role: "Creator",
    company: "TechNova Inc.",
    status: "Pending",
    lastActive: "2023-04-28",
    phoneNumber: "+1 (555) 876-5432",
    city: "Chicago",
    stateProvince: "IL",
    invitationStatus: "Pending",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael@globalretail.com",
    role: "Admin",
    company: "Global Retail Group",
    status: "Active",
    lastActive: "2023-05-12",
    phoneNumber: "+1 (555) 345-6789",
    city: "Miami",
    stateProvince: "FL",
    invitationStatus: "Confirmed",
  },
  {
    id: "6",
    name: "Sarah Brown",
    email: "sarah@globalretail.com",
    role: "Creator",
    company: "Global Retail Group",
    status: "Active",
    lastActive: "2023-05-15",
    phoneNumber: "+1 (555) 765-4321",
    city: "Dallas",
    stateProvince: "TX",
    invitationStatus: "Confirmed",
  },
  {
    id: "7",
    name: "David Lee",
    email: "david@healthplus.org",
    role: "Admin",
    company: "HealthPlus Medical",
    status: "Inactive",
    lastActive: "2023-04-10",
    phoneNumber: "+1 (555) 456-7890",
    city: "Boston",
    stateProvince: "MA",
    invitationStatus: "Expired",
  },
  {
    id: "8",
    name: "Lisa Taylor",
    email: "lisa@healthplus.org",
    role: "Creator",
    company: "HealthPlus Medical",
    status: "Pending",
    lastActive: "2023-04-15",
    phoneNumber: "+1 (555) 654-3210",
    city: "Seattle",
    stateProvince: "WA",
    invitationStatus: "Pending",
  },
  {
    id: "9",
    name: "James Anderson",
    email: "james@acme.com",
    role: "Creator",
    company: "Acme Corporation",
    status: "Active",
    lastActive: "2023-05-13",
    phoneNumber: "+1 (555) 567-8901",
    city: "Denver",
    stateProvince: "CO",
    invitationStatus: "Confirmed",
  },
  {
    id: "10",
    name: "Patricia Martinez",
    email: "patricia@technova.io",
    role: "Creator",
    company: "TechNova Inc.",
    status: "Inactive",
    lastActive: "2023-05-14",
    phoneNumber: "+1 (555) 543-2109",
    city: "Austin",
    stateProvince: "TX",
    invitationStatus: "Rejected",
  },
]

// Mock data for companies
const mockCompanies = [
  { id: 1, name: "Acme Corporation" },
  { id: 2, name: "TechNova Inc." },
  { id: 3, name: "Global Retail Group" },
  { id: 4, name: "HealthPlus Medical" },
]

export default function UsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [companyFilter, setCompanyFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedUsers, setSelectedUsers] = useState([])
  const { toast } = useToast()
  const [isInvitationSent, setIsInvitationSent] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [userToDeactivate, setUserToDeactivate] = useState(null)
  const [showUserDetailsDialog, setShowUserDetailsDialog] = useState(false)
  const [userToView, setUserToView] = useState(null)
  const [showActivateDialog, setShowActivateDialog] = useState(false)
  const [userToActivate, setUserToActivate] = useState(null)
  const [showBulkActivateDialog, setShowBulkActivateDialog] = useState(false)
  const [showResendInvitationDialog, setShowResendInvitationDialog] = useState(false)
  const [userToResendInvitation, setUserToResendInvitation] = useState(null)

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesCompany = companyFilter === "all" || user.company === companyFilter
    return matchesSearch && matchesRole && matchesStatus && matchesCompany
  })

  const handleViewUser = (user) => {
    setUserToView(user)
    setShowUserDetailsDialog(true)
  }

  const handleAddUser = () => {
    router.push("/superadmin/users/add")
  }

  const handleEditUser = (user) => {
    router.push(`/superadmin/users/${user.id}/edit`)
  }

  const handleToggleUserStatus = (userId) => {
    const userToUpdate = users.find((user) => user.id === userId)
    const newStatus = userToUpdate.status === "Active" ? "Inactive" : "Active"

    const updatedUsers = users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user))
    setUsers(updatedUsers)

    toast({
      title: `User ${newStatus}`,
      description: `${userToUpdate.name} has been ${newStatus === "Active" ? "activated" : "deactivated"}.`,
    })
  }

  const handleConfirmDeactivate = (user) => {
    setUserToDeactivate(user)
    setShowConfirmDialog(true)
  }

  const handleConfirmActivate = (user) => {
    setUserToActivate(user)
    setShowActivateDialog(true)
  }

  const handleDeactivateConfirmed = () => {
    if (userToDeactivate) {
      handleToggleUserStatus(userToDeactivate.id)
      setShowConfirmDialog(false)
      setUserToDeactivate(null)
    }
  }

  const handleActivateConfirmed = () => {
    if (userToActivate) {
      handleToggleUserStatus(userToActivate.id)
      setShowActivateDialog(false)
      setUserToActivate(null)
    }
  }

  const handleBulkAction = (action) => {
    if (selectedUsers.length === 0) {
      toast({
        title: "No Users Selected",
        description: "Please select at least one user to perform this action.",
        variant: "destructive",
      })
      return
    }

    if (action === "activate") {
      setShowBulkActivateDialog(true)
    } else if (action === "deactivate") {
      const updatedUsers = users.map((user) =>
        selectedUsers.includes(user.id) ? { ...user, status: "Inactive" } : user,
      )
      setUsers(updatedUsers)
      toast({
        title: "Users Deactivated",
        description: `${selectedUsers.length} users have been deactivated.`,
      })
      setSelectedUsers([])
    }
  }

  const handleBulkActivateConfirmed = () => {
    const updatedUsers = users.map((user) => (selectedUsers.includes(user.id) ? { ...user, status: "Active" } : user))
    setUsers(updatedUsers)
    toast({
      title: "Users Activated",
      description: `${selectedUsers.length} users have been activated.`,
    })
    setSelectedUsers([])
    setShowBulkActivateDialog(false)
  }

  const toggleSelectUser = (userId) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id))
    }
  }

  const handleConfirmResendInvitation = (user) => {
    setUserToResendInvitation(user)
    setShowResendInvitationDialog(true)
  }

  const handleResendInvitationConfirmed = () => {
    if (userToResendInvitation) {
      // In a real app, this would call an API to resend the invitation
      toast({
        title: "Invitation Resent",
        description: `An invitation email has been resent to ${userToResendInvitation.name} (${userToResendInvitation.email}).`,
      })
      setShowResendInvitationDialog(false)
      setUserToResendInvitation(null)
      setIsInvitationSent(true)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Administration</h1>
        <Button onClick={handleAddUser}>
          <UserPlus className="mr-2 h-4 w-4" /> Add New User
        </Button>
      </div>

      {isInvitationSent && (
        <Alert className="mb-4">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Invitation Sent</AlertTitle>
          <AlertDescription>
            An invitation email has been sent to the user. They will need to confirm their email and set up their
            account.
          </AlertDescription>
          <Button variant="outline" size="sm" className="mt-2" onClick={() => setIsInvitationSent(false)}>
            Dismiss
          </Button>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Manage users across all client organizations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name or email..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="creator">Creator</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {mockCompanies.map((company) => (
                    <SelectItem key={company.id} value={company.name}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction("activate")}
                disabled={selectedUsers.length === 0}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Activate Selected
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction("deactivate")}
                disabled={selectedUsers.length === 0}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Deactivate Selected
              </Button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Users
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Import Users
              </Button>
              <Button variant="outline" size="sm">
                <FileDown className="mr-2 h-4 w-4" />
                Download Template
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Account Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      No users found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => toggleSelectUser(user.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "Admin" ? "outline" : "secondary"}>{user.role}</Badge>
                      </TableCell>
                      <TableCell>{user.company}</TableCell>
                      <TableCell>
                        {user.invitationStatus === "Pending" ? (
                          <div className="flex items-center gap-1.5">
                            <Badge variant="warning" className="px-2 py-1">
                              Invitation Pending
                            </Badge>
                          </div>
                        ) : user.status === "Active" ? (
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-sm font-medium text-green-700">Active</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <span className="text-sm font-medium text-red-700">Inactive</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewUser(user)}>
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditUser(user)}>
                              <Edit className="mr-2 h-4 w-4" /> Edit User
                            </DropdownMenuItem>
                            {user.invitationStatus !== "Pending" &&
                              (user.status === "Active" ? (
                                <DropdownMenuItem onClick={() => handleConfirmDeactivate(user)}>
                                  <AlertTriangle className="mr-2 h-4 w-4" /> Deactivate User
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handleConfirmActivate(user)}>
                                  <CheckCircle className="mr-2 h-4 w-4" /> Activate User
                                </DropdownMenuItem>
                              ))}
                            {user.invitationStatus === "Pending" && (
                              <DropdownMenuItem onClick={() => handleConfirmResendInvitation(user)}>
                                <Mail className="mr-2 h-4 w-4" /> Resend Invitation
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={showUserDetailsDialog} onOpenChange={setShowUserDetailsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {userToView && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-2xl font-semibold">
                  {userToView.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{userToView.name}</h3>
                  <p className="text-sm text-muted-foreground">{userToView.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Role</p>
                    <p className="text-sm">{userToView.role}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <div className="flex items-center gap-1.5">
                      {userToView.invitationStatus === "Pending" ? (
                        <Badge variant="warning" className="mt-1">
                          Invitation Pending
                        </Badge>
                      ) : (
                        <Badge variant={userToView.status === "Active" ? "success" : "destructive"} className="mt-1">
                          {userToView.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Active</p>
                    <p className="text-sm">{userToView.lastActive}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Company</p>
                      <p className="text-sm">{userToView.company}</p>
                    </div>
                  </div>
                  {userToView.phoneNumber && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm">{userToView.phoneNumber}</p>
                      </div>
                    </div>
                  )}
                  {(userToView.city || userToView.stateProvince) && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm">
                          {userToView.city}
                          {userToView.city && userToView.stateProvince && ", "}
                          {userToView.stateProvince}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t mt-4">
                <Button variant="outline" onClick={() => handleEditUser(userToView)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit User
                </Button>
                {userToView.invitationStatus === "Pending" ? (
                  <Button onClick={() => handleConfirmResendInvitation(userToView)}>
                    <Mail className="mr-2 h-4 w-4" /> Resend Invitation
                  </Button>
                ) : userToView.status === "Active" ? (
                  <Button variant="destructive" onClick={() => handleConfirmDeactivate(userToView)}>
                    <AlertTriangle className="mr-2 h-4 w-4" /> Deactivate
                  </Button>
                ) : (
                  <Button onClick={() => handleConfirmActivate(userToView)}>
                    <CheckCircle className="mr-2 h-4 w-4" /> Activate
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Deactivating User */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm User Deactivation</DialogTitle>
            <DialogDescription>
              Are you sure you want to deactivate {userToDeactivate?.name}? They will no longer be able to access the
              platform.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeactivateConfirmed}>
              Deactivate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Activating User */}
      <Dialog open={showActivateDialog} onOpenChange={setShowActivateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm User Activation</DialogTitle>
            <DialogDescription>
              Are you sure you want to activate {userToActivate?.name}? They will be able to access the platform again.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowActivateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleActivateConfirmed}>Activate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Bulk Activating Users */}
      <Dialog open={showBulkActivateDialog} onOpenChange={setShowBulkActivateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Bulk User Activation</DialogTitle>
            <DialogDescription>
              Are you sure you want to activate {selectedUsers.length} users? They will be able to access the platform
              again.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkActivateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleBulkActivateConfirmed}>Activate Users</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Resending Invitation */}
      <Dialog open={showResendInvitationDialog} onOpenChange={setShowResendInvitationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resend Invitation</DialogTitle>
            <DialogDescription>
              Are you sure you want to resend the invitation email to {userToResendInvitation?.name} (
              {userToResendInvitation?.email})?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              The user will receive a new email with instructions to set up their account. The previous invitation link
              will be invalidated.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResendInvitationDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleResendInvitationConfirmed}>
              <Mail className="mr-2 h-4 w-4" /> Resend Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
