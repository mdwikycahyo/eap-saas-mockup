"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Instagram, ExternalLink, CheckCircle, XCircle, Clock, BarChart, RefreshCw } from "lucide-react"
import { TikTokIcon } from "@/components/tik-tok-icon"
import { PointsBalance } from "@/components/points-balance"
import { SubmitUrlModal } from "@/components/submit-url-modal"
import { ResubmitModal } from "@/components/resubmit-modal"
import { AnalyticsModal } from "@/components/analytics-modal"

// Sample submission data
const allSubmissions = [
  {
    id: 1,
    campaign: "Summer Product Launch",
    platform: "instagram",
    status: "Approved",
    date: "July 15, 2023",
    image: "/placeholder.svg?height=300&width=300",
    points: 150,
    campaignType: "Quick Share",
  },
  {
    id: 2,
    campaign: "Brand Challenge",
    platform: "tiktok",
    status: "Under Review",
    date: "July 10, 2023",
    image: "/placeholder.svg?height=300&width=300",
    points: 0,
    campaignType: "Creative Challenge",
  },
  {
    id: 3,
    campaign: "Customer Stories",
    platform: "instagram",
    status: "Rejected",
    date: "July 5, 2023",
    image: "/placeholder.svg?height=300&width=300",
    points: 0,
    feedback: "Content does not meet brand guidelines. Please review requirements and resubmit.",
    campaignType: "Quick Share",
  },
  {
    id: 4,
    campaign: "Sustainability Initiative",
    platform: "instagram",
    status: "Live",
    date: "June 28, 2023",
    image: "/placeholder.svg?height=300&width=300",
    points: 275,
    engagement: {
      views: 2500,
      likes: 120,
      comments: 18,
    },
    campaignType: "Quick Share",
  },
  {
    id: 5,
    campaign: "Holiday Special",
    platform: "instagram",
    status: "Completed",
    date: "June 15, 2023",
    image: "/placeholder.svg?height=300&width=300",
    points: 200,
    engagement: {
      views: 3200,
      likes: 185,
      comments: 27,
    },
    campaignType: "Creative Challenge",
  },
]

export default function SubmissionsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [submissions, setSubmissions] = useState(allSubmissions)
  const [submitUrlModalOpen, setSubmitUrlModalOpen] = useState(false)
  const [resubmitModalOpen, setResubmitModalOpen] = useState(false)
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null)

  // Filter submissions based on active tab
  const filteredSubmissions = submissions.filter((submission) => {
    if (activeTab === "all") return true
    if (activeTab === "approved") return submission.status === "Approved"
    if (activeTab === "pending") return submission.status === "Under Review"
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

  const handleSubmitUrlSuccess = (url: string) => {
    // Update the submission status to "Live" and close the modal
    const updatedSubmissions = submissions.map((sub) => {
      if (sub.id === selectedSubmission.id) {
        return {
          ...sub,
          status: "Live",
          postUrl: url,
          engagement: { views: 0, likes: 0, comments: 0 },
        }
      }
      return sub
    })
    setSubmissions(updatedSubmissions)
    setSubmitUrlModalOpen(false)
  }

  const handleResubmitSuccess = (imageUrl: string) => {
    // Update the submission status to "Under Review" and close the modal
    const updatedSubmissions = submissions.map((sub) => {
      if (sub.id === selectedSubmission.id) {
        return {
          ...sub,
          status: "Under Review",
          image: imageUrl,
          feedback: undefined,
        }
      }
      return sub
    })
    setSubmissions(updatedSubmissions)
    setResubmitModalOpen(false)
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
          <TabsTrigger value="approved" className="flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5" /> Ready
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> Pending
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center gap-1">
            <XCircle className="h-3.5 w-3.5" /> Rejected
          </TabsTrigger>
          <TabsTrigger value="live" className="flex items-center gap-1">
            <BarChart className="h-3.5 w-3.5" /> Live
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <SubmissionsList
            submissions={filteredSubmissions}
            onSubmitUrl={handleSubmitUrl}
            onResubmit={handleResubmit}
            onViewAnalytics={handleViewAnalytics}
          />
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <SubmissionsList
            submissions={filteredSubmissions}
            onSubmitUrl={handleSubmitUrl}
            onResubmit={handleResubmit}
            onViewAnalytics={handleViewAnalytics}
          />
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <SubmissionsList
            submissions={filteredSubmissions}
            onSubmitUrl={handleSubmitUrl}
            onResubmit={handleResubmit}
            onViewAnalytics={handleViewAnalytics}
          />
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <SubmissionsList
            submissions={filteredSubmissions}
            onSubmitUrl={handleSubmitUrl}
            onResubmit={handleResubmit}
            onViewAnalytics={handleViewAnalytics}
          />
        </TabsContent>

        <TabsContent value="live" className="mt-6">
          <SubmissionsList
            submissions={filteredSubmissions}
            onSubmitUrl={handleSubmitUrl}
            onResubmit={handleResubmit}
            onViewAnalytics={handleViewAnalytics}
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
}

function SubmissionsList({ submissions, onSubmitUrl, onResubmit, onViewAnalytics }: SubmissionsListProps) {
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

        if (submission.status === "Approved") {
          StatusIcon = CheckCircle
          statusColor = "text-purple-500"
        } else if (submission.status === "Rejected") {
          StatusIcon = XCircle
          statusColor = "text-red-500"
        } else if (submission.status === "Live") {
          StatusIcon = BarChart
          statusColor = "text-green-500"
        } else if (submission.status === "Completed") {
          StatusIcon = CheckCircle
          statusColor = "text-slate-500"
        }

        return (
          <Card key={submission.id} className="overflow-hidden bg-white hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={submission.image || "/placeholder.svg"}
                alt={submission.campaign}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge
                  variant="outline"
                  className={`
                    ${submission.status === "Approved" ? "bg-purple-50 text-purple-600 border-purple-200" : ""}
                    ${submission.status === "Under Review" ? "bg-blue-50 text-blue-600 border-blue-200" : ""}
                    ${submission.status === "Rejected" ? "bg-red-50 text-red-600 border-red-200" : ""}
                    ${submission.status === "Live" ? "bg-green-50 text-green-600 border-green-200" : ""}
                    ${submission.status === "Completed" ? "bg-slate-50 text-slate-600 border-slate-200" : ""}
                  `}
                >
                  <StatusIcon className={`h-3.5 w-3.5 mr-1 ${statusColor}`} />
                  {submission.status === "Approved" ? "Ready to Post" : submission.status}
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
              {submission.points > 0 && (
                <div className="absolute bottom-2 right-2">
                  <Badge className="bg-yellow-400 text-yellow-900 border-0">+{submission.points} points</Badge>
                </div>
              )}
            </div>

            <CardContent className="p-4">
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

              <div className="mt-4 flex justify-end">
                {submission.status === "Rejected" && (
                  <Button size="sm" variant="outline" className="gap-1" onClick={() => onResubmit(submission)}>
                    <RefreshCw className="h-3.5 w-3.5" /> Resubmit
                  </Button>
                )}
                {submission.status === "Approved" && (
                  <Button
                    size="sm"
                    className="gap-1 bg-purple-600 hover:bg-purple-700"
                    onClick={() => onSubmitUrl(submission)}
                  >
                    Submit URL
                  </Button>
                )}
                {(submission.status === "Live" || submission.status === "Completed") && (
                  <Button size="sm" variant="outline" className="gap-1" onClick={() => onViewAnalytics(submission)}>
                    <BarChart className="h-3.5 w-3.5" /> Analytics
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
