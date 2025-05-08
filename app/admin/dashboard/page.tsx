"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Megaphone,
  CheckCircle,
  XCircle,
  Instagram,
  ArrowRight,
  Plus,
  DollarSign,
  CreditCard,
  Eye,
  ThumbsUp,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { TikTokIcon } from "@/components/tik-tok-icon"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminDashboard() {
  const router = useRouter()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false)
  const [topUpAmount, setTopUpAmount] = useState("")

  const navigateTo = (path: string) => {
    router.push(path)
  }

  // Mock data for Sarah Johnson's multiple images
  const sarahImages = [
    { id: 1, src: "/placeholder.svg?height=400&width=400", alt: "Summer collection image 1" },
    { id: 2, src: "/placeholder.svg?height=400&width=400", alt: "Summer collection image 2" },
    { id: 3, src: "/placeholder.svg?height=400&width=400", alt: "Summer collection image 3" },
  ]

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % sarahImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + sarahImages.length) % sarahImages.length)
  }

  const handleTopUp = () => {
    // In a real app, this would send a request to the super admin
    setIsTopUpModalOpen(false)
    alert(`Request to top up Rp ${Number.parseInt(topUpAmount).toLocaleString()} has been sent to the super admin.`)
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your advocacy program.</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button className="gap-1" onClick={() => router.push("/admin/campaign-create")}>
            <Plus className="h-4 w-4" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Creators</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 ending this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Reward Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">Rp 25.5M</div>
              <Button size="sm" variant="outline" onClick={() => setIsTopUpModalOpen(true)}>
                Top Up
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Available for redemption</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Redeemed Rewards</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 12.8M</div>
            <p className="text-xs text-muted-foreground">+Rp 3.2M from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Campaign Performance */}
        <Card className="md:col-span-1 flex flex-col h-[500px]">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>All Campaigns' Performance</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <div className="space-y-6">
              {/* Summer Product Launch */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <h3 className="font-medium">Summer Product Launch</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => navigateTo("/admin/campaigns/1")}
                  >
                    View Details
                  </Button>
                </div>

                <div className="grid grid-cols-5 gap-2 mb-3">
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <span className="text-xs text-muted-foreground">Creators</span>
                    <span className="font-medium">42</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <span className="text-xs text-muted-foreground">Content</span>
                    <span className="font-medium">28</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Eye className="h-3 w-3 mr-1" />
                    </div>
                    <span className="font-medium">24.5K</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                    </div>
                    <span className="font-medium">3.2K</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MessageSquare className="h-3 w-3 mr-1" />
                    </div>
                    <span className="font-medium">1.8K</span>
                  </div>
                </div>
              </div>

              {/* Brand Challenge */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <h3 className="font-medium">Brand Challenge</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => navigateTo("/admin/campaigns/2")}
                  >
                    View Details
                  </Button>
                </div>

                <div className="grid grid-cols-5 gap-2 mb-3">
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <span className="text-xs text-muted-foreground">Creators</span>
                    <span className="font-medium">36</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <span className="text-xs text-muted-foreground">Content</span>
                    <span className="font-medium">15</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Eye className="h-3 w-3 mr-1" />
                    </div>
                    <span className="font-medium">18.3K</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                    </div>
                    <span className="font-medium">2.7K</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MessageSquare className="h-3 w-3 mr-1" />
                    </div>
                    <span className="font-medium">1.2K</span>
                  </div>
                </div>
              </div>

              {/* Customer Stories */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <h3 className="font-medium">Customer Stories</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => navigateTo("/admin/campaigns/3")}
                  >
                    View Details
                  </Button>
                </div>

                <div className="grid grid-cols-5 gap-2 mb-3">
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <span className="text-xs text-muted-foreground">Creators</span>
                    <span className="font-medium">28</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <span className="text-xs text-muted-foreground">Content</span>
                    <span className="font-medium">22</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Eye className="h-3 w-3 mr-1" />
                    </div>
                    <span className="font-medium">9.8K</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                    </div>
                    <span className="font-medium">1.5K</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MessageSquare className="h-3 w-3 mr-1" />
                    </div>
                    <span className="font-medium">820</span>
                  </div>
                </div>
              </div>

              {/* Sustainability Initiative */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <h3 className="font-medium">Sustainability Initiative</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => navigateTo("/admin/campaigns/4")}
                  >
                    View Details
                  </Button>
                </div>

                <div className="grid grid-cols-5 gap-2 mb-3">
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <span className="text-xs text-muted-foreground">Creators</span>
                    <span className="font-medium">18</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <span className="text-xs text-muted-foreground">Content</span>
                    <span className="font-medium">7</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Eye className="h-3 w-3 mr-1" />
                    </div>
                    <span className="font-medium">5.6K</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                    </div>
                    <span className="font-medium">980</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 rounded">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MessageSquare className="h-3 w-3 mr-1" />
                    </div>
                    <span className="font-medium">320</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <div className="p-4 mt-auto border-t">
            <Button variant="outline" className="w-full" onClick={() => navigateTo("/admin/campaigns")}>
              View All Campaigns
            </Button>
          </div>
        </Card>

        {/* Pending Approvals */}
        <Card className="md:col-span-1 flex flex-col h-[500px]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Content waiting for your review</CardDescription>
            </div>
            <Badge variant="outline" className="ml-2">
              5 Pending
            </Badge>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <div className="space-y-3">
              {/* Sarah Johnson */}
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                      <div>
                        <p className="font-medium text-sm">Sarah Johnson</p>
                        <p className="text-xs text-muted-foreground">Summer Product Launch • 2h ago</p>
                      </div>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-xs">
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px]">
                      <DialogHeader>
                        <DialogTitle>Review Submission</DialogTitle>
                        <DialogDescription>
                          Review content submitted by Sarah Johnson for the Summer Product Launch campaign.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid md:grid-cols-2 gap-6 py-4">
                        <div className="max-h-[70vh] overflow-y-auto">
                          <div className="mb-4">
                            <h3 className="text-sm font-medium mb-2">Content Preview</h3>
                            <div className="relative">
                              <div className="aspect-square bg-slate-100 rounded-md mb-2 relative">
                                {/* Carousel for multiple images */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <img
                                    src={sarahImages[currentImageIndex].src || "/placeholder.svg"}
                                    alt={sarahImages[currentImageIndex].alt}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                {/* Carousel controls */}
                                <div className="absolute inset-0 flex items-center justify-between px-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full bg-white/70"
                                    onClick={prevImage}
                                  >
                                    <ChevronLeft className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full bg-white/70"
                                    onClick={nextImage}
                                  >
                                    <ChevronRight className="h-4 w-4" />
                                  </Button>
                                </div>

                                {/* Carousel indicators */}
                                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                                  {sarahImages.map((_, index) => (
                                    <div
                                      key={index}
                                      className={`h-1.5 ${index === currentImageIndex ? "w-6" : "w-1.5"} rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                                    ></div>
                                  ))}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Badge variant="outline" className="text-rose-600">
                                  <Instagram className="h-3 w-3 mr-1" />
                                  Instagram
                                </Badge>
                                <Badge variant="outline">Image</Badge>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium mb-2">Caption</h3>
                            <div className="p-3 bg-slate-50 rounded-md text-sm">
                              Summer is here and so is the new collection from @brandname! 🌞 Check out these amazing
                              new products that are perfect for the season. #SummerCollection #BrandNameSummer
                              #NewArrivals
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="mb-4">
                            <h3 className="text-sm font-medium mb-2">Submission Details</h3>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                                <div>
                                  <p className="font-medium">Sarah Johnson</p>
                                  <p className="text-xs text-muted-foreground">Marketing</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <p className="text-muted-foreground">Campaign</p>
                                  <p className="font-medium">Summer Product Launch</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Submitted</p>
                                  <p className="font-medium">2 hours ago</p>
                                </div>
                              </div>
                            </div>
                          </div>
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
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Michael Chen */}
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                      <div>
                        <p className="font-medium text-sm">Michael Chen</p>
                        <p className="text-xs text-muted-foreground">Brand Challenge • 4h ago</p>
                      </div>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-xs">
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px]">
                      <DialogHeader>
                        <DialogTitle>Review Submission</DialogTitle>
                        <DialogDescription>
                          Review content submitted by Michael Chen for the Brand Challenge campaign.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid md:grid-cols-2 gap-6 py-4">
                        <div className="max-h-[70vh] overflow-y-auto">
                          <div className="mb-4">
                            <h3 className="text-sm font-medium mb-2">Content Preview</h3>
                            <div className="aspect-video bg-slate-100 rounded-md mb-2"></div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="outline" className="text-cyan-600">
                                <TikTokIcon className="h-3 w-3 mr-1" />
                                TikTok
                              </Badge>
                              <Badge variant="outline">Video</Badge>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium mb-2">Caption</h3>
                            <div className="p-3 bg-slate-50 rounded-md text-sm">
                              Taking the #BrandChallenge to show you how I use these amazing products every day!
                              @brandname #ProductDemo
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="mb-4">
                            <h3 className="text-sm font-medium mb-2">Submission Details</h3>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                                <div>
                                  <p className="font-medium">Michael Chen</p>
                                  <p className="text-xs text-muted-foreground">Product</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <p className="text-muted-foreground">Campaign</p>
                                  <p className="font-medium">Brand Challenge</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Submitted</p>
                                  <p className="font-medium">4 hours ago</p>
                                </div>
                              </div>
                            </div>
                          </div>
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
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Emily Rodriguez */}
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                      <div>
                        <p className="font-medium text-sm">Emily Rodriguez</p>
                        <p className="text-xs text-muted-foreground">Customer Stories • 5h ago</p>
                      </div>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-xs">
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px]">
                      <DialogHeader>
                        <DialogTitle>Review Submission</DialogTitle>
                        <DialogDescription>
                          Review content submitted by Emily Rodriguez for the Customer Stories campaign.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid md:grid-cols-2 gap-6 py-4">
                        <div className="max-h-[70vh] overflow-y-auto">
                          <div className="mb-4">
                            <h3 className="text-sm font-medium mb-2">Content Preview</h3>
                            <div className="aspect-square bg-slate-100 rounded-md mb-2"></div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="outline" className="text-rose-600">
                                <Instagram className="h-3 w-3 mr-1" />
                                Instagram
                              </Badge>
                              <Badge variant="outline">Image</Badge>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium mb-2">Caption</h3>
                            <div className="p-3 bg-slate-50 rounded-md text-sm">
                              Our customers love our products, and here's why! 💯 These testimonials show the real
                              impact our solutions have made. What's your experience been like? #CustomerStories
                              #RealResults #BrandName
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="mb-4">
                            <h3 className="text-sm font-medium mb-2">Submission Details</h3>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                                <div>
                                  <p className="font-medium">Emily Rodriguez</p>
                                  <p className="text-xs text-muted-foreground">Customer Success</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <p className="text-muted-foreground">Campaign</p>
                                  <p className="font-medium">Customer Stories</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Submitted</p>
                                  <p className="font-medium">5 hours ago</p>
                                </div>
                              </div>
                            </div>
                          </div>
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
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* David Wilson */}
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                      <div>
                        <p className="font-medium text-sm">David Wilson</p>
                        <p className="text-xs text-muted-foreground">Product Tutorial • 6h ago</p>
                      </div>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-xs">
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px]">{/* Dialog content similar to above */}</DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Lisa Thompson */}
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                      <div>
                        <p className="font-medium text-sm">Lisa Thompson</p>
                        <p className="text-xs text-muted-foreground">Brand Challenge • 7h ago</p>
                      </div>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-xs">
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px]">{/* Dialog content similar to above */}</DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </CardContent>
          <div className="p-4 mt-auto border-t">
            <Button variant="outline" className="w-full gap-1" onClick={() => navigateTo("/admin/moderation")}>
              Review All <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Top Creators */}
        <Card className="md:col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle>Top Creators</CardTitle>
            <CardDescription>Highest performing employee advocates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {/* Creator 1 */}
              <div className="flex flex-col items-center p-4 border rounded-lg">
                <div className="w-16 h-16 rounded-full bg-slate-200 mb-3"></div>
                <h3 className="font-medium text-center line-clamp-1">Sarah Johnson</h3>
                <p className="text-xs text-muted-foreground mb-2 text-center line-clamp-1">Marketing Specialist</p>
                <div className="flex items-center gap-1 text-sm">
                  <Badge variant="secondary">4,250 pts</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">15 posts</p>
              </div>

              {/* Creator 2 */}
              <div className="flex flex-col items-center p-4 border rounded-lg">
                <div className="w-16 h-16 rounded-full bg-slate-200 mb-3"></div>
                <h3 className="font-medium text-center line-clamp-1">Michael Chen</h3>
                <p className="text-xs text-muted-foreground mb-2 text-center line-clamp-1">Product Manager</p>
                <div className="flex items-center gap-1 text-sm">
                  <Badge variant="secondary">3,820 pts</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">12 posts</p>
              </div>

              {/* Creator 3 */}
              <div className="flex flex-col items-center p-4 border rounded-lg">
                <div className="w-16 h-16 rounded-full bg-slate-200 mb-3"></div>
                <h3 className="font-medium text-center line-clamp-1">Emily Rodriguez</h3>
                <p className="text-xs text-muted-foreground mb-2 text-center line-clamp-1">Customer Success Manager</p>
                <div className="flex items-center gap-1 text-sm">
                  <Badge variant="secondary">3,540 pts</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">11 posts</p>
              </div>

              {/* Creator 4 */}
              <div className="flex flex-col items-center p-4 border rounded-lg">
                <div className="w-16 h-16 rounded-full bg-slate-200 mb-3"></div>
                <h3 className="font-medium text-center line-clamp-1">David Wilson</h3>
                <p className="text-xs text-muted-foreground mb-2 text-center line-clamp-1">Sales Representative</p>
                <div className="flex items-center gap-1 text-sm">
                  <Badge variant="secondary">3,125 pts</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">9 posts</p>
              </div>

              {/* Creator 5 */}
              <div className="flex flex-col items-center p-4 border rounded-lg">
                <div className="w-16 h-16 rounded-full bg-slate-200 mb-3"></div>
                <h3 className="font-medium text-center line-clamp-1">James Brown</h3>
                <p className="text-xs text-muted-foreground mb-2 text-center line-clamp-1">Engineering Lead</p>
                <div className="flex items-center gap-1 text-sm">
                  <Badge variant="secondary">2,980 pts</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">8 posts</p>
              </div>
            </div>
          </CardContent>
          <div className="p-4 mt-auto border-t">
            <Button variant="outline" className="w-full" onClick={() => navigateTo("/admin/creators")}>
              View All Creators
            </Button>
          </div>
        </Card>
      </div>

      {/* Top Up Modal */}
      <Dialog open={isTopUpModalOpen} onOpenChange={setIsTopUpModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Top Up Reward Balance</DialogTitle>
            <DialogDescription>After submit the top up request, super admin will contact you immediately.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-center">
                Amount
              </Label>
              <div className="col-span-3 flex items-center">
                <span className="mr-2">Rp</span>
                <Input
                  id="amount"
                  type="number"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTopUpModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleTopUp} disabled={!topUpAmount || Number.parseInt(topUpAmount) <= 0}>
              Request Top Up
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
