"use client"

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
import { ArrowLeft, PlusCircle, Search, Edit, Trash2, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Mock subscription data for each client
const mockSubscriptions = {
  "1": [
    // Dayatech
    {
      id: "sub-001",
      contractNumber: "SUB-001",
      subscriptionTier: "flexible",
      status: "Active",
      startDate: "2024-01-15",
      endDate: "2025-01-14",
      adminLimit: 15,
      creatorLimit: 350,
      currentAdmins: 12,
      currentCreators: 280,
      notes: "Upgraded to flexible plan for expansion",
    },
    {
      id: "sub-002",
      contractNumber: "SUB-002",
      subscriptionTier: "tier1",
      status: "Inactive",
      startDate: "2023-01-15",
      endDate: "2024-01-14",
      adminLimit: 2,
      creatorLimit: 50,
      currentAdmins: 2,
      currentCreators: 45,
      notes: "Initial starter subscription",
    },
    {
      id: "sub-003",
      contractNumber: "SUB-003",
      subscriptionTier: "trial",
      status: "Inactive",
      startDate: "2022-12-15",
      endDate: "2023-01-14",
      adminLimit: 1,
      creatorLimit: 10,
      currentAdmins: 1,
      currentCreators: 8,
      notes: "Trial period",
    },
  ],
  "2": [
    // Globex Industries
    {
      id: "sub-004",
      contractNumber: "SUB-004",
      subscriptionTier: "tier1",
      status: "Active",
      startDate: "2023-02-22",
      endDate: "2024-02-21",
      adminLimit: 2,
      creatorLimit: 50,
      currentAdmins: 2,
      currentCreators: 35,
      notes: "Standard business subscription",
    },
  ],
  "3": [
    // Stark Enterprises
    {
      id: "sub-005",
      contractNumber: "SUB-005",
      subscriptionTier: "flexible",
      status: "Inactive",
      startDate: "2023-03-10",
      endDate: "2024-03-09",
      adminLimit: 8,
      creatorLimit: 200,
      currentAdmins: 8,
      currentCreators: 180,
      notes: "Custom enterprise plan",
    },
  ],
}

// Mock client data
const mockClients = {
  "1": { name: "Dayatech", subdomain: "dayatech" },
  "2": { name: "Globex Industries", subdomain: "globex" },
  "3": { name: "Stark Enterprises", subdomain: "stark" },
}

export default function ManageSubscriptionPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [subscriptions, setSubscriptions] = useState([])
  const [client, setClient] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

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
      contractNumber: `SUB-${String(subscriptions.length + 1).padStart(3, "0")}`,
      ...subscriptionData,
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
      prev.map((sub) => (sub.id === selectedSubscription.id ? { ...sub, ...subscriptionData } : sub)),
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
      subscription.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.notes.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Manage Subscriptions</h1>
          <p className="text-muted-foreground">
            {client?.name} ({client?.subdomain}.hypearn.com)
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Subscription History</CardTitle>
              <CardDescription>Manage all subscriptions for this client</CardDescription>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Subscription
            </Button>
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
                onChange={(e) => setSearchTerm(e.target.value)}
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
                {filteredSubscriptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No subscriptions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubscriptions.map((subscription) => (
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
                        <Badge variant={subscription.status === "Active" ? "success" : "destructive"}>
                          {subscription.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatSubscriptionDuration(subscription.startDate, subscription.endDate)}</TableCell>
                      <TableCell className="text-sm">{formatUsage(subscription)}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{subscription.notes}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              setSelectedSubscription(subscription)
                              setIsEditModalOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleDeleteSubscription(subscription.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
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
    status: "Inactive",
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

  useEffect(() => {
    if (initialData) {
      setFormData({
        status: initialData.status,
        subscriptionTier: initialData.subscriptionTier,
        adminLimit: initialData.adminLimit,
        creatorLimit: initialData.creatorLimit,
        currentAdmins: initialData.currentAdmins,
        currentCreators: initialData.currentCreators,
        startDate: initialData.startDate,
        endDate: initialData.endDate,
        notes: initialData.notes || "",
      })
    } else {
      // For new subscriptions, auto-populate dates for Trial tier
      const today = new Date()
      const startDate = today.toISOString().split("T")[0]
      const endDate = new Date(today)
      endDate.setDate(today.getDate() + 30)
      const formattedEndDate = endDate.toISOString().split("T")[0]

      setFormData({
        status: "Inactive",
        subscriptionTier: "trial",
        adminLimit: 1,
        creatorLimit: 10,
        currentAdmins: 0,
        currentCreators: 0,
        startDate: startDate,
        endDate: formattedEndDate,
        notes: "",
      })
    }
    setFormErrors({})
  }, [initialData, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
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

    if (!formData.startDate) errors.startDate = "Start date is required"
    if (!formData.endDate) errors.endDate = "End date is required"
    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      errors.endDate = "End date must be after start date"
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isEditing && initialData && (
            <div className="space-y-2">
              <Label>Contract Number</Label>
              <Input value={initialData.contractNumber} disabled className="bg-muted" />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="status" className={cn(formErrors.status && "text-destructive")}>
              Status <span className="text-destructive">*</span>
            </Label>
            <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
              <SelectTrigger className={cn(formErrors.status && "border-destructive")}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            {formErrors.status && <p className="text-xs text-destructive">{formErrors.status}</p>}
          </div>

          <div className="space-y-2">
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
            <div className="space-y-2">
              <Label htmlFor="adminLimit">Number of Admins</Label>
              <Input
                id="adminLimit"
                name="adminLimit"
                type="number"
                min="1"
                value={formData.adminLimit}
                onChange={handleChange}
                readOnly={formData.subscriptionTier !== "flexible"}
                className={formData.subscriptionTier !== "flexible" ? "bg-muted" : ""}
              />
              {isEditing && (
                <p className="text-xs text-muted-foreground">
                  Current usage: <span className="font-bold">{formData.currentAdmins} admins</span>
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="creatorLimit">Number of Creators</Label>
              <Input
                id="creatorLimit"
                name="creatorLimit"
                type="number"
                min="1"
                value={formData.creatorLimit}
                onChange={handleChange}
                readOnly={formData.subscriptionTier !== "flexible"}
                className={formData.subscriptionTier !== "flexible" ? "bg-muted" : ""}
              />
              {isEditing && (
                <p className="text-xs text-muted-foreground">
                  Current usage: <span className="font-bold">{formData.currentCreators} creators</span>
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
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
              disabled={formData.subscriptionTier === "trial"}
            />
            {formErrors.startDate && <p className="text-xs text-destructive">{formErrors.startDate}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate" className={cn(formErrors.endDate && "text-destructive")}>
              End Date <span className="text-destructive">*</span>
            </Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              className={cn(formErrors.endDate && "border-destructive")}
              disabled={formData.subscriptionTier === "trial"}
            />
            {formErrors.endDate && <p className="text-xs text-destructive">{formErrors.endDate}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter subscription notes..."
              className="min-h-[80px]"
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
            <Button type="submit">{isEditing ? "Update Subscription" : "Add Subscription"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
