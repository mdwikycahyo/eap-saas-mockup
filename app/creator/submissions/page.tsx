import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Instagram } from "lucide-react"
import { TikTokIcon } from "@/components/tik-tok-icon"
import { PointsBalance } from "@/components/points-balance"

// Sample submission data
const submissions = [
  {
    id: 1,
    campaign: "Summer Product Launch",
    platform: "instagram",
    status: "Approved",
    date: "July 15, 2023",
    image: "/placeholder.svg?height=300&width=300",
    points: 150,
  },
  {
    id: 2,
    campaign: "Brand Challenge",
    platform: "tiktok",
    status: "Under Review",
    date: "July 10, 2023",
    image: "/placeholder.svg?height=300&width=300",
    points: 0,
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
  },
]

export default function SubmissionsPage() {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Submissions</h1>
          <p className="text-muted-foreground">Track and manage your campaign submissions</p>
        </div>
        <PointsBalance points={3250} />
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Submissions</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {submissions.map((submission) => (
          <Card key={submission.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-[20%] h-48 md:h-auto">
                  <img
                    src={submission.image || "/placeholder.svg"}
                    alt={submission.campaign}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-base">{submission.campaign}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <span>Submitted on {submission.date}</span>
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
                      <StatusBadge status={submission.status} />
                    </div>

                    {submission.feedback && (
                      <div className="mt-2 p-3 bg-red-50 text-red-800 rounded-md text-sm">
                        <p className="font-medium">Feedback:</p>
                        <p>{submission.feedback}</p>
                      </div>
                    )}

                    {submission.engagement && (
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        <div className="p-2 bg-slate-50 rounded-md text-center">
                          <p className="text-xs text-muted-foreground">Views</p>
                          <p className="font-medium">{submission.engagement.views.toLocaleString()}</p>
                        </div>
                        <div className="p-2 bg-slate-50 rounded-md text-center">
                          <p className="text-xs text-muted-foreground">Likes</p>
                          <p className="font-medium">{submission.engagement.likes.toLocaleString()}</p>
                        </div>
                        <div className="p-2 bg-slate-50 rounded-md text-center">
                          <p className="text-xs text-muted-foreground">Comments</p>
                          <p className="font-medium">{submission.engagement.comments.toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    {submission.points > 0 ? (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Points earned:</span>{" "}
                        <span className="font-medium">{submission.points}</span>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">No points earned yet</div>
                    )}

                    <div>
                      {submission.status === "Rejected" && <Button size="sm">Resubmit</Button>}
                      {submission.status === "Approved" && (
                        <Button size="sm" variant="outline">
                          Submit URL
                        </Button>
                      )}
                      {submission.status === "Live" && (
                        <Button size="sm" variant="outline">
                          View Analytics
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "Approved":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
          Ready to Post
        </Badge>
      )
    case "Under Review":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
          Under Review
        </Badge>
      )
    case "Rejected":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
          Rejected
        </Badge>
      )
    case "Live":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
          Live
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">
          {status}
        </Badge>
      )
  }
}
