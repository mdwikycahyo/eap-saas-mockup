import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { PendingApprovalItem } from "@/types/admin";
import { SocialPlatformIcon } from "@/components/admin/shared/SocialPlatformIcon";

interface ContentApprovalSectionProps {
  pendingContentApprovals: PendingApprovalItem[];
  onOpenReviewDialog: (item: PendingApprovalItem) => void;
}

export function ContentApprovalSection({
  pendingContentApprovals,
  onOpenReviewDialog,
}: ContentApprovalSectionProps) {
  const router = useRouter();

  return (
    <>
      {/* Mobile Layout */}
      <Card className="flex flex-col md:hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base">Content Approvals</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {pendingContentApprovals.length} Pending
          </Badge>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {pendingContentApprovals.map((item) => (
              <div key={item.id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex-grow min-w-0">
                      <p className="font-medium text-sm truncate">
                        {item.creatorName}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <SocialPlatformIcon
                          platform={item.platform}
                          className="h-3.5 w-3.5"
                        />
                        <span className="capitalize">{item.platform}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <p className="text-xs text-muted-foreground">
                      {item.submissionTime}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-7 px-2"
                      onClick={() => onOpenReviewDialog(item)}
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {pendingContentApprovals.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No pending content approvals.
              </p>
            )}
          </div>
        </CardContent>
        <div className="p-4 border-t">
          <Button
            variant="outline"
            className="w-full text-sm bg-transparent"
            onClick={() => router.push("/admin/moderation")}
          >
            Review All Submissions
          </Button>
        </div>
      </Card>

      {/* Desktop Layout */}
      <Card className="md:col-span-1 flex flex-col h-[400px] hidden md:flex">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Content Approvals</CardTitle>
          </div>
          <Badge variant="outline" className="ml-2">
            {pendingContentApprovals.length} Pending
          </Badge>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto">
          <div className="space-y-3">
            {pendingContentApprovals.map((item) => (
              <div key={item.id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex-grow min-w-0">
                      <p className="font-medium text-sm">{item.creatorName}</p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <SocialPlatformIcon
                          platform={item.platform}
                          className="h-3.5 w-3.5"
                        />
                        <span className="capitalize">{item.platform}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2 flex items-center gap-2">
                    <p className="text-xs text-muted-foreground mr-2">
                      {item.submissionTime}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-7 px-2"
                      onClick={() => onOpenReviewDialog(item)}
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {pendingContentApprovals.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No pending content approvals.
              </p>
            )}
          </div>
        </CardContent>
        <div className="p-4 mt-auto border-t">
          <Button
            variant="outline"
            className="w-full gap-1 bg-transparent"
            onClick={() => router.push("/admin/moderation")}
          >
            Review All Submissions
          </Button>
        </div>
      </Card>
    </>
  );
}
