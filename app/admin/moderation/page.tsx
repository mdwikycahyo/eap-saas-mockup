"use client"

import type React from "react"
import { useSearchParams } from "next/navigation" // Added
import { useState, useEffect, Suspense } from "react" // Added Suspense
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle, XCircle, Clock, Instagram } from "lucide-react"
import { TikTokIcon } from "@/components/tik-tok-icon"
function ApprovalPageContent() {
  // Renamed component
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") === "social" ? "social" : "content"
  const [mainTab, setMainTab] = useState(initialTab)
  const [searchTerm, setSearchTerm] = useState("")
  const [socialMediaSearchTerm, setSocialMediaSearchTerm] = useState("")

  const [allSubmissions, setAllSubmissions] = useState<any[]>([])
  const [pendingSubmissions, setPendingSubmissions] = useState<any[]>([])
  const [approvedSubmissions, setApprovedSubmissions] = useState<any[]>([])
  const [rejectedSubmissions, setRejectedSubmissions] = useState<any[]>([])

  const [allSocialMedia, setAllSocialMedia] = useState<any[]>([])
  const [pendingSocialMedia, setPendingSocialMedia] = useState<any[]>([])
  const [approvedSocialMedia, setApprovedSocialMedia] = useState<any[]>([])
  const [rejectedSocialMedia, setRejectedSocialMedia] = useState<any[]>([])

  // This would be fetched from an API in a real application
  useEffect(() => {
    const submissions = [
      {
        id: "1",
        creator: {
          id: "creator1",
          name: "Sarah Johnson",
          department: "Marketing",
          avatar: "/placeholder.svg",
        },
        campaign: "Summer Product Launch",
        campaignType: "Quick Share",
        platform: "instagram",
        approvalType: "Post URL Review",
        content: {
          type: "image",
          images: [
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
          ],
          caption:
            "Summer is here and so is the new collection from @brandname! 🌞 Check out these amazing new products that are perfect for the season. #SummerCollection #BrandNameSummer #NewArrivals",
          url: "https://instagram.com/p/example123",
        },
        submittedAt: "2 hours ago",
        status: "pending",
      },
      {
        id: "2",
        creator: {
          id: "creator1",
          name: "Sarah Johnson",
          department: "Marketing",
          avatar: "/placeholder.svg",
        },
        campaign: "Brand Challenge",
        campaignType: "Creative Challenge",
        platform: "tiktok",
        approvalType: "Content Review",
        stage: "1/2",
        content: {
          type: "video",
          images: ["/placeholder.svg?height=600&width=600"],
          caption:
            "Taking the #BrandChallenge to show you how I use these amazing products every day! @brandname #ProductDemo",
          url: "",
        },
        submittedAt: "4 hours ago",
        status: "pending",
      },
      {
        id: "3",
        creator: {
          id: "creator2",
          name: "Emily Rodriguez",
          department: "Customer Success",
          avatar: "/placeholder.svg",
        },
        campaign: "Customer Stories",
        campaignType: "Quick Share",
        platform: "instagram",
        approvalType: "Post URL Review",
        content: {
          type: "image",
          images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
          caption:
            "Our customers love our products, and here's why! 💯 These testimonials show the real impact our solutions have made. What's your experience been like? #CustomerStories #RealResults #BrandName",
          url: "https://instagram.com/p/example456",
        },
        submittedAt: "5 hours ago",
        status: "pending",
      },
      {
        id: "4",
        creator: {
          id: "creator3",
          name: "David Wilson",
          department: "Sales",
          avatar: "/placeholder.svg",
        },
        campaign: "Product Feature",
        campaignType: "Quick Share",
        platform: "tiktok",
        approvalType: "Post URL Review",
        content: {
          type: "video",
          images: ["/placeholder.svg?height=600&width=600"],
          caption:
            "Check out this amazing product feature! It's changed how I work every day. #ProductFeature #WorkHacks #BrandName",
          url: "https://tiktok.com/@user/video/example456",
        },
        submittedAt: "1 day ago",
        status: "rejected",
        feedback:
          "The video quality is too low. Please resubmit with better lighting and focus on the product features more clearly.",
      },
      {
        id: "5",
        creator: {
          id: "creator4",
          name: "Lisa Thompson",
          department: "HR",
          avatar: "/placeholder.svg",
        },
        campaign: "Customer Stories",
        campaignType: "Quick Share",
        platform: "instagram",
        approvalType: "Post URL Review",
        content: {
          type: "image",
          images: ["/placeholder.svg?height=600&width=600"],
          caption:
            "Proud to share these amazing customer testimonials! Our products make a real difference. #CustomerStories #BrandName",
          url: "https://instagram.com/p/example789",
        },
        submittedAt: "2 days ago",
        status: "approved",
        engagement: {
          views: 1245,
          likes: 87,
          comments: 12,
        },
      },
      {
        id: "6",
        creator: {
          id: "creator5",
          name: "James Brown",
          department: "Engineering",
          avatar: "/placeholder.svg",
        },
        campaign: "Behind the Scenes",
        campaignType: "Creative Challenge",
        platform: "instagram",
        approvalType: "Post URL Review",
        stage: "2/2",
        content: {
          type: "image",
          images: [
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
          ],
          caption: "Here's a look at how we build our amazing products! #BehindTheScenes #Engineering #BrandName",
          url: "https://instagram.com/p/example101",
          approvedContent: {
            images: [
              "/placeholder.svg?height=600&width=600",
              "/placeholder.svg?height=600&width=600",
              "/placeholder.svg?height=600&width=600",
            ],
            caption: "Here's a look at how we build our amazing products! #BehindTheScenes #Engineering #BrandName",
          },
        },
        submittedAt: "3 days ago",
        status: "approved",
        engagement: {
          views: 980,
          likes: 65,
          comments: 8,
        },
      },
      {
        id: "7",
        creator: {
          id: "creator6",
          name: "Alex Turner",
          department: "Product",
          avatar: "/placeholder.svg",
        },
        campaign: "Product Launch",
        campaignType: "Creative Challenge",
        platform: "instagram",
        approvalType: "Content Review",
        stage: "1/2",
        content: {
          type: "image",
          images: ["/placeholder.svg?height=600&width=600"],
          caption: "Excited to share our new product features! #ProductLaunch #Innovation",
          url: "",
        },
        submittedAt: "1 day ago",
        status: "approved",
      },
      {
        id: "8",
        creator: {
          id: "creator6",
          name: "Alex Turner",
          department: "Product",
          avatar: "/placeholder.svg",
        },
        campaign: "Product Launch",
        campaignType: "Creative Challenge",
        platform: "instagram",
        approvalType: "Post URL Review",
        stage: "2/2",
        content: {
          type: "image",
          images: ["/placeholder.svg?height=600&width=600"],
          caption: "Excited to share our new product features! #ProductLaunch #Innovation",
          url: "https://instagram.com/p/example202",
          approvedContent: {
            images: ["/placeholder.svg?height=600&width=600"],
            caption: "Excited to share our new product features! #ProductLaunch #Innovation",
          },
        },
        submittedAt: "12 hours ago",
        status: "pending",
      },
    ]

    const socialMediaAccounts = [
      {
        id: "sm1",
        creator: {
          id: "creator1",
          name: "Sarah Johnson",
          department: "Marketing",
          avatar: "/placeholder.svg",
        },
        platform: "instagram",
        username: "@sarahjohnson_official",
        url: "https://instagram.com/sarahjohnson_official",
        followers: 5420,
        following: 843,
        submittedAt: "1 day ago",
        status: "pending",
      },
      {
        id: "sm2",
        creator: {
          id: "creator2",
          name: "Emily Rodriguez",
          department: "Customer Success",
          avatar: "/placeholder.svg",
        },
        platform: "tiktok",
        username: "@emilyrodriguez",
        url: "https://tiktok.com/@emilyrodriguez",
        followers: 12500,
        following: 350,
        submittedAt: "2 days ago",
        status: "pending",
      },
      {
        id: "sm3",
        creator: {
          id: "creator3",
          name: "David Wilson",
          department: "Sales",
          avatar: "/placeholder.svg",
        },
        platform: "tiktok",
        username: "@davidwilson_sales",
        url: "https://tiktok.com/davidwilson_sales",
        followers: 2340,
        following: 1250,
        submittedAt: "3 days ago",
        status: "pending",
      },
      {
        id: "sm4",
        creator: {
          id: "creator4",
          name: "Lisa Thompson",
          department: "HR",
          avatar: "/placeholder.svg",
        },
        platform: "instagram",
        username: "@lisathompson_hr",
        url: "https://instagram.com/lisathompson_hr",
        followers: 3200,
        following: 520,
        submittedAt: "5 days ago",
        status: "approved",
      },
      {
        id: "sm5",
        creator: {
          id: "creator5",
          name: "James Brown",
          department: "Engineering",
          avatar: "/placeholder.svg",
        },
        platform: "tiktok",
        username: "@jamesbrown_tech",
        url: "https://tiktok.com/@jamesbrown_tech",
        followers: 8700,
        following: 420,
        submittedAt: "6 days ago",
        status: "rejected",
      },
      {
        id: "sm6",
        creator: {
          id: "creator6",
          name: "Michael Chen",
          department: "Product",
          avatar: "/placeholder.svg",
        },
        platform: "tiktok",
        username: "@michaelchen_product",
        url: "https://tiktok.com/michaelchen_product",
        followers: 4500,
        following: 890,
        submittedAt: "7 days ago",
        status: "approved",
      },
    ]

    setAllSubmissions(submissions)
    setAllSocialMedia(socialMediaAccounts)

    filterSubmissions(submissions, searchTerm)
    filterSocialMedia(socialMediaAccounts, socialMediaSearchTerm)
  }, [searchTerm, socialMediaSearchTerm])

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

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(
        (submission) =>
          submission.creator.name.toLowerCase().includes(searchLower) ||
          submission.campaign.toLowerCase().includes(searchLower) ||
          submission.campaignType.toLowerCase().includes(searchLower),
      )
    }

    // Separate by status
    setPendingSubmissions(filtered.filter((sub) => sub.status === "pending"))
    setApprovedSubmissions(filtered.filter((sub) => sub.status === "approved"))
    setRejectedSubmissions(filtered.filter((sub) => sub.status === "rejected"))
  }

  const filterSocialMedia = (accounts: any[], search: string) => {
    let filtered = accounts

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(
        (account) =>
          account.creator.name.toLowerCase().includes(searchLower) ||
          account.username.toLowerCase().includes(searchLower) ||
          account.platform.toLowerCase().includes(searchLower),
      )
    }

    // Separate by status
    setPendingSocialMedia(filtered.filter((acc) => acc.status === "pending"))
    setApprovedSocialMedia(filtered.filter((acc) => acc.status === "approved"))
    setRejectedSocialMedia(filtered.filter((acc) => acc.status === "rejected"))
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    filterSubmissions(allSubmissions, value)
  }

  const handleSocialMediaSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSocialMediaSearchTerm(value)
    filterSocialMedia(allSocialMedia, value)
  }

  const handleViewSubmission = (id: string) => {
    router.push(`/admin/moderation/submission/${id}`)
  }

  const handleApproveSocialMedia = (id: string) => {
    // In a real app, this would call an API to update the status
    const updatedAccounts = allSocialMedia.map((account) =>
      account.id === id ? { ...account, status: "approved" } : account,
    )
    setAllSocialMedia(updatedAccounts)
    filterSocialMedia(updatedAccounts, socialMediaSearchTerm)
  }

  const handleRejectSocialMedia = (id: string) => {
    // In a real app, this would call an API to update the status
    const updatedAccounts = allSocialMedia.map((account) =>
      account.id === id ? { ...account, status: "rejected" } : account,
    )
    setAllSocialMedia(updatedAccounts)
    filterSocialMedia(updatedAccounts, socialMediaSearchTerm)
  }

  const handleMainTabChange = (value: string) => {
    setMainTab(value)
    // Optionally update URL without full reload if desired
    // const newPath = value === 'social' ? '/admin/moderation?tab=social' : '/admin/moderation';
    // router.replace(newPath, { scroll: false });
  }

  const pendingCount = allSubmissions.filter((sub) => sub.status === "pending").length
  const approvedCount = allSubmissions.filter((sub) => sub.status === "approved").length
  const rejectedCount = allSubmissions.filter((sub) => sub.status === "rejected").length

  const pendingSocialMediaCount = allSocialMedia.filter((acc) => acc.status === "pending").length
  const approvedSocialMediaCount = allSocialMedia.filter((acc) => acc.status === "approved").length
  const rejectedSocialMediaCount = allSocialMedia.filter((acc) => acc.status === "rejected").length

  // Dynamic page titles and descriptions based on selected tab
  const pageTitle = mainTab === "content" ? "Content Approval" : "Social Media Verification"
  const pageDescription =
    mainTab === "content" ? "Review and manage creator content submissions" : "Verify creator social media accounts"

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{pageTitle}</h1>
          <p className="text-muted-foreground">{pageDescription}</p>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={mainTab} className="w-full" onValueChange={handleMainTabChange}>
        <TabsList className="w-full md:w-auto mb-6">
          <TabsTrigger value="content" className="flex-1 md:flex-none">
            Content Submissions
          </TabsTrigger>
          <TabsTrigger value="social" className="flex-1 md:flex-none">
            Social Media Verification
          </TabsTrigger>
        </TabsList>

        {/* Content Submissions Tab */}
        <TabsContent value="content">
          <Tabs defaultValue="pending" className="w-full">
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
              <SubmissionTable
                title="Pending Review"
                description="Content waiting for your review"
                submissions={pendingSubmissions}
                status="pending"
                onViewSubmission={handleViewSubmission}
              />
            </TabsContent>

            <TabsContent value="approved">
              <SubmissionTable
                title="Approved Content"
                description="Content that has been approved"
                submissions={approvedSubmissions}
                status="approved"
                onViewSubmission={handleViewSubmission}
              />
            </TabsContent>

            <TabsContent value="rejected">
              <SubmissionTable
                title="Rejected Content"
                description="Content that has been rejected"
                submissions={rejectedSubmissions}
                status="rejected"
                onViewSubmission={handleViewSubmission}
              />
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Social Media Verification Tab */}
        <TabsContent value="social">
          <Tabs defaultValue="pending" className="w-full">
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
              <SocialMediaTable
                title="Pending Verification"
                description="Social media accounts waiting for verification"
                accounts={pendingSocialMedia}
                status="pending"
                onApprove={handleApproveSocialMedia}
                onReject={handleRejectSocialMedia}
              />
            </TabsContent>

            <TabsContent value="approved">
              <SocialMediaTable
                title="Verified Accounts"
                description="Social media accounts that have been verified"
                accounts={approvedSocialMedia}
                status="approved"
              />
            </TabsContent>

            <TabsContent value="rejected">
              <SocialMediaTable
                title="Rejected Accounts"
                description="Social media accounts that have been rejected"
                accounts={rejectedSocialMedia}
                status="rejected"
              />
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
                          {/* Removed avatar placeholder div */}
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
                              {submission.approvalType}{" "}
                              {/* Displaying the specific type like "Content Material Review" */}
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">{submission.approvalType}</span>
                          )}
                          {/* Removed stage display: submission.stage && (
                        <span className="text-xs text-muted-foreground">Step {submission.stage}</span>
                      )*/}
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
                          {/* Removed avatar placeholder div */}
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
                        {/* Removed separate URL line: 
                    <p className="text-xs text-blue-500 hover:underline break-all">{account.url}</p> 
                    */}
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

// New wrapper component for Suspense
export default function Approval() {
  return (
    <Suspense fallback={<div>Loading moderation page...</div>}>
      <ApprovalPageContent />
    </Suspense>
  )
}
