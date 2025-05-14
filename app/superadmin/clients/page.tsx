"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, PlusCircle, Edit, Calendar, Eye, RefreshCw, Power } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for clients
const mockClients = [
  {
    id: 1,
    name: "Dayatech",
    industry: "Technology",
    status: "Active",
    subscriptionTier: "tier1",
    subscriptionStart: "2025-01-15",
    subscriptionEnd: "2030-01-14",
    subdomain: "dayatech",
    logo: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "Globex Industries",
    industry: "Manufacturing",
    status: "Active",
    subscriptionTier: "tier2",
    subscriptionStart: "2023-02-22",
    subscriptionEnd: "2024-02-21",
    subdomain: "globex",
    logo: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    name: "Stark Enterprises",
    industry: "Energy",
    status: "Inactive",
    subscriptionTier: "tier3",
    subscriptionStart: "2023-03-10",
    subscriptionEnd: "2024-03-09",
    subdomain: "stark",
    logo: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    name: "Wayne Industries",
    industry: "Defense",
    status: "Active",
    subscriptionTier: "tier4",
    subscriptionStart: "2023-01-05",
    subscriptionEnd: "2024-01-04",
    subdomain: "wayne",
    logo: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    name: "Umbrella Corp",
    industry: "Pharmaceuticals",
    status: "Inactive",
    subscriptionTier: "tier2",
    subscriptionStart: "2023-04-18",
    subscriptionEnd: "2024-04-17",
    subdomain: "umbrella",
    logo: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 6,
    name: "Acme Corporation",
    industry: "Technology",
    status: "Expired",
    subscriptionTier: "tier1",
    subscriptionStart: "2022-05-10",
    subscriptionEnd: "2023-05-09",
    subdomain: "acme",
    logo: "/placeholder.svg?height=32&width=32",
  },
]

// Initial industries list
const initialIndustries = [
  "Technology",
  "Manufacturing",
  "Energy",
  "Defense",
  "Pharmaceuticals",
  "Finance",
  "Retail",
  "Healthcare",
  "Education",
  "Transportation",
  "Hospitality",
  "Media",
  "Agriculture",
  "Construction",
  "Telecommunications",
]

// Subscription tier details
const subscriptionTiers = {
  tier1: { name: "Starter", admins: 2, creators: 50 },
  tier2: { name: "Growth", admins: 5, creators: 150 },
  tier3: { name: "Business", admins: 10, creators: 500 },
  tier4: { name: "Enterprise", admins: "Unlimited", creators: "Unlimited" },
}

