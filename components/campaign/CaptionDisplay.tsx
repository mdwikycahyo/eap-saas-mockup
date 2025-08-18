"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

interface CaptionDisplayProps {
  caption: string;
  title?: string;
}

export function CaptionDisplay({ caption, title = "Suggested Caption" }: CaptionDisplayProps) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard(caption);
  };

  if (!caption) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">{title}</h4>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 p-2"
          onClick={handleCopy}
        >
          {isCopied() ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {isCopied() ? "Copied" : "Copy"}
        </Button>
      </div>
      <Textarea 
        readOnly 
        value={caption} 
        className="min-h-[80px] text-sm" 
      />
      {isCopied() && (
        <p className="text-xs text-green-600">Caption copied to clipboard!</p>
      )}
    </div>
  );
}
