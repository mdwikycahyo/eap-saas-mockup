import { PendingApprovalItem, PendingSocialMediaItem } from "@/types/admin";

export const initialMockPendingSocialMedia: PendingSocialMediaItem[] = [
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

export const initialMockPendingApprovals: PendingApprovalItem[] = [
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
