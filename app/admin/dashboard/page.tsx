"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Megaphone,
  ArrowRight,
  Plus,
  DollarSign,
  CreditCard,
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  ArrowDownCircle,
  Instagram,
  UserCheck,
  LinkIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { TikTokIcon } from "@/components/tik-tok-icon"
import { Textarea } from "@/components/ui/textarea"

// Define types
type CampaignType = "QUICK_SHARE" | "CREATIVE_CHALLENGE"
type ApprovalStatusType = "CONTENT_REVIEW" | "POST_URL_REVIEW"
type SocialPlatform = "instagram" | "tiktok"

interface PendingApprovalItem {
  id: string
  creatorName: string
  creatorAvatar?: string
  campaignName: string
  campaignType: CampaignType
  submissionTime: string
  approvalStatus: ApprovalStatusType
  department?: string
  content?: {
    images?: Array<{ id: number; src: string; alt: string }>
    videoSrc?: string
    caption: string
  }
  submittedUrl?: string
}

interface PendingSocialMediaItem {
  id: string
  creatorName: string
  creatorAvatar?: string
  platform: SocialPlatform
  username: string
  submissionTime: string
  department?: string
  profileUrl?: string
  followers: number // Added
  following: number // Added
}

// Mock data for Campaign Performance
const mockCampaignsPerformance = [
  {
    id: "1",
    name: "Summer Product Launch",
    creators: 42,
    content: 28,
    views: "24.5K",
    likes: "3.2K",
    comments: "1.8K",
  },
  { id: "2", name: "Brand Challenge", creators: 36, content: 15, views: "18.3K", likes: "2.7K", comments: "1.2K" },
  { id: "3", name: "Customer Stories", creators: 28, content: 22, views: "9.8K", likes: "1.5K", comments: "820" },
  {
    id: "4",
    name: "Sustainability Initiative",
    creators: 18,
    content: 7,
    views: "5.6K",
    likes: "980",
    comments: "320",
  },
  {
    id: "5",
    name: "Q4 Product Showcase",
    creators: 55,
    content: 30,
    views: "30.1K",
    likes: "4.1K",
    comments: "2.2K",
  },
  {
    id: "6",
    name: "Holiday Special",
    creators: 60,
    content: 45,
    views: "50.5K",
    likes: "6.0K",
    comments: "3.1K",
  },
]

// Mock data for new Social Media Approvals
const initialMockPendingSocialMedia: PendingSocialMediaItem[] = [
  {
    id: "sm1",
    creatorName: "Alex Green",
    creatorAvatar: "/placeholder.svg?width=32&height=32",
    platform: "instagram",
    username: "@alexgreen_official",
    submissionTime: "1h ago",
    department: "Marketing",
    profileUrl: "https://instagram.com/alexgreen_official",
    followers: 12500,
    following: 300,
  },
  {
    id: "sm2",
    creatorName: "Maria Garcia",
    creatorAvatar: "/placeholder.svg?width=32&height=32",
    platform: "tiktok",
    username: "@mariadances",
    submissionTime: "3h ago",
    department: "Sales",
    profileUrl: "https://tiktok.com/@mariadances",
    followers: 250000,
    following: 150,
  },
  {
    id: "sm3",
    creatorName: "John Doe",
    platform: "instagram",
    username: "@johndoesphotos",
    submissionTime: "5h ago",
    department: "Product",
    profileUrl: "https://instagram.com/johndoesphotos",
    followers: 5200,
    following: 850,
  },
]

