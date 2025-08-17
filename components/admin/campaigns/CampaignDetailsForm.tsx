"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CampaignFormData } from "@/types/campaign";
import { getTodayString } from "@/hooks/useCampaignForm";

interface CampaignDetailsFormProps {
  formData: CampaignFormData;
  minEndDate: string;
  onUpdateField: <K extends keyof CampaignFormData>(field: K, value: CampaignFormData[K]) => void;
  isEdit?: boolean;
}

export function CampaignDetailsForm({
  formData,
  minEndDate,
  onUpdateField,
  isEdit = false,
}: CampaignDetailsFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-gray-800 text-primary-foreground rounded-full text-sm font-bold">
            1
          </div>
          Campaign Details
        </CardTitle>
        <CardDescription>Enter the essential details of your campaign.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`name-${isEdit ? 'edit' : 'create'}`}>Campaign Name *</Label>
          <Input
            id={`name-${isEdit ? 'edit' : 'create'}`}
            placeholder="Enter campaign name"
            value={formData.name}
            onChange={(e) => onUpdateField("name", e.target.value)}
            className={cn(formData.name.trim() === "" && "border-red-500")}
          />
          {formData.name.trim() === "" && (
            <p className="text-xs text-red-500">Campaign name is required</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`description-${isEdit ? 'edit' : 'create'}`}>Description & Brief *</Label>
          <Textarea
            id={`description-${isEdit ? 'edit' : 'create'}`}
            placeholder="Enter campaign description and brief for creators to follow"
            className={cn("min-h-[150px]", formData.description.trim() === "" && "border-red-500")}
            value={formData.description}
            onChange={(e) => onUpdateField("description", e.target.value)}
          />
          {formData.description.trim() === "" && (
            <p className="text-xs text-red-500">Description is required</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`start-date-${isEdit ? 'edit' : 'create'}`}>Start Date *</Label>
            <Input
              id={`start-date-${isEdit ? 'edit' : 'create'}`}
              type="date"
              value={formData.startDate}
              onChange={(e) => onUpdateField("startDate", e.target.value)}
              min={getTodayString()}
              className={cn("w-full", formData.startDate === "" && "border-red-500")}
            />
            {formData.startDate === "" && (
              <p className="text-xs text-red-500">Start date is required</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor={`end-date-${isEdit ? 'edit' : 'create'}`}>End Date *</Label>
            <Input
              id={`end-date-${isEdit ? 'edit' : 'create'}`}
              type="date"
              value={formData.endDate}
              onChange={(e) => onUpdateField("endDate", e.target.value)}
              min={minEndDate || getTodayString()}
              disabled={!formData.startDate}
              className={cn(
                "w-full",
                !formData.startDate && "bg-muted cursor-not-allowed",
                formData.endDate === "" && "border-red-500"
              )}
            />
            {!formData.startDate && (
              <p className="text-xs text-muted-foreground">Please select a start date first</p>
            )}
            {formData.startDate && formData.endDate === "" && (
              <p className="text-xs text-red-500">End date is required</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`status-${isEdit ? 'edit' : 'create'}`}>Status</Label>
          <Select 
            value={formData.status} 
            onValueChange={(value: "draft" | "active") => onUpdateField("status", value)}
          >
            <SelectTrigger id={`status-${isEdit ? 'edit' : 'create'}`}>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="active">Active</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
