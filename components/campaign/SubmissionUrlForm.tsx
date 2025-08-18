"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LinkIcon } from "lucide-react";

interface SubmissionUrlFormProps {
  postUrl: string;
  onPostUrlChange: (url: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function SubmissionUrlForm({ postUrl, onPostUrlChange, onSubmit }: SubmissionUrlFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
          <LinkIcon className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-medium mb-2">Submit Your Post URL</h3>
        <p className="text-muted-foreground mb-4">
          After publishing the content to your social media, submit the URL to earn points.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="post-url">Post URL</Label>
        <Input
          id="post-url"
          placeholder="https://www.instagram.com/p/..."
          value={postUrl}
          onChange={(e) => onPostUrlChange(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full">
        Submit URL
      </Button>
    </form>
  );
}
