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
  Clock,
} from "lucide-react"
import { TikTokIcon } from "@/components/tik-tok-icon"

// Update the main component to handle different approval types
export default function SubmissionDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [submission, setSubmission] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [approvedContentImageIndex, setApprovedContentImageIndex] = useState(0)
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
          approvalType: "Content Material Review",
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
          status: "pending",
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
          approvalType: "Content Material Review",
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

  const nextApprovedContentImage = () => {
    if (!submission?.content?.approvedContent?.images) return
    setApprovedContentImageIndex((prev) => (prev + 1) % submission.content.approvedContent.images.length)
  }

  const prevApprovedContentImage = () => {
    if (!submission?.content?.approvedContent?.images) return
    setApprovedContentImageIndex(
      (prev) =>
        (prev - 1 + submission.content.approvedContent.images.length) %
        submission.content.approvedContent.images.length,
    )
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

      {/* Display different views based on approval type and status */}
      {submission.status === "pending" && (
        <>
          {submission.approvalType === "Content Material Review" ? (
            <ContentMaterialReviewView
              submission={submission}
              currentImageIndex={currentImageIndex}
              nextImage={nextImage}
              prevImage={prevImage}
              feedback={feedback}
              setFeedback={setFeedback}
              handleApprove={handleApprove}
              handleReject={handleReject}
            />
          ) : (
            <PostURLReviewView
              submission={submission}
              currentImageIndex={currentImageIndex}
              nextImage={nextImage}
              prevImage={prevImage}
              approvedContentImageIndex={approvedContentImageIndex}
              nextApprovedContentImage={nextApprovedContentImage}
              prevApprovedContentImage={prevApprovedContentImage}
              feedback={feedback}
              setFeedback={setFeedback}
              handleApprove={handleApprove}
              handleReject={handleReject}
            />
          )}
        </>
      )}

      {submission.status === "approved" && (
        <>
          {submission.approvalType === "Content Material Review" ? (
            <ApprovedContentMaterialView
              submission={submission}
              currentImageIndex={currentImageIndex}
              nextImage={nextImage}
              prevImage={prevImage}
            />
          ) : (
            <ApprovedPostURLView
              submission={submission}
              currentImageIndex={currentImageIndex}
              nextImage={nextImage}
              prevImage={prevImage}
            />
          )}
        </>
      )}

      {submission.status === "rejected" && (
        <>
          {submission.approvalType === "Content Material Review" ? (
            <RejectedContentMaterialView
              submission={submission}
              currentImageIndex={currentImageIndex}
              nextImage={nextImage}
              prevImage={prevImage}
            />
          ) : (
            <RejectedPostURLView
              submission={submission}
              currentImageIndex={currentImageIndex}
              nextImage={nextImage}
              prevImage={prevImage}
            />
          )}
        </>
      )}
    </div>
  )
}

