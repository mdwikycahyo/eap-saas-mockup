"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Download, FileText } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { use } from "react";

interface CampaignDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function CampaignDetail({ params }: CampaignDetailProps) {
  const resolvedParams = use(params);
  const campaignData = getCampaignData(resolvedParams.slug);

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/creator/campaigns">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{campaignData.title}</h1>
          <p className="text-muted-foreground">{campaignData.subtitle}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{campaignData.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{campaignData.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{campaignData.timeRemaining} days remaining</span>
                </div>
              </div>

              <div className="flex gap-2">
                {campaignData.platforms.map((platform) => (
                  <Badge key={platform} variant="outline" className="capitalize">
                    {platform}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Assets</CardTitle>
              <CardDescription>Download assets to help you create content for this campaign.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaignData.requirements && (
                  <div>
                    <h3 className="text-sm font-medium mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {campaignData.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-primary">•</span>
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {campaignData.caption && (
                  <div>
                    <h3 className="text-sm font-medium mb-3">Suggested Caption</h3>
                    <div className="p-3 bg-muted rounded-md">
                      <p className="text-sm">{campaignData.caption}</p>
                    </div>
                  </div>
                )}

                {campaignData.brief && (
                  <div>
                    <h3 className="text-sm font-medium mb-3">Campaign Brief</h3>
                    <div className="p-3 bg-muted rounded-md">
                      <p className="text-sm">{campaignData.brief}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status</span>
                  <Badge className={getStatusBadgeClasses(campaignData.status)}>{campaignData.status}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Points</span>
                  <span className="text-sm">10 points</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" size="lg">
                Join Campaign
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Assets
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function getCampaignData(slug: string) {
  // This would be fetched from an API in a real application
  const campaigns = {
    "summer-launch": {
      title: "Summer Product Launch",
      subtitle: "Share our new summer collection",
      description:
        "Share our new summer collection with your followers and highlight your favorite products. This campaign aims to increase awareness of our latest seasonal offerings.",
      platforms: ["instagram"],
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
      platforms: ["tiktok"],
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
        "Share testimonials from happy customers and highlight how our products have made a difference in their lives.",
      platforms: ["instagram", "tiktok"],
      period: "July 10 - August 10, 2023",
      timeRemaining: 8,
      status: "Live",
      caption:
        "Hear what our customers are saying! 'This product changed my life!' - Jane D. #RealResults #CustomerStories @brandname",
      requirements: [
        "Share authentic customer testimonials",
        "Include #CustomerStories hashtag",
        "Tag @brandname in your post",
      ],
    },
    "sustainability": {
      title: "Sustainability Initiative",
      subtitle: "Share our commitment to sustainability",
      description: "Share our commitment to sustainability and eco-friendly products with your followers.",
      platforms: ["instagram"],
      period: "July 20 - August 20, 2023",
      timeRemaining: 15,
      status: "Available",
      caption:
        "Proud to partner with a brand that cares about our planet! Check out these eco-friendly products. #GreenLiving #SustainableFuture @brandname",
      requirements: [
        "Highlight sustainability features",
        "Include #GreenLiving hashtag",
        "Tag @brandname in your post",
      ],
    },
    "product-tutorial": {
      title: "Product Tutorial",
      subtitle: "Create a tutorial showing how to use our products",
      description:
        "Create a tutorial showing how to use our products effectively and share your tips and tricks. Help others get the most out of their purchase.",
      platforms: ["tiktok"],
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
      platforms: ["instagram", "tiktok"],
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
  };

  return campaigns[slug as keyof typeof campaigns] || campaigns["summer-launch"];
}

function getStatusBadgeClasses(status: string) {
  switch (status) {
    case "Available":
      return "bg-green-50 text-green-600 border-green-200";
    case "Not Started":
      return "bg-gray-50 text-gray-600 border-gray-200";
    case "Submitted":
      return "bg-blue-50 text-blue-600 border-blue-200";
    case "Live":
      return "bg-purple-50 text-purple-600 border-purple-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
}
