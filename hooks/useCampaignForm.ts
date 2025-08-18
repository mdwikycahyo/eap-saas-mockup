import { useState, useEffect, useMemo } from "react";
import { CampaignFormData } from "@/types/campaign";

// Helper to format Date to YYYY-MM-DD string
export const formatDateToYYYYMMDD = (date: Date | undefined | null): string => {
  if (!date) return "";
  return date.toISOString().split("T")[0];
};

// Helper to get today's date as YYYY-MM-DD string
export const getTodayString = () => {
  return new Date().toISOString().split("T")[0];
};

interface UseCampaignFormProps {
  initialData?: Partial<CampaignFormData>;
}

export function useCampaignForm({ initialData }: UseCampaignFormProps = {}) {
  const [formData, setFormData] = useState<CampaignFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    status: initialData?.status || "draft",
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    selectedCreators: initialData?.selectedCreators || new Set<number>(),
  });

  const [minEndDate, setMinEndDate] = useState<string>("");

  // Handle date dependencies
  useEffect(() => {
    if (formData.startDate) {
      const start = new Date(formData.startDate);
      start.setDate(start.getDate() + 1);
      const newMinEndDate = formatDateToYYYYMMDD(start);
      setMinEndDate(newMinEndDate);
      
      if (formData.endDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
        setFormData(prev => ({ ...prev, endDate: newMinEndDate }));
      }
    } else {
      setMinEndDate("");
      setFormData(prev => ({ ...prev, endDate: "" }));
    }
  }, [formData.startDate, formData.endDate]);

  // Form validation
  const isFormValid = useMemo(() => {
    return (
      formData.name.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.startDate !== "" &&
      formData.endDate !== "" &&
      formData.selectedCreators.size > 0
    );
  }, [formData]);

  // Update functions
  const updateField = <K extends keyof CampaignFormData>(
    field: K,
    value: CampaignFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateSelectedCreators = (creatorId: number, checked: boolean) => {
    const newSelectedCreators = new Set(formData.selectedCreators);
    if (checked) {
      newSelectedCreators.add(creatorId);
    } else {
      newSelectedCreators.delete(creatorId);
    }
    setFormData(prev => ({ ...prev, selectedCreators: newSelectedCreators }));
  };

  const reset = () => {
    setFormData({
      name: "",
      description: "",
      status: "draft",
      startDate: "",
      endDate: "",
      selectedCreators: new Set<number>(),
    });
  };

  return {
    formData,
    minEndDate,
    isFormValid,
    updateField,
    updateSelectedCreators,
    reset,
    setFormData,
  };
}
