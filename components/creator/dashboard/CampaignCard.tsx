"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  XCircle,
  BarChart,
  AlertTriangle,
  FileText,
} from "lucide-react";
import type { ActiveCampaign, AvailableCampaign } from "@/types/creator";

interface CampaignCardProps {
  campaign: ActiveCampaign | AvailableCampaign;
  isActive: boolean;
  onCardClick: (slug: string, isActive: boolean) => void;
  onJoinClick?: (e: React.MouseEvent, campaign: AvailableCampaign) => void;
}

export function CampaignCard({
  campaign,
  isActive,
  onCardClick,
  onJoinClick,
}: CampaignCardProps) {
  const isAvailable = campaign.status === "Available";

  // Status icon and color logic for active campaigns
  let StatusIcon = Clock;
  let statusColor = "text-blue-500";
  let statusBgColor = "bg-blue-50";
  let statusBorderColor = "border-blue-200";

  if (isActive) {
    if (campaign.status === "Content Approved") {
      StatusIcon = CheckCircle;
      statusColor = "text-purple-500";
      statusBgColor = "bg-purple-50";
      statusBorderColor = "border-purple-200";
    } else if (campaign.status === "Rejected") {
      StatusIcon = XCircle;
      statusColor = "text-red-500";
      statusBgColor = "bg-red-50";
      statusBorderColor = "border-red-200";
    } else if (campaign.status === "Live") {
      StatusIcon = BarChart;
      statusColor = "text-green-500";
      statusBgColor = "bg-green-50";
      statusBorderColor = "border-green-200";
    } else if (campaign.status === "Completed") {
      StatusIcon = CheckCircle;
      statusColor = "text-slate-500";
      statusBgColor = "bg-slate-50";
      statusBorderColor = "border-slate-200";
    } else if (campaign.status === "URL Required") {
      StatusIcon = AlertTriangle;
      statusColor = "text-amber-500";
      statusBgColor = "bg-amber-50";
      statusBorderColor = "border-amber-200";
    } else if (campaign.status === "URL Under Review") {
      StatusIcon = FileText;
      statusColor = "text-blue-500";
      statusBgColor = "bg-blue-50";
      statusBorderColor = "border-blue-200";
    }
  }

  const activeCampaign = campaign as ActiveCampaign;

  return (
    <div className="min-w-[300px] md:min-w-[350px]">
      <Card
        className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col"
        onClick={() => onCardClick(campaign.slug, isActive)}
      >
        <div className="relative">
          <img
            src={campaign.image || "/placeholder.svg"}
            alt={campaign.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2">
            {isAvailable ? (
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-600 border-blue-200"
              >
                Available
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className={`${statusBgColor} ${statusColor} ${statusBorderColor}`}
              >
                <StatusIcon className={`h-3.5 w-3.5 mr-1 ${statusColor}`} />
                {campaign.status}
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="mb-2">
            <h3 className="font-medium text-base">{campaign.title}</h3>
            {isActive && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span>{activeCampaign.date}</span>
                <span>•</span>
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="mt-2 text-sm text-muted-foreground">
              <p>{campaign.description}</p>
            </div>

            {isActive && activeCampaign.engagement && (
              <div className="mt-2 flex justify-between gap-2 text-sm">
                <div className="text-center">
                  <p className="font-medium">
                    {activeCampaign.engagement.views.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Views</p>
                </div>
                <div className="text-center">
                  <p className="font-medium">
                    {activeCampaign.engagement.likes.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Likes</p>
                </div>
                <div className="text-center">
                  <p className="font-medium">
                    {activeCampaign.engagement.comments.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Comments</p>
                </div>
              </div>
            )}

            {isActive && activeCampaign.postUrl && (
              <div className="mt-2">
                <a
                  href={activeCampaign.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm flex items-center gap-1 text-blue-600 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Post <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}

            {!isActive && (
              <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{campaign.timeRemaining} days remaining</span>
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-end">
            {isAvailable && onJoinClick ? (
              <div className="flex justify-between w-full">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCardClick(campaign.slug, false);
                  }}
                >
                  View Details <ArrowRight className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="sm"
                  className="gap-1"
                  onClick={(e) => onJoinClick(e, campaign as AvailableCampaign)}
                >
                  Join Campaign
                </Button>
              </div>
            ) : (
              <Button size="sm" variant="outline" className="gap-1">
                View Details <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
