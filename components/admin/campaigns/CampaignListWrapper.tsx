"use client";

import { useState } from "react";
import { CustomPagination } from "@/components/ui/custom-pagination";
import { CampaignList } from "./CampaignList";
import { Campaign } from "@/types/campaign";

interface CampaignListWrapperProps {
  status: string;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export function CampaignListWrapper({
  status,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: CampaignListWrapperProps) {
  // This mock data should ideally be fetched or managed at a higher level if it's dynamic
  // For now, we'll keep it here as in the original structure
  const campaigns: Campaign[] = [
    {
      id: 1,
      title: "Summer Product Launch",
      platforms: ["instagram"],
      dueDate: "Jul 31, 2023",
      status: "active",
      participants: 60,
      submissions: 28,
      engagement: "24.5K",
      views: "45.2K",
      likes: 1850,
      comments: 320,
    },
    {
      id: 2,
      title: "Brand Challenge",
      platforms: ["tiktok"],
      dueDate: "Aug 15, 2023",
      status: "active",
      participants: 50,
      submissions: 25,
      engagement: "0",
      views: "32K",
      likes: 2500,
      comments: 450,
    },
    {
      id: 3,
      title: "Customer Stories",
      platforms: ["instagram", "tiktok"],
      dueDate: "Aug 10, 2023",
      status: "completed",
      participants: 28,
      submissions: 22,
      engagement: "9.8K",
      views: "21.4K",
      likes: 780,
      comments: 95,
    },
    {
      id: 4,
      title: "Sustainability Initiative",
      platforms: ["instagram"],
      dueDate: "Aug 20, 2023",
      status: "draft",
      participants: 36,
      submissions: 15,
      engagement: "18.3K",
      views: "32.7K",
      likes: 1240,
      comments: 215,
    },
    {
      id: 5,
      title: "Product Tutorial",
      platforms: ["tiktok"],
      dueDate: "Aug 5, 2023",
      status: "active",
      participants: 18,
      submissions: 7,
      engagement: "5.6K",
      views: "12.8K",
      likes: 420,
      comments: 68,
    },
    {
      id: 6,
      title: "Behind the Scenes",
      platforms: ["instagram", "tiktok"],
      dueDate: "Jul 15, 2023",
      status: "completed",
      participants: 45,
      submissions: 38,
      engagement: "32.1K",
      views: "58.9K",
      likes: 2450,
      comments: 380,
    },
    {
      id: 7,
      title: "Holiday Campaign",
      platforms: ["instagram"],
      dueDate: "Dec 31, 2023",
      status: "draft",
      participants: 0,
      submissions: 0,
      engagement: "0",
      views: "0",
      likes: 0,
      comments: 0,
    },
    {
      id: 8,
      title: "New Feature Teaser",
      platforms: ["instagram"],
      dueDate: "Sep 1, 2023",
      status: "active",
      participants: 50,
      submissions: 30,
      engagement: "30K",
      views: "60K",
      likes: 2000,
      comments: 400,
    },
    {
      id: 9,
      title: "Community Contest",
      platforms: ["tiktok"],
      dueDate: "Sep 15, 2023",
      status: "active",
      participants: 25,
      submissions: 10,
      engagement: "10K",
      views: "25K",
      likes: 800,
      comments: 150,
    },
    {
      id: 10,
      title: "Archived Campaign 1",
      platforms: ["instagram"],
      dueDate: "Jan 1, 2023",
      status: "completed",
      participants: 100,
      submissions: 90,
      engagement: "50K",
      views: "100K",
      likes: 5000,
      comments: 600,
    },
    {
      id: 11,
      title: "Archived Campaign 2",
      platforms: ["tiktok"],
      dueDate: "Feb 1, 2023",
      status: "completed",
      participants: 60,
      submissions: 50,
      engagement: "40K",
      views: "80K",
      likes: 3000,
      comments: 450,
    },
    {
      id: 12,
      title: "Future Draft Idea",
      platforms: ["instagram"],
      dueDate: "Dec 31, 2024",
      status: "draft",
      participants: 0,
      submissions: 0,
      engagement: "0",
      views: "0",
      likes: 0,
      comments: 0,
    },
  ];

  const filteredCampaigns =
    status === "all"
      ? campaigns.filter((campaign) =>
          ["draft", "active", "completed"].includes(campaign.status)
        )
      : campaigns.filter((campaign) => campaign.status === status);

  const totalItems = filteredCampaigns.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <CampaignList status={status} campaignsData={paginatedCampaigns} />
      {totalItems > 0 && totalPages > 1 && (
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={(newItemsPerPage) => {
            onItemsPerPageChange(newItemsPerPage);
            onPageChange(1);
          }}
          itemName="campaigns"
        />
      )}
    </>
  );
}