// Restored mockPendingApprovals data
const initialMockPendingApprovals: PendingApprovalItem[] = [
  {
    id: "pa1",
    creatorName: "Sarah Johnson",
    campaignName: "Summer Product Launch Extravaganza - The Ultimate Guide to Sunshine Styles",
    campaignType: "CREATIVE_CHALLENGE",
    submissionTime: "2h ago",
    approvalStatus: "CONTENT_REVIEW",
    department: "Marketing",
    content: {
      images: [
        { id: 1, src: "/placeholder.svg?height=400&width=400", alt: "Summer collection image 1" },
        { id: 2, src: "/placeholder.svg?height=400&width=400", alt: "Summer collection image 2" },
      ],
      caption:
        "Summer is here and so is the new collection from @brandname! 🌞 Check out these amazing new products that are perfect for the season. #SummerCollection #BrandNameSummer #NewArrivals. This caption is intentionally made longer to demonstrate the scroll hint functionality in the content preview modal. We want to ensure that if the content, including this caption and potentially multiple images or a video, exceeds the available viewport height within the modal, a visual cue will appear to indicate that the user can scroll down to see more. This is important for usability, especially on smaller screens or when dealing with extensive creative submissions. The scroll hint should be subtle yet noticeable, guiding the admin to view all submitted materials before making an approval decision.",
    },
  },
  {
    id: "pa2",
    creatorName: "Michael Chen",
    campaignName: "Brand Challenge Q3: Innovate & Inspire",
    campaignType: "CREATIVE_CHALLENGE",
    submissionTime: "4h ago",
    approvalStatus: "POST_URL_REVIEW",
    department: "Product",
    submittedUrl: "https://www.tiktok.com/@exampleuser/video/1234567890123456789",
    content: {
      images: [{ id: 1, src: "/placeholder.svg?height=200&width=200", alt: "Tech gadget post preview" }],
      caption:
        "My TikTok for #BrandChallengeQ3 is live! This was the original caption for the content I submitted earlier. Hope you like the final post!",
    },
  },
  {
    id: "pa3",
    creatorName: "Emily Rodriguez",
    campaignName: "New Blog Article on Customer Success",
    campaignType: "QUICK_SHARE",
    submissionTime: "5h ago",
    approvalStatus: "POST_URL_REVIEW",
    department: "Customer Success",
    submittedUrl: "https://example.com/blog/new-article-on-customer-success-strategies",
    content: {
      images: [{ id: 1, src: "/placeholder.svg?height=400&width=400", alt: "Blog Article Promotion" }],
      caption:
        "Exciting news! Our latest blog post on 'Advanced Customer Success Strategies' is now live. Read it here: [Link to actual blog post if different from submitted one, or just a generic promo caption]. #CustomerSuccess #NewBlog",
    },
  },
  {
    id: "pa4",
    creatorName: "David Wilson",
    campaignName: "Product Tutorial Video: Mastering the Features",
    campaignType: "CREATIVE_CHALLENGE",
    submissionTime: "6h ago",
    approvalStatus: "CONTENT_REVIEW",
    department: "Sales",
    content: {
      videoSrc: "/placeholder.mp4",
      caption:
        "Check out my new tutorial video for the @brandname product! #Tutorial #ProductDemo. This video explains all the key features and benefits. It's a bit longer to test the scroll hint with video content as well.",
    },
  },
  {
    id: "pa5",
    creatorName: "Lisa Thompson",
    campaignName: "Latest Company News Video Update",
    campaignType: "QUICK_SHARE",
    submissionTime: "7h ago",
    approvalStatus: "POST_URL_REVIEW",
    department: "Engineering",
    submittedUrl: "https://www.linkedin.com/feed/update/urn:li:activity:12345/",
    content: {
      videoSrc: "/placeholder.mp4",
      caption:
        "Big announcement! Check out our latest company news update. #CompanyNews #TechUpdate. This is the official video we'd like you to share.",
    },
  },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedApprovalItem, setSelectedApprovalItem] = useState<PendingApprovalItem | null>(null)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const contentPreviewRef = useRef<HTMLDivElement>(null)
  const [showScrollHint, setShowScrollHint] = useState(false)

  const [pendingContentApprovals, setPendingContentApprovals] =
    useState<PendingApprovalItem[]>(initialMockPendingApprovals)
  const [pendingSocialMedia, setPendingSocialMedia] = useState<PendingSocialMediaItem[]>(initialMockPendingSocialMedia)
  const [selectedSocialMediaItem, setSelectedSocialMediaItem] = useState<PendingSocialMediaItem | null>(null)
  const [isSocialMediaReviewDialogOpen, setIsSocialMediaReviewDialogOpen] = useState(false)
  const [socialMediaFeedback, setSocialMediaFeedback] = useState("")

  const navigateTo = (path: string) => {
    router.push(path)
  }

  const displayImages =
    selectedApprovalItem?.content?.images && selectedApprovalItem.content.images.length > 0
      ? selectedApprovalItem.content.images
      : [{ id: 1, src: "/placeholder.svg?height=400&width=400", alt: "Placeholder" }]

  const nextImage = () => {
    if (displayImages.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % displayImages.length)
    }
  }

  const prevImage = () => {
    if (displayImages.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + displayImages.length) % displayImages.length)
    }
  }

  const handleTopUpClick = () => {
    alert("Redirecting to payment gateway for reward balance top-up...")
  }

  const getCampaignTypeDisplay = (type: CampaignType): string => {
    return type === "QUICK_SHARE" ? "Quick Share" : "Creative Challenge"
  }

  const getApprovalStatusInfo = (status: ApprovalStatusType): { text: string; color: string } => {
    switch (status) {
      case "CONTENT_REVIEW":
        return { text: "Content Review", color: "text-blue-600 dark:text-blue-400" }
      case "POST_URL_REVIEW":
        return { text: "Post URL Review", color: "text-amber-600 dark:text-amber-400" }
      default:
        return { text: "Review", color: "text-muted-foreground" }
    }
  }

  const getDialogTitle = (item: PendingApprovalItem | null): string => {
    if (!item) return "Review Submission"
    return `${getApprovalStatusInfo(item.approvalStatus).text}`
  }

  const checkScrollability = () => {
    if (contentPreviewRef.current) {
      const { scrollHeight, clientHeight } = contentPreviewRef.current
      setShowScrollHint(scrollHeight > clientHeight)
    } else {
      setShowScrollHint(false)
    }
  }

  const handleOpenReviewDialog = (item: PendingApprovalItem) => {
    setSelectedApprovalItem(item)
    setCurrentImageIndex(0)
    setIsReviewDialogOpen(true)
    setTimeout(checkScrollability, 100)
  }

  useEffect(() => {
    if (isReviewDialogOpen && selectedApprovalItem) {
      checkScrollability()
    }
  }, [selectedApprovalItem, currentImageIndex, isReviewDialogOpen])

  const getLeftPanelContentTitle = (item: PendingApprovalItem | null): string => {
    if (!item || !item.content) return ""
    if (item.approvalStatus === "CONTENT_REVIEW") return "Content Preview"
    if (item.approvalStatus === "POST_URL_REVIEW") {
      if (item.campaignType === "CREATIVE_CHALLENGE") return "Original Approved Content"
      if (item.campaignType === "QUICK_SHARE") return "Original Content for Sharing"
    }
    return "Content"
  }

  const SocialPlatformIcon = ({ platform, className }: { platform: SocialPlatform; className?: string }) => {
    if (platform === "instagram") return <Instagram className={className || "h-4 w-4 text-pink-600"} />
    if (platform === "tiktok") return <TikTokIcon className={className || "h-4 w-4"} />
    return null
  }

  const handleOpenSocialMediaReviewDialog = (item: PendingSocialMediaItem) => {
    setSelectedSocialMediaItem(item)
    setSocialMediaFeedback("")
    setIsSocialMediaReviewDialogOpen(true)
  }

  const handleVerifySocialMedia = (itemId: string) => {
    console.log("Verifying social media:", itemId, "Feedback:", socialMediaFeedback)
    setPendingSocialMedia((prev) => prev.filter((item) => item.id !== itemId))
    setIsSocialMediaReviewDialogOpen(false)
  }

  const handleRejectSocialMedia = (itemId: string) => {
    console.log("Rejecting social media:", itemId, "Feedback:", socialMediaFeedback)
    setPendingSocialMedia((prev) => prev.filter((item) => item.id !== itemId))
    setIsSocialMediaReviewDialogOpen(false)
  }

  // Content Approval Modal Logic
  const handleApproveContent = (itemId: string) => {
    console.log("Approving content:", itemId)
    setPendingContentApprovals((prev) => prev.filter((item) => item.id !== itemId))
    setIsReviewDialogOpen(false)
  }

  const handleRejectContent = (itemId: string) => {
    console.log("Rejecting content:", itemId)
    setPendingContentApprovals((prev) => prev.filter((item) => item.id !== itemId))
    setIsReviewDialogOpen(false)
  }

  return (
    <>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your advocacy program.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button className="gap-1" onClick={() => router.push("/admin/campaign-create")}>
              <Plus className="h-4 w-4" />
              New Campaign
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Creators</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground">+12 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <Megaphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">2 ending this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Reward Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">Rp 25.5M</div>
                <Button size="sm" variant="outline" onClick={handleTopUpClick}>
                  Top Up
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Available for redemption</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Redeemed Rewards</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp 12.8M</div>
              <p className="text-xs text-muted-foreground">+Rp 3.2M from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Social Media Approvals Section */}
          <Card className="md:col-span-1 flex flex-col h-[500px]">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Social Media Approvals</CardTitle>
                <CardDescription>Creator accounts awaiting verification</CardDescription>
              </div>
              <Badge variant="outline" className="ml-2">
                {pendingSocialMedia.length} Pending
              </Badge>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <div className="space-y-3">
                {pendingSocialMedia.map((item) => (
                  <div key={item.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs flex-shrink-0">
                          {item.creatorAvatar ? (
                            <img
                              src={item.creatorAvatar || "/placeholder.svg?width=32&height=32&query=avatar"}
                              alt={item.creatorName}
                              className="rounded-full w-full h-full object-cover"
                            />
                          ) : (
                            item.creatorName.substring(0, 1)
                          )}
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="font-medium text-sm">{item.creatorName}</p>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <SocialPlatformIcon platform={item.platform} className="h-3.5 w-3.5" />
                            <span className="truncate" title={item.username}>
                              {item.username}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2 flex items-center gap-2">
                        <p className="text-xs text-muted-foreground mr-2">{item.submissionTime}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-7 px-2"
                          onClick={() => handleOpenSocialMediaReviewDialog(item)}
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {pendingSocialMedia.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No pending social media verifications.
                  </p>
                )}
              </div>
            </CardContent>
            <div className="p-4 mt-auto border-t">
              <Button
                variant="outline"
                className="w-full gap-1"
                onClick={() => router.push("/admin/moderation?tab=social")}
              >
                Review All Accounts <UserCheck className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          {/* Pending Content Approvals Section */}
          <Card className="md:col-span-1 flex flex-col h-[500px]">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Content Approvals</CardTitle>
                <CardDescription>Content submissions waiting for your review</CardDescription>
              </div>
              <Badge variant="outline" className="ml-2">
                {pendingContentApprovals.length} Pending
              </Badge>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <div className="space-y-3">
                {pendingContentApprovals.map((item) => (
                  <div key={item.id} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs flex-shrink-0 mt-1">
                          {item.creatorAvatar ? (
                            <img
                              src={item.creatorAvatar || "/placeholder.svg?width=32&height=32&query=avatar"}
                              alt={item.creatorName}
                              className="rounded-full w-full h-full object-cover"
                            />
                          ) : (
                            item.creatorName.substring(0, 1)
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm mb-1">{item.creatorName}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2" title={item.campaignName}>
                            {item.campaignName}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="py-0 px-1.5 text-xs">
                              {getCampaignTypeDisplay(item.campaignType)}
                            </Badge>
                            <span className={`text-xs font-medium ${getApprovalStatusInfo(item.approvalStatus).color}`}>
                              {getApprovalStatusInfo(item.approvalStatus).text}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-3">
                        <p className="text-xs text-muted-foreground">{item.submissionTime}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-7 px-2"
                          onClick={() => handleOpenReviewDialog(item)}
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {pendingContentApprovals.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No pending content approvals.</p>
                )}
              </div>
            </CardContent>
            <div className="p-4 mt-auto border-t">
              <Button variant="outline" className="w-full gap-1" onClick={() => router.push("/admin/moderation")}>
                Review All Submissions <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          {/* Campaign Performance Section */}
          <Card className="md:col-span-2 flex flex-col">
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>All Campaigns' Performance Overview</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] overflow-auto">
              {" "}
              {/* Adjusted height and overflow */}
              <div className="space-y-6">
                {mockCampaignsPerformance.map((campaign) => (
                  <div key={campaign.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <h3 className="font-medium">{campaign.name}</h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={() => navigateTo(`/admin/campaigns/${campaign.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-3">
                      <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                        <span className="text-xs text-muted-foreground">Creators</span>
                        <span className="font-medium">{campaign.creators}</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                        <span className="text-xs text-muted-foreground">Content</span>
                        <span className="font-medium">{campaign.content}</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                        <span className="text-xs text-muted-foreground">Views</span>
                        <span className="font-medium">{campaign.views}</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                        <span className="text-xs text-muted-foreground">Likes</span>
                        <span className="font-medium">{campaign.likes}</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded md:col-span-1 sm:col-span-3 col-span-2">
                        <span className="text-xs text-muted-foreground">Comments</span>
                        <span className="font-medium">{campaign.comments}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-4 mt-auto border-t">
              <Button variant="outline" className="w-full" onClick={() => navigateTo("/admin/campaigns")}>
                View All Campaigns
              </Button>
            </div>
          </Card>
        </div>

        {/* Review Dialog for Pending Content Approvals */}
        <Dialog
          open={isReviewDialogOpen}
          onOpenChange={(open) => {
            setIsReviewDialogOpen(open)
            if (!open) setShowScrollHint(false)
          }}
        >
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>{getDialogTitle(selectedApprovalItem)}</DialogTitle>
            </DialogHeader>
            {selectedApprovalItem && (
              <div className="grid md:grid-cols-2 gap-6 py-4">
                <div ref={contentPreviewRef} className="relative max-h-[70vh] overflow-y-auto pr-2">
                  {(selectedApprovalItem.approvalStatus === "CONTENT_REVIEW" ||
                    (selectedApprovalItem.approvalStatus === "POST_URL_REVIEW" &&
                      (selectedApprovalItem.campaignType === "CREATIVE_CHALLENGE" ||
                        selectedApprovalItem.campaignType === "QUICK_SHARE"))) &&
                    selectedApprovalItem.content && (
                      <>
                        <div className="mb-4">
                          <h3 className="text-sm font-medium mb-2">{getLeftPanelContentTitle(selectedApprovalItem)}</h3>
                          {selectedApprovalItem.content.images && selectedApprovalItem.content.images.length > 0 && (
                            <div className="relative">
                              <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-md mb-2 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <img
                                    src={
                                      displayImages[currentImageIndex]?.src ||
                                      "/placeholder.svg?height=400&width=400&query=content+image" ||
                                      "/placeholder.svg" ||
                                      "/placeholder.svg" ||
                                      "/placeholder.svg"
                                    }
                                    alt={displayImages[currentImageIndex]?.alt || "Content image"}
                                    className="w-full h-full object-contain rounded-md"
                                  />
                                </div>
                                {displayImages.length > 1 && (
                                  <>
                                    <div className="absolute inset-0 flex items-center justify-between px-2">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-full bg-white/70 hover:bg-white/90 dark:bg-slate-700/70 dark:hover:bg-slate-700/90"
                                        onClick={prevImage}
                                      >
                                        <ChevronLeft className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-full bg-white/70 hover:bg-white/90 dark:bg-slate-700/70 dark:hover:bg-slate-700/90"
                                        onClick={nextImage}
                                      >
                                        <ChevronRight className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                                      {displayImages.map((_, index) => (
                                        <div
                                          key={index}
                                          className={`h-1.5 ${index === currentImageIndex ? "w-6 bg-white dark:bg-slate-300" : "w-1.5 bg-white/50 dark:bg-slate-500/50"} rounded-full transition-all`}
                                        ></div>
                                      ))}
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                          {selectedApprovalItem.content.videoSrc && (
                            <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-md mb-2 flex items-center justify-center">
                              <video
                                controls
                                src={selectedApprovalItem.content.videoSrc}
                                className="max-w-full max-h-full rounded-md"
                              >
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          )}
                        </div>
                        <div className="pb-8">
                          <h3 className="text-sm font-medium mb-2">Caption</h3>
                          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md text-sm whitespace-pre-wrap">
                            {selectedApprovalItem.content.caption}
                          </div>
                        </div>
                      </>
                    )}
                  {showScrollHint && selectedApprovalItem.content && (
                    <div className="sticky bottom-0 left-0 right-0 flex items-center justify-center p-2 bg-gradient-to-t from-background to-transparent pointer-events-none">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground bg-card dark:bg-slate-800 px-2 py-1 rounded-full shadow">
                        <ArrowDownCircle className="h-3 w-3" />
                        Scroll for more
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Submission Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm">
                          {selectedApprovalItem.creatorAvatar ? (
                            <img
                              src={
                                selectedApprovalItem.creatorAvatar ||
                                "/placeholder.svg?width=40&height=40&query=creator+avatar" ||
                                "/placeholder.svg" ||
                                "/placeholder.svg" ||
                                "/placeholder.svg"
                              }
                              alt={selectedApprovalItem.creatorName}
                              className="rounded-full w-full h-full object-cover"
                            />
                          ) : (
                            selectedApprovalItem.creatorName.substring(0, 1)
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{selectedApprovalItem.creatorName}</p>
                          <p className="text-xs text-muted-foreground">
                            {selectedApprovalItem.department || "N/A Department"}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Campaign</p>
                          <p className="font-medium">{selectedApprovalItem.campaignName}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Campaign Type</p>
                          <p className="font-medium">{getCampaignTypeDisplay(selectedApprovalItem.campaignType)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Submitted</p>
                          <p className="font-medium">{selectedApprovalItem.submissionTime}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Review Type</p>
                          <p className="font-medium">
                            {getApprovalStatusInfo(selectedApprovalItem.approvalStatus).text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {selectedApprovalItem.approvalStatus === "POST_URL_REVIEW" && selectedApprovalItem.submittedUrl && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium mb-2">Submitted Post URL</h3>
                      <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-md text-sm break-all">
                        <a
                          href={selectedApprovalItem.submittedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          {selectedApprovalItem.submittedUrl}
                        </a>
                      </div>
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-medium mb-2">Moderation</h3>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Add feedback or notes (optional)"
                        className="w-full p-2 border rounded-md min-h-[80px] text-sm bg-transparent border-input"
                      />
                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          className="gap-1"
                          onClick={() => handleRejectContent(selectedApprovalItem.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button className="gap-1" onClick={() => handleApproveContent(selectedApprovalItem.id)}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter className="mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsReviewDialogOpen(false)
                  setShowScrollHint(false)
                }}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Review Dialog for Social Media Approvals */}
        <Dialog open={isSocialMediaReviewDialogOpen} onOpenChange={setIsSocialMediaReviewDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Verify Social Media Account</DialogTitle>
              {selectedSocialMediaItem && (
                <DialogDescription>
                  Review and verify or reject the social media account for {selectedSocialMediaItem.creatorName}.
                </DialogDescription>
              )}
            </DialogHeader>
            {selectedSocialMediaItem && (
              <div className="py-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-lg flex-shrink-0">
                    {selectedSocialMediaItem.creatorAvatar ? (
                      <img
                        src={
                          selectedSocialMediaItem.creatorAvatar || "/placeholder.svg?width=48&height=48&query=avatar"
                        }
                        alt={selectedSocialMediaItem.creatorName}
                        className="rounded-full w-full h-full object-cover"
                      />
                    ) : (
                      selectedSocialMediaItem.creatorName.substring(0, 1)
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{selectedSocialMediaItem.creatorName}</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedSocialMediaItem.department || "N/A Department"}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Platform</p>
                  <div className="flex items-center gap-2">
                    <SocialPlatformIcon platform={selectedSocialMediaItem.platform} className="h-5 w-5" />
                    <span className="font-medium capitalize">{selectedSocialMediaItem.platform}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Username</p>
                  <a
                    href={
                      selectedSocialMediaItem.profileUrl ||
                      `https://${selectedSocialMediaItem.platform}.com/${selectedSocialMediaItem.username.startsWith("@") ? selectedSocialMediaItem.username.substring(1) : selectedSocialMediaItem.username}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400 break-all"
                  >
                    {selectedSocialMediaItem.username} <LinkIcon className="h-3.5 w-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Followers</p>
                    <p className="text-sm font-medium">{selectedSocialMediaItem.followers.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Following</p>
                    <p className="text-sm font-medium">{selectedSocialMediaItem.following.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Submitted</p>
                  <p className="text-sm font-medium">{selectedSocialMediaItem.submissionTime}</p>
                </div>

                <div>
                  <label htmlFor="socialMediaFeedback" className="text-sm font-medium text-muted-foreground">
                    Feedback (Optional)
                  </label>
                  <Textarea
                    id="socialMediaFeedback"
                    placeholder="Add feedback or notes..."
                    value={socialMediaFeedback}
                    onChange={(e) => setSocialMediaFeedback(e.target.value)}
                    className="mt-1 min-h-[60px]"
                  />
                </div>
              </div>
            )}
            <DialogFooter className="mt-2">
              <Button variant="outline" onClick={() => setIsSocialMediaReviewDialogOpen(false)}>
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  onClick={() => selectedSocialMediaItem && handleRejectSocialMedia(selectedSocialMediaItem.id)}
                  disabled={!selectedSocialMediaItem}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button
                  variant="default"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => selectedSocialMediaItem && handleVerifySocialMedia(selectedSocialMediaItem.id)}
                  disabled={!selectedSocialMediaItem}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Verify
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
