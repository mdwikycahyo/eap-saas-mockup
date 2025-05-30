"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Plus,
  Search,
  Download,
  Filter,
  FileText,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  Edit3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"

// Mock company data
const mockCompany = {
  id: 1,
  name: "Dayatech",
  subdomain: "dayatech",
  logo: "/placeholder.svg?height=40&width=40",
  currentBalance: 5000000,
}

// Mock transaction data with evidence documents and longer IDs
const mockTransactions = [
  {
    id: "TXN-20240115-001",
    type: "Top Up",
    topUpType: "Manual",
    amount: 2000000,
    date: "2024-01-15T10:30:00Z",
    description: "Monthly reward budget allocation for Q1 campaign activities",
    adminName: "John Admin",
    creatorName: null,
    status: "Confirmed",
    evidence: {
      fileName: "budget_allocation_receipt.pdf",
      fileType: "pdf",
      fileUrl: "/placeholder.svg?height=400&width=600&text=Budget+Receipt+PDF",
    },
  },
  {
    id: "TXN-20240114-002",
    type: "Redemption",
    amount: -150000,
    date: "2024-01-14T14:20:00Z",
    description: "GoPay e-money redemption for mobile top-up",
    adminName: null,
    creatorName: "Sarah Creator",
    status: "Success",
    evidence: null,
  },
  {
    id: "TXN-20240113-003",
    type: "Top Up",
    topUpType: "Manual",
    amount: 1500000,
    date: "2024-01-13T15:45:00Z",
    description: "Quarterly budget allocation pending verification",
    adminName: "Current Admin",
    creatorName: null,
    status: "Pending",
    evidence: {
      fileName: "quarterly_budget_receipt.pdf",
      fileType: "pdf",
      fileUrl: "/placeholder.svg?height=400&width=600&text=Quarterly+Budget+PDF",
    },
  },
  {
    id: "TXN-20240113-004",
    type: "Redemption",
    amount: -75000,
    date: "2024-01-13T09:15:00Z",
    description: "OVO e-money redemption for digital wallet balance",
    adminName: null,
    creatorName: "Mike Johnson",
    status: "Success",
    evidence: null,
  },
  {
    id: "TXN-20240112-005",
    type: "Top Up",
    topUpType: "Self",
    amount: 500000,
    date: "2024-01-12T15:45:00Z",
    description: "Payment gateway timeout",
    adminName: null,
    creatorName: null,
    status: "Failed",
    evidence: null,
  },
  {
    id: "TXN-20240112-006",
    type: "Top Up",
    topUpType: "Manual",
    amount: 750000,
    date: "2024-01-12T11:20:00Z",
    description: "Invalid evidence document format",
    adminName: "Sarah Admin",
    creatorName: null,
    status: "Failed",
    evidence: {
      fileName: "invalid_receipt.jpg",
      fileType: "image",
      fileUrl: "/placeholder.svg?height=400&width=600&text=Invalid+Receipt",
    },
  },
  {
    id: "TXN-20240111-007",
    type: "Redemption",
    amount: -120000,
    date: "2024-01-11T16:30:00Z",
    description: "Failed DANA redemption due to insufficient balance",
    adminName: null,
    creatorName: "Jessica Wong",
    status: "Failed",
    evidence: null,
  },
  {
    id: "TXN-20240110-008",
    type: "Top Up",
    topUpType: "Self",
    amount: 1000000,
    date: "2024-01-10T16:45:00Z",
    description: "Automatic top-up via payment gateway using credit card",
    adminName: null,
    creatorName: null,
    status: "Success",
    evidence: null,
  },
  {
    id: "TXN-20240109-009",
    type: "Top Up",
    topUpType: "Manual",
    amount: 800000,
    date: "2024-01-09T14:30:00Z",
    description: "Emergency budget allocation awaiting approval",
    adminName: "Current Admin",
    creatorName: null,
    status: "Pending",
    evidence: {
      fileName: "emergency_budget_transfer.jpg",
      fileType: "image",
      fileUrl: "/placeholder.svg?height=400&width=600&text=Emergency+Budget+Receipt",
    },
  },
  {
    id: "TXN-20240108-010",
    type: "Redemption",
    amount: -200000,
    date: "2024-01-08T11:30:00Z",
    description: "DANA e-money redemption for shopping voucher purchase",
    adminName: null,
    creatorName: "Alex Wilson",
    status: "Success",
    evidence: null,
  },
  {
    id: "TXN-20240107-011",
    type: "Top Up",
    topUpType: "Manual",
    amount: 2000000,
    date: "2024-01-07T09:15:00Z",
    description: "Evidence document verification failed",
    adminName: "David Lee",
    creatorName: null,
    status: "Failed",
    evidence: {
      fileName: "unverified_transfer.pdf",
      fileType: "pdf",
      fileUrl: "/placeholder.svg?height=400&width=600&text=Unverified+Transfer",
    },
  },
  {
    id: "TXN-20240106-012",
    type: "Redemption",
    amount: -85000,
    date: "2024-01-06T13:45:00Z",
    description: "Failed OVO redemption due to system maintenance",
    adminName: null,
    creatorName: "Michael Chen",
    status: "Failed",
    evidence: null,
  },
  {
    id: "TXN-20240105-013",
    type: "Redemption",
    amount: -50000,
    date: "2024-01-05T18:00:00Z",
    description: "Failed GoPay redemption due to system error and insufficient balance",
    adminName: null,
    creatorName: "Emily Brown",
    status: "Failed",
    evidence: null,
  },
  {
    id: "TXN-20240104-014",
    type: "Top Up",
    topUpType: "Self",
    amount: 3000000,
    date: "2024-01-04T13:20:00Z",
    description: "Insufficient funds in payment method",
    adminName: null,
    creatorName: null,
    status: "Failed",
    evidence: null,
  },
  {
    id: "TXN-20240102-015",
    type: "Top Up",
    topUpType: "Manual",
    amount: 500000,
    date: "2024-01-02T12:00:00Z",
    description: "Initial budget allocation for January marketing campaign",
    adminName: "David Lee",
    creatorName: null,
    status: "Confirmed",
    evidence: {
      fileName: "january_budget_proof.jpg",
      fileType: "image",
      fileUrl: "/placeholder.svg?height=400&width=600&text=January+Budget+Receipt",
    },
  },
]

