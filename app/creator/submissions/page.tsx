"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Instagram,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  BarChart,
  RefreshCw,
  AlertTriangle,
  FileText,
} from "lucide-react"
import { TikTokIcon } from "@/components/tik-tok-icon"
import { PointsBalance } from "@/components/points-balance"
import { SubmitUrlModal } from "@/components/submit-url-modal"
import { ResubmitModal } from "@/components/resubmit-modal"
import { AnalyticsModal } from "@/components/analytics-modal"
import { ContentUploadModal } from "@/components/content-upload-modal"

// Sample submission data with all possible statuses
const allSubmissions = [
  // Quick Share Campaign Statuses
  {
    id: 1,
    campaign: "Summer Product Launch",
    platform: "instagram",
    status: "URL Required",
    date: "July 15, 2023",
    image: "/placeholder.svg?height=300&width=300",
    points: 0,
    campaignType: "Quick Share",
    description: "You've joined this campaign. Submit your post URL to earn points.",
  },
  {
    id: 2,
    campaign: "Winter Collection",
    platform: "instagram",
    status: "URL Under Review",
    date: "July 12, 2023",
    image: "/placeholder.svg?height=300&width=300",
    points: 0,
    campaignType: "Quick Share",
    postUrl: "https://www.instagram.com/p/ABC123",
    description: "Your URL has been submitted and is being reviewed by the admin.",
  },
  {
    id: 3,
    campaign: "Holiday Special",
    platform: "instagram",
    status: "Live",
    date: "July 8, 2023",
    image: "/placeholder.svg?height=300&width=300",
    points: 250,
    campaignType: "Quick Share",
    postUrl: "https://www.instagram.com/p/DEF456",
    engagement: {
      views: 1500,
      likes: 85,
      comments: 12,
    },
    description: "Your content is live and earning points.",
  },
  {
    id: 4,
    campaign: "Spring Collection",
    platform: "instagram",
    status: "Completed",
    date: "June 25, 2023",
    image: "/placeholder.svg?height=300&width=300",
    points: 200,
    campaignType: "Quick Share",
    description: "Campaign completed. Content was deleted or is no longer trackable.",
    engagement: {
      views: 1200,
      likes: 75,
      comments: 8,
    },
  },

  // Creative Challenge Campaign Statuses
  {
    id: 5,
    campaign: "Brand Challenge",
    platform: "tiktok",
    status: "Content Required",
    date: "July 14, 2023",
    image: "/placeholder.svg?height=300&width=300",
    points: 0,
    campaignType: "Creative Challenge",
    description: "You've joined this campaign. Submit your content for review.",
  },
  {
    id: 6,
    campaign: "Product Tutorial",
    platform: "tiktok",
    status: "Content Under Review",
    date: "July 10, 2023",
    image: "/placeholder.svg?height=300&width=300",
    points: 0,
    campaignType: "Creative Challenge",
    description: "Your content has been submitted and is being reviewed by the admin.",
  },
  {
    id: 7,
    campaign: "User Testimonial",
    platform: "instagram",
    status: "Content Approved",
    date: "July 7, 2023",
    image: "/placeholder.svg?height=300&width=300",
    points: 0,
    campaignType: "Creative Challenge",
    description: "Your content has been approved. Now publish it and submit the URL.",
  },
  {
    id: 8,
    campaign: "Brand Ambassador",
    platform: "instagram",
    status: "URL Under Review",
    date: "July 5, 2023",
    image: "/placeholder.svg?height=300&width=300",
    points: 0,
    campaignType: "Creative Challenge",
    postUrl: "https://www.instagram.com/p/GHI789",
    description: "Your URL has been submitted and is being reviewed by the admin.",
  },
  {
    id: 9,
    campaign: "Product Review",
    platform: "tiktok",
    status: "Live",
    date: "July 1, 2023",
    image: "/placeholder.svg?height=300&width=300",
    points: 350,
    campaignType: "Creative Challenge",
    postUrl: "https://www.tiktok.com/@user/video/123456",
    engagement: {
      views: 3200,
      likes: 210,
      comments: 28,
    },
    description: "Your content is live and earning points.",
  },
  {
    id: 10,
    campaign: "Lifestyle Challenge",
    platform: "tiktok",
    status: "Completed",
    date: "June 20, 2023",
    image: "/placeholder.svg?height=300&width=300",
    points: 300,
    campaignType: "Creative Challenge",
    description: "Campaign completed. Content was deleted or is no longer trackable.",
    engagement: {
      views: 2800,
      likes: 180,
      comments: 22,
    },
  },
  {
    id: 11,
    campaign: "Customer Stories",
    platform: "instagram",
    status: "Rejected",
    date: "July 3, 2023",
    image: "/placeholder.svg?height=300&width=300",
    points: 0,
    campaignType: "Creative Challenge",
    feedback: "Content does not meet brand guidelines. Please review requirements and resubmit.",
    description: "Your content was rejected. Please review feedback and resubmit.",
  },
]

