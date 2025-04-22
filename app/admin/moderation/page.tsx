"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  ThumbsUp,
  Instagram,
  TwitterIcon as TikTok,
  Clock,
} from "lucide-react"

export default function ContentModeration() {
  const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([])

  const toggleSubmission = (id: string) => {
    if (selectedSubmissions.includes(id)) {
      setSelectedSubmissions(selectedSubmissions.filter((submissionId) => submissionId !== id))
    } else {
      setSelectedSubmissions([...selectedSubmissions, id])
    }
  }

  const selectAll = (submissions: any[]) => {
    if (selectedSubmissions.length === submissions.length) {
      setSelectedSubmissions([])
    } else {
      setSelectedSubmissions(submissions.map((submission) => submission.id))
    }
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Content Moderation</h1>
          <p className="text-muted-foreground">Review and manage creator content submissions</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          {selectedSubmissions.length > 0 && (
            <>
              <Button variant="outline" className="gap-1">
                <CheckCircle className="h-4 w-4" />
                Approve Selected ({selectedSubmissions.length})
              </Button>
              <Button variant="outline" className="gap-1">
                <XCircle className="h-4 w-4" />
                Reject Selected ({selectedSubmissions.length})
              </Button>
            </>
          )}
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search submissions..." className="pl-8" />
          </div>
          <TabsList>
            <TabsTrigger value="pending">Pending (32)</TabsTrigger>
            <TabsTrigger value="approved">Approved (84)</TabsTrigger>
            <TabsTrigger value="rejected">Rejected (12)</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <TabsContent value="pending">
          <SubmissionList
            status="pending"
            selectedSubmissions={selectedSubmissions}
            toggleSubmission={toggleSubmission}
            selectAll={selectAll}
          />
        </TabsContent>

        <TabsContent value="approved">
          <SubmissionList
            status="approved"
            selectedSubmissions={selectedSubmissions}
            toggleSubmission={toggleSubmission}
            selectAll={selectAll}
          />
        </TabsContent>

        <TabsContent value="rejected">
          <SubmissionList
            status="rejected"
            selectedSubmissions={selectedSubmissions}
            toggleSubmission={toggleSubmission}
            selectAll={selectAll}
          />
        </TabsContent>

        <TabsContent value="all">
          <SubmissionList
            status="all"
            selectedSubmissions={selectedSubmissions}
            toggleSubmission={toggleSubmission}
            selectAll={selectAll}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function SubmissionList({
  status,
  selectedSubmissions,
  toggleSubmission,
  selectAll,
}: {
  status: string
  selectedSubmissions: string[]
  toggleSubmission: (id: string) => void
  selectAll: (submissions: any[]) => void
}) {
  // This would be fetched from an API in a real application
  const allSubmissions = [
    {
      id: "1",
      creator: {
        name: "Sarah Johnson",
        department: "Marketing",
        avatar: "/placeholder.svg",
      },
      campaign: "Summer Product Launch",
      platform: "instagram",
      content: {
        type: "image",
        caption:
          "Summer is here and so is the new collection from @brandname! 🌞 Check out these amazing new products that are perfect for the season. #SummerCollection #BrandNameSummer #NewArrivals",
      },
      submittedAt: "2 hours ago",
      status: "pending",
      priority: "high",
    },
    {
      id: "2",
      creator: {
        name: "Michael Chen",
        department: "Product",
        avatar: "/placeholder.svg",
      },
      campaign: "Brand Challenge",
      platform: "tiktok",
      content: {
        type: "video",
        caption:
          "Taking the #BrandChallenge to show you how I use these amazing products every day! @brandname #ProductDemo",
      },
      submittedAt: "4 hours ago",
      status: "pending",
      priority: "normal",
    },
    {
      id: "3",
      creator: {
        name: "Emily Rodriguez",
        department: "Customer Success",
        avatar: "/placeholder.svg",
      },
      campaign: "Customer Stories",
      platform: "instagram",
      content: {
        type: "image",
        caption:
          "Our customers love our products, and here's why! 💯 These testimonials show the real impact our solutions have made. What's your experience been like? #CustomerStories #RealResults #BrandName",
      },
      submittedAt: "5 hours ago",
      status: "pending",
      priority: "normal",
    },
    {
      id: "4",
      creator: {
        name: "David Wilson",
        department: "Sales",
        avatar: "/placeholder.svg",
      },
      campaign: "Product Feature",
      platform: "tiktok",
      content: {
        type: "video",
        caption:
          "Check out this amazing product feature! It's changed how I work every day. #ProductFeature #WorkHacks #BrandName",
      },
      submittedAt: "1 day ago",
      status: "rejected",
      priority: "normal",
      feedback:
        "The video quality is too low. Please resubmit with better lighting and focus on the product features more clearly.",
    },
    {
      id: "5",
      creator: {
        name: "Lisa Thompson",
        department: "HR",
        avatar: "/placeholder.svg",
      },
      campaign: "Customer Stories",
      platform: "instagram",
      content: {
        type: "image",
        caption:
          "Proud to share these amazing customer testimonials! Our products make a real difference. #CustomerStories #BrandName",
      },
      submittedAt: "2 days ago",
      status: "approved",
      priority: "normal",
      engagement: {
        views: 1245,
        likes: 87,
        comments: 12,
      },
    },
    {
      id: "6",
      creator: {
        name: "James Brown",
        department: "Engineering",
        avatar: "/placeholder.svg",
      },
      campaign: "Behind the Scenes",
      platform: "instagram",
      content: {
        type: "image",
        caption: "Here's a look at how we build our amazing products! #BehindTheScenes #Engineering #BrandName",
      },
      submittedAt: "3 days ago",
      status: "approved",
      priority: "normal",
      engagement: {
        views: 980,
        likes: 65,
        comments: 8,
      },
    },
  ]

  const filteredSubmissions =
    status === "all" ? allSubmissions : allSubmissions.filter((submission) => submission.status === status)

  return (
    <Card>
      <CardHeader className="px-6">
        <CardTitle>
          {status === "pending" && "Pending Review"}
          {status === "approved" && "Approved Content"}
          {status === "rejected" && "Rejected Content"}
          {status === "all" && "All Submissions"}
        </CardTitle>
        <CardDescription>
          {status === "pending" && "Content waiting for your review"}
          {status === "approved" && "Content that has been approved"}
          {status === "rejected" && "Content that has been rejected"}
          {status === "all" && "All content submissions"}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <div className="rounded-md border">
          <div className="grid grid-cols-12 p-4 bg-slate-50 text-sm font-medium text-slate-500">
            <div className="col-span-1 flex items-center">
              <Checkbox
                checked={selectedSubmissions.length === filteredSubmissions.length && filteredSubmissions.length > 0}
                onCheckedChange={() => selectAll(filteredSubmissions)}
              />
            </div>
            <div className="col-span-3">Creator</div>
            <div className="col-span-3">Campaign</div>
            <div className="col-span-2">Submitted</div>
            <div className="col-span-1">Platform</div>
            <div className="col-span-2">Actions</div>
          </div>

          {filteredSubmissions.length > 0 ? (
            filteredSubmissions.map((submission) => (
              <div key={submission.id} className="grid grid-cols-12 p-4 border-t items-center">
                <div className="col-span-1 flex items-center">
                  <Checkbox
                    checked={selectedSubmissions.includes(submission.id)}
                    onCheckedChange={() => toggleSubmission(submission.id)}
                  />
                </div>
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                  <div>
                    <p className="font-medium">{submission.creator.name}</p>
                    <p className="text-xs text-muted-foreground">{submission.creator.department}</p>
                  </div>
                </div>
                <div className="col-span-3">
                  <p>{submission.campaign}</p>
                  {submission.priority === "high" && <Badge className="mt-1">High Priority</Badge>}
                </div>
                <div className="col-span-2 flex items-center gap-1">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span className="text-sm">{submission.submittedAt}</span>
                </div>
                <div className="col-span-1">
                  {submission.platform === "instagram" ? (
                    <Instagram className="h-5 w-5 text-rose-500" />
                  ) : (
                    <TikTok className="h-5 w-5 text-cyan-500" />
                  )}
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <ReviewDialog submission={submission} />

                  {submission.status === "pending" && (
                    <>
                      <Button variant="ghost" size="icon" className="text-green-600">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-600">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}

                  {submission.status === "approved" && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Eye className="h-3 w-3" />
                      <span>{submission.engagement?.views}</span>
                      <ThumbsUp className="h-3 w-3" />
                      <span>{submission.engagement?.likes}</span>
                    </div>
                  )}

                  {submission.status === "rejected" && (
                    <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                      Rejected
                    </Badge>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">No {status} submissions found.</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function ReviewDialog({ submission }: { submission: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Review Submission</DialogTitle>
          <DialogDescription>
            Review content submitted by {submission.creator.name} for the {submission.campaign} campaign.
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 py-4">
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Content Preview</h3>
              <div
                className={`aspect-${submission.platform === "instagram" ? "square" : "video"} bg-slate-100 rounded-md mb-2`}
              ></div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge
                  variant="outline"
                  className={`text-${submission.platform === "instagram" ? "rose" : "cyan"}-600`}
                >
                  {submission.platform === "instagram" ? (
                    <Instagram className="h-3 w-3 mr-1" />
                  ) : (
                    <TikTok className="h-3 w-3 mr-1" />
                  )}
                  {submission.platform.charAt(0).toUpperCase() + submission.platform.slice(1)}
                </Badge>
                <Badge variant="outline">
                  {submission.content.type.charAt(0).toUpperCase() + submission.content.type.slice(1)}
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Caption</h3>
              <div className="p-3 bg-slate-50 rounded-md text-sm">{submission.content.caption}</div>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Submission Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                  <div>
                    <p className="font-medium">{submission.creator.name}</p>
                    <p className="text-xs text-muted-foreground">{submission.creator.department}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Campaign</p>
                    <p className="font-medium">{submission.campaign}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Submitted</p>
                    <p className="font-medium">{submission.submittedAt}</p>
                  </div>
                </div>

                {submission.status === "rejected" && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <h4 className="text-sm font-medium text-red-600 mb-1">Feedback:</h4>
                    <p className="text-sm text-red-600">{submission.feedback}</p>
                  </div>
                )}

                {submission.status === "approved" && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <h4 className="text-sm font-medium text-green-600 mb-1">Performance:</h4>
                    <div className="grid grid-cols-3 gap-2 text-sm text-green-600">
                      <div>
                        <p>{submission.engagement?.views} views</p>
                      </div>
                      <div>
                        <p>{submission.engagement?.likes} likes</p>
                      </div>
                      <div>
                        <p>{submission.engagement?.comments} comments</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {submission.status === "pending" && (
              <div>
                <h3 className="text-sm font-medium mb-2">Moderation</h3>
                <div className="space-y-4">
                  <Textarea placeholder="Add feedback or notes (optional)" />

                  <div className="flex justify-between">
                    <Button variant="outline" className="gap-1">
                      <XCircle className="h-4 w-4" />
                      Reject
                    </Button>
                    <Button className="gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {submission.status !== "pending" && (
              <div className="flex justify-end">
                <Button variant="outline">Close</Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
