"use client"

import type React from "react"
import { useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle, XCircle, Clock, Instagram } from "lucide-react"
import { TikTokIcon } from "@/components/tik-tok-icon"
import { CustomPagination } from "@/components/ui/custom-pagination"

// Added more mock data for submissions and social media accounts to better test pagination
const initialSubmissions = [
  {
    id: "1",
    creator: { name: "Sarah Johnson", department: "Marketing" },
    campaign: "Summer Launch",
    campaignType: "Quick Share",
    approvalType: "Post URL Review",
    submittedAt: "2h ago",
    status: "pending",
  },
  {
    id: "2",
    creator: { name: "Michael Chen", department: "Product" },
    campaign: "Brand Challenge",
    campaignType: "Creative Challenge",
    approvalType: "Content Review",
    submittedAt: "4h ago",
    status: "pending",
  },
  {
    id: "3",
    creator: { name: "Emily Rodriguez", department: "Customer Success" },
    campaign: "Customer Stories",
    campaignType: "Quick Share",
    approvalType: "Post URL Review",
    submittedAt: "5h ago",
    status: "pending",
  },
  {
    id: "4",
    creator: { name: "David Wilson", department: "Sales" },
    campaign: "Product Feature",
    campaignType: "Quick Share",
    approvalType: "Post URL Review",
    submittedAt: "1d ago",
    status: "rejected",
  },
  {
    id: "5",
    creator: { name: "Lisa Thompson", department: "HR" },
    campaign: "Customer Stories",
    campaignType: "Quick Share",
    approvalType: "Post URL Review",
    submittedAt: "2d ago",
    status: "approved",
  },
  {
    id: "6",
    creator: { name: "James Brown", department: "Engineering" },
    campaign: "Behind Scenes",
    campaignType: "Creative Challenge",
    approvalType: "Post URL Review",
    submittedAt: "3d ago",
    status: "approved",
  },
  {
    id: "7",
    creator: { name: "Alex Turner", department: "Product" },
    campaign: "Product Launch V2",
    campaignType: "Creative Challenge",
    approvalType: "Content Review",
    submittedAt: "1d ago",
    status: "approved",
  },
  {
    id: "8",
    creator: { name: "Olivia Green", department: "Marketing" },
    campaign: "New Feature Teaser",
    campaignType: "Quick Share",
    approvalType: "Content Review",
    submittedAt: "3h ago",
    status: "pending",
  },
  {
    id: "9",
    creator: { name: "William Davis", department: "Sales" },
    campaign: "Testimonial Request",
    campaignType: "Creative Challenge",
    approvalType: "Post URL Review",
    submittedAt: "6h ago",
    status: "pending",
  },
  {
    id: "10",
    creator: { name: "Sophia Miller", department: "Customer Success" },
    campaign: "How-to Guide",
    campaignType: "Quick Share",
    approvalType: "Content Review",
    submittedAt: "8h ago",
    status: "pending",
  },
  {
    id: "11",
    creator: { name: "Ava Garcia", department: "Marketing" },
    campaign: "Holiday Special",
    campaignType: "Quick Share",
    approvalType: "Post URL Review",
    submittedAt: "10h ago",
    status: "pending",
  },
  {
    id: "12",
    creator: { name: "Noah Martinez", department: "Product" },
    campaign: "User Feedback",
    campaignType: "Creative Challenge",
    approvalType: "Content Review",
    submittedAt: "12h ago",
    status: "pending",
  },
]

