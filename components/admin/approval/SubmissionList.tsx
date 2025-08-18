"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, Instagram } from "lucide-react"
import { TikTokIcon } from "@/components/tik-tok-icon"
import { CustomPagination } from "@/components/ui/custom-pagination"

interface Submission {
  id: string
  creator: { name: string; department: string }
  campaign: string
  submittedAt: string
  status: "pending" | "approved" | "rejected"
  platform: "instagram" | "tiktok"
  submittedUrl: string
}

interface SubmissionListProps {
  submissions: Submission[]
  title: string
  description: string
  onSubmissionSelect: (submission: Submission, index: number) => void
  selectedSubmissionId?: string | null
  currentPage: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
}

function SubmissionTable({
  submissions,
  onSubmissionSelect,
  selectedSubmissionId,
  startIndex,
}: {
  submissions: Submission[]
  onSubmissionSelect: (submission: Submission, index: number) => void
  selectedSubmissionId?: string | null
  startIndex: number
}) {
  return (
    <div className="overflow-x-auto">
      <div className="rounded-md border min-w-[900px]">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-sm font-medium text-slate-500">
              <th className="p-4 text-left w-1/5">Creator</th>
              <th className="p-4 text-left w-1/5">Campaign</th>
              <th className="p-4 text-left w-1/8">Platform</th>
              <th className="p-4 text-left w-1/8">Submitted</th>
              <th className="p-4 text-left w-1/8">Status</th>
              <th className="p-4 text-left w-1/8">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length > 0 ? (
              submissions.map((submission, index) => {
                const actualIndex = startIndex + index
                const isSelected = selectedSubmissionId === submission.id
                
                return (
                  <tr 
                    key={submission.id} 
                    className={`border-t cursor-pointer transition-colors hover:bg-slate-50 ${
                      isSelected ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                    onClick={() => onSubmissionSelect(submission, actualIndex)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium">{submission.creator.name}</p>
                          <p className="text-xs text-muted-foreground">{submission.creator.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p>{submission.campaign}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        {submission.platform === "instagram" ? (
                          <Instagram className="h-4 w-4" />
                        ) : (
                          <TikTokIcon className="h-4 w-4" />
                        )}
                        <span className="text-sm capitalize">{submission.platform}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{submission.submittedAt}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {submission.status === "pending" && (
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1 border-amber-500 text-amber-500"
                          >
                            <Clock className="h-3 w-3" />
                            <span>Pending</span>
                          </Badge>
                        )}
                        {submission.status === "approved" && (
                          <Badge variant="default" className="flex items-center gap-1 bg-green-500">
                            <CheckCircle className="h-3 w-3" />
                            <span>Approved</span>
                          </Badge>
                        )}
                        {submission.status === "rejected" && (
                          <Badge variant="secondary" className="flex items-center gap-1 bg-red-100 text-red-600">
                            <XCircle className="h-3 w-3" />
                            <span>Rejected</span>
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            onSubmissionSelect(submission, actualIndex)
                          }}
                        >
                          {isSelected ? "Selected" : "Review"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function SubmissionList({
  submissions,
  title,
  description,
  onSubmissionSelect,
  selectedSubmissionId,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: SubmissionListProps) {
  const totalItems = submissions.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentSubmissions = submissions.slice(startIndex, endIndex)

  return (
    <Card>
      <CardHeader className="px-6">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <div className="space-y-4">
          <SubmissionTable
            submissions={currentSubmissions}
            onSubmissionSelect={onSubmissionSelect}
            selectedSubmissionId={selectedSubmissionId}
            startIndex={startIndex}
          />
          {totalItems > 0 && (
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              totalItems={totalItems}
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
