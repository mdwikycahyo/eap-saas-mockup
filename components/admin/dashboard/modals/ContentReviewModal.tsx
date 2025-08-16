import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  ArrowDownCircle,
  LinkIcon,
} from "lucide-react";
import { PendingApprovalItem } from "@/types/admin";
import { SocialPlatformIcon } from "@/components/admin/shared/SocialPlatformIcon";

interface ContentReviewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedItem: PendingApprovalItem | null;
  onApprove: (itemId: string) => void;
  onReject: (itemId: string) => void;
}

export function ContentReviewModal({
  isOpen,
  onOpenChange,
  selectedItem,
  onApprove,
  onReject,
}: ContentReviewModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const contentPreviewRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  const displayImages =
    selectedItem?.content?.images && selectedItem.content.images.length > 0
      ? selectedItem.content.images
      : [
          {
            id: 1,
            src: "/placeholder.svg?height=400&width=400",
            alt: "Placeholder",
          },
        ];

  const nextImage = () => {
    if (displayImages.length > 1) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % displayImages.length
      );
    }
  };

  const prevImage = () => {
    if (displayImages.length > 1) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + displayImages.length) % displayImages.length
      );
    }
  };

  const checkScrollability = () => {
    if (contentPreviewRef.current) {
      const { scrollHeight, clientHeight } = contentPreviewRef.current;
      setShowScrollHint(scrollHeight > clientHeight);
    } else {
      setShowScrollHint(false);
    }
  };

  useEffect(() => {
    if (isOpen && selectedItem) {
      setCurrentImageIndex(0);
      setTimeout(checkScrollability, 100);
    }
  }, [selectedItem, currentImageIndex, isOpen]);

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) setShowScrollHint(false);
  };

  if (!selectedItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-w-[95vw] max-h-[95vh] md:max-h-[90vh] flex flex-col rounded-lg">
        <DialogHeader>
          <DialogTitle>Content URL Review</DialogTitle>
          <DialogDescription>
            Review the submitted content and moderate the post URL submission
            from the creator.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6 py-4 px-1 flex-1 overflow-y-auto md:overflow-hidden">
          <div
            ref={contentPreviewRef}
            className="relative md:max-h-[70vh] md:overflow-y-auto md:pr-1"
          >
            {selectedItem.content && (
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Campaign Assets</h3>
                {selectedItem.content.images &&
                  selectedItem.content.images.length > 0 && (
                    <div className="relative">
                      <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-md mb-2 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={
                              displayImages[currentImageIndex]?.src ||
                              "/placeholder.svg?height=400&width=400&query=content+image" ||
                              "/placeholder.svg"
                            }
                            alt={
                              displayImages[currentImageIndex]?.alt ||
                              "Content image"
                            }
                            className="w-full h-full object-contain rounded-md"
                          />
                        </div>
                        {displayImages.length > 1 && (
                          <div className="absolute inset-0 flex items-center justify-between px-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full bg-white/70 hover:bg-white/90 dark:bg-slate-700/70 dark:hover:bg-slate-700/90"
                              onClick={prevImage}
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full bg-white/70 hover:bg-white/90 dark:bg-slate-700/70 dark:hover:bg-slate-700/90"
                              onClick={nextImage}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                {selectedItem.content.videoSrc && (
                  <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-md mb-2 flex items-center justify-center">
                    <video
                      controls
                      src={selectedItem.content.videoSrc}
                      className="max-w-full max-h-full rounded-md"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
            )}
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Description</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md text-sm max-h-24 overflow-y-auto">
                {selectedItem.campaignName}
              </div>
            </div>
            <div className="pb-8 md:pb-0">
              <h3 className="text-sm font-medium mb-2">Caption</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md text-sm whitespace-pre-wrap max-h-32 overflow-y-auto">
                {selectedItem.content?.caption || "No caption available"}
              </div>
            </div>
            {showScrollHint && selectedItem.content && (
              <div className="sticky bottom-0 left-0 right-0 flex items-center justify-center p-2 bg-gradient-to-t from-background to-transparent pointer-events-none hidden md:flex">
                <div className="flex items-center gap-1 text-xs text-muted-foreground bg-card dark:bg-slate-800 px-2 py-1 rounded-full shadow">
                  <ArrowDownCircle className="h-3 w-3" />
                  Scroll for more
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col h-full md:max-h-full md:overflow-y-auto md:px-1 md:pb-0">
            <div className="flex-1 space-y-4">
              <h3 className="text-sm font-medium">Submission Details</h3>
              <div className="border border-gray-200 p-4 rounded-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {selectedItem.creatorName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {selectedItem.creatorName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedItem.email || "N/A Email"}
                    </p>
                  </div>
                </div>
                <div className="space-y-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Campaign
                    </p>
                    <p className="text-sm font-medium line-clamp-2">
                      {selectedItem.campaignName}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Social Media
                      </p>
                      <div className="flex items-center gap-1">
                        <SocialPlatformIcon
                          platform={selectedItem.platform}
                          className="h-4 w-4"
                        />
                        <span className="text-sm font-medium">
                          {selectedItem.socialHandle ||
                            `@${selectedItem.creatorName
                              .toLowerCase()
                              .replace(" ", "_")}`}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Submitted
                      </p>
                      <p className="text-sm font-medium">
                        {selectedItem.submissionTime}
                      </p>
                    </div>
                  </div>
                </div>
                {selectedItem.approvalStatus === "CONTENT_URL_REVIEW" &&
                  selectedItem.submittedUrl && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Submitted Post URL
                      </p>
                      <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
                        <a
                          href={selectedItem.submittedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
                        >
                          Review Content <LinkIcon className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  )}
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">
                  Moderation <span className="text-red-500">*</span>
                </h3>
                <Textarea
                  placeholder="Add feedback or notes..."
                  className="min-h-[80px] resize-none"
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="border-t pt-4 mt-4">
          <div className="flex flex-col md:flex-row gap-2 w-full md:justify-end">
            <Button
              className="w-full md:w-auto gap-1 bg-green-600 hover:bg-green-700 text-white order-1 md:order-1"
              onClick={() => onApprove(selectedItem.id)}
            >
              <CheckCircle className="h-4 w-4" />
              Approve
            </Button>
            <Button
              variant="outline"
              className="w-full md:w-auto gap-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950 bg-transparent order-2 md:order-2"
              onClick={() => onReject(selectedItem.id)}
            >
              <XCircle className="h-4 w-4" />
              Reject
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
