"use client"

import { DialogDescription } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, PlusCircle, Search, Edit, Trash2, AlertCircle, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CustomPagination } from "@/components/ui/custom-pagination"

const getSubscriptionStatus = (startDate, endDate) => {
  const today = new Date()
  const start = new Date(startDate)
  const end = new Date(endDate)

  if (today >= start && today <= end) {
    return "Active"
  } else if (today < start) {
    return "Future"
  } else {
    return "Inactive"
  }
}

const getStatusBadgeVariant = (status) => {
  switch (status) {
    case "Active":
      return "default" // Will be styled green
    case "Future":
      return "secondary" // Will be styled blue
    case "Inactive":
      return "destructive" // Will be styled red
    default:
      return "outline"
  }
}

// Helper function to get next day from a date
const getNextDay = (dateString) => {
  const date = new Date(dateString)
  date.setDate(date.getDate() + 1)
  return date.toISOString().split("T")[0]
}

// Format date to DD-MM-YYYY
const formatDateString = (dateString) => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

// Mock subscription data for each client - aligned with client statuses
const mockSubscriptions = {
  "1": [
    // Dayatech - Active subscription (current)
    {
      id: "sub-001",
      contractNumber: "SUB-001",
      subscriptionTier: "flexible",
      startDate: "2025-05-30", // Started in May 2025
      endDate: "2026-05-30", // Ends May 2026
      adminLimit: 15,
      creatorLimit: 350,
      currentAdmins: 12,
      currentCreators: 280,
      notes: "Upgraded to flexible plan for expansion",
      history: [
        {
          id: "hist-001",
          date: "2024-08-15T10:30:00Z",
          user: "John Admin",
          field: "Admin Limit",
          oldValue: "10",
          newValue: "15",
        },
        {
          id: "hist-002",
          date: "2024-07-20T14:15:00Z",
          user: "Sarah Manager",
          field: "Creator Limit",
          oldValue: "300",
          newValue: "350",
        },
        {
          id: "hist-003",
          date: "2024-06-05T09:45:00Z",
          user: "Sarah Manager",
          field: "Notes",
          oldValue: "Standard flexible plan",
          newValue: "Upgraded to flexible plan for expansion",
        },
      ],
    },
    {
      id: "sub-002",
      contractNumber: "SUB-002",
      subscriptionTier: "tier1",
      startDate: "2023-01-15",
      endDate: "2024-01-14", // Ended in January 2024
      adminLimit: 2,
      creatorLimit: 50,
      currentAdmins: 2,
      currentCreators: 45,
      notes: "Initial starter subscription - expired",
      history: [],
    },
  ],
  "2": [
    // Globex Industries - Future subscription
    {
      id: "sub-003",
      contractNumber: "SUB-003",
      subscriptionTier: "tier1",
      startDate: "2025-07-01", // Starts July 2025
      endDate: "2026-02-01", // Ends February 2026
      adminLimit: 2,
      creatorLimit: 50,
      currentAdmins: 0,
      currentCreators: 0,
      notes: "Future business subscription - scheduled to start",
      history: [
        {
          id: "hist-003",
          date: "2024-12-01T09:00:00Z",
          user: "Mike Super",
          field: "Start Date",
          oldValue: "2025-02-01",
          newValue: "2025-03-01",
        },
        {
          id: "hist-004",
          date: "2024-11-15T11:20:00Z",
          user: "Mike Super",
          field: "End Date",
          oldValue: "2026-01-01",
          newValue: "2026-02-01",
        },
        {
          id: "hist-005",
          date: "2024-10-20T14:30:00Z",
          user: "Jane Admin",
          field: "Notes",
          oldValue: "",
          newValue: "Future business subscription - scheduled to start",
        },
      ],
    },
  ],
  "3": [
    // Stark Enterprises - Inactive subscription (expired)
    {
      id: "sub-004",
      contractNumber: "SUB-004",
      subscriptionTier: "flexible",
      startDate: "2023-03-10",
      endDate: "2024-03-09", // Ended March 2024
      adminLimit: 8,
      creatorLimit: 200,
      currentAdmins: 8,
      currentCreators: 180,
      notes: "Custom enterprise plan - expired",
      history: [
        {
          id: "hist-006",
          date: "2023-06-15T14:20:00Z",
          user: "Tony Stark",
          field: "Creator Limit",
          oldValue: "150",
          newValue: "200",
        },
        {
          id: "hist-007",
          date: "2023-05-10T09:15:00Z",
          user: "Tony Stark",
          field: "Notes",
          oldValue: "Custom enterprise plan",
          newValue: "Custom enterprise plan - expired",
        },
      ],
    },
  ],
  "7": [
    // TechFlow Solutions - No subscriptions yet (newly added company)
  ],
}

