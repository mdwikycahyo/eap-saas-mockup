"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, Award, CheckCircle, XCircle, Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CustomPagination } from "@/components/ui/custom-pagination"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import * as XLSX from "xlsx" // For Excel export

type AdminReward = {
  id: string
  name: string
  category: string
  points: number
  rupiah_value: number
  status: "active" | "inactive"
  redemptions: number
  description?: string
  imageUrl: string
  stock?: number
}

type Redemption = {
  id: string
  transactionId: string
  creator: {
    name: string
    email: string
  }
  reward: string
  points: number
  rupiah_value: number
  status: "Processing" | "Success" | "Failed"
  requestedAt: string // ISO string e.g. "2023-07-15T10:00:00Z"
  fulfilledAt: string | null
  destinationNumber: string
  rejectionReason?: string
}

const POINT_TO_RUPIAH_RATE = 100

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const formatDateDDMMYYYY = (dateString: string | null | undefined): string => {
  if (!dateString) return "-"
  try {
    const date = new Date(dateString)
    return format(date, "dd/MM/yyyy")
  } catch (error) {
    return "Invalid Date"
  }
}

const downloadExcel = (data: Redemption[], filename = "redemptions-report.xlsx") => {
  const worksheetData = data.map((row) => ({
    "Transaction ID": row.transactionId,
    "Creator Name": row.creator.name,
    "Creator Email": row.creator.email,
    "Reward Name": row.reward,
    Points: row.points,
    "Rupiah Value": row.rupiah_value,
    "Destination Number": row.destinationNumber,
    "Requested Date (DD/MM/YYYY)": formatDateDDMMYYYY(row.requestedAt),
    Status: row.status,
    "Rejection Reason": row.rejectionReason || "",
  }))

  const worksheet = XLSX.utils.json_to_sheet(worksheetData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Redemptions")
  XLSX.writeFile(workbook, filename)
}

export default function RewardsManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()
  const [catalogCurrentPage, setCatalogCurrentPage] = useState(1)
  const [catalogItemsPerPage, setCatalogItemsPerPage] = useState(6)
  const [currentAdminClientBalance, setCurrentAdminClientBalance] = useState(50000000)

  const [redemptionsCurrentPage, setRedemptionsCurrentPage] = useState(1)
  const [redemptionsItemsPerPage, setRedemptionsItemsPerPage] = useState(5)

  // State for report download modal
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [reportStartDate, setReportStartDate] = useState<Date | undefined>()
  const [reportEndDate, setReportEndDate] = useState<Date | undefined>()

  const [rewards, setRewards] = useState<AdminReward[]>([
    {
      id: "1",
      name: "GoPay Balance Rp 50.000",
      category: "E-Money",
      points: 500,
      rupiah_value: 50000,
      status: "active",
      redemptions: 28,
      description: "Saldo GoPay.",
      imageUrl: "/placeholder.svg?height=200&width=400",
      stock: 100,
    },
    {
      id: "2",
      name: "Telkomsel Pulsa Rp 25.000",
      category: "Pulsa",
      points: 250,
      rupiah_value: 25000,
      status: "active",
      redemptions: 45,
      description: "Pulsa Telkomsel.",
      imageUrl: "/placeholder.svg?height=200&width=400",
      stock: 200,
    },
  ])

  const initialRedemptions: Redemption[] = [
    {
      id: "rdm001",
      transactionId: "RDN-20230715-001",
      creator: { name: "Sarah Johnson", email: "sarah.j@example.com" },
      reward: "GoPay Balance Rp 50.000",
      points: 500,
      rupiah_value: 50000,
      status: "Success",
      requestedAt: "2023-07-15T10:00:00Z",
      fulfilledAt: "2023-07-18T10:00:00Z",
      destinationNumber: "081234567890",
    },
    {
      id: "rdm002",
      transactionId: "RDN-20230720-002",
      creator: { name: "Michael Chen", email: "michael.c@example.com" },
      reward: "OVO Cash Rp 100.000",
      points: 1000,
      rupiah_value: 100000,
      status: "Processing",
      requestedAt: "2023-07-20T11:00:00Z",
      fulfilledAt: null,
      destinationNumber: "081200001111",
    },
    {
      id: "rdm003",
      transactionId: "RDN-20230718-003",
      creator: { name: "Emily Rodriguez", email: "emily.r@example.com" },
      reward: "Telkomsel Pulsa Rp 25.000",
      points: 250,
      rupiah_value: 25000,
      status: "Failed",
      requestedAt: "2023-07-18T12:00:00Z",
      fulfilledAt: null,
      destinationNumber: "085200001111",
      rejectionReason: "Invalid phone number format",
    },
    {
      id: "rdm004",
      transactionId: "RDN-20230710-004",
      creator: { name: "David Wilson", email: "david.w@example.com" },
      reward: "Indosat Pulsa Rp 50.000",
      points: 500,
      rupiah_value: 50000,
      status: "Success",
      requestedAt: "2023-07-10T13:00:00Z",
      fulfilledAt: "2023-07-14T10:00:00Z",
      destinationNumber: "085712345678",
    },
    {
      id: "rdm005",
      transactionId: "RDN-20230722-005",
      creator: { name: "Lisa Thompson", email: "lisa.t@example.com" },
      reward: "ShopeePay Balance Rp 75.000",
      points: 750,
      rupiah_value: 75000,
      status: "Processing",
      requestedAt: "2023-07-22T14:00:00Z",
      fulfilledAt: null,
      destinationNumber: "087712340000",
    },
    {
      id: "rdm006",
      transactionId: "RDN-20240115-001",
      creator: { name: "James Brown", email: "james.b@example.com" },
      reward: "XL Axiata Pulsa Rp 100.000",
      points: 1000,
      rupiah_value: 100000,
      status: "Success",
      requestedAt: "2024-01-15T09:00:00Z",
      fulfilledAt: "2024-01-15T10:00:00Z",
      destinationNumber: "081801234567",
    },
    {
      id: "rdm007",
      transactionId: "RDN-20240120-001",
      creator: { name: "Patricia Miller", email: "patricia.m@example.com" },
      reward: "GoPay Balance Rp 50.000",
      points: 500,
      rupiah_value: 50000,
      status: "Processing",
      requestedAt: "2024-01-20T15:00:00Z",
      fulfilledAt: null,
      destinationNumber: "081398765432",
    },
    {
      id: "rdm008",
      transactionId: "RDN-20240201-001",
      creator: { name: "Robert Davis", email: "robert.d@example.com" },
      reward: "OVO Cash Rp 100.000",
      points: 1000,
      rupiah_value: 100000,
      status: "Success",
      requestedAt: "2024-02-01T16:00:00Z",
      fulfilledAt: "2024-02-01T17:00:00Z",
      destinationNumber: "081211223344",
    },
    {
      id: "rdm009",
      transactionId: "RDN-20240205-001",
      creator: { name: "Linda Wilson", email: "linda.w@example.com" },
      reward: "Telkomsel Pulsa Rp 25.000",
      points: 250,
      rupiah_value: 25000,
      status: "Failed",
      requestedAt: "2024-02-05T10:30:00Z",
      fulfilledAt: null,
      destinationNumber: "085299887766",
      rejectionReason: "Insufficient points",
    },
    {
      id: "rdm010",
      transactionId: "RDN-20240210-001",
      creator: { name: "Christopher Garcia", email: "chris.g@example.com" },
      reward: "ShopeePay Balance Rp 75.000",
      points: 750,
      rupiah_value: 75000,
      status: "Processing",
      requestedAt: "2024-02-10T11:45:00Z",
      fulfilledAt: null,
      destinationNumber: "087755667788",
    },
  ]

  const sortedRedemptions = useMemo(() => {
    return [...initialRedemptions].sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime())
  }, [initialRedemptions])

  const filteredRewards = rewards.filter(
    (reward) =>
      searchQuery === "" ||
      reward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reward.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reward.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalCatalogPages = Math.ceil(filteredRewards.length / catalogItemsPerPage)
  const paginatedRewards = filteredRewards.slice(
    (catalogCurrentPage - 1) * catalogItemsPerPage,
    catalogCurrentPage * catalogItemsPerPage,
  )

  // Pagination for sorted redemptions
  const totalRedemptionPages = Math.ceil(sortedRedemptions.length / redemptionsItemsPerPage)
  const paginatedRedemptions = sortedRedemptions.slice(
    (redemptionsCurrentPage - 1) * redemptionsItemsPerPage,
    redemptionsCurrentPage * redemptionsItemsPerPage,
  )

  const handleToggleStatus = (rewardId: string) => {
    const updatedRewards = rewards.map((reward) =>
      reward.id === rewardId ? { ...reward, status: reward.status === "active" ? "inactive" : "active" } : reward,
    )
    setRewards(updatedRewards)
    const updatedReward = updatedRewards.find((r) => r.id === rewardId)
    toast({
      title: `Reward ${updatedReward?.status === "active" ? "Activated" : "Deactivated"}`,
      description: `${updatedReward?.name} status has been changed.`,
    })
  }

  const handleDownloadReport = () => {
    let dataToDownload = sortedRedemptions

    if (reportStartDate || reportEndDate) {
      dataToDownload = sortedRedemptions.filter((redemption) => {
        const requestedDate = new Date(redemption.requestedAt)
        let passesStartDate = true
        let passesEndDate = true

        if (reportStartDate) {
          const start = new Date(reportStartDate)
          start.setHours(0, 0, 0, 0) // Start of day
          passesStartDate = requestedDate >= start
        }
        if (reportEndDate) {
          const end = new Date(reportEndDate)
          end.setHours(23, 59, 59, 999) // End of day
          passesEndDate = requestedDate <= end
        }
        return passesStartDate && passesEndDate
      })
    }

    if (dataToDownload.length === 0) {
      toast({
        title: "No Data",
        description: "No redemptions found for the selected period.",
        variant: "destructive",
      })
      return
    }

    downloadExcel(dataToDownload)
    toast({
      title: "Report Downloaded",
      description: "Redemptions report has been successfully downloaded as Excel.",
    })
    setIsReportModalOpen(false) // Close modal after download
    setReportStartDate(undefined) // Reset dates in modal
    setReportEndDate(undefined)
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Rewards Management</h1>
          <p className="text-muted-foreground">Manage rewards catalog and view redemptions.</p>
        </div>
      </div>

      <Tabs
        defaultValue="catalog"
        className="w-full mb-6"
        onValueChange={(value) => {
          if (value === "catalog") setCatalogCurrentPage(1)
          else if (value === "redemptions") setRedemptionsCurrentPage(1)
        }}
      >
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search rewards by name, category, or description..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCatalogCurrentPage(1)
              }}
            />
          </div>
          <TabsList>
            <TabsTrigger value="catalog">Catalog</TabsTrigger>
            <TabsTrigger value="redemptions">Redemptions</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="catalog">
          <AdminRewardsCatalog rewards={paginatedRewards} onToggleStatus={handleToggleStatus} isLoading={false} />
          {totalCatalogPages > 1 && (
            <CustomPagination
              currentPage={catalogCurrentPage}
              totalPages={totalCatalogPages}
              totalItems={filteredRewards.length}
              itemsPerPage={catalogItemsPerPage}
              onPageChange={setCatalogCurrentPage}
              onItemsPerPageChange={(val) => {
                setCatalogItemsPerPage(val)
                setCatalogCurrentPage(1)
              }}
              itemName="rewards"
            />
          )}
          {filteredRewards.length === 0 && searchQuery !== "" && (
            <div className="p-8 text-center text-muted-foreground border rounded-md mt-6">
              No rewards found for "{searchQuery}".
            </div>
          )}
          {filteredRewards.length === 0 && searchQuery === "" && rewards.length === 0 && (
            <div className="p-8 text-center text-muted-foreground border rounded-md mt-6">
              No rewards available in the catalog.
            </div>
          )}
        </TabsContent>

        <TabsContent value="redemptions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Reward Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{formatCurrency(currentAdminClientBalance)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Redemption History</CardTitle>
                  <CardDescription>View all redemptions, sorted by newest first.</CardDescription>
                </div>
                <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Download Redemption Report</DialogTitle>
                      <DialogDescription>
                        Select a period to download the report in Excel format. Leave blank to download all.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="report-start-date">Start Date (Optional)</Label>
                        <DatePicker
                          id="report-start-date"
                          mode="single"
                          selected={reportStartDate}
                          onSelect={setReportStartDate}
                          placeholderText="Pick start date"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="report-end-date">End Date (Optional)</Label>
                        <DatePicker
                          id="report-end-date"
                          mode="single"
                          selected={reportEndDate}
                          onSelect={setReportEndDate}
                          disabled={(date) => (reportStartDate ? date < reportStartDate : false)}
                          placeholderText="Pick end date"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                      </DialogClose>
                      <Button onClick={handleDownloadReport}>
                        <Download className="h-4 w-4 mr-2" />
                        Download Excel
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <RedemptionsList redemptions={paginatedRedemptions} />
              {totalRedemptionPages > 1 && (
                <CustomPagination
                  currentPage={redemptionsCurrentPage}
                  totalPages={totalRedemptionPages}
                  totalItems={sortedRedemptions.length}
                  itemsPerPage={redemptionsItemsPerPage}
                  onPageChange={setRedemptionsCurrentPage}
                  onItemsPerPageChange={(val) => {
                    setRedemptionsItemsPerPage(val)
                    setRedemptionsCurrentPage(1)
                  }}
                  itemName="redemptions"
                />
              )}
              {sortedRedemptions.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">No redemptions have been made yet.</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AdminRewardsCatalog({
  rewards,
  onToggleStatus,
  isLoading,
}: { rewards: AdminReward[]; onToggleStatus: (rewardId: string) => void; isLoading: boolean }) {
  if (isLoading) return <p className="text-center py-4">Loading rewards...</p>
  if (rewards.length === 0 && !isLoading) return null
  return (
    <Card>
      <CardHeader className="px-6">
        <CardTitle>Rewards Catalog</CardTitle>
        <CardDescription>Manage available rewards.</CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => (
            <AdminRewardCard key={reward.id} reward={reward} onToggleStatus={() => onToggleStatus(reward.id)} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function AdminRewardCard({ reward, onToggleStatus }: { reward: AdminReward; onToggleStatus: () => void }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="relative">
        <img
          src={reward.imageUrl || `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(reward.name)}`}
          alt={reward.name}
          className="w-full h-48 object-cover bg-muted"
        />
        <div className="absolute top-2 right-2">
          <Badge
            variant={reward.status === "active" ? "default" : "secondary"}
            className={`${reward.status === "active" ? "bg-green-600 text-white" : "bg-slate-500 text-slate-50"} hover:bg-opacity-90 text-xs px-2 py-1`}
          >
            {reward.status === "active" ? "Active" : "Inactive"}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-3 py-1.5 rounded-md flex items-center gap-1.5">
          <Award className="h-4 w-4" />
          <span className="font-semibold text-sm">{reward.points.toLocaleString()} points</span>
        </div>
      </div>
      <CardHeader className="pt-4 pb-2">
        <CardTitle className="text-lg leading-tight">{reward.name}</CardTitle>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-muted-foreground">Value: {formatCurrency(reward.rupiah_value)}</p>
        </div>
        {reward.stock === 0 && reward.status === "active" && (
          <Badge variant="outline" className="mt-1 text-xs bg-amber-100 text-amber-700 border-amber-300">
            Out of Stock
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex-grow pt-1 pb-3">
        <p className="text-sm text-muted-foreground line-clamp-3 h-[3.75rem]">{reward.description}</p>
      </CardContent>
      <CardFooter className="border-t pt-3 pb-3 flex justify-end space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`w-full ${reward.status === "active" ? "hover:bg-amber-50 text-amber-600 border-amber-300 hover:border-amber-400" : "hover:bg-green-50 text-green-600 border-green-300 hover:border-green-400"}`}
                onClick={onToggleStatus}
              >
                {reward.status === "active" ? (
                  <XCircle className="h-4 w-4 mr-2" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                {reward.status === "active" ? "Deactivate" : "Activate"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{reward.status === "active" ? "Deactivate this reward" : "Activate this reward"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}

function RedemptionsList({ redemptions }: { redemptions: Redemption[] }) {
  if (redemptions.length === 0) return null
  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-12 p-4 bg-slate-50 text-sm font-medium text-slate-500">
        <div className="col-span-2">Transaction ID</div>
        <div className="col-span-2">Creator</div>
        <div className="col-span-2">Reward</div>
        <div className="col-span-2">Value (Points & IDR)</div>
        <div className="col-span-1">Date</div>
        <div className="col-span-2">Destination</div>
        <div className="col-span-1">Status</div>
      </div>
      {redemptions.map((redemption) => (
        <div key={redemption.id} className="grid grid-cols-12 p-4 border-t items-center text-xs sm:text-sm">
          <div className="col-span-2 font-mono truncate" title={redemption.transactionId}>
            {redemption.transactionId}
          </div>
          <div className="col-span-2">
            <p className="font-medium truncate" title={redemption.creator.name}>
              {redemption.creator.name}
            </p>
            <p className="text-xs text-muted-foreground truncate" title={redemption.creator.email}>
              {redemption.creator.email}
            </p>
          </div>
          <div className="col-span-2 truncate" title={redemption.reward}>
            {redemption.reward}
          </div>
          <div className="col-span-2">
            <div className="flex items-center gap-1">
              <Award className="h-3 w-3 text-slate-400 shrink-0" />
              <span>{redemption.points.toLocaleString()} pts</span>
            </div>
            <div className="text-green-600 font-medium">{formatCurrency(redemption.rupiah_value)}</div>
          </div>
          <div className="col-span-1">{formatDateDDMMYYYY(redemption.requestedAt)}</div>
          <div className="col-span-2 text-muted-foreground truncate" title={redemption.destinationNumber}>
            {redemption.destinationNumber}
          </div>
          <div className="col-span-1">
            <Badge
              variant="outline"
              className={`text-xs whitespace-nowrap ${getStatusColor(redemption.status).bgColor} ${getStatusColor(redemption.status).textColor} ${getStatusColor(redemption.status).borderColor}`}
            >
              {redemption.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

function getStatusColor(status: "Processing" | "Success" | "Failed") {
  switch (status) {
    case "Success":
      return { bgColor: "bg-green-50", textColor: "text-green-700", borderColor: "border-green-200" }
    case "Processing":
      return { bgColor: "bg-blue-50", textColor: "text-blue-700", borderColor: "border-blue-200" }
    case "Failed":
      return { bgColor: "bg-red-50", textColor: "text-red-700", borderColor: "border-red-200" }
    default:
      return { bgColor: "bg-slate-50", textColor: "text-slate-700", borderColor: "border-slate-200" }
  }
}
