"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Instagram,
  MessageSquare,
  LinkIcon,
  ExternalLink,
  BarChart3,
  ThumbsUp,
  MessageCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react"
import { TikTokIcon } from "@/components/tik-tok-icon"

export default function SubmissionDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [submission, setSubmission] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchSubmission = () => {
      setLoading(true)
      // Mock data - in a real app, fetch from API based on params.id
      const mockSubmissions = [
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
          content: {
            type: "video",
            images: ["/placeholder.svg?height=600&width=600"],
            caption:
              "Taking the #BrandChallenge to show you how I use these amazing products every day! @brandname #ProductDemo",
            url: "https://tiktok.com/@user/video/example123",
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
          content: {
            type: "image",
            images: [
              "/placeholder.svg?height=600&width=600",
              "/placeholder.svg?height=600&width=600",
              "/placeholder.svg?height=600&width=600",
            ],
            caption: "Here's a look at how we build our amazing products! #BehindTheScenes #Engineering #BrandName",
            url: "https://instagram.com/p/example101",
          },
          submittedAt: "3 days ago",
          status: "approved",
          engagement: {
            views: 980,
            likes: 65,
            comments: 8,
          },
        },
      ]

      const foundSubmission = mockSubmissions.find((sub) => sub.id === params.id)
      setSubmission(foundSubmission || mockSubmissions[0])
      setLoading(false)
    }

    fetchSubmission()
  }, [params.id])

  const nextImage = () => {
    if (!submission) return
    setCurrentImageIndex((prev) => (prev + 1) % submission.content.images.length)
  }

  const prevImage = () => {
    if (!submission) return
    setCurrentImageIndex((prev) => (prev - 1 + submission.content.images.length) % submission.content.images.length)
  }

  const handleApprove = () => {
    // In a real app, this would be an API call
    console.log("Approved submission", submission?.id)
    router.push("/admin/moderation")
  }

  const handleReject = () => {
    // In a real app, this would be an API call
    console.log("Rejected submission", submission?.id, "with feedback:", feedback)
    router.push("/admin/moderation")
  }

  const handleBack = () => {
    router.push("/admin/moderation")
  }

  if (loading || !submission) {
    return (
      <div className="p-6 flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading submission details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {submission.status === "pending"
              ? "Review Submission"
              : submission.status === "approved"
                ? "Approved Content"
                : "Rejected Content"}
          </h1>
          <p className="text-muted-foreground">
            Content by {submission.creator.name} for the {submission.campaign} campaign
          </p>
        </div>
      </div>

      {submission.status === "pending" ? (
        <PendingSubmissionView
          submission={submission}
          currentImageIndex={currentImageIndex}
          nextImage={nextImage}
          prevImage={prevImage}
          feedback={feedback}
          setFeedback={setFeedback}
          handleApprove={handleApprove}
          handleReject={handleReject}
        />
      ) : submission.status === "approved" ? (
        <ApprovedSubmissionView
          submission={submission}
          currentImageIndex={currentImageIndex}
          nextImage={nextImage}
          prevImage={prevImage}
        />
      ) : (
        <RejectedSubmissionView
          submission={submission}
          currentImageIndex={currentImageIndex}
          nextImage={nextImage}
          prevImage={prevImage}
        />
      )}
    </div>
  )
}

