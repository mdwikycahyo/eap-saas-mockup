"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCampaignForm, formatDateToYYYYMMDD } from "@/hooks/useCampaignForm";
import { creators } from "@/data/mockCreators";
import { CampaignDetailsForm } from "@/components/admin/campaigns/CampaignDetailsForm";
import { CreatorSelectionForm } from "@/components/admin/campaigns/CreatorSelectionForm";
import { ContentAssetsForm } from "@/components/admin/campaigns/ContentAssetsForm";

// Mock data for creators with pre-selected ones
const creatorsWithSelection = [
  { ...creators[0], selected: true },
  { ...creators[1], selected: true },
  { ...creators[2], selected: false },
  { ...creators[3], selected: true },
  { ...creators[4], selected: false },
  { ...creators[5], selected: false },
  { ...creators[6], selected: false },
  { ...creators[7], selected: true },
  { ...creators[8], selected: false },
  { ...creators[9], selected: false },
  { ...creators[10], selected: false },
  { ...creators[11], selected: true },
  { ...creators[12], selected: false },
  { ...creators[13], selected: true },
  { ...creators[14], selected: false },
  { ...creators[15], selected: false },
  { ...creators[16], selected: true },
  { ...creators[17], selected: false },
  { ...creators[18], selected: false },
  { ...creators[19], selected: true },
  { ...creators[20], selected: false },
  { ...creators[21], selected: false },
  { ...creators[22], selected: true },
  { ...creators[23], selected: false },
  { ...creators[24], selected: true },
];

export default function EditCampaignPage() {
  const params = useParams<{ id: string }>();
  const campaignId = params.id;
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [campaignData, setCampaignData] = useState<any>(null);

  // Initialize form with empty data, will be populated after loading
  const { formData, minEndDate, isFormValid, updateField, updateSelectedCreators, setFormData } = useCampaignForm();

  useEffect(() => {
    setTimeout(() => {
      const fetchedCampaignData = {
        id: campaignId,
        name: "Product Launch Campaign",
        description: "Help us promote our new product launch with engaging social media content. Share your experience with our products and how they've made a difference in your life.",
        startDate: new Date(2025, 5, 15), // Example: June 15, 2025
        endDate: new Date(2025, 5, 29), // Example: June 29, 2025
        status: "active",
      };
      setCampaignData(fetchedCampaignData);

      // Initialize selected creators based on mock data
      const initiallySelected = creatorsWithSelection.filter(creator => creator.selected).map(creator => creator.id);

      // Populate form with fetched data
      setFormData({
        name: fetchedCampaignData.name,
        description: fetchedCampaignData.description,
        status: fetchedCampaignData.status as "draft" | "active",
        startDate: formatDateToYYYYMMDD(fetchedCampaignData.startDate),
        endDate: formatDateToYYYYMMDD(fetchedCampaignData.endDate),
        selectedCreators: new Set(initiallySelected),
      });

      setIsLoading(false);
    }, 500);
  }, [campaignId, setFormData]);



  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading campaign data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/campaigns">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Campaign</h1>
            <p className="text-muted-foreground">Update campaign details for {campaignData.name}</p>
          </div>
        </div>
      </div>

      <form className="space-y-8">
        <CampaignDetailsForm
          formData={formData}
          minEndDate={minEndDate}
          onUpdateField={updateField}
          isEdit={true}
        />

        <CreatorSelectionForm
          creators={creators}
          selectedCreators={formData.selectedCreators}
          onSelectionChange={updateSelectedCreators}
          isEdit={true}
        />

        <ContentAssetsForm />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
          <Button 
            className={cn(
              "w-full sm:w-auto bg-gray-800 hover:bg-gray-600 text-white",
              !isFormValid && "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
            )}
            disabled={!isFormValid}
          >
            Update Campaign
          </Button>
        </div>
      </form>
    </div>
  )
}
