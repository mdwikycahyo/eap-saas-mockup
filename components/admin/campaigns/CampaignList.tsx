"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye, Edit, ThumbsUp, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Campaign } from "@/types/campaign";

interface CampaignListProps {
  status: string;
  campaignsData: Campaign[];
}

export function CampaignList({ status, campaignsData }: CampaignListProps) {
  const router = useRouter();

  return (
    <div className="rounded-md border overflow-x-auto">
      <div className="min-w-max">
        <div className="grid grid-cols-9 p-4 bg-slate-50 text-sm font-medium text-slate-500">
          <div className="col-span-3">Campaign</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Due Date</div>
          <div className="col-span-1">Participants</div>
          <div className="col-span-2">Performance</div>
          <div className="col-span-1">Actions</div>
        </div>

        {campaignsData.length > 0 ? (
          campaignsData.map((campaign) => (
            <div
              key={campaign.id}
              className="grid grid-cols-9 p-4 border-t items-center"
            >
              <div className="col-span-3">
                <p className="font-medium truncate">{campaign.title}</p>
              </div>
              <div className="col-span-1">
                <Badge
                  className={`
                      ${
                        campaign.status === "active"
                          ? "bg-green-50 text-green-600 border-green-200"
                          : ""
                      }
                      ${
                        campaign.status === "completed"
                          ? "bg-gray-50 text-gray-600 border-gray-200"
                          : ""
                      }
                      ${
                        campaign.status === "draft"
                          ? "bg-amber-50 text-amber-600 border-amber-200"
                          : ""
                      }
                    `}
                >
                  {campaign.status.charAt(0).toUpperCase() +
                    campaign.status.slice(1)}
                </Badge>
              </div>
              <div className="col-span-1 flex items-center">
                <span className="text-sm">{campaign.dueDate}</span>
              </div>
              <div className="col-span-1">
                <div className="flex flex-col">
                  <span className="font-medium">
                    {campaign.participants} Creators
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {campaign.submissions} Submissions
                  </span>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>
                      {campaign.status === "draft" ? "0" : campaign.views}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    <span>
                      {campaign.status === "draft" ? "0" : campaign.likes}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>
                      {campaign.status === "draft" ? "0" : campaign.comments}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex items-center">
                <TooltipProvider>
                  <div className="flex gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            router.push(`/admin/campaigns/${campaign.id}`)
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Details</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          disabled={campaign.status === "completed"}
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            router.push(`/admin/campaigns/${campaign.id}/edit`)
                          }
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit Campaign</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            No {status} campaigns found.
          </div>
        )}
      </div>
    </div>
  );
}
