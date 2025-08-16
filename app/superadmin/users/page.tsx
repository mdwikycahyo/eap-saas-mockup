"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, UserPlus, CheckCircle, Edit, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button" // Ensure Button is imported
import { CustomPagination } from "@/components/ui/custom-pagination" // Import CustomPagination

// Mock data for users
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@acme.com",
    role: "Admin",
    company: "Acme Corporation",
    lastActive: "2023-05-15",
    phoneNumber: "+62 21 1234 5678",
    city: "South Jakarta",
    stateProvince: "DKI Jakarta",
    invitationStatus: "Confirmed",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@acme.com",
    role: "Creator",
    company: "Acme Corporation",
    lastActive: "2023-05-14",
    phoneNumber: "+62 21 9876 5432",
    city: "Central Jakarta",
    stateProvince: "DKI Jakarta",
    invitationStatus: "Confirmed",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@technova.io",
    role: "Admin",
    company: "TechNova Inc.",
    lastActive: "2023-05-15",
    phoneNumber: "+62 22 2345 6789",
    city: "Bandung",
    stateProvince: "West Java",
    invitationStatus: "Confirmed",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@technova.io",
    role: "Creator",
    company: "TechNova Inc.",
    lastActive: "2023-04-28",
    phoneNumber: "+62 24 8765 4321",
    city: "Semarang",
    stateProvince: "Central Java",
    invitationStatus: "Pending",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael@globalretail.com",
    role: "Admin",
    company: "Global Retail Group",
    lastActive: "2023-05-12",
    phoneNumber: "+62 31 3456 7890",
    city: "Surabaya",
    stateProvince: "East Java",
    invitationStatus: "Confirmed",
  },
  {
    id: "6",
    name: "Sarah Brown",
    email: "sarah@globalretail.com",
    role: "Creator",
    company: "Global Retail Group",
    lastActive: "2023-05-15",
    phoneNumber: "+62 361 7654 3210",
    city: "Denpasar",
    stateProvince: "Bali",
    invitationStatus: "Confirmed",
  },
  {
    id: "7",
    name: "David Lee",
    email: "david@healthplus.org",
    role: "Admin",
    company: "HealthPlus Medical",
    lastActive: "2023-04-10",
    phoneNumber: "+62 274 4567 8901",
    city: "Yogyakarta",
    stateProvince: "Yogyakarta",
    invitationStatus: "Expired",
  },
  {
    id: "8",
    name: "Lisa Taylor",
    email: "lisa@healthplus.org",
    role: "Creator",
    company: "HealthPlus Medical",
    lastActive: "2023-04-15",
    phoneNumber: "+62 411 6543 2109",
    city: "Makassar",
    stateProvince: "South Sulawesi",
    invitationStatus: "Pending",
  },
  {
    id: "9",
    name: "James Anderson",
    email: "james@acme.com",
    role: "Creator",
    company: "Acme Corporation",
    lastActive: "2023-05-13",
    phoneNumber: "+62 21 5678 9012",
    city: "North Jakarta",
    stateProvince: "Jakarta",
    invitationStatus: "Confirmed",
  },
  {
    id: "10",
    name: "Patricia Martinez",
    email: "patricia@technova.io",
    role: "Creator",
    company: "TechNova Inc.",
    lastActive: "2023-05-14",
    phoneNumber: "+62 22 5432 1098",
    city: "Bogor",
    stateProvince: "West Java",
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
  const [invitationStatusFilter, setInvitationStatusFilter] = useState("all")
  const [companyFilter, setCompanyFilter] = useState("all")
  const { toast } = useToast()
  const [isInvitationSent, setIsInvitationSent] = useState(false)
  const [showResendInvitationDialog, setShowResendInvitationDialog] = useState(false)
  const [userToResendInvitation, setUserToResendInvitation] = useState<null | { name: string; email: string }>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const getDisplayInvitationStatus = (invitationStatus: string) => {
    if (invitationStatus === "Confirmed") return "Accepted"
    return "Pending Invitation"
  }

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase()
    const displayStatus = getDisplayInvitationStatus(user.invitationStatus)
    const matchesInvitationStatus =
      invitationStatusFilter === "all" ||
      (invitationStatusFilter === "Accepted" && displayStatus === "Accepted") ||
      (invitationStatusFilter === "Pending Invitation" && displayStatus === "Pending Invitation")

    const matchesCompany = companyFilter === "all" || user.company === companyFilter
    return matchesSearch && matchesRole && matchesInvitationStatus && matchesCompany
  })

  const handleAddUser = () => {
    router.push("/superadmin/users/add")
  }

  const handleEditUser = (user: any) => {
    router.push(`/superadmin/users/${user.id}/edit`)
  }

  const handleConfirmResendInvitation = (user: any) => {
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

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value)
    setCurrentPage(1)
  }
  return (
    <TooltipProvider>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manage User</h1>
          <Button className="bg-gray-800 hover:bg-gray-600 text-white" onClick={handleAddUser}>
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
            <Button
              variant="outline"
              size="sm"
              className="mt-2 bg-transparent"
              onClick={() => setIsInvitationSent(false)}
            >
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
                <Select
                  value={roleFilter}
                  onValueChange={(value) => {
                    setRoleFilter(value)
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Creator">Creator</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={invitationStatusFilter}
                  onValueChange={(value) => {
                    setInvitationStatusFilter(value)
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Invitations</SelectItem>
                    <SelectItem value="Accepted">Accepted</SelectItem>
                    <SelectItem value="Pending Invitation">Pending Invitation</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={companyFilter}
                  onValueChange={(value) => {
                    setCompanyFilter(value)
                    setCurrentPage(1)
                  }}
                >
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

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Invitation Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No users found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedUsers.map((user) => {
                      const displayInvitationStatus = getDisplayInvitationStatus(user.invitationStatus)
                      const isAccepted = displayInvitationStatus === "Accepted"

                      return (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${
                                user.role === "Admin"
                                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                              }`}
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.company}</TableCell>
                          <TableCell>
                            <Badge
                              className={`px-2 py-1 ${
                                isAccepted
                                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                              }`}
                            >
                              {displayInvitationStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{user.stateProvince || "-"}</div>
                              <div className="text-sm text-muted-foreground">{user.city || "-"}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-start space-x-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => handleEditUser(user)}
                                    >
                                      <Edit className="h-4 w-4" />
                                      <span className="sr-only">Edit User</span>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Edit User</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className={`h-8 w-8 ${isAccepted ? "text-muted-foreground cursor-not-allowed" : "text-blue-600"}`}
                                      onClick={() => !isAccepted && handleConfirmResendInvitation(user)}
                                      disabled={isAccepted}
                                    >
                                      <Mail className="h-4 w-4" />
                                      <span className="sr-only">Resend Invitation</span>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {isAccepted ? "Invitation already accepted" : "Resend Invitation"}
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </div>
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredUsers.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              itemName="users"
            />
          </CardContent>
        </Card>

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
                The user will receive a new email with instructions to set up their account. The previous invitation
                link will be invalidated.
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
    </TooltipProvider>
  )
}
