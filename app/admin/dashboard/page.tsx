"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Megaphone,
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  ArrowDownCircle,
  Instagram,
  LinkIcon,
  Radio,
  TrendingUp,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { TikTokIcon } from "@/components/tik-tok-icon";
import { Textarea } from "@/components/ui/textarea";

// Define types (department -> email)
type CampaignType = "QUICK_SHARE" | "CREATIVE_CHALLENGE";
type ApprovalStatusType = "CONTENT_REVIEW" | "CONTENT_URL_REVIEW";
type SocialPlatform = "instagram" | "tiktok";

interface PendingApprovalItem {
  id: string;
  creatorName: string;
  email?: string; // Changed from department
  campaignName: string;
  campaignType: CampaignType;
  submissionTime: string;
  approvalStatus: ApprovalStatusType;
  platform: SocialPlatform;
  content?: {
    images?: Array<{ id: number; src: string; alt: string }>;
    videoSrc?: string;
    caption: string;
  };
  submittedUrl?: string;
  socialHandle?: string; // Added social media handle
}

interface PendingSocialMediaItem {
  id: string;
  creatorName: string;
  email?: string; // Changed from department
  platform: SocialPlatform;
  username: string;
  submissionTime: string;
  profileUrl?: string;
  followers: number;
  following: number;
}

// Mock data for Campaign Performance (remains the same)
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
  {
    id: "2",
    name: "Brand Challenge",
    creators: 36,
    content: 15,
    views: "18.3K",
    likes: "2.7K",
    comments: "1.2K",
  },
  {
    id: "3",
    name: "Customer Stories",
    creators: 28,
    content: 22,
    views: "9.8K",
    likes: "1.5K",
    comments: "820",
  },
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
];

// Mock data for new Social Media Approvals (department -> email)
const initialMockPendingSocialMedia: PendingSocialMediaItem[] = [
  {
    id: "sm1",
    creatorName: "Alex Green",
    email: "alex.green@example.com",
    platform: "instagram",
    username: "@alexgreen_official",
    submissionTime: "1h ago",
    profileUrl: "https://instagram.com/alexgreen_official",
    followers: 12500,
    following: 300,
  },
  {
    id: "sm2",
    creatorName: "Maria Garcia",
    email: "maria.garcia@example.com",
    platform: "tiktok",
    username: "@mariadances",
    submissionTime: "3h ago",
    profileUrl: "https://tiktok.com/@mariadances",
    followers: 250000,
    following: 150,
  },
  {
    id: "sm3",
    creatorName: "John Doe",
    email: "john.doe@example.com",
    platform: "instagram",
    username: "@johndoesphotos",
    submissionTime: "5h ago",
    profileUrl: "https://instagram.com/johndoesphotos",
    followers: 5200,
    following: 850,
  },
  {
    id: "sm4",
    creatorName: "Emma Wilson",
    email: "emma.wilson@example.com",
    platform: "tiktok",
    username: "@emmawilson_fit",
    submissionTime: "6h ago",
    profileUrl: "https://tiktok.com/@emmawilson_fit",
    followers: 89000,
    following: 420,
  },
];

