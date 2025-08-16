import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CampaignPerformance } from "@/types/admin";

interface CampaignPerformanceSectionProps {
  campaigns: CampaignPerformance[];
}

export function CampaignPerformanceSection({
  campaigns,
}: CampaignPerformanceSectionProps) {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <>
      {/* Mobile Layout */}
      <Card className="flex flex-col md:hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-sm line-clamp-2 flex-1">
                    {campaign.name}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs ml-2 flex-shrink-0"
                    onClick={() => navigateTo(`/admin/campaigns/${campaign.id}`)}
                  >
                    View Detail
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded text-center">
                    <span className="text-xs text-muted-foreground">
                      Creators
                    </span>
                    <span className="font-medium text-sm">
                      {campaign.creators}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded text-center">
                    <span className="text-xs text-muted-foreground">
                      Content
                    </span>
                    <span className="font-medium text-sm">
                      {campaign.content}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded text-center">
                    <span className="text-xs text-muted-foreground">Views</span>
                    <span className="font-medium text-sm">{campaign.views}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded text-center">
                    <span className="text-xs text-muted-foreground">Likes</span>
                    <span className="font-medium text-sm">{campaign.likes}</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded text-center">
                    <span className="text-xs text-muted-foreground">
                      Comments
                    </span>
                    <span className="font-medium text-sm">
                      {campaign.comments}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <div className="p-4 border-t">
          <Button
            variant="outline"
            className="w-full text-sm bg-transparent"
            onClick={() => navigateTo("/admin/campaigns")}
          >
            View All Campaigns
          </Button>
        </div>
      </Card>

      {/* Desktop Layout */}
      <Card className="md:col-span-2 flex flex-col hidden md:flex">
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] overflow-auto">
          <div className="space-y-6">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <h3 className="font-medium">{campaign.name}</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => navigateTo(`/admin/campaigns/${campaign.id}`)}
                  >
                    View Details
                  </Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-3">
                  <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                    <span className="text-xs text-muted-foreground">
                      Creators
                    </span>
                    <span className="font-medium">{campaign.creators}</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                    <span className="text-xs text-muted-foreground">
                      Content
                    </span>
                    <span className="font-medium">{campaign.content}</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                    <span className="text-xs text-muted-foreground">Views</span>
                    <span className="font-medium">{campaign.views}</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                    <span className="text-xs text-muted-foreground">Likes</span>
                    <span className="font-medium">{campaign.likes}</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded md:col-span-1 sm:col-span-3 col-span-2">
                    <span className="text-xs text-muted-foreground">
                      Comments
                    </span>
                    <span className="font-medium">{campaign.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <div className="p-4 mt-auto border-t">
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => navigateTo("/admin/campaigns")}
          >
            View All Campaigns
          </Button>
        </div>
      </Card>
    </>
  );
}
