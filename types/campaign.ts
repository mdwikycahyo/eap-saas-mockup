export interface Creator {
  id: number;
  name: string;
  email: string;
  province: string;
  city: string;
  selected?: boolean;
}

export interface Campaign {
  id: number;
  title: string;
  platforms: string[];
  dueDate: string;
  status: "draft" | "active" | "completed";
  participants: number;
  submissions: number;
  engagement: string;
  views: string;
  likes: number;
  comments: number;
}

export interface CampaignFormData {
  name: string;
  description: string;
  status: "draft" | "active";
  startDate: string;
  endDate: string;
  selectedCreators: Set<number>;
}

export interface CreatorFilters {
  province: string;
  city: string;
  searchTerm: string;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}
