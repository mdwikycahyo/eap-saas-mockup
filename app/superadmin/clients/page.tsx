"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, PlusCircle, Edit, Tag, Wallet } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CustomPagination } from "@/components/ui/custom-pagination"

// Mock data for clients
const mockClients = [
  {
    id: 1,
    name: "Dayatech",
    industry: "Technology",
    status: "Active", // Active subscription
    subscriptionTier: "flexible",
    subscriptionStart: "2024-01-15",
    subscriptionEnd: "2025-01-14",
    subdomain: "dayatech",
    logo: "/placeholder.svg?height=32&width=32",
    adminCount: "15",
    creatorCount: "350",
    rewardBalance: "5000000",
  },
  {
    id: 2,
    name: "Globex Industries",
    industry: "Manufacturing",
    status: "Future", // Future subscription
    subscriptionTier: "tier1",
    subscriptionStart: "2025-03-01",
    subscriptionEnd: "2026-02-28",
    subdomain: "globex",
    logo: "/placeholder.svg?height=32&width=32",
    adminCount: "2",
    creatorCount: "50",
    rewardBalance: "10000000",
  },
  {
    id: 3,
    name: "Stark Enterprises",
    industry: "Energy",
    status: "Inactive", // Past subscription
    subscriptionTier: "flexible",
    subscriptionStart: "2023-03-10",
    subscriptionEnd: "2024-03-09",
    subdomain: "stark",
    logo: "/placeholder.svg?height=32&width=32",
    adminCount: "8",
    creatorCount: "200",
    rewardBalance: "7500000",
  },
  {
    id: 7,
    name: "TechFlow Solutions",
    industry: "Software",
    status: "Inactive", // Newly added company - no subscription yet
    subscriptionTier: null,
    subscriptionStart: null,
    subscriptionEnd: null,
    subdomain: "techflow",
    logo: "/placeholder.svg?height=32&width=32",
    adminCount: "0",
    creatorCount: "0",
    rewardBalance: "0",
  },
  {
    id: 4,
    name: "Wayne Industries",
    industry: "Defense",
    status: "Active",
    subscriptionTier: "flexible",
    subscriptionStart: "2023-01-05",
    subscriptionEnd: "2025-01-04",
    subdomain: "wayne",
    logo: "/placeholder.svg?height=32&width=32",
    adminCount: "15",
    creatorCount: "350",
    rewardBalance: "15000000",
  },
  {
    id: 5,
    name: "Umbrella Corp",
    industry: "Pharmaceuticals",
    status: "Inactive",
    subscriptionTier: "trial",
    subscriptionStart: "2023-04-18",
    subscriptionEnd: "2023-05-18",
    subdomain: "umbrella",
    logo: "/placeholder.svg?height=32&width=32",
    adminCount: "1",
    creatorCount: "10",
    rewardBalance: "2500000",
  },
  {
    id: 6,
    name: "Acme Corporation",
    industry: "Technology",
    status: "Inactive",
    subscriptionTier: "tier1",
    subscriptionStart: "2022-05-10",
    subscriptionEnd: "2023-05-09",
    subdomain: "acme",
    logo: "/placeholder.svg?height=32&width=32",
    adminCount: "2",
    creatorCount: "50",
    rewardBalance: "3000000",
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
  "Software",
]

const formatCurrency = (amount) => {
  if (amount === "0") return "IDR 0"
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("Rp", "IDR")
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

export default function ClientsPage() {
  const [clients, setClients] = useState(mockClients)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [isClientDetailsOpen, setIsClientDetailsOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const { toast } = useToast()
  const router = useRouter()

  // Filter clients based on search query and filters
  const filteredClients = clients.filter((client) => {
    return client.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentClients = filteredClients.slice(startIndex, endIndex)

  // Reset to first page when search changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
  }

  const handleEditClient = (clientId) => {
    router.push(`/superadmin/clients/${clientId}/edit`)
  }

  const handleAddClient = () => {
    router.push("/superadmin/clients/add")
  }

  const handleManageSubscription = (clientId) => {
    router.push(`/superadmin/clients/${clientId}/subscription`)
  }

  const handleManageRewardBalance = (clientId) => {
    router.push(`/superadmin/clients/${clientId}/reward-balance`)
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
    <TooltipProvider>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manage Company List</h1>
          <Button onClick={handleAddClient}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Company
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Companies Overview</CardTitle>
            <CardDescription>Manage and monitor all company accounts in one place</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search companies..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="flex gap-2"></div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Subscription Status</TableHead>
                    <TableHead>Reward Balance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentClients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No companies found
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentClients.map((client) => (
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
                            variant={getStatusBadgeVariant(client.status)}
                            className={
                              client.status === "Active"
                                ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
                                : client.status === "Future"
                                  ? "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200"
                                  : ""
                            }
                          >
                            {client.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatCurrency(client.rewardBalance)}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-start space-x-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleEditClient(client.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit Company</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit company information</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleManageSubscription(client.id)}
                                >
                                  <Tag className="h-4 w-4" />
                                  <span className="sr-only">Manage Subscription</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Manage Subscription</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleManageRewardBalance(client.id)}
                                >
                                  <Wallet className="h-4 w-4" />
                                  <span className="sr-only">Manage Reward Balance</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Manage Reward Balance</TooltipContent>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Custom Pagination */}
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredClients.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={handleItemsPerPageChange}
              itemName="companies"
            />
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