// Content Material Review View for pending submissions
function ContentMaterialReviewView({
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
                <Badge variant="outline" className="text-xs mt-1">
                  {submission.campaignType}
                </Badge>
              </div>
              <div>
                <p className="text-muted-foreground">Submitted</p>
                <p className="font-medium">{submission.submittedAt}</p>
              </div>
              <div className="col-span-2">
                <p className="text-muted-foreground">Approval Type</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {submission.approvalType}
                  </Badge>
                </div>
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

// Post URL Review View for pending submissions
function PostURLReviewView({
  submission,
  currentImageIndex,
  nextImage,
  prevImage,
  approvedContentImageIndex,
  nextApprovedContentImage,
  prevApprovedContentImage,
  feedback,
  setFeedback,
  handleApprove,
  handleReject,
}: {
  submission: any
  currentImageIndex: number
  nextImage: () => void
  prevImage: () => void
  approvedContentImageIndex: number
  nextApprovedContentImage: () => void
  prevApprovedContentImage: () => void
  feedback: string
  setFeedback: (value: string) => void
  handleApprove: () => void
  handleReject: () => void
}) {
  const isQuickShare = submission.campaignType === "Quick Share"
  const isCreativeChallenge = submission.campaignType === "Creative Challenge"
  const hasApprovedContent = isCreativeChallenge && submission.content.approvedContent

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Left Side */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
        {isQuickShare ? (
          // Company Provided Content header for Quick Share campaigns
          <div className="p-3 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-500"
                >
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-sm">Company Provided Content</p>
                <p className="text-xs text-muted-foreground">Original content for sharing</p>
              </div>
            </div>
          </div>
        ) : hasApprovedContent ? (
          // Previously Approved Content header for Creative Challenge campaigns
          <div className="p-3 border-b border-slate-200 bg-green-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Previously Approved Content</p>
                <p className="text-xs text-muted-foreground">Content approved in step 1</p>
              </div>
            </div>
          </div>
        ) : (
          // Creator profile header for other cases
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
        )}

        <div className="relative">
          <div className="aspect-square bg-slate-100 w-full flex items-center justify-center">
            {isCreativeChallenge && hasApprovedContent ? (
              // Show approved content images for Creative Challenge campaigns
              <>
                <img
                  src={submission.content.approvedContent.images[approvedContentImageIndex] || "/placeholder.svg"}
                  alt="Approved content preview"
                  className="w-full h-full object-cover"
                />
                {submission.content.approvedContent.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full h-8 w-8"
                      onClick={prevApprovedContentImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full h-8 w-8"
                      onClick={nextApprovedContentImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                      {submission.content.approvedContent.images.map((_: any, index: number) => (
                        <div
                          key={index}
                          className={`h-1.5 w-1.5 rounded-full ${
                            index === approvedContentImageIndex ? "bg-white" : "bg-white/50"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              // Show regular content images for other cases
              <>
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
              </>
            )}
          </div>
        </div>

        <div className="p-4">
          {/* Show appropriate caption based on campaign type */}
          <p className="text-sm whitespace-pre-wrap mb-3">
            {isCreativeChallenge && hasApprovedContent
              ? submission.content.approvedContent.caption
              : submission.content.caption}
          </p>

          {/* Campaign and Approval Type information */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex flex-col gap-2">
              <div>
                <p className="text-xs text-muted-foreground">Campaign</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{submission.campaign}</p>
                  <Badge variant="outline" className="text-xs">
                    {submission.campaignType}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Approval Type</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {submission.approvalType}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col">
        {/* URL Review section */}
        <div className="border border-slate-200 rounded-md overflow-hidden mb-4">
          <div className="p-4 border-b border-slate-200 bg-blue-50">
            <h3 className="font-medium flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-blue-600" />
              Creator's Published URL
            </h3>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-600 mb-2">
              Please verify that the creator has published the{" "}
              {isQuickShare ? "exact content provided by the company" : "previously approved content"}.
            </p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <Clock className="h-3 w-3" />
              <span>Submitted {submission.submittedAt}</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg mb-4">
              <div className="flex items-center gap-2 text-sm mb-2">
                <LinkIcon className="h-4 w-4 text-slate-500" />
                <span className="font-medium">Published URL:</span>
              </div>
              <p className="text-sm break-all mb-3">{submission.content.url}</p>
              <a href={submission.content.url} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Visit URL
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Moderation Feedback section */}
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

// Approved Content Material View
function ApprovedContentMaterialView({
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
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
        <div className="p-4 border-b border-slate-200 bg-green-50">
          <h3 className="font-medium flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Approval Details
          </h3>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-100 mb-6">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Approval Status</p>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-lg font-bold text-green-600">Content Approved</p>
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
              <div className="col-span-2">
                <p className="text-muted-foreground">Approval Type</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {submission.approvalType}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
            <h4 className="text-sm font-medium mb-2">Next Steps</h4>
            <p className="text-sm text-slate-600">
              The creator should now publish this content on their social media platform and submit the URL for review.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Approved Post URL View
function ApprovedPostURLView({
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
              <div className="col-span-2">
                <p className="text-muted-foreground">Approval Type</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {submission.approvalType}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Rejected Content Material View
function RejectedContentMaterialView({
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
        </div>
      </div>

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
              <div className="col-span-2">
                <p className="text-muted-foreground">Approval Type</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {submission.approvalType}
                  </Badge>
                </div>
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

// Rejected Post URL View
function RejectedPostURLView({
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
              <div className="col-span-2">
                <p className="text-muted-foreground">Approval Type</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {submission.approvalType}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
            <h4 className="text-sm font-medium mb-2">Next Steps</h4>
            <p className="text-sm text-slate-600">
              The creator can resubmit the URL after addressing the feedback provided.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
