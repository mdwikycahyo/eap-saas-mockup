import { useState } from "react";

export function useCampaignSubmission() {
  const [postUrl, setPostUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [platform, setPlatform] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);

      // Create preview URLs
      const urls = [];
      for (let i = 0; i < e.target.files.length; i++) {
        urls.push(URL.createObjectURL(e.target.files[i]));
      }
      setPreviewUrls(urls);
    }
  };

  const handleSubmitContent = (e: React.FormEvent, campaignSlug: string | null) => {
    e.preventDefault();
    // Handle form submission
    console.log({ campaignSlug, platform, caption, files });
    // In a real app, you would upload the files and submit the form data
    resetForm();
  };

  const handleSubmitUrl = (e: React.FormEvent, campaignSlug: string | null, onSuccess?: () => void) => {
    e.preventDefault();
    // Handle URL submission
    console.log({ campaignSlug, postUrl });
    // In a real app, you would submit the URL
    resetForm();
    onSuccess?.();
  };

  const resetForm = () => {
    setPostUrl("");
    setCaption("");
    setFiles(null);
    setPreviewUrls([]);
    setPlatform("");
  };

  return {
    postUrl,
    setPostUrl,
    caption,
    setCaption,
    files,
    previewUrls,
    platform,
    setPlatform,
    handleFileChange,
    handleSubmitContent,
    handleSubmitUrl,
    resetForm,
  };
}
