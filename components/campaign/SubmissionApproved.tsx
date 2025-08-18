"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2 } from "lucide-react";

interface SubmissionApprovedProps {
  publishedUrl?: string;
}

export function SubmissionApproved({ publishedUrl }: SubmissionApprovedProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Content Approved</CardTitle>
          <CardDescription>Your content has been approved and you've earned points</CardDescription>
        </CardHeader>
        <CardContent>
          {publishedUrl && (
            <div className="flex items-center gap-2 mb-4">
              <Share2 className="h-4 w-4 text-muted-foreground" />
              <a
                href={publishedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {publishedUrl}
              </a>
            </div>
          )}
          <Button variant="outline" className="w-full">
            Update Published URL
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
