"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  CheckCircle,
  XCircle,
  Instagram,
  ExternalLink,
  Clock,
  User,
  Calendar,
  Award,
  RotateCcw,
  Edit3,
  AlertTriangle,
  Shield,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"
import { TikTokIcon } from "@/components/tik-tok-icon"

interface Submission {
  id: string
  creator: {
    id: string
    name: string
    department: string
    avatar: string
    email?: string
    socialHandle?: string
  }
  campaign: string
  platform: "instagram" | "tiktok"
  submittedUrl: string
  submittedAt: string
  status: "pending" | "approved" | "rejected"
  approvedAt?: string
  approvedBy?: string
  rejectedAt?: string
  rejectedBy?: string
  points?: number
  feedback?: string
}

interface SubmissionSidePanelProps {
  isOpen: boolean
  onClose: () => void
  submission: Submission | null
  submissions: Submission[]
  currentIndex: number
  onNavigate: (direction: 'prev' | 'next') => void
  onStatusUpdate: (submissionId: string, newStatus: string, feedback?: string, additionalData?: any) => void
}

// Enhanced mock data for the panel
const getEnhancedSubmissionData = (submission: Submission): Submission => {
  const enhanced: Record<string, Partial<Submission>> = {
    "3": {
      approvedAt: "1 hour ago",
      approvedBy: "Admin Johnson",
      points: 150,
      feedback: "Great content! The tutorial was clear and engaging. Keep up the excellent work!",
    },
    "4": {
      rejectedAt: "2 hours ago",
      rejectedBy: "Admin Smith",
      feedback: "The content doesn't align with our brand guidelines. Please ensure the caption includes the required hashtags and mentions. Also, please make sure the image quality meets our standards.",
    },
    "5": {
      approvedAt: "1 day ago",
      approvedBy: "Admin Davis",
      points: 200,
      feedback: "Excellent execution of the holiday theme! Great engagement potential.",
    },
    "7": {
      rejectedAt: "1 day ago",
      rejectedBy: "Admin Wilson",
      feedback: "Content quality needs improvement. The image is blurry and the caption lacks required brand elements.",
    },
    "8": {
      approvedAt: "4 hours ago",
      approvedBy: "Admin Johnson",
      points: 175,
      feedback: "Perfect representation of our summer campaign. High quality content!",
    },
  }

  return {
    ...submission,
    creator: {
      ...submission.creator,
      email: `${submission.creator.name.toLowerCase().replace(' ', '.')}@example.com`,
      socialHandle: `@${submission.creator.name.toLowerCase().replace(' ', '_')}`,
    },
    ...enhanced[submission.id],
  }
}

