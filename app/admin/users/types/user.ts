export interface IndonesianRegion {
  id: string
  name: string
}

export interface IndonesianCity extends IndonesianRegion {
  province_id: string
}

export interface IndonesianRegionsData {
  provinces: IndonesianRegion[]
  cities: IndonesianCity[]
}

export interface CampaignParticipation {
  id: string
  campaignName: string
  status: "Active" | "Completed" | "Pending Review"
  pointsEarned: number
  submissionDate: string
}

export interface PointHistoryEntry {
  id: string
  date: string
  description: string
  points: number
  balance: number
}

export interface User {
  id: string
  fullName: string
  email: string
  avatarUrl?: string
  phoneNumber?: string
  role: "Creator" | "Admin"
  invitationStatus: "Accepted" | "Pending Invitation"
  province?: string
  city?: string
  department?: string
  points: number
  campaignsParticipated?: CampaignParticipation[]
  pointHistory?: PointHistoryEntry[]
  instagramUsername?: string
  tiktokUsername?: string
}

// Keep Creator as an alias for backward compatibility
export type Creator = User
