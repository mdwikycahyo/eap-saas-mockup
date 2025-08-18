"use client";

import { Button } from "@/components/ui/button";
import { Archive } from "lucide-react";
import { AssetViewer } from "./AssetViewer";
import { CaptionDisplay } from "./CaptionDisplay";
import type { Campaign } from "@/data/campaignData";

interface CampaignAssetsTabProps {
  campaign: Campaign;
}

export function CampaignAssetsTab({ campaign }: CampaignAssetsTabProps) {
  const assets = campaign.submittedContent?.assets || campaign.assets || [];
  // Filter out PDF assets - only show IMAGE and VIDEO assets
  const filteredAssets = assets.filter(asset => asset.type === "IMAGE" || asset.type === "VIDEO");
  const firstAssetCaption = filteredAssets[0]?.caption;

  const handleDownloadAllAssets = () => {
    // In a real app, this would trigger a download of all assets as a zip file
    console.log("Downloading all assets as zip");
    alert("Downloading all assets as a zip file");
  };

  // Default caption if no assets have captions
  const defaultCaption = "Check out this amazing campaign! Excited to share this with you all. #BrandCampaign @brandname [Creator: @yourhandle]";
  const displayCaption = firstAssetCaption || defaultCaption;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Download these assets to help you create content for this campaign. You can use them directly or as inspiration for your own creative content.
      </p>

      <div className="space-y-6">
        {/* Image/Video Assets */}
        {filteredAssets.length > 0 && (
          <>
            <AssetViewer assets={filteredAssets} />
            
            <div className="flex justify-center mt-4">
              <Button className="gap-2" onClick={handleDownloadAllAssets}>
                <Archive className="h-4 w-4" /> Download All Assets
              </Button>
            </div>
          </>
        )}

        {/* No assets available */}
        {filteredAssets.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No visual assets available for this campaign.</p>
          </div>
        )}

        {/* Suggested Caption - Always show */}
        <CaptionDisplay caption={displayCaption} />
      </div>
    </div>
  );
}