const initialSocialMediaAccounts = [
  {
    id: "sm1",
    creator: { name: "Sarah Johnson", department: "Marketing" },
    platform: "instagram",
    username: "@sarahj",
    followers: 5420,
    following: 843,
    submittedAt: "1d ago",
    status: "pending",
    url: "https://instagram.com/sarahj",
  },
  {
    id: "sm2",
    creator: { name: "Emily Rodriguez", department: "Customer Success" },
    platform: "tiktok",
    username: "@emilyr",
    followers: 12500,
    following: 350,
    submittedAt: "2d ago",
    status: "pending",
    url: "https://tiktok.com/@emilyr",
  },
  {
    id: "sm3",
    creator: { name: "David Wilson", department: "Sales" },
    platform: "tiktok",
    username: "@davidw",
    followers: 2340,
    following: 1250,
    submittedAt: "3d ago",
    status: "pending",
    url: "https://tiktok.com/@davidw",
  },
  {
    id: "sm4",
    creator: { name: "Lisa Thompson", department: "HR" },
    platform: "instagram",
    username: "@lisat",
    followers: 3200,
    following: 520,
    submittedAt: "5d ago",
    status: "approved",
    url: "https://instagram.com/@lisat",
  },
  {
    id: "sm5",
    creator: { name: "James Brown", department: "Engineering" },
    platform: "tiktok",
    username: "@jamesb",
    followers: 8700,
    following: 420,
    submittedAt: "6d ago",
    status: "rejected",
    url: "https://tiktok.com/@jamesb",
  },
  {
    id: "sm6",
    creator: { name: "Michael Chen", department: "Product" },
    platform: "tiktok",
    username: "@mikec",
    followers: 4500,
    following: 890,
    submittedAt: "7d ago",
    status: "approved",
    url: "https://tiktok.com/@mikec",
  },
  {
    id: "sm7",
    creator: { name: "Olivia Green", department: "Marketing" },
    platform: "instagram",
    username: "@oliviag",
    followers: 7800,
    following: 600,
    submittedAt: "4d ago",
    status: "pending",
    url: "https://instagram.com/@oliviag",
  },
  {
    id: "sm8",
    creator: { name: "William Davis", department: "Sales" },
    platform: "instagram",
    username: "@willd",
    followers: 4100,
    following: 750,
    submittedAt: "8d ago",
    status: "approved",
    url: "https://instagram.com/@willd",
  },
  {
    id: "sm9",
    creator: { name: "Sophia Miller", department: "Customer Success" },
    platform: "tiktok",
    username: "@sophiam",
    followers: 9200,
    following: 200,
    submittedAt: "9d ago",
    status: "rejected",
    url: "https://tiktok.com/@sophiam",
  },
  {
    id: "sm10",
    creator: { name: "Ava Garcia", department: "Marketing" },
    platform: "instagram",
    username: "@avag",
    followers: 6300,
    following: 950,
    submittedAt: "2d ago",
    status: "pending",
    url: "https://instagram.com/@avag",
  },
  {
    id: "sm11",
    creator: { name: "Noah Martinez", department: "Product" },
    platform: "tiktok",
    username: "@noahm",
    followers: 11000,
    following: 150,
    submittedAt: "3d ago",
    status: "pending",
    url: "https://tiktok.com/@noahm",
  },
]

function ApprovalPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") === "social" ? "social" : "content"
  const [mainTab, setMainTab] = useState(initialTab)
  const [contentSubTab, setContentSubTab] = useState("pending")
  const [socialSubTab, setSocialSubTab] = useState("pending")

  const [searchTerm, setSearchTerm] = useState("")
  const [socialMediaSearchTerm, setSocialMediaSearchTerm] = useState("")

  const [allSubmissions, setAllSubmissions] = useState<any[]>(initialSubmissions)
  const [pendingSubmissions, setPendingSubmissions] = useState<any[]>([])
  const [approvedSubmissions, setApprovedSubmissions] = useState<any[]>([])
  const [rejectedSubmissions, setRejectedSubmissions] = useState<any[]>([])

  const [allSocialMedia, setAllSocialMedia] = useState<any[]>(initialSocialMediaAccounts)
  const [pendingSocialMedia, setPendingSocialMedia] = useState<any[]>([])
  const [approvedSocialMedia, setApprovedSocialMedia] = useState<any[]>([])
  const [rejectedSocialMedia, setRejectedSocialMedia] = useState<any[]>([])

  const [contentCurrentPage, setContentCurrentPage] = useState(1)
  const [contentItemsPerPage, setContentItemsPerPage] = useState(5)
  const [socialCurrentPage, setSocialCurrentPage] = useState(1)
  const [socialItemsPerPage, setSocialItemsPerPage] = useState(5)

  useEffect(() => {
    filterSubmissions(allSubmissions, searchTerm)
    filterSocialMedia(allSocialMedia, socialMediaSearchTerm)
  }, [searchTerm, socialMediaSearchTerm, allSubmissions, allSocialMedia]) // Added allSubmissions and allSocialMedia to re-filter when they change (e.g. status update)

  useEffect(() => {
    const tabFromQuery = searchParams.get("tab")
    if (tabFromQuery === "social" && mainTab !== "social") {
      setMainTab("social")
    } else if (tabFromQuery === "content" && mainTab !== "content") {
      setMainTab("content")
    }
  }, [searchParams, mainTab])

  const filterSubmissions = (submissions: any[], search: string) => {
    let filtered = submissions
    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(
        (submission) =>
          submission.creator.name.toLowerCase().includes(searchLower) ||
          submission.campaign.toLowerCase().includes(searchLower) ||
          submission.campaignType.toLowerCase().includes(searchLower),
      )
    }
    setPendingSubmissions(filtered.filter((sub) => sub.status === "pending"))
    setApprovedSubmissions(filtered.filter((sub) => sub.status === "approved"))
    setRejectedSubmissions(filtered.filter((sub) => sub.status === "rejected"))
  }

  const filterSocialMedia = (accounts: any[], search: string) => {
    let filtered = accounts
    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(
        (account) =>
          account.creator.name.toLowerCase().includes(searchLower) ||
          account.username.toLowerCase().includes(searchLower) ||
          account.platform.toLowerCase().includes(searchLower),
      )
    }
    setPendingSocialMedia(filtered.filter((acc) => acc.status === "pending"))
    setApprovedSocialMedia(filtered.filter((acc) => acc.status === "approved"))
    setRejectedSocialMedia(filtered.filter((acc) => acc.status === "rejected"))
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    setContentCurrentPage(1)
  }

  const handleSocialMediaSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSocialMediaSearchTerm(value)
    setSocialCurrentPage(1)
  }

  const handleViewSubmission = (id: string) => {
    router.push(`/admin/moderation/submission/${id}`)
  }

  const handleApproveSocialMedia = (id: string) => {
    setAllSocialMedia((prevAccounts) =>
      prevAccounts.map((account) => (account.id === id ? { ...account, status: "approved" } : account)),
    )
  }

  const handleRejectSocialMedia = (id: string) => {
    setAllSocialMedia((prevAccounts) =>
      prevAccounts.map((account) => (account.id === id ? { ...account, status: "rejected" } : account)),
    )
  }

  const handleMainTabChange = (value: string) => {
    setMainTab(value)
    if (value === "content") {
      setContentCurrentPage(1)
      setContentSubTab("pending")
    } else if (value === "social") {
      setSocialCurrentPage(1)
      setSocialSubTab("pending")
    }
    router.push(`/admin/moderation?tab=${value}`, { scroll: false })
  }

  const handleContentSubTabChange = (value: string) => {
    setContentSubTab(value)
    setContentCurrentPage(1)
  }

  const handleSocialSubTabChange = (value: string) => {
    setSocialSubTab(value)
    setSocialCurrentPage(1)
  }

  const pendingCount = pendingSubmissions.length
  const approvedCount = approvedSubmissions.length
  const rejectedCount = rejectedSubmissions.length

  const pendingSocialMediaCount = pendingSocialMedia.length
  const approvedSocialMediaCount = approvedSocialMedia.length
  const rejectedSocialMediaCount = rejectedSocialMedia.length

  const pageTitle = mainTab === "content" ? "Content Approval" : "Social Media Verification"
  const pageDescription =
    mainTab === "content" ? "Review and manage creator content submissions" : "Verify creator social media accounts"

  const renderPaginatedTable = (
    items: any[],
    TableComponent: React.FC<any>,
    currentPage: number,
    itemsPerPage: number,
    onPageChange: (page: number) => void,
    onItemsPerPageChange: (items: number) => void,
    itemName: string,
    tableProps: any,
  ) => {
    const totalItems = items.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    if (totalItems === 0 && (itemName === "submissions" ? searchTerm : socialMediaSearchTerm)) {
      return <p className="text-center text-muted-foreground py-4">No {itemName} found for your search.</p>
    }
    if (totalItems === 0) {
      return <p className="text-center text-muted-foreground py-4">No {itemName} in this category.</p>
    }

    return (
      <>
        <TableComponent {...tableProps} submissions={paginatedItems} accounts={paginatedItems} />
        {totalPages > 1 && (
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
            onItemsPerPageChange={(newItemsPerPage) => {
              onItemsPerPageChange(newItemsPerPage)
              onPageChange(1)
            }}
            itemName={itemName}
          />
        )}
      </>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{pageTitle}</h1>
          <p className="text-muted-foreground">{pageDescription}</p>
        </div>
      </div>

      <Tabs value={mainTab} className="w-full" onValueChange={handleMainTabChange}>
        <TabsList className="w-full md:w-auto mb-6">
          <TabsTrigger value="content" className="flex-1 md:flex-none">
            Content Submissions
          </TabsTrigger>
          <TabsTrigger value="social" className="flex-1 md:flex-none">
            Social Media Verification
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <Tabs value={contentSubTab} className="w-full" onValueChange={handleContentSubTabChange}>
            <div className="flex flex-col gap-4 mb-6">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search creators or campaigns..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <div className="overflow-x-auto">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
                  <TabsTrigger value="approved">Approved ({approvedCount})</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected ({rejectedCount})</TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="pending">
              {renderPaginatedTable(
                pendingSubmissions,
                SubmissionTable,
                contentCurrentPage,
                contentItemsPerPage,
                setContentCurrentPage,
                setContentItemsPerPage,
                "submissions",
                {
                  title: "Pending Review",
                  description: "Content waiting for your review",
                  status: "pending",
                  onViewSubmission: handleViewSubmission,
                },
              )}
            </TabsContent>
            <TabsContent value="approved">
              {renderPaginatedTable(
                approvedSubmissions,
                SubmissionTable,
                contentCurrentPage,
                contentItemsPerPage,
                setContentCurrentPage,
                setContentItemsPerPage,
                "submissions",
                {
                  title: "Approved Content",
                  description: "Content that has been approved",
                  status: "approved",
                  onViewSubmission: handleViewSubmission,
                },
              )}
            </TabsContent>
            <TabsContent value="rejected">
              {renderPaginatedTable(
                rejectedSubmissions,
                SubmissionTable,
                contentCurrentPage,
                contentItemsPerPage,
                setContentCurrentPage,
                setContentItemsPerPage,
                "submissions",
                {
                  title: "Rejected Content",
                  description: "Content that has been rejected",
                  status: "rejected",
                  onViewSubmission: handleViewSubmission,
                },
              )}
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="social">
          <Tabs value={socialSubTab} className="w-full" onValueChange={handleSocialSubTabChange}>
            <div className="flex flex-col gap-4 mb-6">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search creators or platforms..."
                  className="pl-8"
                  value={socialMediaSearchTerm}
                  onChange={handleSocialMediaSearch}
                />
              </div>
              <div className="overflow-x-auto">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="pending">Pending ({pendingSocialMediaCount})</TabsTrigger>
                  <TabsTrigger value="approved">Approved ({approvedSocialMediaCount})</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected ({rejectedSocialMediaCount})</TabsTrigger>
                </TabsList>
              </div>
            </div>
            <TabsContent value="pending">
              {renderPaginatedTable(
                pendingSocialMedia,
                SocialMediaTable,
                socialCurrentPage,
                socialItemsPerPage,
                setSocialCurrentPage,
                setSocialItemsPerPage,
                "accounts",
                {
                  title: "Pending Verification",
                  description: "Social media accounts waiting for verification",
                  status: "pending",
                  onApprove: handleApproveSocialMedia,
                  onReject: handleRejectSocialMedia,
                },
              )}
            </TabsContent>
            <TabsContent value="approved">
              {renderPaginatedTable(
                approvedSocialMedia,
                SocialMediaTable,
                socialCurrentPage,
                socialItemsPerPage,
                setSocialCurrentPage,
                setSocialItemsPerPage,
                "accounts",
                {
                  title: "Verified Accounts",
                  description: "Social media accounts that have been verified",
                  status: "approved",
                },
              )}
            </TabsContent>
            <TabsContent value="rejected">
              {renderPaginatedTable(
                rejectedSocialMedia,
                SocialMediaTable,
                socialCurrentPage,
                socialItemsPerPage,
                setSocialCurrentPage,
                setSocialItemsPerPage,
                "accounts",
                {
                  title: "Rejected Accounts",
                  description: "Social media accounts that have been rejected",
                  status: "rejected",
                },
              )}
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function SubmissionTable({
  title,
  description,
  submissions,
  status,
  onViewSubmission,
}: {
  title: string
  description: string
  submissions: any[]
  status: string
  onViewSubmission: (id: string) => void
}) {
  return (
    <Card>
      <CardHeader className="px-6">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <div className="overflow-x-auto">
          <div className="rounded-md border min-w-[900px]">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 text-sm font-medium text-slate-500">
                  <th className="p-4 text-left w-1/5">Creator</th>
                  <th className="p-4 text-left w-1/5">Campaign</th>
                  <th className="p-4 text-left w-1/6">Approval Type</th>
                  <th className="p-4 text-left w-1/8">Submitted</th>
                  <th className="p-4 text-left w-1/8">Status</th>
                  <th className="p-4 text-left w-1/8">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.length > 0 ? (
                  submissions.map((submission) => (
                    <tr key={submission.id} className="border-t">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium">{submission.creator.name}</p>
                            <p className="text-xs text-muted-foreground">{submission.creator.department}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p>{submission.campaign}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {submission.campaignType}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          {submission.approvalType === "Post URL Review" ? (
                            <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                              Post URL Review
                            </span>
                          ) : submission.approvalType === "Content Review" ||
                            submission.approvalType === "Content Material Review" ? (
                            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                              {submission.approvalType}
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">{submission.approvalType}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <span className="text-sm">{submission.submittedAt}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {submission.status === "pending" && (
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1 border-amber-500 text-amber-500"
                            >
                              <Clock className="h-3 w-3" />
                              <span>Pending</span>
                            </Badge>
                          )}
                          {submission.status === "approved" && (
                            <Badge variant="default" className="flex items-center gap-1 bg-green-500">
                              <CheckCircle className="h-3 w-3" />
                              <span>Approved</span>
                            </Badge>
                          )}
                          {submission.status === "rejected" && (
                            <Badge variant="secondary" className="flex items-center gap-1 bg-red-100 text-red-600">
                              <XCircle className="h-3 w-3" />
                              <span>Rejected</span>
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => onViewSubmission(submission.id)}>
                            {status === "pending" ? "Review" : "View"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                      No {status} submissions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SocialMediaTable({
  title,
  description,
  accounts,
  status,
  onApprove,
  onReject,
}: {
  title: string
  description: string
  accounts: any[]
  status: string
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
}) {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="h-4 w-4 text-pink-500" />
      case "tiktok":
        return <TikTokIcon className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="px-6">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <div className="overflow-x-auto">
          <div className="rounded-md border min-w-[900px]">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 text-sm font-medium text-slate-500">
                  <th className="p-4 text-left w-1/5">Creator</th>
                  <th className="p-4 text-left w-1/5">Platform</th>
                  <th className="p-4 text-left w-1/5">Account</th>
                  <th className="p-4 text-left w-1/6">Followers/Following</th>
                  <th className="p-4 text-left w-1/8">Status</th>
                  <th className="p-4 text-left w-1/6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {accounts.length > 0 ? (
                  accounts.map((account) => (
                    <tr key={account.id} className="border-t">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium">{account.creator.name}</p>
                            <p className="text-xs text-muted-foreground">{account.creator.department}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {getPlatformIcon(account.platform)}
                          <span className="capitalize">{account.platform}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <a
                          href={account.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                        >
                          {account.username}
                        </a>
                      </td>
                      <td className="p-4">
                        <p>
                          <span className="font-medium">{account.followers.toLocaleString()}</span> followers
                        </p>
                        <p>
                          <span className="font-medium">{account.following.toLocaleString()}</span> following
                        </p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {account.status === "pending" && (
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1 border-amber-500 text-amber-500"
                            >
                              <Clock className="h-3 w-3" />
                              <span>Pending</span>
                            </Badge>
                          )}
                          {account.status === "approved" && (
                            <Badge variant="default" className="flex items-center gap-1 bg-green-500">
                              <CheckCircle className="h-3 w-3" />
                              <span>Verified</span>
                            </Badge>
                          )}
                          {account.status === "rejected" && (
                            <Badge variant="secondary" className="flex items-center gap-1 bg-red-100 text-red-600">
                              <XCircle className="h-3 w-3" />
                              <span>Rejected</span>
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {status === "pending" && onApprove && onReject && (
                            <>
                              <Button
                                variant="default"
                                size="sm"
                                className="bg-green-500 hover:bg-green-600"
                                onClick={() => onApprove(account.id)}
                              >
                                Verify
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 border-red-500 hover:bg-red-50"
                                onClick={() => onReject(account.id)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {status !== "pending" && (
                            <Button variant="ghost" size="sm">
                              {" "}
                              {/* Consider making this a link to view details if applicable */}
                              View
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                      No {status} social media accounts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Approval() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading moderation page...</div>}>
      <ApprovalPageContent />
    </Suspense>
  )
}
