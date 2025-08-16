"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ExternalLink, Eye, Heart, MessageCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CustomPagination } from "@/components/ui/custom-pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EngagementManagementPanel } from "@/components/engagement-management-panel"

// Mock data for engagement tracking
const mockEngagementData = [
  {
    id: 1,
    creator: "John Doe",
    postUrl: "www.tiktok.com/@mrzofy/video/7538821289251802375",
    company: "Acme Corporation",
    campaign: "Summer Product Launch",
    lastChecked: "10/26/2023",
    checkedToday: true,
    engagement: {
      views: "120K",
      likes: "25K",
      comments: "5,300"
    }
  },
  {
    id: 2,
    creator: "Jane Smith",
    postUrl: "www.instagram.com/reel/DMD8KkBtrxf",
    company: "TechNova Inc.",
    campaign: "Brand Awareness Q4",
    lastChecked: "10/25/2023",
    checkedToday: false,
    engagement: {
      views: "60K",
      likes: "12K",
      comments: "3,900"
    }
  },
  {
    id: 3,
    creator: "Mike Johnson",
    postUrl: "www.tiktok.com/@creator123/video/7540123456789012345",
    company: "Global Solutions",
    campaign: "New Year Promotion",
    lastChecked: "10/24/2023",
    checkedToday: true,
    engagement: {
      views: "85K",
      likes: "18K",
      comments: "4,200"
    }
  },
  {
    id: 4,
    creator: "Sarah Wilson",
    postUrl: "www.instagram.com/reel/DMF9LpCqwxR",
    company: "Innovation Corp",
    campaign: "Tech Innovation Series",
    lastChecked: "10/23/2023",
    checkedToday: false,
    engagement: {
      views: "200K",
      likes: "45K",
      comments: "8,700"
    }
  },
  {
    id: 5,
    creator: "Alex Brown",
    postUrl: "www.tiktok.com/@alexb_creator/video/7542789012345678901",
    company: "TechStart Inc.",
    campaign: "Startup Spotlight",
    lastChecked: "10/22/2023",
    checkedToday: true,
    engagement: {
      views: "45K",
      likes: "9K",
      comments: "2,100"
    }
  }
]

export default function EngagementReviewPage() {
  const [engagementData, setEngagementData] = useState(mockEngagementData)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [companyFilter, setCompanyFilter] = useState("All Companies")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<typeof mockEngagementData[0] | null>(null)

  // Filter data based on search query and filters
  const filteredData = engagementData.filter((item) => {
    const matchesSearch = 
      item.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.campaign.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "All Status" || 
      (statusFilter === "Checked Today" && item.checkedToday) ||
      (statusFilter === "Not Checked Today" && !item.checkedToday)
    
    const matchesCompany = companyFilter === "All Companies" || 
      item.company === companyFilter

    return matchesSearch && matchesStatus && matchesCompany
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  // Reset to first page when search or filters change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
    setCurrentPage(1)
  }

  const handleCompanyFilterChange = (value: string) => {
    setCompanyFilter(value)
    setCurrentPage(1)
  }

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
  }

  // Get unique companies for filter dropdown
  const uniqueCompanies = Array.from(new Set(engagementData.map(item => item.company)))

  // Handle panel operations
  const handleViewPost = (post: typeof mockEngagementData[0]) => {
    setSelectedPost(post)
    setIsPanelOpen(true)
  }

  const handleClosePanel = () => {
    setIsPanelOpen(false)
    setSelectedPost(null)
  }

  const handleSaveEngagement = (id: number, newEngagement: { views: string; likes: string; comments: string }) => {
    setEngagementData(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, engagement: newEngagement }
          : item
      )
    )
  }

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Engagement Review</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Overview</CardTitle>
            <CardDescription>Review engagement metrics across all creator posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by creator, company, or campaign"
                    className="pl-8"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Status">All Status</SelectItem>
                    <SelectItem value="Checked Today">Checked Today</SelectItem>
                    <SelectItem value="Not Checked Today">Not Checked Today</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={companyFilter} onValueChange={handleCompanyFilterChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Companies">All Companies</SelectItem>
                    {uniqueCompanies.map((company) => (
                      <SelectItem key={company} value={company}>
                        {company}
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
                    <TableHead>Creator</TableHead>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Last Checked</TableHead>
                    <TableHead>Checked Today</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No posts found
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <p className="font-semibold">{item.creator}</p>
                            <p className="text-sm text-muted-foreground">{item.company}</p>
                          </div>
                        </TableCell>
                        <TableCell>{item.campaign}</TableCell>
                        <TableCell>{item.lastChecked}</TableCell>
                        <TableCell>
                          <Badge
                            variant={item.checkedToday ? "default" : "destructive"}
                            className={
                              item.checkedToday
                                ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
                                : "bg-red-100 text-red-800 border-red-200 hover:bg-red-200"
                            }
                          >
                            {item.checkedToday ? "Yes" : "No"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{item.engagement.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{item.engagement.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{item.engagement.comments}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleViewPost(item)}
                              >
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">Manage Post</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Manage post</TooltipContent>
                          </Tooltip>
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
              totalItems={filteredData.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={handleItemsPerPageChange}
              itemName="posts"
            />
          </CardContent>
        </Card>

        {/* Engagement Management Panel */}
        <EngagementManagementPanel
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
          postData={selectedPost}
          onSave={handleSaveEngagement}
        />
      </div>
    </TooltipProvider>
  )
}
