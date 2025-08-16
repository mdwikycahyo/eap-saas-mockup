import { useState } from "react";
import { PendingApprovalItem, PendingSocialMediaItem } from "@/types/admin";

export function useModalState() {
  const [selectedApprovalItem, setSelectedApprovalItem] =
    useState<PendingApprovalItem | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const [selectedSocialMediaItem, setSelectedSocialMediaItem] =
    useState<PendingSocialMediaItem | null>(null);
  const [isSocialMediaReviewDialogOpen, setIsSocialMediaReviewDialogOpen] =
    useState(false);

  const openContentReviewDialog = (item: PendingApprovalItem) => {
    setSelectedApprovalItem(item);
    setIsReviewDialogOpen(true);
  };

  const closeContentReviewDialog = () => {
    setIsReviewDialogOpen(false);
    setSelectedApprovalItem(null);
  };

  const openSocialMediaReviewDialog = (item: PendingSocialMediaItem) => {
    setSelectedSocialMediaItem(item);
    setIsSocialMediaReviewDialogOpen(true);
  };

  const closeSocialMediaReviewDialog = () => {
    setIsSocialMediaReviewDialogOpen(false);
    setSelectedSocialMediaItem(null);
  };

  return {
    // Content Review Modal
    selectedApprovalItem,
    isReviewDialogOpen,
    openContentReviewDialog,
    closeContentReviewDialog,
    setIsReviewDialogOpen,

    // Social Media Review Modal
    selectedSocialMediaItem,
    isSocialMediaReviewDialogOpen,
    openSocialMediaReviewDialog,
    closeSocialMediaReviewDialog,
    setIsSocialMediaReviewDialogOpen,
  };
}
