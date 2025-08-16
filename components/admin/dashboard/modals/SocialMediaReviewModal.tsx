import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, LinkIcon, User } from "lucide-react";
import { PendingSocialMediaItem } from "@/types/admin";
import { SocialPlatformIcon } from "@/components/admin/shared/SocialPlatformIcon";

interface SocialMediaReviewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedItem: PendingSocialMediaItem | null;
  onVerify: (itemId: string) => void;
  onReject: (itemId: string) => void;
}

export function SocialMediaReviewModal({
  isOpen,
  onOpenChange,
  selectedItem,
  onVerify,
  onReject,
}: SocialMediaReviewModalProps) {
  const [feedback, setFeedback] = useState("");

  const handleVerify = () => {
    if (selectedItem) {
      console.log("Verifying social media:", selectedItem.id, "Feedback:", feedback);
      onVerify(selectedItem.id);
      setFeedback("");
    }
  };

  const handleReject = () => {
    if (selectedItem) {
      console.log("Rejecting social media:", selectedItem.id, "Feedback:", feedback);
      onReject(selectedItem.id);
      setFeedback("");
    }
  };

  if (!selectedItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-w-[95vw] max-h-[95vh] md:max-h-[90vh] flex flex-col rounded-lg">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Verify Social Media Account</DialogTitle>
          <DialogDescription>
            Review and verify or reject the social media account submission from
            the creator.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-1">
          <div className="py-4 space-y-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{selectedItem.creatorName}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedItem.email || "N/A Email"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Platform</p>
                  <div className="flex items-center gap-2">
                    <SocialPlatformIcon
                      platform={selectedItem.platform}
                      className="h-5 w-5"
                    />
                    <span className="font-medium capitalize">
                      {selectedItem.platform}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Submitted</p>
                  <p className="text-sm font-medium">
                    {selectedItem.submissionTime}
                  </p>
                </div>
              </div>

              <div className="space-y-1 mt-4">
                <p className="text-sm text-muted-foreground">Profile URL</p>
                <a
                  href={
                    selectedItem.profileUrl ||
                    `https://${selectedItem.platform}.com/${
                      selectedItem.username.startsWith("@")
                        ? selectedItem.username.substring(1)
                        : selectedItem.username
                    }`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline dark:text-blue-400 break-all bg-background px-3 py-2 rounded border"
                >
                  {selectedItem.username}
                  <LinkIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <label
                htmlFor="socialMediaFeedback"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
                Feedback <span className="text-muted-foreground">(Optional)</span>
              </label>
              <Textarea
                id="socialMediaFeedback"
                placeholder="Add feedback or notes..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 border-t pt-4 mt-4">
          <div className="flex flex-col md:flex-row gap-2 w-full md:justify-end">
            <Button
              variant="default"
              className="w-full md:w-auto gap-1 bg-green-600 hover:bg-green-700 text-white order-1 md:order-1"
              onClick={handleVerify}
              disabled={!selectedItem}
            >
              <CheckCircle className="h-4 w-4" />
              Verify
            </Button>
            <Button
              variant="outline"
              onClick={handleReject}
              disabled={!selectedItem}
              className="w-full md:w-auto gap-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950 bg-transparent order-2 md:order-2"
            >
              <XCircle className="h-4 w-4" />
              Reject
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
