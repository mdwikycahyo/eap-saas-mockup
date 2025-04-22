import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Instagram, TwitterIcon as TikTok, Download, Copy, Calendar, Clock, FileText } from "lucide-react"

interface CampaignDetailProps {
  params: {
    slug: string
  }
}

export default function CampaignDetail({ params }: CampaignDetailProps) {
  // In a real app, we would fetch campaign data based on the slug
  // For this demo, we'll use hardcoded data based on the slug

  const campaignData = getCampaignData(params.slug)

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{campaignData.title}</h1>
          <p className="text-muted-foreground">{campaignData.subtitle}</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Badge className={`bg-white text-${campaignData.color}-600 hover:bg-white`}>
            {campaignData.platforms.includes("instagram") && <Instagram className="h-4 w-4 mr-1" />}
            {campaignData.platforms.includes("tiktok") && <TikTok className="h-4 w-4 mr-1" />}
            {campaignData.platforms.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" & ")}
          </Badge>
          <Badge variant="secondary">{campaignData.type}</Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <div className={`h-64 bg-gradient-to-r from-${campaignData.color}-400 to-${campaignData.color}-600`}></div>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Campaign Details</h2>
              <p className="mb-6">{campaignData.description}</p>

              <div className="grid gap-4 sm:grid-cols-2 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Campaign Period</p>
                    <p className="text-sm text-muted-foreground">{campaignData.period}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Time Remaining</p>
                    <p className="text-sm text-muted-foreground">Ends in {campaignData.timeRemaining} days</p>
                  </div>
                </div>
              </div>

              {campaignData.type === "Quick Share" ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Campaign Assets</h3>
                  <Tabs defaultValue="images">
                    <TabsList>
                      <TabsTrigger value="images">Images</TabsTrigger>
                      <TabsTrigger value="videos">Videos</TabsTrigger>
                      <TabsTrigger value="captions">Captions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="images" className="pt-4">
                      <div className="grid gap-4 grid-cols-2">
                        <div className="border rounded-md p-2">
                          <div className="aspect-square bg-slate-100 rounded-md mb-2"></div>
                          <Button variant="outline" size="sm" className="w-full gap-1">
                            <Download className="h-4 w-4" /> Download
                          </Button>
                        </div>
                        <div className="border rounded-md p-2">
                          <div className="aspect-square bg-slate-100 rounded-md mb-2"></div>
                          <Button variant="outline" size="sm" className="w-full gap-1">
                            <Download className="h-4 w-4" /> Download
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="videos" className="pt-4">
                      <div className="grid gap-4 grid-cols-1">
                        <div className="border rounded-md p-2">
                          <div className="aspect-video bg-slate-100 rounded-md mb-2"></div>
                          <Button variant="outline" size="sm" className="w-full gap-1">
                            <Download className="h-4 w-4" /> Download
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="captions" className="pt-4">
                      <div className="border rounded-md p-4 bg-slate-50">
                        <p className="text-sm mb-4">{campaignData.caption}</p>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Copy className="h-4 w-4" /> Copy Caption
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Challenge Brief</h3>
                  <div className="border rounded-md p-4 bg-slate-50">
                    <p className="text-sm mb-4">{campaignData.brief}</p>
                    <Button variant="outline" size="sm" className="gap-1">
                      <FileText className="h-4 w-4" /> Download Brief PDF
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Campaign Status</CardTitle>
              <CardDescription>Your participation in this campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-1">Status</h3>
                  <Badge variant="outline" className={getStatusBadgeClasses(campaignData.status)}>
                    {campaignData.status}
                  </Badge>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-1">Points System</h3>
                  <p className="text-sm text-muted-foreground mb-2">Base points for posting + engagement bonus</p>
                  <ul className="text-sm space-y-1">
                    <li>• Base posting: 100 points</li>
                    <li>• Every 1,000 views: +50 points</li>
                    <li>• Every 100 likes: +25 points</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-1">Requirements</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    {campaignData.requirements.map((req, index) => (
                      <li key={index}>• {req}</li>
                    ))}
                  </ul>
                </div>

                {campaignData.status === "Not Started" && (
                  <Button className="w-full">
                    {campaignData.type === "Quick Share" ? "Apply to Share" : "Join Challenge"}
                  </Button>
                )}

                {campaignData.status === "Submitted" && (
                  <div className="text-center text-sm text-muted-foreground">Your submission is under review</div>
                )}

                {campaignData.status === "Approved" && (
                  <div className="text-center">
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 mb-2">
                      Content Approved
                    </Badge>
                    <p className="text-sm text-muted-foreground">Your content has been approved and published</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function getCampaignData(slug: string) {
  // This would be fetched from an API in a real application
  const campaigns = {
    "summer-launch": {
      title: "Summer Product Launch",
      subtitle: "Share our new summer collection",
      description:
        "Share our new summer collection with your followers and highlight your favorite products. This campaign aims to increase awareness of our latest seasonal offerings.",
      type: "Quick Share",
      platforms: ["instagram"],
      color: "rose",
      period: "July 1 - July 31, 2023",
      timeRemaining: 5,
      status: "Submitted",
      caption:
        "Summer is here and so is the new collection from @brandname! 🌞 Check out these amazing new products that are perfect for the season. #SummerCollection #BrandNameSummer #NewArrivals",
      requirements: [
        "Post must include product images provided",
        "Caption must include #SummerCollection hashtag",
        "Tag @brandname in your post",
      ],
    },
    "brand-challenge": {
      title: "Brand Challenge",
      subtitle: "Create a video using our hashtag",
      description:
        "Create a video using our branded hashtag and show how you use our products in your daily life. Be creative and authentic to connect with your audience.",
      type: "Creative Challenge",
      platforms: ["tiktok"],
      color: "cyan",
      period: "July 15 - August 15, 2023",
      timeRemaining: 12,
      status: "Not Started",
      brief:
        "Create a 15-60 second video showing how our products fit into your daily routine. Focus on authentic usage scenarios that will resonate with your audience. The most creative submissions will be featured on our official brand account.",
      requirements: [
        "Video length: 15-60 seconds",
        "Must include #BrandChallenge hashtag",
        "Must feature at least one product",
        "Content must be original and created specifically for this challenge",
      ],
    },
    "customer-stories": {
      title: "Customer Stories",
      subtitle: "Share testimonials from happy customers",
      description:
        "Share testimonials from happy customers and highlight how our products have made a difference in their lives. Real stories create authentic connections.",
      type: "Quick Share",
      platforms: ["instagram", "tiktok"],
      color: "amber",
      period: "July 10 - August 10, 2023",
      timeRemaining: 8,
      status: "Approved",
      caption:
        "Our customers love our products, and here's why! 💯 These testimonials show the real impact our solutions have made. What's your experience been like? #CustomerStories #RealResults #BrandName",
      requirements: [
        "Use provided testimonial graphics",
        "Include #CustomerStories hashtag",
        "Add a personal note about your own experience",
      ],
    },
    sustainability: {
      title: "Sustainability Initiative",
      subtitle: "Share our commitment to sustainability",
      description:
        "Share our commitment to sustainability and how we're reducing our environmental impact. Help spread awareness about our eco-friendly practices.",
      type: "Quick Share",
      platforms: ["instagram"],
      color: "emerald",
      period: "July 20 - August 20, 2023",
      timeRemaining: 15,
      status: "Not Started",
      caption:
        "Proud to be part of a company that prioritizes our planet! 🌎 Check out how @brandname is making a difference with sustainable practices and eco-friendly products. #SustainabilityMatters #EcoFriendly #GreenBusiness",
      requirements: [
        "Use provided sustainability infographics",
        "Include #SustainabilityMatters hashtag",
        "Mention at least one specific sustainability initiative",
      ],
    },
    "product-tutorial": {
      title: "Product Tutorial",
      subtitle: "Create a tutorial showing how to use our products",
      description:
        "Create a tutorial showing how to use our products effectively and share your tips and tricks. Help others get the most out of their purchase.",
      type: "Creative Challenge",
      platforms: ["tiktok"],
      color: "violet",
      period: "July 5 - August 5, 2023",
      timeRemaining: 10,
      status: "Not Started",
      brief:
        "Create a step-by-step tutorial demonstrating how to use one of our products. Focus on helpful tips, creative uses, or solutions to common problems. Your tutorial should be informative yet engaging.",
      requirements: [
        "Video length: 30-90 seconds",
        "Must include clear step-by-step instructions",
        "Include #ProductTutorial hashtag",
        "Demonstrate at least one unique tip or trick",
      ],
    },
    "behind-scenes": {
      title: "Behind the Scenes",
      subtitle: "Share behind-the-scenes content from your workplace",
      description:
        "Share behind-the-scenes content from your workplace and how you use our products professionally. Give your audience a glimpse into your work life.",
      type: "Creative Challenge",
      platforms: ["instagram", "tiktok"],
      color: "pink",
      period: "July 15 - August 15, 2023",
      timeRemaining: 7,
      status: "Not Started",
      brief:
        "Create content that shows a day in your work life and how our products help you succeed. This could be a photo series, a short video, or a combination of both. Focus on authentic moments that showcase your professional environment.",
      requirements: [
        "Must show workplace environment",
        "Feature product being used in professional context",
        "Include #BehindTheScenes hashtag",
        "Tag @brandname in your post",
      ],
    },
  }

  return campaigns[slug as keyof typeof campaigns] || campaigns["summer-launch"]
}

function getStatusBadgeClasses(status: string) {
  switch (status) {
    case "Not Started":
      return "bg-amber-50 text-amber-600 border-amber-200"
    case "Submitted":
      return "bg-green-50 text-green-600 border-green-200"
    case "Approved":
      return "bg-blue-50 text-blue-600 border-blue-200"
    case "Rejected":
      return "bg-red-50 text-red-600 border-red-200"
    default:
      return ""
  }
}