export default function ClientsPage() {
  const [clients, setClients] = useState(mockClients)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [isClientDetailsOpen, setIsClientDetailsOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false)
  const [clientToDeactivate, setClientToDeactivate] = useState(null)
  const [isRenewDialogOpen, setIsRenewDialogOpen] = useState(false)
  const [clientToRenew, setClientToRenew] = useState(null)
  const [renewalDate, setRenewalDate] = useState(null)
  const { toast } = useToast()
  const router = useRouter()

  // Filter clients based on search query and filters
  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || client.status.toLowerCase() === statusFilter
    const matchesIndustry = industryFilter === "all" || client.industry.toLowerCase() === industryFilter
    return matchesSearch && matchesStatus && matchesIndustry
  })

  const handleViewClient = (client) => {
    setSelectedClient(client)
    setIsClientDetailsOpen(true)
  }

  const handleEditClient = (clientId) => {
    router.push(`/superadmin/clients/${clientId}/edit`)
  }

  const handleAddClient = () => {
    router.push("/superadmin/clients/add")
  }

  const handleDeactivateClient = () => {
    if (!clientToDeactivate) return

    const updatedClients = clients.map((client) => {
      if (client.id === clientToDeactivate.id) {
        const newStatus = client.status === "Active" ? "Inactive" : "Active"
        return { ...client, status: newStatus }
      }
      return client
    })

    setClients(updatedClients)
    setIsDeactivateDialogOpen(false)
    setClientToDeactivate(null)

    toast({
      title: "Client Status Updated",
      description: `${clientToDeactivate.name} has been ${clientToDeactivate.status === "Active" ? "deactivated" : "activated"}.`,
    })
  }

  const handleRenewClient = (client) => {
    setClientToRenew(client)

    // Set default renewal date to 1 year from now
    const today = new Date()
    const nextYear = new Date(today.setFullYear(today.getFullYear() + 1))
    setRenewalDate(nextYear)

    setIsRenewDialogOpen(true)
  }

  const handleRenewalConfirm = () => {
    if (!clientToRenew || !renewalDate) return

    // Calculate new subscription dates
    const today = new Date()
    const formattedToday = today.toISOString().split("T")[0]
    const formattedRenewalDate = renewalDate.toISOString().split("T")[0]

    const updatedClients = clients.map((client) => {
      if (client.id === clientToRenew.id) {
        return {
          ...client,
          status: "Active",
          subscriptionStart: formattedToday,
          subscriptionEnd: formattedRenewalDate,
        }
      }
      return client
    })

    setClients(updatedClients)
    setIsRenewDialogOpen(false)
    setClientToRenew(null)

    toast({
      title: "Subscription Renewed",
      description: `${clientToRenew.name}'s subscription has been renewed until ${renewalDate.toLocaleDateString()}.`,
    })
  }

  // Format subscription duration
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

  // Format subscription tier with details
  const formatSubscriptionTier = (tierCode) => {
    const tier = subscriptionTiers[tierCode]
    if (!tier) return tierCode

    return (
      <div className="flex flex-col">
        <span className="font-medium">{tier.name}</span>
        <span className="text-xs text-muted-foreground">
          {typeof tier.admins === "string" ? tier.admins : `${tier.admins} admins`},{" "}
          {typeof tier.creators === "string" ? tier.creators : `${tier.creators} creators`}
        </span>
      </div>
    )
  }

  // Add this useEffect to check for expired subscriptions
  useEffect(() => {
    // Check if any subscriptions have expired and update their status
    const today = new Date()
    const updatedClients = clients.map((client) => {
      const endDate = new Date(client.subscriptionEnd)
      if (client.status === "Active" && endDate < today) {
        return { ...client, status: "Expired" }
      }
      return client
    })

    // Only update if there are changes
    if (JSON.stringify(updatedClients) !== JSON.stringify(clients)) {
      setClients(updatedClients)
    }
  }, [clients])

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Client Management</h1>
          <Button onClick={handleAddClient}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Client
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Clients Overview</CardTitle>
            <CardDescription>Manage and monitor all client accounts in one place</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search clients..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="energy">Energy</SelectItem>
                    <SelectItem value="defense">Defense</SelectItem>
                    <SelectItem value="pharmaceuticals">Pharmaceuticals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Subscription Tier</TableHead>
                    <TableHead>Subscription Duration</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No clients found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden">
                              <img
                                src={client.logo || "/placeholder.svg"}
                                alt={`${client.name} logo`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{client.name}</p>
                              <p className="text-xs text-muted-foreground">{client.subdomain}.hypearn.com</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{client.industry}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              client.status === "Active"
                                ? "success"
                                : client.status === "Inactive"
                                  ? "destructive"
                                  : "outline"
                            }
                          >
                            {client.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatSubscriptionTier(client.subscriptionTier)}</TableCell>
                        <TableCell>
                          {formatSubscriptionDuration(client.subscriptionStart, client.subscriptionEnd)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleViewClient(client)}
                                >
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View Details</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>View client details</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleEditClient(client.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit Client</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit client information</TooltipContent>
                            </Tooltip>

                            {client.status === "Expired" ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-green-600"
                                    onClick={() => handleRenewClient(client)}
                                  >
                                    <RefreshCw className="h-4 w-4" />
                                    <span className="sr-only">Renew Subscription</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Renew client subscription</TooltipContent>
                              </Tooltip>
                            ) : client.status === "Active" ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-600"
                                    onClick={() => {
                                      setClientToDeactivate(client)
                                      setIsDeactivateDialogOpen(true)
                                    }}
                                  >
                                    <Power className="h-4 w-4" />
                                    <span className="sr-only">Deactivate</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Deactivate client account</TooltipContent>
                              </Tooltip>
                            ) : (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-green-600"
                                    onClick={() => {
                                      setClientToDeactivate(client)
                                      setIsDeactivateDialogOpen(true)
                                    }}
                                  >
                                    <Power className="h-4 w-4" />
                                    <span className="sr-only">Activate</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Activate client account</TooltipContent>
                              </Tooltip>
                            )}
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

        {/* Client Details Dialog */}
        <Dialog open={isClientDetailsOpen} onOpenChange={setIsClientDetailsOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Client Details</DialogTitle>
            </DialogHeader>
            {selectedClient && <ClientDetails client={selectedClient} />}
          </DialogContent>
        </Dialog>

        {/* Deactivate Client Confirmation Dialog */}
        <Dialog open={isDeactivateDialogOpen} onOpenChange={setIsDeactivateDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{clientToDeactivate?.status === "Active" ? "Deactivate" : "Activate"} Client</DialogTitle>
              <DialogDescription>
                {clientToDeactivate?.status === "Active"
                  ? "Are you sure you want to deactivate this client? This will suspend their access to the platform."
                  : "Are you sure you want to activate this client? This will restore their access to the platform."}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {clientToDeactivate && (
                <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                  <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden">
                    <img
                      src={clientToDeactivate.logo || "/placeholder.svg"}
                      alt={`${clientToDeactivate.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{clientToDeactivate.name}</p>
                    <p className="text-xs text-muted-foreground">{clientToDeactivate.subdomain}.hypearn.com</p>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeactivateDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant={clientToDeactivate?.status === "Active" ? "destructive" : "default"}
                onClick={handleDeactivateClient}
              >
                {clientToDeactivate?.status === "Active" ? "Yes, Deactivate" : "Yes, Activate"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Renew Subscription Dialog */}
        <Dialog open={isRenewDialogOpen} onOpenChange={setIsRenewDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Renew Client Subscription</DialogTitle>
              <DialogDescription>Set a new subscription end date for {clientToRenew?.name}</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              {clientToRenew && (
                <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                  <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden">
                    <img
                      src={clientToRenew.logo || "/placeholder.svg"}
                      alt={`${clientToRenew.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{clientToRenew.name}</p>
                    <p className="text-xs text-muted-foreground">{clientToRenew.subdomain}.hypearn.com</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="subscription-tier">Subscription Tier</Label>
                </div>
                <Select defaultValue={clientToRenew?.subscriptionTier}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subscription tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trial">Trial (30 Days) - 1 admin, 10 creators</SelectItem>
                    <SelectItem value="tier1">Starter - 2 admins, 50 creators</SelectItem>
                    <SelectItem value="flexible">Flexible - Custom admins & creators</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="renewal-date">Subscription End Date</Label>
                </div>
                <DatePicker date={renewalDate} setDate={setRenewalDate} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRenewDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleRenewalConfirm}>Renew Subscription</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}

function ClientDetails({ client }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Format subscription tier with details
  const formatSubscriptionTier = (tierCode) => {
    const tiers = {
      trial: { name: "Trial", admins: 1, creators: 10 },
      tier1: { name: "Starter", admins: 2, creators: 50 },
      flexible: { name: "Flexible", admins: "Custom", creators: "Custom" },
    }

    const tier = tiers[tierCode]
    if (!tier) return tierCode

    return `${tier.name} (${typeof tier.admins === "string" ? tier.admins : `${tier.admins} admins`}, ${typeof tier.creators === "string" ? tier.creators : `${tier.creators} creators`})`
  }

  // Format subscription duration
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden">
            <img
              src={client.logo || "/placeholder.svg?height=48&width=48"}
              alt={`${client.name} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{client.name}</h2>
            <p className="text-muted-foreground">
              {client.industry} • {formatSubscriptionTier(client.subscriptionTier)}
            </p>
          </div>
        </div>
        <Badge
          variant={client.status === "Active" ? "success" : client.status === "Pending" ? "warning" : "destructive"}
          className="text-sm"
        >
          {client.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Company Information</h3>
            <div className="grid grid-cols-1 gap-2 mt-1">
              <div>
                <p className="text-xs text-muted-foreground">Subdomain</p>
                <p className="text-sm">{client.subdomain}.hypearn.com</p>
              </div>
              {client.description && (
                <div>
                  <p className="text-xs text-muted-foreground">Description</p>
                  <p className="text-sm">{client.description}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
            <div className="grid grid-cols-1 gap-2 mt-1">
              {client.streetAddress && (
                <div>
                  <p className="text-xs text-muted-foreground">Street Address</p>
                  <p className="text-sm">{client.streetAddress}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                {client.city && (
                  <div>
                    <p className="text-xs text-muted-foreground">City</p>
                    <p className="text-sm">{client.city}</p>
                  </div>
                )}
                {client.stateProvince && (
                  <div>
                    <p className="text-xs text-muted-foreground">State/Province</p>
                    <p className="text-sm">{client.stateProvince}</p>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {client.postalCode && (
                  <div>
                    <p className="text-xs text-muted-foreground">Postal Code</p>
                    <p className="text-sm">{client.postalCode}</p>
                  </div>
                )}
                {client.country && (
                  <div>
                    <p className="text-xs text-muted-foreground">Country</p>
                    <p className="text-sm">{client.country}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Subscription Details</h3>
            <div className="grid grid-cols-1 gap-2 mt-1">
              <div>
                <p className="text-xs text-muted-foreground">Subscription Period</p>
                <p className="text-sm">
                  {formatSubscriptionDuration(client.subscriptionStart, client.subscriptionEnd)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Subscription Tier</p>
                <p className="text-sm">{formatSubscriptionTier(client.subscriptionTier)}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
            <div className="grid grid-cols-1 gap-2 mt-1">
              {client.primaryEmail && (
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm">{client.primaryEmail}</p>
                </div>
              )}
              {client.phoneNumber && (
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm">{client.phoneNumber}</p>
                </div>
              )}
            </div>
          </div>

          {client.internalNotes && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Internal Notes</h3>
              <div className="mt-1 p-2 bg-muted rounded-md">
                <p className="text-sm">{client.internalNotes}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
        <Button variant="outline" size="sm">
          <Edit className="mr-2 h-4 w-4" /> Edit Client
        </Button>
      </div>
    </div>
  )
}
