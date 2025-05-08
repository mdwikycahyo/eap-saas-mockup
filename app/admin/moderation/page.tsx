"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

export default function ContentModeration() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [allSubmissions, setAllSubmissions] = useState<any[]>([])
  const [pendingSubmissions, setPendingSubmissions] = useState<any[]>([])
  const [approvedSubmissions, setApprovedSubmissions] = useState<any[]>([])
  const [rejectedSubmissions, setRejectedSubmissions] = useState<any[]>([])

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
    setAllSubmissions(submissions)
    filterSubmissions(submissions, searchTerm)
  }, [searchTerm])

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    filterSubmissions(allSubmissions, value)
  }

  const handleViewSubmission = (id: string) => {
    router.push(`/admin/moderation/submission/${id}`)
  }

  const pendingCount = allSubmissions.filter((sub) => sub.status === "pending").length
  const approvedCount = allSubmissions.filter((sub) => sub.status === "approved").length
  const rejectedCount = allSubmissions.filter((sub) => sub.status === "rejected").length

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Content Moderation</h1>
          <p className="text-muted-foreground">Review and manage creator content submissions</p>
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full mb-6">
        <div className="flex flex-col gap-4 mb-6">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search campaigns..."
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
        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-sm font-medium text-slate-500">
                <th className="p-4 text-left w-1/3">Creator</th>
                <th className="p-4 text-left w-1/3">Campaign</th>
                <th className="p-4 text-left w-1/6">Submitted</th>
                <th className="p-4 text-left w-1/6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length > 0 ? (
                submissions.map((submission) => (
                  <tr key={submission.id} className="border-t">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200"></div>
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
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{submission.submittedAt}</span>
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
                  <td colSpan={4} className="p-8 text-center text-muted-foreground">
                    No {status} submissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
