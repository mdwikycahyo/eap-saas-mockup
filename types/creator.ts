export interface Engagement {
  views: number;
  likes: number;
  comments: number;
}

export interface ActiveCampaign {
  id: number;
  slug: string;
  title: string;
  description: string;
  status: string;
  platform: string;
  image: string;
  timeRemaining: number;
  date: string;
  points: number;
  joined: boolean;
  engagement?: Engagement;
  postUrl?: string;
}

export interface AvailableCampaign {
  slug: string;
  title: string;
  description: string;
  status: string;
  image: string;
  timeRemaining: number;
  points: number;
  joined: boolean;
}

export interface DashboardMetrics {
  points: { value: number; change: string };
  content: { value: number; change: string };
  views: { value: string; change: string };
  likes: { value: number; change: string };
  comments: { value: number; change: string };
}