export default function SubmissionsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [submissions, setSubmissions] = useState(allSubmissions)
  const [submitUrlModalOpen, setSubmitUrlModalOpen] = useState(false)
  const [resubmitModalOpen, setResubmitModalOpen] = useState(false)
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false)
  const [contentUploadModalOpen, setContentUploadModalOpen] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null)

  // Filter submissions based on active tab
  const filteredSubmissions = submissions.filter((submission) => {
    if (activeTab === "all") return true
    if (activeTab === "pending") {
      return [
        "URL Required",
        "Content Required",
        "Content Under Review",
        "URL Under Review",
        "Content Approved",
      ].includes(submission.status)
    }
    if (activeTab === "rejected") return submission.status === "Rejected"
    if (activeTab === "live") return submission.status === "Live"
    if (activeTab === "completed") return submission.status === "Completed"
    return true
  })

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleSubmitUrl = (submission: any) => {
    setSelectedSubmission(submission)
    setSubmitUrlModalOpen(true)
  }

  const handleResubmit = (submission: any) => {
    setSelectedSubmission(submission)
    setResubmitModalOpen(true)
  }

  const handleViewAnalytics = (submission: any) => {
    setSelectedSubmission(submission)
    setAnalyticsModalOpen(true)
  }

  const handleContentUpload = (submission: any) => {
    setSelectedSubmission(submission)
    setContentUploadModalOpen(true)
  }

  const handleSubmitUrlSuccess = (url: string) => {
    // Update the submission status to "URL Under Review" and close the modal
    const updatedSubmissions = submissions.map((sub) => {
      if (sub.id === selectedSubmission.id) {
        return {
          ...sub,
          status: "URL Under Review",
          postUrl: url,
          description: "Your URL has been submitted and is being reviewed by the admin.",
        }
      }
      return sub
    })
    setSubmissions(updatedSubmissions)
    setSubmitUrlModalOpen(false)
  }

  const handleResubmitSuccess = (imageUrl: string) => {
    // Update the submission status to "Content Under Review" and close the modal
    const updatedSubmissions = submissions.map((sub) => {
      if (sub.id === selectedSubmission.id) {
        return {
          ...sub,
          status: "Content Under Review",
          image: imageUrl,
          feedback: undefined,
          description: "Your content has been submitted and is being reviewed by the admin.",
        }
      }
      return sub
    })
    setSubmissions(updatedSubmissions)
    setResubmitModalOpen(false)
  }

  const handleContentUploadSuccess = (data: { imageUrl: string; caption: string }) => {
    // Update the submission status to "Content Under Review" and close the modal
    const updatedSubmissions = submissions.map((sub) => {
      if (sub.id === selectedSubmission.id) {
        return {
          ...sub,
          status: "Content Under Review",
          image: data.imageUrl,
          caption: data.caption,
          description: "Your content has been submitted and is being reviewed by the admin.",
        }
      }
      return sub
    })
    setSubmissions(updatedSubmissions)
    setContentUploadModalOpen(false)
  }

  return (
    <div className="p-6 bg-slate-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Submissions</h1>
          <p className="text-muted-foreground">Track and manage your campaign submissions</p>
        </div>
        <PointsBalance points={3250} />
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="mb-6">
        <TabsList className="bg-white shadow-sm">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> Pending
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center gap-1">
            <XCircle className="h-3.5 w-3.5" /> Rejected
          </TabsTrigger>
          <TabsTrigger value="live" className="flex items-center gap-1">
            <BarChart className="h-3.5 w-3.5" /> Live
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5" /> Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <SubmissionsList
            submissions={filteredSubmissions}
            onSubmitUrl={handleSubmitUrl}
            onResubmit={handleResubmit}
            onViewAnalytics={handleViewAnalytics}
            onContentUpload={handleContentUpload}
          />
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <SubmissionsList
            submissions={filteredSubmissions}
            onSubmitUrl={handleSubmitUrl}
            onResubmit={handleResubmit}
            onViewAnalytics={handleViewAnalytics}
            onContentUpload={handleContentUpload}
          />
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <SubmissionsList
            submissions={filteredSubmissions}
            onSubmitUrl={handleSubmitUrl}
            onResubmit={handleResubmit}
            onViewAnalytics={handleViewAnalytics}
            onContentUpload={handleContentUpload}
          />
        </TabsContent>

        <TabsContent value="live" className="mt-6">
          <SubmissionsList
            submissions={filteredSubmissions}
            onSubmitUrl={handleSubmitUrl}
            onResubmit={handleResubmit}
            onViewAnalytics={handleViewAnalytics}
            onContentUpload={handleContentUpload}
          />
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <SubmissionsList
            submissions={filteredSubmissions}
            onSubmitUrl={handleSubmitUrl}
            onResubmit={handleResubmit}
            onViewAnalytics={handleViewAnalytics}
            onContentUpload={handleContentUpload}
          />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {selectedSubmission && (
        <>
          <SubmitUrlModal
            isOpen={submitUrlModalOpen}
            onClose={() => setSubmitUrlModalOpen(false)}
            onSubmit={handleSubmitUrlSuccess}
            campaign={selectedSubmission.campaign}
          />

          <ResubmitModal
            isOpen={resubmitModalOpen}
            onClose={() => setResubmitModalOpen(false)}
            onSubmit={handleResubmitSuccess}
            campaign={selectedSubmission.campaign}
            feedback={selectedSubmission.feedback}
          />

          <AnalyticsModal
            isOpen={analyticsModalOpen}
            onClose={() => setAnalyticsModalOpen(false)}
            submission={selectedSubmission}
          />

          <ContentUploadModal
            isOpen={contentUploadModalOpen}
            onClose={() => setContentUploadModalOpen(false)}
            onSubmit={handleContentUploadSuccess}
            campaign={selectedSubmission.campaign}
          />
        </>
      )}
    </div>
  )
}