const formatCurrency = (amount) => {
  const absAmount = Math.abs(amount)
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(absAmount)
    .replace("Rp", "IDR")
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const truncateText = (text, maxLength = 35) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}

export default function RewardBalancePage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const [transactions, setTransactions] = useState(mockTransactions)
  const [currentBalance, setCurrentBalance] = useState(mockCompany.currentBalance)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false)
  const [selectedEvidence, setSelectedEvidence] = useState(null)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [topUpForm, setTopUpForm] = useState({
    amount: "",
    description: "",
    evidenceFile: null,
  })
  const [editForm, setEditForm] = useState({
    amount: "",
    description: "",
    evidenceFile: null,
  })
  const [formErrors, setFormErrors] = useState({})

  // Filter transactions based on search and filter
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (transaction.adminName && transaction.adminName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (transaction.creatorName && transaction.creatorName.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFilter = filterType === "all" || transaction.type.toLowerCase().replace(" ", "") === filterType

    return matchesSearch && matchesFilter
  })

  // Pagination calculations
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex)

  // Reset to first page when filters change
  const handleSearchChange = (value) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handleFilterChange = (value) => {
    setFilterType(value)
    setCurrentPage(1)
  }

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number.parseInt(value))
    setCurrentPage(1)
  }

  const handleTopUpSubmit = () => {
    const errors = {}

    if (!topUpForm.amount || Number.parseFloat(topUpForm.amount.replace(/,/g, "")) <= 0) {
      errors.amount = "Please enter a valid amount"
    }

    if (!topUpForm.description.trim()) {
      errors.description = "Please enter a note"
    }

    if (!topUpForm.evidenceFile) {
      errors.evidenceFile = "Please upload evidence document"
    }

    setFormErrors(errors)

    if (Object.keys(errors).length === 0) {
      // Generate new transaction ID with current date
      const now = new Date()
      const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "")
      const newId = `TXN-${dateStr}-${String(transactions.length + 1).padStart(3, "0")}`

      // Parse the amount
      const topUpAmount = Number.parseFloat(topUpForm.amount.replace(/,/g, ""))

      // Create new transaction with Pending status
      const newTransaction = {
        id: newId,
        type: "Top Up",
        topUpType: "Manual",
        amount: topUpAmount,
        date: new Date().toISOString(),
        description: topUpForm.description,
        adminName: "Current Admin",
        creatorName: null,
        status: "Pending", // New manual top-ups start as Pending
        evidence: {
          fileName: topUpForm.evidenceFile.name,
          fileType: topUpForm.evidenceFile.type.includes("image") ? "image" : "pdf",
          fileUrl: URL.createObjectURL(topUpForm.evidenceFile),
        },
      }

      // Update transactions list
      setTransactions([newTransaction, ...transactions])

      // Note: Don't update balance yet - only when confirmed

      // Reset form and close modal
      setIsTopUpModalOpen(false)
      setTopUpForm({ amount: "", description: "", evidenceFile: null })
      setFormErrors({})

      toast({
        title: "Top-up Created",
        description: `Manual top-up of ${formatCurrency(topUpAmount)} is pending verification.`,
      })
    }
  }

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction)
    setEditForm({
      amount: new Intl.NumberFormat("id-ID").format(transaction.amount),
      description: transaction.description,
      evidenceFile: null, // Will keep existing evidence unless new file uploaded
    })
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = () => {
    const errors = {}

    if (!editForm.amount || Number.parseFloat(editForm.amount.replace(/,/g, "")) <= 0) {
      errors.amount = "Please enter a valid amount"
    }

    if (!editForm.description.trim()) {
      errors.description = "Please enter a note"
    }

    setFormErrors(errors)

    if (Object.keys(errors).length === 0) {
      const updatedAmount = Number.parseFloat(editForm.amount.replace(/,/g, ""))

      // Update the transaction
      const updatedTransactions = transactions.map((transaction) => {
        if (transaction.id === editingTransaction.id) {
          return {
            ...transaction,
            amount: updatedAmount,
            description: editForm.description,
            evidence: editForm.evidenceFile
              ? {
                  fileName: editForm.evidenceFile.name,
                  fileType: editForm.evidenceFile.type.includes("image") ? "image" : "pdf",
                  fileUrl: URL.createObjectURL(editForm.evidenceFile),
                }
              : transaction.evidence,
          }
        }
        return transaction
      })

      setTransactions(updatedTransactions)

      // Reset form and close modal
      setIsEditModalOpen(false)
      setEditingTransaction(null)
      setEditForm({ amount: "", description: "", evidenceFile: null })
      setFormErrors({})

      toast({
        title: "Transaction Updated",
        description: `Transaction ${editingTransaction.id} has been updated successfully.`,
      })
    }
  }

  const handleExportTransactions = () => {
    toast({
      title: "Export Started",
      description: "Transaction export will be downloaded shortly.",
    })
  }

  const formatAmountInput = (value) => {
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^\d]/g, "")

    if (numericValue === "") return ""

    // Format with thousands separators
    return new Intl.NumberFormat("id-ID").format(Number.parseInt(numericValue))
  }

  const handleAmountChange = (e, isEdit = false) => {
    const formatted = formatAmountInput(e.target.value)
    if (isEdit) {
      setEditForm({ ...editForm, amount: formatted })
    } else {
      setTopUpForm({ ...topUpForm, amount: formatted })
    }
  }

  const handleFileChange = (e, isEdit = false) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
      if (!allowedTypes.includes(file.type)) {
        setFormErrors({ ...formErrors, evidenceFile: "Only JPG, PNG, and PDF files are allowed" })
        return
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors({ ...formErrors, evidenceFile: "File size must be less than 5MB" })
        return
      }

      if (isEdit) {
        setEditForm({ ...editForm, evidenceFile: file })
      } else {
        setTopUpForm({ ...topUpForm, evidenceFile: file })
      }
      setFormErrors({ ...formErrors, evidenceFile: "" })
    }
  }

  const handleEvidenceClick = (evidence) => {
    setSelectedEvidence(evidence)
    setIsEvidenceModalOpen(true)
  }

  const handleModalClose = () => {
    setIsTopUpModalOpen(false)
    setTopUpForm({ amount: "", description: "", evidenceFile: null })
    setFormErrors({})
  }

  const handleEditModalClose = () => {
    setIsEditModalOpen(false)
    setEditingTransaction(null)
    setEditForm({ amount: "", description: "", evidenceFile: null })
    setFormErrors({})
  }

  const renderAmount = (transaction) => {
    const isFailedTransaction = transaction.status === "Failed"
    const isPendingTransaction = transaction.status === "Pending"

    // For failed transactions (both top-ups and redemptions), show amount with strikethrough
    if (isFailedTransaction) {
      // For top-ups, show with "+" prefix
      if (transaction.type === "Top Up") {
        return <span className="font-medium text-gray-500 line-through">+{formatCurrency(transaction.amount)}</span>
      }
      // For redemptions, show with normal formatting (negative amount)
      return <span className="font-medium text-gray-500 line-through">{formatCurrency(transaction.amount)}</span>
    }

    // For pending transactions, show in yellow/orange color
    if (isPendingTransaction) {
      return <span className="font-medium text-yellow-600">+{formatCurrency(transaction.amount)}</span>
    }

    // For successful/confirmed transactions, show normal amount
    return (
      <span className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
        {transaction.amount > 0 ? "+" : ""}
        {formatCurrency(transaction.amount)}
      </span>
    )
  }

  const canEditTransaction = (transaction) => {
    return transaction.type === "Top Up" && transaction.topUpType === "Manual" && transaction.status === "Pending"
  }

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Manage Reward Balance</h1>
            <p className="text-sm text-muted-foreground">
              {mockCompany.name} ({mockCompany.subdomain}.hypearn.com)
            </p>
          </div>
        </div>

        {/* Current Balance Card */}
        <Card>
          <CardHeader>
            <CardTitle>Current Reward Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{formatCurrency(currentBalance)}</div>
          </CardContent>
        </Card>

        {/* Transactions Management */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Reward Balance Transactions</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleExportTransactions}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Transactions
                </Button>
                <Dialog open={isTopUpModalOpen} onOpenChange={setIsTopUpModalOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setIsTopUpModalOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Top Up Reward Balance
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md z-50" aria-describedby="top-up-description">
                    <DialogHeader>
                      <DialogTitle>Top Up Reward Balance</DialogTitle>
                      <p id="top-up-description" className="text-sm text-muted-foreground">
                        Add funds to the company's reward balance with evidence documentation.
                      </p>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="amount">
                          Amount (IDR) <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                            IDR
                          </span>
                          <Input
                            id="amount"
                            placeholder="0"
                            className={`pl-12 ${formErrors.amount ? "border-red-500" : ""}`}
                            value={topUpForm.amount}
                            onChange={(e) => handleAmountChange(e, false)}
                          />
                        </div>
                        {formErrors.amount && <p className="text-sm text-red-500 mt-1">{formErrors.amount}</p>}
                      </div>
                      <div>
                        <Label htmlFor="description">
                          Note <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Enter note for this top up..."
                          className={formErrors.description ? "border-red-500" : ""}
                          value={topUpForm.description}
                          onChange={(e) => setTopUpForm({ ...topUpForm, description: e.target.value })}
                        />
                        {formErrors.description && (
                          <p className="text-sm text-red-500 mt-1">{formErrors.description}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="evidence">
                          Evidence Document <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="evidence"
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          className={formErrors.evidenceFile ? "border-red-500" : ""}
                          onChange={(e) => handleFileChange(e, false)}
                        />
                        {topUpForm.evidenceFile && (
                          <p className="text-sm text-muted-foreground mt-1">Selected: {topUpForm.evidenceFile.name}</p>
                        )}
                        {formErrors.evidenceFile && (
                          <p className="text-sm text-red-500 mt-1">{formErrors.evidenceFile}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">Supported formats: JPG, PNG, PDF (max 5MB)</p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={handleModalClose}>
                        Cancel
                      </Button>
                      <Button onClick={handleTopUpSubmit}>Create Top Up</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
              <Select value={filterType} onValueChange={handleFilterChange}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="topup">Top Up Only</SelectItem>
                  <SelectItem value="redemption">Redemption Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Transactions Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-48">Transaction ID</TableHead>
                    <TableHead className="w-40">Type & Status</TableHead>
                    <TableHead className="w-32">Amount</TableHead>
                    <TableHead className="w-28">Date</TableHead>
                    <TableHead className="w-32">User</TableHead>
                    <TableHead>Note</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentTransactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No transactions found
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-mono text-sm">
                          <div className="flex items-center gap-2">
                            <span>{transaction.id}</span>
                            {canEditTransaction(transaction) && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEditTransaction(transaction)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Edit3 className="h-3 w-3" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Edit pending transaction</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                            {transaction.evidence && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEvidenceClick(transaction.evidence)}
                                    className="h-6 w-6 p-0"
                                  >
                                    {transaction.evidence.fileType === "image" ? (
                                      <ImageIcon className="h-3 w-3" />
                                    ) : (
                                      <FileText className="h-3 w-3" />
                                    )}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View evidence document</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Badge
                              variant={transaction.type === "Top Up" ? "default" : "secondary"}
                              className={`text-xs ${
                                transaction.type === "Top Up"
                                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                                  : "bg-red-100 text-red-800 hover:bg-red-200"
                              }`}
                            >
                              {transaction.type}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                transaction.status === "Success" || transaction.status === "Confirmed"
                                  ? "text-green-600 border-green-600"
                                  : transaction.status === "Pending"
                                    ? "text-yellow-600 border-yellow-600"
                                    : "text-red-600 border-red-600"
                              }`}
                            >
                              {transaction.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{renderAmount(transaction)}</TableCell>
                        <TableCell className="text-sm">{formatDate(transaction.date)}</TableCell>
                        <TableCell className="text-sm">
                          {transaction.adminName || transaction.creatorName || "System"}
                        </TableCell>
                        <TableCell>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="text-sm cursor-help">{truncateText(transaction.description)}</div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{transaction.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {filteredTransactions.length > 0 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredTransactions.length)} of{" "}
                  {filteredTransactions.length} results
                </div>

                <div className="flex items-center gap-4">
                  {/* Pagination Controls */}
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className={`h-8 w-8 p-0 ${
                            currentPage === pageNum ? "bg-green-500 hover:bg-green-600 text-white" : ""
                          }`}
                        >
                          {pageNum}
                        </Button>
                      )
                    })}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Items per page dropdown */}
                  <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                      <span className="ml-1">/ page</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="15">15</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Transaction Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-md z-50" aria-describedby="edit-description">
            <DialogHeader>
              <DialogTitle>Edit Transaction</DialogTitle>
              <p id="edit-description" className="text-sm text-muted-foreground">
                Edit the pending manual top-up transaction details.
              </p>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-amount">
                  Amount (IDR) <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                    IDR
                  </span>
                  <Input
                    id="edit-amount"
                    placeholder="0"
                    className={`pl-12 ${formErrors.amount ? "border-red-500" : ""}`}
                    value={editForm.amount}
                    onChange={(e) => handleAmountChange(e, true)}
                  />
                </div>
                {formErrors.amount && <p className="text-sm text-red-500 mt-1">{formErrors.amount}</p>}
              </div>
              <div>
                <Label htmlFor="edit-description">
                  Note <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="edit-description"
                  placeholder="Enter note for this top up..."
                  className={formErrors.description ? "border-red-500" : ""}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                />
                {formErrors.description && <p className="text-sm text-red-500 mt-1">{formErrors.description}</p>}
              </div>
              <div>
                <Label htmlFor="edit-evidence">
                  Evidence Document <span className="text-gray-500">(optional - keep existing if not changed)</span>
                </Label>
                <Input
                  id="edit-evidence"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className={formErrors.evidenceFile ? "border-red-500" : ""}
                  onChange={(e) => handleFileChange(e, true)}
                />
                {editForm.evidenceFile && (
                  <p className="text-sm text-muted-foreground mt-1">New file: {editForm.evidenceFile.name}</p>
                )}
                {!editForm.evidenceFile && editingTransaction?.evidence && (
                  <p className="text-sm text-muted-foreground mt-1">Current: {editingTransaction.evidence.fileName}</p>
                )}
                {formErrors.evidenceFile && <p className="text-sm text-red-500 mt-1">{formErrors.evidenceFile}</p>}
                <p className="text-xs text-muted-foreground mt-1">Supported formats: JPG, PNG, PDF (max 5MB)</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleEditModalClose}>
                Cancel
              </Button>
              <Button onClick={handleEditSubmit}>Update Transaction</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Evidence Modal */}
        <Dialog open={isEvidenceModalOpen} onOpenChange={setIsEvidenceModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Evidence Document</DialogTitle>
            </DialogHeader>
            {selectedEvidence && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {selectedEvidence.fileType === "image" ? (
                    <ImageIcon className="h-4 w-4" />
                  ) : (
                    <FileText className="h-4 w-4" />
                  )}
                  <span className="font-medium">{selectedEvidence.fileName}</span>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  {selectedEvidence.fileType === "image" ? (
                    <img
                      src={selectedEvidence.fileUrl || "/placeholder.svg"}
                      alt="Evidence document"
                      className="w-full h-auto max-h-96 object-contain"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-96 bg-gray-50">
                      <div className="text-center">
                        <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600">PDF Document</p>
                        <p className="text-sm text-gray-500">{selectedEvidence.fileName}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEvidenceModalOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}
