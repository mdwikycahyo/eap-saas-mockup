"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Share2 } from "lucide-react";

interface SubmissionUnderReviewProps {
  publishedUrl?: string;
}

export function SubmissionUnderReview({ publishedUrl }: SubmissionUnderReviewProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Content Under Review</CardTitle>
          <CardDescription>Your content URL is being reviewed</CardDescription>
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
          <Alert className="bg-amber-50 border-amber-200 mt-4">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertTitle className="text-sm font-medium">Under Review</AlertTitle>
            <AlertDescription className="text-sm">
              Your submission is currently being reviewed. You'll receive points once it's approved.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