interface SubmissionsListProps {
  submissions: any[]
  onSubmitUrl: (submission: any) => void
  onResubmit: (submission: any) => void
  onViewAnalytics: (submission: any) => void
  onContentUpload: (submission: any) => void
}

function SubmissionsList({
  submissions,
  onSubmitUrl,
  onResubmit,
  onViewAnalytics,
  onContentUpload,
}: SubmissionsListProps) {
  if (submissions.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <p className="text-muted-foreground">No submissions found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {submissions.map((submission) => {
        const isQuickShare = submission.campaignType === "Quick Share"

        // Determine status icon and color
        let StatusIcon = Clock
        let statusColor = "text-blue-500"
        let statusBgColor = "bg-blue-50"
        let statusBorderColor = "border-blue-200"

        if (submission.status === "Content Approved") {
          StatusIcon = CheckCircle
          statusColor = "text-purple-500"
          statusBgColor = "bg-purple-50"
          statusBorderColor = "border-purple-200"
        } else if (submission.status === "Rejected") {
          StatusIcon = XCircle
          statusColor = "text-red-500"
          statusBgColor = "bg-red-50"
          statusBorderColor = "border-red-200"
        } else if (submission.status === "Live") {
          StatusIcon = BarChart
          statusColor = "text-green-500"
          statusBgColor = "bg-green-50"
          statusBorderColor = "border-green-200"
        } else if (submission.status === "Completed") {
          StatusIcon = CheckCircle
          statusColor = "text-slate-500"
          statusBgColor = "bg-slate-50"
          statusBorderColor = "border-slate-200"
        } else if (submission.status === "URL Required" || submission.status === "Content Required") {
          StatusIcon = AlertTriangle
          statusColor = "text-amber-500"
          statusBgColor = "bg-amber-50"
          statusBorderColor = "border-amber-200"
        } else if (submission.status === "Content Under Review" || submission.status === "URL Under Review") {
          StatusIcon = FileText
          statusColor = "text-blue-500"
          statusBgColor = "bg-blue-50"
          statusBorderColor = "border-blue-200"
        }

        return (
          <Card
            key={submission.id}
            className="overflow-hidden bg-white hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="relative">
              <img
                src={submission.image || "/placeholder.svg"}
                alt={submission.campaign}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className={`${statusBgColor} ${statusColor} ${statusBorderColor}`}>
                  <StatusIcon className={`h-3.5 w-3.5 mr-1 ${statusColor}`} />
                  {submission.status}
                </Badge>
              </div>
              <div className="absolute top-2 left-2">
                <Badge
                  variant={isQuickShare ? "secondary" : "outline"}
                  className={isQuickShare ? "" : "bg-violet-50 text-violet-600 border-violet-200"}
                >
                  {isQuickShare ? "Quick Share" : "Creative Challenge"}
                </Badge>
              </div>
            </div>

            <CardContent className="p-4 flex-1 flex flex-col">
              <div className="mb-2">
                <h3 className="font-medium text-base">{submission.campaign}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>{submission.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    {submission.platform === "instagram" ? (
                      <>
                        <Instagram className="h-3 w-3" /> Instagram
                      </>
                    ) : (
                      <>
                        <TikTokIcon className="h-3 w-3" /> TikTok
                      </>
                    )}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                {submission.description && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    <p>{submission.description}</p>
                  </div>
                )}

                {submission.feedback && (
                  <div className="mt-2 p-2 bg-red-50 text-red-800 rounded-md text-sm">
                    <p className="font-medium">Feedback:</p>
                    <p className="text-xs">{submission.feedback}</p>
                  </div>
                )}

                {submission.engagement && (
                  <div className="mt-2 flex justify-between gap-2 text-sm">
                    <div className="text-center">
                      <p className="font-medium">{submission.engagement.views.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Views</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{submission.engagement.likes.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Likes</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{submission.engagement.comments.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Comments</p>
                    </div>
                  </div>
                )}

                {submission.postUrl && (
                  <div className="mt-2">
                    <a
                      href={submission.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      View Post <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-end">
                {submission.status === "Rejected" && (
                  <Button size="sm" variant="outline" className="gap-1" onClick={() => onResubmit(submission)}>
                    <RefreshCw className="h-3.5 w-3.5" /> Resubmit
                  </Button>
                )}

                {(submission.status === "URL Required" || submission.status === "Content Approved") && (
                  <Button
                    size="sm"
                    className="gap-1 bg-purple-600 hover:bg-purple-700"
                    onClick={() => onSubmitUrl(submission)}
                  >
                    Submit URL
                  </Button>
                )}

                {submission.status === "Content Required" && (
                  <Button size="sm" className="gap-1" onClick={() => onContentUpload(submission)}>
                    Submit Content
                  </Button>
                )}

                {(submission.status === "Live" ||
                  (submission.status === "Completed" && submission.campaignType === "Quick Share")) && (
                  <Button size="sm" variant="outline" className="gap-1" onClick={() => onViewAnalytics(submission)}>
                    <BarChart className="h-3.5 w-3.5" /> Analytics
                  </Button>
                )}

                {(submission.status === "Content Under Review" || submission.status === "URL Under Review") && (
                  <Button size="sm" variant="outline" className="gap-1" disabled>
                    <Clock className="h-3.5 w-3.5" /> Under Review
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