// Update the PendingSubmissionView component to fix repeated UI and make columns same height
function PendingSubmissionView({
  submission,
  currentImageIndex,
  nextImage,
  prevImage,
  feedback,
  setFeedback,
  handleApprove,
  handleReject,
}: {
  submission: any
  currentImageIndex: number
  nextImage: () => void
  prevImage: () => void
  feedback: string
  setFeedback: (value: string) => void
  handleApprove: () => void
  handleReject: () => void
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
        <div className="p-3 border-b border-slate-200 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
            <img
              src={submission.creator.avatar || "/placeholder.svg"}
              alt={submission.creator.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-sm">{submission.creator.name}</p>
            <p className="text-xs text-muted-foreground">{submission.creator.department}</p>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square bg-slate-100 w-full flex items-center justify-center">
            {submission.content.images.length > 0 ? (
              <>
                <img
                  src={submission.content.images[currentImageIndex] || "/placeholder.svg"}
                  alt="Content preview"
                  className="w-full h-full object-cover"
                />
                {submission.content.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full h-8 w-8"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full h-8 w-8"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                      {submission.content.images.map((_: any, index: number) => (
                        <div
                          key={index}
                          className={`h-1.5 w-1.5 rounded-full ${
                            index === currentImageIndex ? "bg-white" : "bg-white/50"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                {submission.platform === "instagram" ? (
                  <Instagram className="h-12 w-12 text-slate-300" />
                ) : (
                  <TikTokIcon className="h-12 w-12 text-slate-300" />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm whitespace-pre-wrap mb-3">{submission.content.caption}</p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
            <LinkIcon className="h-3 w-3" />
            <a
              href={submission.content.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              {submission.content.url}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="border border-slate-200 rounded-md overflow-hidden mb-4">
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-medium">Submission Details</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Campaign</p>
                <p className="font-medium">{submission.campaign}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Submitted</p>
                <p className="font-medium">{submission.submittedAt}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-slate-200 rounded-md overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-slate-500" />
              Moderation Feedback
            </h3>
          </div>
          <div className="p-4 flex flex-col">
            <Textarea
              placeholder="Add feedback or notes (optional)"
              className="flex-grow"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <p className="text-xs text-muted-foreground mt-2">
              This feedback will be visible to the creator if the submission is rejected.
            </p>
            <div className="flex justify-end mt-4 gap-2">
              <Button variant="outline" className="gap-1" onClick={handleReject}>
                <XCircle className="h-4 w-4" />
                Reject
              </Button>
              <Button className="gap-1" onClick={handleApprove}>
                <CheckCircle className="h-4 w-4" />
                Approve
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Update the ApprovedSubmissionView component to reduce whitespace and make Campaign Type consistent
function ApprovedSubmissionView({
  submission,
  currentImageIndex,
  nextImage,
  prevImage,
}: {
  submission: any
  currentImageIndex: number
  nextImage: () => void
  prevImage: () => void
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Left Column - Instagram-like Content View */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
        <div className="p-3 border-b border-slate-200 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
            <img
              src={submission.creator.avatar || "/placeholder.svg"}
              alt={submission.creator.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-sm">{submission.creator.name}</p>
            <p className="text-xs text-muted-foreground">{submission.creator.department}</p>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square bg-slate-100 w-full flex items-center justify-center">
            {submission.content.images.length > 0 ? (
              <>
                <img
                  src={submission.content.images[currentImageIndex] || "/placeholder.svg"}
                  alt="Content preview"
                  className="w-full h-full object-cover"
                />
                {submission.content.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full h-8 w-8"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full h-8 w-8"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                      {submission.content.images.map((_: any, index: number) => (
                        <div
                          key={index}
                          className={`h-1.5 w-1.5 rounded-full ${
                            index === currentImageIndex ? "bg-white" : "bg-white/50"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                {submission.platform === "instagram" ? (
                  <Instagram className="h-12 w-12 text-slate-300" />
                ) : (
                  <TikTokIcon className="h-12 w-12 text-slate-300" />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Approved
            </Badge>
          </div>

          <p className="text-sm whitespace-pre-wrap mb-3">{submission.content.caption}</p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
            <LinkIcon className="h-3 w-3" />
            <a
              href={submission.content.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              {submission.content.url}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Right Column - Performance Details */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
        <div className="p-4 border-b border-slate-200 bg-green-50">
          <h3 className="font-medium flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-green-600" />
            Performance Metrics
          </h3>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-100 mb-6">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Total Views</p>
              <p className="text-3xl font-bold text-slate-800">{submission.engagement?.views.toLocaleString()}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center justify-center gap-1 text-xs text-slate-500 uppercase tracking-wider mb-1">
                  <ThumbsUp className="h-3 w-3" />
                  <span>Likes</span>
                </div>
                <p className="text-2xl font-bold text-slate-800">{submission.engagement?.likes.toLocaleString()}</p>
              </div>

              <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center justify-center gap-1 text-xs text-slate-500 uppercase tracking-wider mb-1">
                  <MessageCircle className="h-3 w-3" />
                  <span>Comments</span>
                </div>
                <p className="text-2xl font-bold text-slate-800">{submission.engagement?.comments.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h4 className="text-sm font-medium mb-3">Campaign Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Campaign</p>
                <p className="font-medium">{submission.campaign}</p>
                <Badge variant="outline" className="text-xs mt-1">
                  {submission.campaignType}
                </Badge>
              </div>
              <div>
                <p className="text-muted-foreground">Submitted</p>
                <p className="font-medium">{submission.submittedAt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Update the RejectedSubmissionView component to improve Rejection Timeline area
function RejectedSubmissionView({
  submission,
  currentImageIndex,
  nextImage,
  prevImage,
}: {
  submission: any
  currentImageIndex: number
  nextImage: () => void
  prevImage: () => void
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Left Column - Instagram-like Content View */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
        <div className="p-3 border-b border-slate-200 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
            <img
              src={submission.creator.avatar || "/placeholder.svg"}
              alt={submission.creator.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-sm">{submission.creator.name}</p>
            <p className="text-xs text-muted-foreground">{submission.creator.department}</p>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square bg-slate-100 w-full flex items-center justify-center">
            {submission.content.images.length > 0 ? (
              <>
                <img
                  src={submission.content.images[currentImageIndex] || "/placeholder.svg"}
                  alt="Content preview"
                  className="w-full h-full object-cover"
                />
                {submission.content.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full h-8 w-8"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full h-8 w-8"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                      {submission.content.images.map((_: any, index: number) => (
                        <div
                          key={index}
                          className={`h-1.5 w-1.5 rounded-full ${
                            index === currentImageIndex ? "bg-white" : "bg-white/50"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                {submission.platform === "instagram" ? (
                  <Instagram className="h-12 w-12 text-slate-300" />
                ) : (
                  <TikTokIcon className="h-12 w-12 text-slate-300" />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              <XCircle className="h-3 w-3 mr-1" />
              Rejected
            </Badge>
          </div>

          <p className="text-sm whitespace-pre-wrap mb-3">{submission.content.caption}</p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
            <LinkIcon className="h-3 w-3" />
            <a
              href={submission.content.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              {submission.content.url}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Right Column - Rejection Details */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
        <div className="p-4 border-b border-slate-200 bg-red-50">
          <h3 className="font-medium flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            Rejection Details
          </h3>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="p-4 bg-red-50 rounded-lg border border-red-100 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="h-4 w-4 text-red-500" />
                <h4 className="text-sm font-medium text-red-700">Reason for Rejection</h4>
              </div>
              <p className="text-sm text-red-600">{submission.feedback}</p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h4 className="text-sm font-medium mb-3">Campaign Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Campaign</p>
                <p className="font-medium">{submission.campaign}</p>
                <Badge variant="outline" className="text-xs mt-1">
                  {submission.campaignType}
                </Badge>
              </div>
              <div>
                <p className="text-muted-foreground">Submitted</p>
                <p className="font-medium">{submission.submittedAt}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
            <h4 className="text-sm font-medium mb-2">Next Steps</h4>
            <p className="text-sm text-slate-600">
              The creator can resubmit this content after addressing the feedback provided.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