// Mock client data
const mockClients = {
  "1": { name: "Dayatech", subdomain: "dayatech" },
  "2": { name: "Globex Industries", subdomain: "globex" },
  "3": { name: "Stark Enterprises", subdomain: "stark" },
  "7": { name: "TechFlow Solutions", subdomain: "techflow" },
}

export default function ManageSubscriptionPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const { toast } = useToast()
  const [subscriptions, setSubscriptions] = useState([])
  const [client, setClient] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    subscriptionId: null,
    subscriptionName: "",
  })

  useEffect(() => {
    const clientId = params.id
    const clientData = mockClients[clientId]
    const subscriptionData = mockSubscriptions[clientId] || []

    if (clientData) {
      setClient(clientData)
      // Sort by newest to oldest
      setSubscriptions(subscriptionData.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)))
    } else {
      toast({
        title: "Error",
        description: "Client not found",
        variant: "destructive",
      })
      router.push("/superadmin/clients")
    }

    setIsLoading(false)
  }, [params.id, router, toast])

  const handleBack = () => {
    router.push("/superadmin/clients")
  }

  const handleAddSubscription = (subscriptionData) => {
    const newSubscription = {
      id: `sub-${Date.now()}`,
      ...subscriptionData,
      history: [],
    }

    setSubscriptions((prev) => [newSubscription, ...prev])
    setIsAddModalOpen(false)
    toast({
      title: "Subscription Added",
      description: "New subscription has been created successfully.",
    })
  }

  const handleEditSubscription = (subscriptionData) => {
    setSubscriptions((prev) =>
      prev.map((sub) => {
        if (sub.id === selectedSubscription.id) {
          const updatedSubscription = { ...sub }
          const history = [...(sub.history || [])]
          const now = new Date().toISOString()
          const currentUser = "Current User" // Replace with actual user

          // Track Admin Limit changes
          if (subscriptionData.adminLimit !== sub.adminLimit) {
            history.push({
              id: `hist-admin-${Date.now()}`,
              date: now,
              user: currentUser,
              field: "Admin Limit",
              oldValue: String(sub.adminLimit),
              newValue: String(subscriptionData.adminLimit),
            })
            updatedSubscription.adminLimit = subscriptionData.adminLimit
          }

          // Track Creator Limit changes
          if (subscriptionData.creatorLimit !== sub.creatorLimit) {
            history.push({
              id: `hist-creator-${Date.now()}`,
              date: now,
              user: currentUser,
              field: "Creator Limit",
              oldValue: String(sub.creatorLimit),
              newValue: String(subscriptionData.creatorLimit),
            })
            updatedSubscription.creatorLimit = subscriptionData.creatorLimit
          }

          // Track End Date changes
          if (subscriptionData.endDate !== sub.endDate) {
            history.push({
              id: `hist-enddate-${Date.now()}`,
              date: now,
              user: currentUser,
              field: "End Date",
              oldValue: formatDateString(sub.endDate),
              newValue: formatDateString(subscriptionData.endDate),
            })
            updatedSubscription.endDate = subscriptionData.endDate
          }

          // Track Notes changes
          if (subscriptionData.notes !== sub.notes) {
            history.push({
              id: `hist-notes-${Date.now()}`,
              date: now,
              user: currentUser,
              field: "Notes",
              oldValue: sub.notes || "",
              newValue: subscriptionData.notes || "",
            })
            updatedSubscription.notes = subscriptionData.notes
          }

          // Update other fields
          updatedSubscription.subscriptionTier = subscriptionData.subscriptionTier
          updatedSubscription.currentAdmins = subscriptionData.currentAdmins
          updatedSubscription.currentCreators = subscriptionData.currentCreators

          // Sort history from newest to oldest
          updatedSubscription.history = history.sort((a, b) => new Date(b.date) - new Date(a.date))

          return updatedSubscription
        } else {
          return sub
        }
      }),
    )
    setIsEditModalOpen(false)
    setSelectedSubscription(null)
    toast({
      title: "Subscription Updated",
      description: "Subscription has been updated successfully.",
    })
  }

  const handleDeleteSubscription = (subscriptionId) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== subscriptionId))
    toast({
      title: "Subscription Deleted",
      description: "Subscription has been deleted successfully.",
    })
    setDeleteConfirmation({ isOpen: false, subscriptionId: null, subscriptionName: "" })
  }

  const showDeleteConfirmation = (subscriptionId, subscriptionName) => {
    setDeleteConfirmation({
      isOpen: true,
      subscriptionId,
      subscriptionName,
    })
  }

  const formatSubscriptionDuration = (start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)

    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, "0")
      const month = date.toLocaleString("default", { month: "short" })
      const year = date.getFullYear()
      return `${day} ${month} ${year}`
    }

    return `${formatDate(startDate)} - ${formatDate(endDate)}`
  }

  const formatSubscriptionTier = (tier, adminLimit, creatorLimit) => {
    const tiers = {
      trial: "Trial",
      tier1: "Starter",
      flexible: "Flexible",
    }
    const tierName = tiers[tier] || tier
    return (
      <div>
        <div className="font-medium">{tierName}</div>
        <div className="text-sm text-muted-foreground">
          {adminLimit} admins, {creatorLimit} creators
        </div>
      </div>
    )
  }

  const formatUsage = (subscription) => {
    return (
      <div className="grid grid-cols-[auto_auto_1fr] gap-x-1 text-sm">
        <div className="font-medium">Admin</div>
        <div>:</div>
        <div>
          {subscription.currentAdmins}/{subscription.adminLimit}
        </div>
        <div className="font-medium">Creator</div>
        <div>:</div>
        <div>
          {subscription.currentCreators}/{subscription.creatorLimit}
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-[calc(100vh-100px)]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Loading subscriptions...</p>
        </div>
      </div>
    )
  }

  const filteredSubscriptions = subscriptions.filter(
    (subscription) =>
      subscription.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatSubscriptionTier(subscription.subscriptionTier, subscription.adminLimit, subscription.creatorLimit)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      getSubscriptionStatus(subscription.startDate, subscription.endDate)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      subscription.notes.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentSubscriptions = filteredSubscriptions.slice(startIndex, endIndex)

  // Reset to first page when search changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
  }

  const hasActiveSubscription = subscriptions.some(
    (sub) => getSubscriptionStatus(sub.startDate, sub.endDate) === "Active",
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Manage Subscriptions</h1>
          <p className="text-muted-foreground">{client?.name}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Subscription History</CardTitle>
              <CardDescription>Manage all subscriptions for this client</CardDescription>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild disabled={hasActiveSubscription}>
                  <Button
                    className="bg-gray-800 hover:bg-gray-600 text-white"
                    disabled={hasActiveSubscription}
                    onClick={() => setIsAddModalOpen(true)}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Subscription
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {hasActiveSubscription
                    ? "Cannot add a new subscription while another is active."
                    : "Add a new subscription"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subscriptions..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex gap-2"></div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contract Number</TableHead>
                  <TableHead>Subscription Tier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscription Duration</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentSubscriptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No subscriptions found
                    </TableCell>
                  </TableRow>
                ) : (
                  currentSubscriptions.map((subscription) => {
                    const status = getSubscriptionStatus(subscription.startDate, subscription.endDate)

                    return (
                      <TableRow key={subscription.id}>
                        <TableCell className="font-medium">{subscription.contractNumber}</TableCell>
                        <TableCell>
                          {formatSubscriptionTier(
                            subscription.subscriptionTier,
                            subscription.adminLimit,
                            subscription.creatorLimit,
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={getStatusBadgeVariant(status)}
                            className={
                              status === "Active"
                                ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
                                : status === "Future"
                                  ? "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200"
                                  : ""
                            }
                          >
                            {status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {formatSubscriptionDuration(subscription.startDate, subscription.endDate)}
                        </TableCell>
                        <TableCell className="text-sm">{formatUsage(subscription)}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{subscription.notes}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => {
                                      setSelectedSubscription(subscription)
                                      setIsEditModalOpen(true)
                                    }}
                                    disabled={status === "Inactive"}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {status === "Inactive"
                                    ? "Cannot edit an inactive subscription."
                                    : "Edit subscription"}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                    onClick={() => showDeleteConfirmation(subscription.id, subscription.contractNumber)}
                                    disabled={status === "Inactive" || status === "Active"}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {status === "Inactive"
                                    ? "Cannot delete an inactive subscription."
                                    : status === "Active"
                                      ? "Cannot delete an active subscription."
                                      : "Delete subscription"}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => {
                                      setSelectedSubscription(subscription)
                                      setIsHistoryModalOpen(true)
                                    }}
                                  >
                                    <Clock className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Change history</TooltipContent>
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

          {/* Custom Pagination */}
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredSubscriptions.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            itemName="subscriptions"
          />
        </CardContent>
      </Card>

      {/* Add Subscription Modal */}
      <SubscriptionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSubscription}
        title="Add New Subscription"
        existingSubscriptions={subscriptions}
      />

      {/* Edit Subscription Modal */}
      <SubscriptionModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedSubscription(null)
        }}
        onSubmit={handleEditSubscription}
        title="Edit Subscription"
        initialData={selectedSubscription}
        existingSubscriptions={subscriptions}
        isEditing={true}
      />

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => {
          setIsHistoryModalOpen(false)
          setSelectedSubscription(null)
        }}
        subscription={selectedSubscription}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteConfirmation.isOpen}
        onOpenChange={(open) =>
          !open && setDeleteConfirmation({ isOpen: false, subscriptionId: null, subscriptionName: "" })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the "{deleteConfirmation.subscriptionName}" subscription? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteSubscription(deleteConfirmation.subscriptionId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function SubscriptionModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  initialData = null,
  existingSubscriptions = [],
  isEditing = false,
}) {
  const [formData, setFormData] = useState({
    contractNumber: "",
    subscriptionTier: "trial",
    adminLimit: 1,
    creatorLimit: 10,
    currentAdmins: 0,
    currentCreators: 0,
    startDate: "",
    endDate: "",
    notes: "",
  })
  const [formErrors, setFormErrors] = useState({})
  const { toast } = useToast()
  const [minEndDate, setMinEndDate] = useState("")
  const isActive = initialData ? getSubscriptionStatus(initialData.startDate, initialData.endDate) === "Active" : false

  useEffect(() => {
    if (initialData) {
      setFormData({
        contractNumber: initialData.contractNumber,
        subscriptionTier: initialData.subscriptionTier,
        adminLimit: initialData.adminLimit,
        creatorLimit: initialData.creatorLimit,
        currentAdmins: initialData.currentAdmins,
        currentCreators: initialData.currentCreators,
        startDate: initialData.startDate,
        endDate: initialData.endDate,
        notes: initialData.notes || "",
      })
      setMinEndDate(getNextDay(initialData.startDate))
    } else {
      // For new subscriptions, auto-populate dates for Trial tier
      const today = new Date()
      const startDate = today.toISOString().split("T")[0]
      const endDate = new Date(today)
      endDate.setDate(today.getDate() + 30)
      const formattedEndDate = endDate.toISOString().split("T")[0]

      setFormData({
        contractNumber: "",
        subscriptionTier: "trial",
        adminLimit: 1,
        creatorLimit: 10,
        currentAdmins: 0,
        currentCreators: 0,
        startDate: startDate,
        endDate: formattedEndDate,
        notes: "",
      })
      setMinEndDate(getNextDay(startDate))
    }
    setFormErrors({})
  }, [initialData, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "startDate") {
      // When start date changes, update min end date
      const nextDay = getNextDay(value)
      setMinEndDate(nextDay)

      // If current end date is before new min date, update it
      if (new Date(formData.endDate) <= new Date(value)) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
          endDate: nextDay,
        }))
        return
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }))

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Auto-populate limits based on tier
    if (name === "subscriptionTier") {
      if (value === "trial") {
        const today = new Date()
        const startDate = today.toISOString().split("T")[0]
        const endDate = new Date(today)
        endDate.setDate(today.getDate() + 30)
        const formattedEndDate = endDate.toISOString().split("T")[0]

        setFormData((prev) => ({
          ...prev,
          subscriptionTier: value,
          adminLimit: 1,
          creatorLimit: 10,
          startDate: startDate,
          endDate: formattedEndDate,
        }))
        setMinEndDate(getNextDay(startDate))
      } else if (value === "tier1") {
        setFormData((prev) => ({
          ...prev,
          subscriptionTier: value,
          adminLimit: 2,
          creatorLimit: 50,
        }))
      } else {
        setFormData((prev) => ({
          ...prev,
          subscriptionTier: value,
        }))
      }
    }

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.contractNumber) errors.contractNumber = "Contract number is required"
    if (!formData.startDate) errors.startDate = "Start date is required"
    if (!formData.endDate) errors.endDate = "End date is required"

    if (Number.parseInt(formData.adminLimit) < Number.parseInt(formData.currentAdmins)) {
      errors.adminLimit = `Cannot reduce limit below current usage (${formData.currentAdmins}/${formData.adminLimit})`
    }

    if (Number.parseInt(formData.creatorLimit) < Number.parseInt(formData.currentCreators)) {
      errors.creatorLimit = `Cannot reduce limit below current usage (${formData.currentCreators}/${formData.creatorLimit})`
    }

    // Check for overlapping subscriptions
    const hasOverlap = existingSubscriptions.some((sub) => {
      if (isEditing && sub.id === initialData?.id) return false

      const existingStart = new Date(sub.startDate)
      const existingEnd = new Date(sub.endDate)
      const newStart = new Date(formData.startDate)
      const newEnd = new Date(formData.endDate)

      return newStart <= existingEnd && newEnd >= existingStart
    })

    if (hasOverlap) {
      errors.startDate = "Subscription period overlaps with existing subscription"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      const today = new Date()
      const startDate = new Date(formData.startDate)

      if (startDate > today && !isEditing) {
        toast({
          title: "Future Subscription Created",
          description: "This subscription will have 'Future' status until the start date arrives.",
          variant: "default",
        })
      }

      onSubmit(formData)
    } else {
      toast({
        title: "Form Incomplete",
        description: "Please fix the errors before submitting.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          {isEditing && initialData && (
            <div className="space-y-1">
              <Label>Contract Number</Label>
              <Input value={initialData.contractNumber} disabled className="bg-muted" />
            </div>
          )}

          {!isEditing && (
            <div className="space-y-1">
              <Label htmlFor="contractNumber" className={cn(formErrors.contractNumber && "text-destructive")}>
                Contract Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="contractNumber"
                name="contractNumber"
                type="text"
                placeholder="Enter contract number (e.g., SUB-001)"
                value={formData.contractNumber}
                onChange={handleChange}
                className={cn(formErrors.contractNumber && "border-destructive")}
              />
              {formErrors.contractNumber && <p className="text-xs text-destructive">{formErrors.contractNumber}</p>}
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="subscriptionTier" className={cn(formErrors.subscriptionTier && "text-destructive")}>
              Subscription Tier <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.subscriptionTier}
              onValueChange={(value) => handleSelectChange("subscriptionTier", value)}
            >
              <SelectTrigger className={cn(formErrors.subscriptionTier && "border-destructive")}>
                <SelectValue placeholder="Select subscription tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trial">Trial - 1 admin, 10 creators</SelectItem>
                <SelectItem value="tier1">Starter - 2 admins, 50 creators</SelectItem>
                <SelectItem value="flexible">Flexible - Custom admins & creators</SelectItem>
              </SelectContent>
            </Select>
            {formErrors.subscriptionTier && <p className="text-xs text-destructive">{formErrors.subscriptionTier}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="adminLimit">Number of Admins</Label>
              <Input
                id="adminLimit"
                name="adminLimit"
                type="number"
                min="1"
                value={formData.adminLimit}
                onChange={handleChange}
                readOnly={formData.subscriptionTier !== "flexible"}
                className={cn(
                  formData.subscriptionTier !== "flexible" ? "bg-muted" : "",
                  formErrors.adminLimit && "border-destructive",
                )}
              />
              {isEditing && (
                <p className="text-xs text-muted-foreground">
                  Current usage: <span className="font-bold">{formData.currentAdmins} admins</span>
                </p>
              )}
              {formErrors.adminLimit && <p className="text-xs text-destructive">{formErrors.adminLimit}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="creatorLimit">Number of Creators</Label>
              <Input
                id="creatorLimit"
                name="creatorLimit"
                type="number"
                min="1"
                value={formData.creatorLimit}
                onChange={handleChange}
                readOnly={formData.subscriptionTier !== "flexible"}
                className={cn(
                  formData.subscriptionTier !== "flexible" ? "bg-muted" : "",
                  formErrors.creatorLimit && "border-destructive",
                )}
              />
              {isEditing && (
                <p className="text-xs text-muted-foreground">
                  Current usage: <span className="font-bold">{formData.currentCreators} creators</span>
                </p>
              )}
              {formErrors.creatorLimit && <p className="text-xs text-destructive">{formErrors.creatorLimit}</p>}
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="startDate" className={cn(formErrors.startDate && "text-destructive")}>
              Start Date <span className="text-destructive">*</span>
            </Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              className={cn(formErrors.startDate && "border-destructive")}
              disabled={formData.subscriptionTier === "trial" || (isEditing && isActive)}
            />
            {isEditing && isActive && (
              <p className="text-xs text-muted-foreground">Start date cannot be changed for active subscriptions.</p>
            )}
            {formErrors.startDate && <p className="text-xs text-destructive">{formErrors.startDate}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="endDate" className={cn(formErrors.endDate && "text-destructive")}>
              End Date <span className="text-destructive">*</span>
            </Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              min={minEndDate}
              className={cn(formErrors.endDate && "border-destructive")}
              disabled={formData.subscriptionTier === "trial"}
            />
            {formErrors.endDate && <p className="text-xs text-destructive">{formErrors.endDate}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter subscription notes..."
              className="min-h-[60px]"
            />
          </div>

          {Object.keys(formErrors).length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Please fix the errors above before submitting.</AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button className="bg-gray-800 hover:bg-gray-600 text-white" type="submit">
              {isEditing ? "Update Subscription" : "Add Subscription"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function HistoryModal({ isOpen, onClose, subscription }) {
  if (!subscription || !isOpen) return null

  const formatHistoryDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    return `${day}-${month}-${year} ${hours}:${minutes}`
  }

  // Sort history from newest to oldest
  const sortedHistory = [...(subscription.history || [])].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Subscription History - {subscription.contractNumber}</DialogTitle>
          <DialogDescription>View the modification history for this subscription.</DialogDescription>
        </DialogHeader>
        <div className="max-h-[240px] overflow-y-auto divide-y divide-border">
          {sortedHistory.length > 0 ? (
            sortedHistory.map((item) => (
              <div key={item.id} className="py-3">
                <div className="text-sm text-muted-foreground">{formatHistoryDate(item.date)}</div>
                <div className="font-medium">{item.user}</div>
                <div className="text-sm text-muted-foreground">
                  Changed <span className="font-bold">{item.field}</span> from{" "}
                  <span className="font-bold">{item.oldValue}</span> to{" "}
                  <span className="font-bold">{item.newValue}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-3 text-center text-muted-foreground">No history available for this subscription.</div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