// MockPendingApprovals data (department -> email)
const initialMockPendingApprovals: PendingApprovalItem[] = [
  {
    id: "pa1",
    creatorName: "Sarah Johnson",
    email: "sarah.j@example.com",
    campaignName:
      "Summer Product Launch Extravaganza - The Ultimate Guide to Sunshine Styles",
    campaignType: "CREATIVE_CHALLENGE",
    submissionTime: "2h ago",
    approvalStatus: "CONTENT_URL_REVIEW",
    platform: "instagram",
    socialHandle: "@sarah_j",
    submittedUrl:
      "https://example.com/blog/new-article-on-customer-success-strategies",
    content: {
      images: [
        {
          id: 1,
          src: "/placeholder.svg?height=400&width=400",
          alt: "Summer collection image 1",
        },
        {
          id: 2,
          src: "/placeholder.svg?height=400&width=400",
          alt: "Summer collection image 2",
        },
      ],
      caption: "Summer is here! Check out the new collection. #SummerVibes",
    },
  },
  {
    id: "pa2",
    creatorName: "Michael Chen",
    email: "michael.c@example.com",
    campaignName: "Brand Challenge Q3: Innovate & Inspire",
    campaignType: "CREATIVE_CHALLENGE",
    submissionTime: "4h ago",
    approvalStatus: "CONTENT_URL_REVIEW",
    platform: "tiktok",
    socialHandle: "@michael_c",
    submittedUrl:
      "https://www.tiktok.com/@exampleuser/video/1234567890123456789",
    content: {
      images: [
        {
          id: 1,
          src: "/placeholder.svg?height=200&width=200",
          alt: "Tech gadget post preview",
        },
      ],
      caption: "My TikTok for #BrandChallengeQ3 is live!",
    },
  },
  {
    id: "pa3",
    creatorName: "Emily Rodriguez",
    email: "emily.r@example.com",
    campaignName: "New Blog Article on Customer Success",
    campaignType: "QUICK_SHARE",
    submissionTime: "5h ago",
    approvalStatus: "CONTENT_URL_REVIEW",
    platform: "instagram",
    socialHandle: "@emily_r",
    submittedUrl:
      "https://example.com/blog/new-article-on-customer-success-strategies",
    content: {
      images: [
        {
          id: 1,
          src: "/placeholder.svg?height=400&width=400",
          alt: "Blog Article Promotion",
        },
      ],
      caption: "Exciting news! Our latest blog post is live. #CustomerSuccess",
    },
  },
  {
    id: "pa4",
    creatorName: "David Wilson",
    email: "david.w@example.com",
    campaignName: "Product Tutorial Video: Mastering the Features",
    campaignType: "CREATIVE_CHALLENGE",
    submissionTime: "6h ago",
    approvalStatus: "CONTENT_URL_REVIEW",
    platform: "tiktok",
    socialHandle: "@david_w",
    submittedUrl:
      "https://www.tiktok.com/@exampleuser/video/1234567890123456789",
    content: {
      videoSrc: "/placeholder.mp4",
      caption: "Check out my new tutorial video! #Tutorial",
    },
  },
  {
    id: "pa5",
    creatorName: "Lisa Thompson",
    email: "lisa.t@example.com",
    campaignName: "Latest Company News Video Update",
    campaignType: "QUICK_SHARE",
    submissionTime: "7h ago",
    approvalStatus: "CONTENT_URL_REVIEW",
    platform: "instagram",
    socialHandle: "@lisa_t",
    submittedUrl: "https://www.linkedin.com/feed/update/urn:li:activity:12345/",
    content: {
      videoSrc: "/placeholder.mp4",
      caption:
        "Big announcement! Check out our latest company news. #CompanyNews",
    },
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedApprovalItem, setSelectedApprovalItem] =
    useState<PendingApprovalItem | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const contentPreviewRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  const [pendingContentApprovals, setPendingContentApprovals] = useState<
    PendingApprovalItem[]
  >(initialMockPendingApprovals);
  const [pendingSocialMedia, setPendingSocialMedia] = useState<
    PendingSocialMediaItem[]
  >(initialMockPendingSocialMedia);
  const [selectedSocialMediaItem, setSelectedSocialMediaItem] =
    useState<PendingSocialMediaItem | null>(null);
  const [isSocialMediaReviewDialogOpen, setIsSocialMediaReviewDialogOpen] =
    useState(false);
  const [socialMediaFeedback, setSocialMediaFeedback] = useState("");

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const displayImages =
    selectedApprovalItem?.content?.images &&
    selectedApprovalItem.content.images.length > 0
      ? selectedApprovalItem.content.images
      : [
          {
            id: 1,
            src: "/placeholder.svg?height=400&width=400",
            alt: "Placeholder",
          },
        ];

  const nextImage = () => {
    if (displayImages.length > 1) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % displayImages.length
      );
    }
  };

  const prevImage = () => {
    if (displayImages.length > 1) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + displayImages.length) % displayImages.length
      );
    }
  };

  const handleTopUpClick = () => {
    alert("Redirecting to payment gateway for reward balance top-up...");
  };

  const getCampaignTypeDisplay = (type: CampaignType): string => {
    return type === "QUICK_SHARE" ? "Quick Share" : "Creative Challenge";
  };

  const getApprovalStatusInfo = (
    status: ApprovalStatusType
  ): { text: string; color: string } => {
    return {
      text: "Content URL Approval",
      color: "text-amber-600 dark:text-amber-400",
    };
  };

  const getDialogTitle = (item: PendingApprovalItem | null): string => {
    return "Content URL Approval";
  };

  const checkScrollability = () => {
    if (contentPreviewRef.current) {
      const { scrollHeight, clientHeight } = contentPreviewRef.current;
      setShowScrollHint(scrollHeight > clientHeight);
    } else {
      setShowScrollHint(false);
    }
  };

  const handleOpenReviewDialog = (item: PendingApprovalItem) => {
    setSelectedApprovalItem(item);
    setCurrentImageIndex(0);
    setIsReviewDialogOpen(true);
    setTimeout(checkScrollability, 100);
  };

  useEffect(() => {
    if (isReviewDialogOpen && selectedApprovalItem) {
      checkScrollability();
    }
  }, [selectedApprovalItem, currentImageIndex, isReviewDialogOpen]);

  const SocialPlatformIcon = ({
    platform,
    className,
  }: {
    platform: SocialPlatform;
    className?: string;
  }) => {
    if (platform === "instagram")
      return <Instagram className={className || "h-4 w-4 text-pink-600"} />;
    if (platform === "tiktok")
      return <TikTokIcon className={className || "h-4 w-4"} />;
    return null;
  };

  const handleOpenSocialMediaReviewDialog = (item: PendingSocialMediaItem) => {
    setSelectedSocialMediaItem(item);
    setSocialMediaFeedback("");
    setIsSocialMediaReviewDialogOpen(true);
  };

  const handleVerifySocialMedia = (itemId: string) => {
    console.log(
      "Verifying social media:",
      itemId,
      "Feedback:",
      socialMediaFeedback
    );
    setPendingSocialMedia((prev) => prev.filter((item) => item.id !== itemId));
    setIsSocialMediaReviewDialogOpen(false);
  };

  const handleRejectSocialMedia = (itemId: string) => {
    console.log(
      "Rejecting social media:",
      itemId,
      "Feedback:",
      socialMediaFeedback
    );
    setPendingSocialMedia((prev) => prev.filter((item) => item.id !== itemId));
    setIsSocialMediaReviewDialogOpen(false);
  };

  const handleApproveContent = (itemId: string) => {
    console.log("Approving content:", itemId);
    setPendingContentApprovals((prev) =>
      prev.filter((item) => item.id !== itemId)
    );
    setIsReviewDialogOpen(false);
  };

  const handleRejectContent = (itemId: string) => {
    console.log("Rejecting content:", itemId);
    setPendingContentApprovals((prev) =>
      prev.filter((item) => item.id !== itemId)
    );
    setIsReviewDialogOpen(false);
  };

  return (
    <>
      <div className="p-6 py-12 md:p-6">
        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto">
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome back, Admin!
            </h1>
            <p className="text-muted-foreground">
              Here's an overview of your advocacy program.
            </p>
          </div>

          {/* Mobile: Minimalist single row stats */}
          <div className="block md:hidden mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="grid grid-cols-4 gap-2">
                <div className="text-center">
                  <Users className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
                  <div className="text-xl font-bold">128</div>
                  <div className="text-xs text-muted-foreground">Creators</div>
                </div>
                <div className="text-center">
                  <Megaphone className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
                  <div className="text-xl font-bold">8</div>
                  <div className="text-xs text-muted-foreground">Campaigns</div>
                </div>
                <div className="text-center">
                  <Radio className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
                  <div className="text-xl font-bold">47</div>
                  <div className="text-xs text-muted-foreground">Contents</div>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
                  <div className="text-xl font-bold">8.4%</div>
                  <div className="text-xs text-muted-foreground">
                    Engagement
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: Keep existing card-based layout */}
          <div className="hidden md:grid md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Creators</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Campaigns</CardTitle>
                <Megaphone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Contents</CardTitle>
                <Radio className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Engagement
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.4%</div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 md:space-y-6">
            {/* Mobile: Single column layout */}
            <div className="block md:hidden space-y-4 pb-6">
              <Card className="flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div>
                    <CardTitle className="text-base">
                      Social Media Approvals
                    </CardTitle>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {pendingSocialMedia.length} Pending
                  </Badge>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {pendingSocialMedia.map((item) => (
                      <div key={item.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="flex-grow min-w-0">
                              <p className="font-medium text-sm truncate">
                                {item.creatorName}
                              </p>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <SocialPlatformIcon
                                  platform={item.platform}
                                  className="h-3.5 w-3.5"
                                />
                                <span className="truncate">
                                  {item.username}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <p className="text-xs text-muted-foreground">
                              {item.submissionTime}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs h-7 px-2"
                              onClick={() =>
                                handleOpenSocialMediaReviewDialog(item)
                              }
                            >
                              <Eye className="h-3.5 w-3.5" />
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
                <div className="p-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full text-sm bg-transparent"
                    onClick={() => router.push("/admin/moderation?tab=social")}
                  >
                    Review All Accounts
                  </Button>
                </div>
              </Card>

              <Card className="flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div>
                    <CardTitle className="text-base">
                      Content Approvals
                    </CardTitle>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {pendingContentApprovals.length} Pending
                  </Badge>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {pendingContentApprovals.map((item) => (
                      <div key={item.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="flex-grow min-w-0">
                              <p className="font-medium text-sm truncate">
                                {item.creatorName}
                              </p>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <SocialPlatformIcon
                                  platform={item.platform}
                                  className="h-3.5 w-3.5"
                                />
                                <span className="capitalize">
                                  {item.platform}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <p className="text-xs text-muted-foreground">
                              {item.submissionTime}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs h-7 px-2"
                              onClick={() => handleOpenReviewDialog(item)}
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {pendingContentApprovals.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No pending content approvals.
                      </p>
                    )}
                  </div>
                </CardContent>
                <div className="p-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full text-sm bg-transparent"
                    onClick={() => router.push("/admin/moderation")}
                  >
                    Review All Submissions
                  </Button>
                </div>
              </Card>

              <Card className="flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">
                    Campaign Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {mockCampaignsPerformance.map((campaign) => (
                      <div key={campaign.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-sm line-clamp-2 flex-1">
                            {campaign.name}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs ml-2 flex-shrink-0"
                            onClick={() =>
                              navigateTo(`/admin/campaigns/${campaign.id}`)
                            }
                          >
                            View Detail
                          </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mb-2">
                          <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded text-center">
                            <span className="text-xs text-muted-foreground">
                              Creators
                            </span>
                            <span className="font-medium text-sm">
                              {campaign.creators}
                            </span>
                          </div>
                          <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded text-center">
                            <span className="text-xs text-muted-foreground">
                              Content
                            </span>
                            <span className="font-medium text-sm">
                              {campaign.content}
                            </span>
                          </div>
                          <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded text-center">
                            <span className="text-xs text-muted-foreground">
                              Views
                            </span>
                            <span className="font-medium text-sm">
                              {campaign.views}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded text-center">
                            <span className="text-xs text-muted-foreground">
                              Likes
                            </span>
                            <span className="font-medium text-sm">
                              {campaign.likes}
                            </span>
                          </div>
                          <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded text-center">
                            <span className="text-xs text-muted-foreground">
                              Comments
                            </span>
                            <span className="font-medium text-sm">
                              {campaign.comments}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <div className="p-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full text-sm bg-transparent"
                    onClick={() => navigateTo("/admin/campaigns")}
                  >
                    View All Campaigns
                  </Button>
                </div>
              </Card>
            </div>

            {/* Desktop: Two column layout */}
            <div className="hidden md:grid md:grid-cols-2 gap-6">
              <Card className="md:col-span-1 flex flex-col h-[400px]">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Social Media Approvals</CardTitle>
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
                            <div className="flex-grow min-w-0">
                              <p className="font-medium text-sm">
                                {item.creatorName}
                              </p>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <SocialPlatformIcon
                                  platform={item.platform}
                                  className="h-3.5 w-3.5"
                                />
                                <span
                                  className="truncate"
                                  title={item.username}
                                >
                                  {item.username}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0 ml-2 flex items-center gap-2">
                            <p className="text-xs text-muted-foreground mr-2">
                              {item.submissionTime}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs h-7 px-2"
                              onClick={() =>
                                handleOpenSocialMediaReviewDialog(item)
                              }
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
                    className="w-full gap-1 bg-transparent"
                    onClick={() => router.push("/admin/moderation?tab=social")}
                  >
                    Review All Accounts
                  </Button>
                </div>
              </Card>

              <Card className="md:col-span-1 flex flex-col h-[400px]">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Content Approvals</CardTitle>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {pendingContentApprovals.length} Pending
                  </Badge>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto">
                  <div className="space-y-3">
                    {pendingContentApprovals.map((item) => (
                      <div key={item.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex-grow min-w-0">
                              <p className="font-medium text-sm">
                                {item.creatorName}
                              </p>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <SocialPlatformIcon
                                  platform={item.platform}
                                  className="h-3.5 w-3.5"
                                />
                                <span className="capitalize">
                                  {item.platform}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right flex-shrink-0 ml-2 flex items-center gap-2">
                            <p className="text-xs text-muted-foreground mr-2">
                              {item.submissionTime}
                            </p>
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
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No pending content approvals.
                      </p>
                    )}
                  </div>
                </CardContent>
                <div className="p-4 mt-auto border-t">
                  <Button
                    variant="outline"
                    className="w-full gap-1 bg-transparent"
                    onClick={() => router.push("/admin/moderation")}
                  >
                    Review All Submissions
                  </Button>
                </div>
              </Card>

              <Card className="md:col-span-2 flex flex-col">
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px] overflow-auto">
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
                            onClick={() =>
                              navigateTo(`/admin/campaigns/${campaign.id}`)
                            }
                          >
                            View Details
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-3">
                          <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                            <span className="text-xs text-muted-foreground">
                              Creators
                            </span>
                            <span className="font-medium">
                              {campaign.creators}
                            </span>
                          </div>
                          <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                            <span className="text-xs text-muted-foreground">
                              Content
                            </span>
                            <span className="font-medium">
                              {campaign.content}
                            </span>
                          </div>
                          <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                            <span className="text-xs text-muted-foreground">
                              Views
                            </span>
                            <span className="font-medium">
                              {campaign.views}
                            </span>
                          </div>
                          <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                            <span className="text-xs text-muted-foreground">
                              Likes
                            </span>
                            <span className="font-medium">
                              {campaign.likes}
                            </span>
                          </div>
                          <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded md:col-span-1 sm:col-span-3 col-span-2">
                            <span className="text-xs text-muted-foreground">
                              Comments
                            </span>
                            <span className="font-medium">
                              {campaign.comments}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <div className="p-4 mt-auto border-t">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => navigateTo("/admin/campaigns")}
                  >
                    View All Campaigns
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          <Dialog
            open={isReviewDialogOpen}
            onOpenChange={(open) => {
              setIsReviewDialogOpen(open);
              if (!open) setShowScrollHint(false);
            }}
          >
            <DialogContent className="sm:max-w-[900px] max-w-[95vw] max-h-[95vh] md:max-h-[90vh] flex flex-col rounded-lg">
              <DialogHeader>
                <DialogTitle>Content URL Review</DialogTitle>
                <DialogDescription>
                  Review the submitted content and moderate the post URL
                  submission from the creator.
                </DialogDescription>
              </DialogHeader>
              {selectedApprovalItem && (
                <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6 py-4 px-1 flex-1 overflow-y-auto md:overflow-hidden">
                  <div
                    ref={contentPreviewRef}
                    className="relative md:max-h-[70vh] md:overflow-y-auto md:pr-1"
                  >
                    {selectedApprovalItem.content && (
                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2">
                          Campaign Assets
                        </h3>
                        {selectedApprovalItem.content.images &&
                          selectedApprovalItem.content.images.length > 0 && (
                            <div className="relative">
                              <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-md mb-2 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <img
                                    src={
                                      displayImages[currentImageIndex]?.src ||
                                      "/placeholder.svg?height=400&width=400&query=content+image" ||
                                      "/placeholder.svg" ||
                                      "/placeholder.svg" ||
                                      "/placeholder.svg" ||
                                      "/placeholder.svg" ||
                                      "/placeholder.svg" ||
                                      "/placeholder.svg" ||
                                      "/placeholder.svg" ||
                                      "/placeholder.svg" ||
                                      "/placeholder.svg"
                                    }
                                    alt={
                                      displayImages[currentImageIndex]?.alt ||
                                      "Content image"
                                    }
                                    className="w-full h-full object-contain rounded-md"
                                  />
                                </div>
                                {displayImages.length > 1 && (
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
                    )}
                    <div className="mb-4">
                      <h3 className="text-sm font-medium mb-2">Description</h3>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md text-sm max-h-24 overflow-y-auto">
                        {selectedApprovalItem.campaignName}
                      </div>
                    </div>
                    <div className="pb-8 md:pb-0">
                      <h3 className="text-sm font-medium mb-2">Caption</h3>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md text-sm whitespace-pre-wrap max-h-32 overflow-y-auto">
                        {selectedApprovalItem.content?.caption ||
                          "No caption available"}
                      </div>
                    </div>
                    {showScrollHint && selectedApprovalItem.content && (
                      <div className="sticky bottom-0 left-0 right-0 flex items-center justify-center p-2 bg-gradient-to-t from-background to-transparent pointer-events-none hidden md:flex">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground bg-card dark:bg-slate-800 px-2 py-1 rounded-full shadow">
                          <ArrowDownCircle className="h-3 w-3" />
                          Scroll for more
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col h-full md:max-h-full md:overflow-y-auto md:px-1 md:pb-0">
                    <div className="flex-1 space-y-4">
                      <h3 className="text-sm font-medium">
                        Submission Details
                      </h3>
                      <div className="border border-gray-200 p-4 rounded-md">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {selectedApprovalItem.creatorName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {selectedApprovalItem.creatorName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {selectedApprovalItem.email || "N/A Email"}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">
                              Campaign
                            </p>
                            <p className="text-sm font-medium line-clamp-2">
                              {selectedApprovalItem.campaignName}
                            </p>
                          </div>
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">
                                Social Media
                              </p>
                              <div className="flex items-center gap-1">
                                <SocialPlatformIcon
                                  platform={selectedApprovalItem.platform}
                                  className="h-4 w-4"
                                />
                                <span className="text-sm font-medium">
                                  {selectedApprovalItem.socialHandle ||
                                    `@${selectedApprovalItem.creatorName
                                      .toLowerCase()
                                      .replace(" ", "_")}`}
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">
                                Submitted
                              </p>
                              <p className="text-sm font-medium">
                                {selectedApprovalItem.submissionTime}
                              </p>
                            </div>
                          </div>
                        </div>
                        {selectedApprovalItem.approvalStatus ===
                          "CONTENT_URL_REVIEW" &&
                          selectedApprovalItem.submittedUrl && (
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">
                                Submitted Post URL
                              </p>
                              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
                                <a
                                  href={selectedApprovalItem.submittedUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
                                >
                                  Review Content{" "}
                                  <LinkIcon className="h-3.5 w-3.5" />
                                </a>
                              </div>
                            </div>
                          )}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">
                          Moderation <span className="text-red-500">*</span>
                        </h3>
                        <Textarea
                          placeholder="Add feedback or notes..."
                          className="min-h-[80px] resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter className="border-t pt-4 mt-4">
                <div className="flex flex-col md:flex-row gap-2 w-full md:justify-end">
                  <Button
                    className="w-full md:w-auto gap-1 bg-green-600 hover:bg-green-700 text-white order-1 md:order-1"
                    onClick={() =>
                      selectedApprovalItem &&
                      handleApproveContent(selectedApprovalItem.id)
                    }
                  >
                    <CheckCircle className="h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full md:w-auto gap-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950 bg-transparent order-2 md:order-2"
                    onClick={() =>
                      selectedApprovalItem &&
                      handleRejectContent(selectedApprovalItem.id)
                    }
                  >
                    <XCircle className="h-4 w-4" />
                    Reject
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isSocialMediaReviewDialogOpen}
            onOpenChange={setIsSocialMediaReviewDialogOpen}
          >
            <DialogContent className="sm:max-w-[900px] max-w-[95vw] max-h-[95vh] md:max-h-[90vh] flex flex-col rounded-lg">
              <DialogHeader className="flex-shrink-0">
                <DialogTitle>Verify Social Media Account</DialogTitle>
                <DialogDescription>
                  Review and verify or reject the social media account
                  submission from the creator.
                </DialogDescription>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto px-1">
                {selectedSocialMediaItem && (
                  <div className="py-4 space-y-6">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {selectedSocialMediaItem.creatorName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {selectedSocialMediaItem.email || "N/A Email"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Platform
                          </p>
                          <div className="flex items-center gap-2">
                            <SocialPlatformIcon
                              platform={selectedSocialMediaItem.platform}
                              className="h-5 w-5"
                            />
                            <span className="font-medium capitalize">
                              {selectedSocialMediaItem.platform}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Submitted
                          </p>
                          <p className="text-sm font-medium">
                            {selectedSocialMediaItem.submissionTime}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1 mt-4">
                        <p className="text-sm text-muted-foreground">
                          Profile URL
                        </p>
                        <a
                          href={
                            selectedSocialMediaItem.profileUrl ||
                            `https://${selectedSocialMediaItem.platform}.com/${
                              selectedSocialMediaItem.username.startsWith("@")
                                ? selectedSocialMediaItem.username.substring(1)
                                : selectedSocialMediaItem.username
                            }`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline dark:text-blue-400 break-all bg-background px-3 py-2 rounded border"
                        >
                          {selectedSocialMediaItem.username}
                          <LinkIcon className="h-4 w-4" />
                        </a>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="socialMediaFeedback"
                        className="text-sm font-medium text-muted-foreground mb-2 block"
                      >
                        Feedback{" "}
                        <span className="text-muted-foreground">
                          (Optional)
                        </span>
                      </label>
                      <Textarea
                        id="socialMediaFeedback"
                        placeholder="Add feedback or notes..."
                        value={socialMediaFeedback}
                        onChange={(e) => setSocialMediaFeedback(e.target.value)}
                        className="min-h-[80px] resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-shrink-0 border-t pt-4 mt-4">
                <div className="flex flex-col md:flex-row gap-2 w-full md:justify-end">
                  <Button
                    variant="default"
                    className="w-full md:w-auto gap-1 bg-green-600 hover:bg-green-700 text-white order-1 md:order-1"
                    onClick={() =>
                      selectedSocialMediaItem &&
                      handleVerifySocialMedia(selectedSocialMediaItem.id)
                    }
                    disabled={!selectedSocialMediaItem}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Verify
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      selectedSocialMediaItem &&
                      handleRejectSocialMedia(selectedSocialMediaItem.id)
                    }
                    disabled={!selectedSocialMediaItem}
                    className="w-full md:w-auto gap-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950 bg-transparent order-2 md:order-2"
                  >
                    <XCircle className="h-4 w-4" />
                    Reject
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </>
  );
}
