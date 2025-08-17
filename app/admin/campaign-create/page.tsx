"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCampaignForm } from "@/hooks/useCampaignForm";
import { creators } from "@/data/mockCreators";
import { CampaignDetailsForm } from "@/components/admin/campaigns/CampaignDetailsForm";
import { CreatorSelectionForm } from "@/components/admin/campaigns/CreatorSelectionForm";
import { ContentAssetsForm } from "@/components/admin/campaigns/ContentAssetsForm";

export default function CreateCampaignPage() {
  const {
    formData,
    minEndDate,
    isFormValid,
    updateField,
    updateSelectedCreators,
  } = useCampaignForm();

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
            <h1 className="text-3xl font-bold tracking-tight">
              Create Campaign
            </h1>
            <p className="text-muted-foreground">
              Create a new campaign for your creators to promote.
            </p>
          </div>
        </div>
      </div>

      <form className="space-y-8">
        <CampaignDetailsForm
          formData={formData}
          minEndDate={minEndDate}
          onUpdateField={updateField}
          isEdit={false}
        />

        <CreatorSelectionForm
          creators={creators}
          selectedCreators={formData.selectedCreators}
          onSelectionChange={updateSelectedCreators}
          isEdit={false}
        />

        <ContentAssetsForm />

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-4">
          <Button
            className={cn(
              "bg-gray-800 hover:bg-gray-600 text-white",
              !isFormValid && "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
            )}
            disabled={!isFormValid}
          >
            Create Campaign
          </Button>
        </div>
      </form>
    </div>
  );
}