export function SubmissionSidePanel({
  isOpen,
  onClose,
  submission,
  submissions,
  currentIndex,
  onNavigate,
  onStatusUpdate,
}: SubmissionSidePanelProps) {
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const enhancedSubmission = submission ? getEnhancedSubmissionData(submission) : null
  const totalSubmissions = submissions.length

  useEffect(() => {
    if (enhancedSubmission?.feedback) {
      setFeedback("")
    }
  }, [enhancedSubmission?.id])

  const handleApprove = async () => {
    if (!enhancedSubmission) return
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
    
    onStatusUpdate(enhancedSubmission.id, "approved", feedback || "Approved", {
      approvedAt: "Just now",
      approvedBy: "Current Admin",
      points: 150,
    })
    
    setFeedback("")
    setIsSubmitting(false)
  }

  const handleReject = async () => {
    if (!enhancedSubmission || !feedback.trim()) {
      alert("Please provide feedback for rejection")
      return
    }

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
    
    onStatusUpdate(enhancedSubmission.id, "rejected", feedback, {
      rejectedAt: "Just now",
      rejectedBy: "Current Admin",
    })
    
    setFeedback("")
    setIsSubmitting(false)
  }

  const handleReopen = async () => {
    if (!enhancedSubmission) return
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
    
    onStatusUpdate(enhancedSubmission.id, "pending", "", {
      approvedAt: undefined,
      approvedBy: undefined,
      rejectedAt: undefined,
      rejectedBy: undefined,
      points: undefined,
    })
    
    setFeedback("")
    setIsSubmitting(false)
  }

  const handleUpdateFeedback = async () => {
    if (!enhancedSubmission || !feedback.trim()) {
      alert("Please provide feedback")
      return
    }

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
    
    onStatusUpdate(enhancedSubmission.id, enhancedSubmission.status, feedback)
    setFeedback("")
    setIsSubmitting(false)
  }

  const handleRevoke = async () => {
    if (!enhancedSubmission) return
    
    if (confirm("Are you sure you want to revoke this approval? This action cannot be undone.")) {
      setIsSubmitting(true)
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
      
      onStatusUpdate(enhancedSubmission.id, "rejected", feedback || "Approval revoked by admin", {
        rejectedAt: "Just now",
        rejectedBy: "Current Admin",
        approvedAt: undefined,
        approvedBy: undefined,
        points: undefined,
      })
      
      setFeedback("")
      setIsSubmitting(false)
    }
  }

  if (!isOpen || !enhancedSubmission) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      
      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl border-l">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-slate-50">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate('prev')}
                disabled={currentIndex === 0}
                className="h-8 w-8"
                title="Previous"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="text-center">
                <h2 className="font-semibold text-sm">Submission Review</h2>
                <p className="text-xs text-muted-foreground">
                  {currentIndex + 1} of {totalSubmissions}
                </p>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate('next')}
                disabled={currentIndex === totalSubmissions - 1}
                className="h-8 w-8"
                title="Next"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>



          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-6">
              {/* Submission Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{enhancedSubmission.campaign}</h3>
                  <Badge 
                    variant={
                      enhancedSubmission.status === "approved" ? "default" :
                      enhancedSubmission.status === "rejected" ? "destructive" : "secondary"
                    }
                    className={
                      enhancedSubmission.status === "approved" ? "bg-green-100 text-green-800 border-green-200" :
                      enhancedSubmission.status === "rejected" ? "" : "bg-amber-100 text-amber-800 border-amber-200"
                    }
                  >
                    {enhancedSubmission.status === "pending" ? "Pending Review" :
                     enhancedSubmission.status === "approved" ? "Approved" : "Rejected"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  by {enhancedSubmission.creator.name} • {enhancedSubmission.submittedAt}
                </p>
              </div>

              {/* URL Section */}
              <div className="border rounded-lg">
                <div className="p-3 border-b bg-slate-50">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    {enhancedSubmission.platform === "instagram" ? (
                      <Instagram className="h-4 w-4" />
                    ) : (
                      <TikTokIcon className="h-4 w-4" />
                    )}
                    Submitted URL
                  </h4>
                </div>
                <div className="p-3 space-y-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Platform:</p>
                    <div className="flex items-center gap-2">
                      {enhancedSubmission.platform === "instagram" ? (
                        <Instagram className="h-4 w-4" />
                      ) : (
                        <TikTokIcon className="h-4 w-4" />
                      )}
                      <span className="capitalize text-sm">{enhancedSubmission.platform}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">URL:</p>
                    <div className="p-2 bg-slate-50 rounded border text-xs break-all text-blue-600">
                      {enhancedSubmission.submittedUrl}
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(enhancedSubmission.submittedUrl, '_blank')}
                    className="w-full"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Post
                  </Button>
                </div>
              </div>

              {/* Status-specific interfaces */}
              {enhancedSubmission.status === "pending" && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Feedback (required for rejection):
                    </Label>
                    <Textarea
                      placeholder="Provide feedback for the creator..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="min-h-[80px] mt-1"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={handleApprove}
                      disabled={isSubmitting}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {isSubmitting ? "Approving..." : "Approve URL"}
                    </Button>
                    <Button
                      onClick={handleReject}
                      disabled={isSubmitting}
                      variant="destructive"
                      className="w-full"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      {isSubmitting ? "Rejecting..." : "Reject URL"}
                    </Button>
                  </div>
                </div>
              )}

              {enhancedSubmission.status === "approved" && (
                <div className="space-y-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <p className="text-green-800 font-medium text-sm">URL Approved</p>
                  </div>

                  {/* Approval Details */}
                  <div className="space-y-2 p-3 bg-slate-50 rounded-lg">
                    <h5 className="text-xs font-medium flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Approval Details
                    </h5>
                    <div className="space-y-1 text-xs">
                      {enhancedSubmission.approvedBy && (
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">By:</span>
                          <span>{enhancedSubmission.approvedBy}</span>
                        </div>
                      )}
                      {enhancedSubmission.approvedAt && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">At:</span>
                          <span>{enhancedSubmission.approvedAt}</span>
                        </div>
                      )}
                      {enhancedSubmission.points && (
                        <div className="flex items-center gap-2">
                          <Award className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Points:</span>
                          <span className="text-green-600 font-medium">{enhancedSubmission.points}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {enhancedSubmission.feedback && (
                    <div>
                      <Label className="text-xs font-medium">Approval Feedback:</Label>
                      <div className="p-2 bg-green-50 rounded border border-green-200 text-xs text-green-800 mt-1">
                        {enhancedSubmission.feedback}
                      </div>
                    </div>
                  )}

                  {/* Admin Actions */}
                  <div className="space-y-2 pt-3 border-t">
                    <Label className="text-xs font-medium">Admin Actions:</Label>
                    <Textarea
                      placeholder="Add additional feedback..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="min-h-[60px] text-xs"
                    />
                    <div className="flex flex-col gap-1">
                      <Button
                        onClick={handleUpdateFeedback}
                        variant="outline"
                        size="sm"
                        disabled={!feedback.trim() || isSubmitting}
                        className="text-xs"
                      >
                        <Edit3 className="h-3 w-3 mr-1" />
                        Update Feedback
                      </Button>
                      <Button
                        onClick={handleReopen}
                        variant="outline"
                        size="sm"
                        disabled={isSubmitting}
                        className="text-xs"
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Reopen for Review
                      </Button>
                      <Button
                        onClick={handleRevoke}
                        variant="destructive"
                        size="sm"
                        disabled={isSubmitting}
                        className="text-xs"
                      >
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Revoke Approval
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {enhancedSubmission.status === "rejected" && (
                <div className="space-y-4">
                  <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <XCircle className="h-6 w-6 text-red-600 mx-auto mb-1" />
                    <p className="text-red-800 font-medium text-sm">URL Rejected</p>
                  </div>

                  {/* Rejection Details */}
                  <div className="space-y-2 p-3 bg-slate-50 rounded-lg">
                    <h5 className="text-xs font-medium flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Rejection Details
                    </h5>
                    <div className="space-y-1 text-xs">
                      {enhancedSubmission.rejectedBy && (
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">By:</span>
                          <span>{enhancedSubmission.rejectedBy}</span>
                        </div>
                      )}
                      {enhancedSubmission.rejectedAt && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">At:</span>
                          <span>{enhancedSubmission.rejectedAt}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {enhancedSubmission.feedback && (
                    <div>
                      <Label className="text-xs font-medium">Rejection Feedback:</Label>
                      <div className="p-2 bg-red-50 rounded border border-red-200 text-xs text-red-800 mt-1">
                        {enhancedSubmission.feedback}
                      </div>
                    </div>
                  )}

                  {/* Admin Actions */}
                  <div className="space-y-2 pt-3 border-t">
                    <Label className="text-xs font-medium">Admin Actions:</Label>
                    <Textarea
                      placeholder="Update feedback..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="min-h-[60px] text-xs"
                    />
                    <div className="flex flex-col gap-1">
                      <Button
                        onClick={handleUpdateFeedback}
                        variant="outline"
                        size="sm"
                        disabled={!feedback.trim() || isSubmitting}
                        className="text-xs"
                      >
                        <Edit3 className="h-3 w-3 mr-1" />
                        Update Feedback
                      </Button>
                      <Button
                        onClick={handleReopen}
                        size="sm"
                        disabled={isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700 text-xs"
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Reopen for Review
                      </Button>
                      <Button
                        onClick={handleApprove}
                        size="sm"
                        disabled={isSubmitting}
                        className="bg-green-600 hover:bg-green-700 text-xs"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approve Anyway
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Creator & Campaign Details */}
              <div className="border-t pt-4">
                <h5 className="text-xs font-medium mb-2">Details</h5>
                <div className="space-y-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Creator</p>
                    <p className="font-medium">{enhancedSubmission.creator.name}</p>
                    <p className="text-muted-foreground">{enhancedSubmission.creator.department}</p>
                    {enhancedSubmission.creator.email && (
                      <p className="text-muted-foreground">{enhancedSubmission.creator.email}</p>
                    )}
                    {enhancedSubmission.creator.socialHandle && (
                      <p className="text-blue-600">{enhancedSubmission.creator.socialHandle}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-muted-foreground">Campaign</p>
                    <p className="font-medium">{enhancedSubmission.campaign}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Submitted</p>
                    <p className="font-medium">{enhancedSubmission.submittedAt}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
