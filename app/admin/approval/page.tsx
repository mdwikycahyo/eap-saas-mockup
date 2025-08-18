"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { SubmissionList } from "@/components/admin/approval/SubmissionList"
import { SubmissionSidePanel } from "@/components/admin/approval/SubmissionSidePanel"

// Updated mock data for URL submissions only
const initialSubmissions = [
  {
    id: "1",
    creator: { name: "Sarah Johnson", department: "Marketing" },
    campaign: "Summer Launch",
    submittedAt: "2h ago",
    status: "pending",
    platform: "instagram",
    submittedUrl: "https://www.instagram.com/p/CyZ1234567890/",
  },
  {
    id: "2",
    creator: { name: "Michael Chen", department: "Product" },
    campaign: "Brand Challenge",
    submittedAt: "4h ago",
    status: "pending",
    platform: "tiktok",
    submittedUrl: "https://www.tiktok.com/@michael_c/video/7289123456789012345",
  },
  {
    id: "3",
    creator: { name: "Emily Rodriguez", department: "Customer Success" },
    campaign: "Customer Stories",
    submittedAt: "5h ago",
    status: "approved",
    platform: "instagram",
    submittedUrl: "https://www.instagram.com/p/CyX9876543210/",
  },
  {
    id: "4",
    creator: { name: "David Wilson", department: "Sales" },
    campaign: "Product Feature",
    submittedAt: "1d ago",
    status: "rejected",
    platform: "tiktok",
    submittedUrl: "https://www.tiktok.com/@david_w/video/7289098765432109876",
  },
  {
    id: "5",
    creator: { name: "Lisa Thompson", department: "HR" },
    campaign: "Holiday Special",
    submittedAt: "2d ago",
    status: "approved",
    platform: "instagram",
    submittedUrl: "https://www.instagram.com/p/CyW5432109876/",
  },
  {
    id: "6",
    creator: { name: "Alex Turner", department: "Marketing" },
    campaign: "Product Tutorial",
    submittedAt: "3h ago",
    status: "pending",
    platform: "tiktok",
    submittedUrl: "https://www.tiktok.com/@alex_turner/video/7289456789012345678",
  },
  {
    id: "7",
    creator: { name: "Jessica Williams", department: "Customer Success" },
    campaign: "Brand Challenge",
    submittedAt: "1d ago",
    status: "rejected",
    platform: "instagram",
    submittedUrl: "https://www.instagram.com/p/CyV1122334455/",
  },
  {
    id: "8",
    creator: { name: "Ryan Davis", department: "Product" },
    campaign: "Summer Launch",
    submittedAt: "6h ago",
    status: "approved",
    platform: "tiktok",
    submittedUrl: "https://www.tiktok.com/@ryan_davis/video/7289887766554433221",
  },
]

function ApprovalPageContent() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const [allSubmissions, setAllSubmissions] = useState<any[]>(initialSubmissions)
  const [filteredSubmissions, setFilteredSubmissions] = useState<any[]>([])

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  // Side panel state
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  useEffect(() => {
    filterSubmissions(allSubmissions, searchTerm, statusFilter)
  }, [searchTerm, statusFilter, allSubmissions])

  const filterSubmissions = (submissions: any[], search: string, status: string) => {
    let filtered = submissions

    // Filter by search term (creator name + campaign name)
    if (search.trim()) {
      filtered = filtered.filter(
        (submission) =>
          submission.creator.name.toLowerCase().includes(search.toLowerCase()) ||
          submission.campaign.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Filter by status
    if (status !== "all") {
      filtered = filtered.filter((s) => s.status === status)
    }

    setFilteredSubmissions(filtered)
  }

  const handleSubmissionSelect = (submission: any, index: number) => {
    setSelectedSubmission(submission)
    setSelectedIndex(index)
    setIsPanelOpen(true)
  }

  const handlePanelClose = () => {
    setIsPanelOpen(false)
    setSelectedSubmission(null)
    setSelectedIndex(-1)
  }

  const handleNavigation = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' ? selectedIndex - 1 : selectedIndex + 1
    
    if (newIndex >= 0 && newIndex < filteredSubmissions.length) {
      setSelectedIndex(newIndex)
      setSelectedSubmission(filteredSubmissions[newIndex])
    }
  }

  const handleStatusUpdate = (submissionId: string, newStatus: string, feedback?: string, additionalData?: any) => {
    setAllSubmissions(prevSubmissions => 
      prevSubmissions.map(submission => 
        submission.id === submissionId 
          ? { 
              ...submission, 
              status: newStatus, 
              feedback: feedback || submission.feedback,
              ...additionalData 
            }
          : submission
      )
    )

    // Update selected submission if it's the current one
    if (selectedSubmission?.id === submissionId) {
      setSelectedSubmission((prev: any) => ({
        ...prev,
        status: newStatus,
        feedback: feedback || prev.feedback,
        ...additionalData
      }))
    }
  }

  function getTableTitle(status: string, count: number) {
    switch (status) {
      case "pending":
        return `Pending Reviews (${count})`
      case "approved":
        return `Approved Submissions (${count})`
      case "rejected":
        return `Rejected Submissions (${count})`
      default:
        return `All Submissions (${count})`
    }
  }

  function getTableDescription(status: string) {
    switch (status) {
      case "pending":
        return "URLs waiting for your review"
      case "approved":
        return "URLs that have been approved"
      case "rejected":
        return "URLs that have been rejected"
      default:
        return "All URL submissions across different statuses"
    }
  }

  return (
    <div className="p-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Approval Management
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>URL Approval</CardTitle>
          <CardDescription>
            Review and manage creator URL submissions across different statuses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="relative flex-grow w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search submissions..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <SubmissionList
              submissions={filteredSubmissions}
              title={getTableTitle(statusFilter, filteredSubmissions.length)}
              description={getTableDescription(statusFilter)}
              onSubmissionSelect={handleSubmissionSelect}
              selectedSubmissionId={selectedSubmission?.id}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>
        </CardContent>
      </Card>

      {/* Side Panel */}
      <SubmissionSidePanel
        isOpen={isPanelOpen}
        onClose={handlePanelClose}
        submission={selectedSubmission}
        submissions={filteredSubmissions}
        currentIndex={selectedIndex}
        onNavigate={handleNavigation}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  )
}

export default function ApprovalPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApprovalPageContent />
    </Suspense>
  )
}
