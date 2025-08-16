import { useState } from "react";
import { PendingApprovalItem, PendingSocialMediaItem } from "@/types/admin";
import {
  initialMockPendingApprovals,
  initialMockPendingSocialMedia,
} from "@/data/mockApprovals";

export function useApprovals() {
  const [pendingContentApprovals, setPendingContentApprovals] = useState<
    PendingApprovalItem[]
  >(initialMockPendingApprovals);

  const [pendingSocialMedia, setPendingSocialMedia] = useState<
    PendingSocialMediaItem[]
  >(initialMockPendingSocialMedia);

  const handleApproveContent = (itemId: string) => {
    console.log("Approving content:", itemId);
    setPendingContentApprovals((prev) =>
      prev.filter((item) => item.id !== itemId)
    );
  };

  const handleRejectContent = (itemId: string) => {
    console.log("Rejecting content:", itemId);
    setPendingContentApprovals((prev) =>
      prev.filter((item) => item.id !== itemId)
    );
  };

  const handleVerifySocialMedia = (itemId: string) => {
    console.log("Verifying social media:", itemId);
    setPendingSocialMedia((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleRejectSocialMedia = (itemId: string) => {
    console.log("Rejecting social media:", itemId);
    setPendingSocialMedia((prev) => prev.filter((item) => item.id !== itemId));
  };

  return {
    pendingContentApprovals,
    pendingSocialMedia,
    handleApproveContent,
    handleRejectContent,
    handleVerifySocialMedia,
    handleRejectSocialMedia,
  };
}
