import { useState } from "react";
import { PendingApprovalItem, PendingSocialMediaItem } from "@/types/admin";
import {
  initialMockPendingApprovals,
  initialMockPendingSocialMedia,
} from "@/data/mockApprovals";

export function useApprovals() {
  const [pendingUrlApprovals, setPendingUrlApprovals] = useState<
    PendingApprovalItem[]
  >(initialMockPendingApprovals);

  const [pendingSocialMedia, setPendingSocialMedia] = useState<
    PendingSocialMediaItem[]
  >(initialMockPendingSocialMedia);

  const handleApproveUrl = (itemId: string) => {
    console.log("Approving URL:", itemId);
    setPendingUrlApprovals((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, approvalStatus: "URL_APPROVED" }
          : item
      )
    );
  };

  const handleRejectUrl = (itemId: string) => {
    console.log("Rejecting URL:", itemId);
    setPendingUrlApprovals((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, approvalStatus: "URL_REJECTED" }
          : item
      )
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
    pendingUrlApprovals,
    pendingSocialMedia,
    handleApproveUrl,
    handleRejectUrl,
    handleVerifySocialMedia,
    handleRejectSocialMedia,
  };
}
