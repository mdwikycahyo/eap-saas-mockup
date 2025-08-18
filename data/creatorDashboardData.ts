import type { ActiveCampaign, AvailableCampaign } from "@/types/creator";

// Active campaigns data
export const activeCampaigns: ActiveCampaign[] = [
  {
    id: 1,
    slug: "summer-launch",
    title: "Summer Product Launch",
    description: "Share our new summer collection",

    status: "URL Required",
    platform: "instagram",
    image: "/placeholder.svg?height=300&width=600&text=Summer+Collection",
    timeRemaining: 5,
    date: "July 15, 2023",
    points: 0,
    joined: true,
  },
  {
    id: 2,
    slug: "sustainability",
    title: "Sustainability Initiative",
    description: "Share our commitment to sustainability",

    status: "URL Under Review",
    platform: "instagram",
    image: "/placeholder.svg?height=300&width=600&text=Sustainability",
    timeRemaining: 15,
    date: "July 5, 2023",
    points: 0,
    joined: true,
    postUrl: "https://www.instagram.com/p/DEF456",
  },
  {
    id: 3,
    slug: "customer-stories",
    title: "Customer Stories",
    description: "Share testimonials from happy customers.",

    status: "Live",
    platform: "instagram",
    image: "/placeholder.svg?height=300&width=600&text=Customer+Stories",
    timeRemaining: 8,
    date: "July 8, 2023",
    points: 250,
    joined: true,
    engagement: {
      views: 1500,
      likes: 85,
      comments: 12,
    },
    postUrl: "https://www.instagram.com/p/ABC123",
  },
  {
    id: 4,
    slug: "brand-challenge",
    title: "Brand Challenge",
    description: "Create a video using our hashtag",

    status: "URL Required",
    platform: "tiktok",
    image: "/placeholder.svg?height=300&width=600&text=Brand+Challenge",
    timeRemaining: 12,
    date: "July 10, 2023",
    points: 0,
    joined: true,
  },
  {
    id: 5,
    slug: "product-tutorial",
    title: "Product Tutorial",
    description: "Create a tutorial showing how to use our products",

    status: "URL Under Review",
    platform: "tiktok",
    image: "/placeholder.svg?height=300&width=600&text=Product+Tutorial",
    timeRemaining: 10,
    date: "July 1, 2023",
    points: 0,
    joined: true,
  },
  {
    id: 6,
    slug: "brand-ambassador",
    title: "Brand Ambassador Program",
    description: "Show how you represent our brand in daily life",

    status: "URL Required",
    platform: "tiktok",
    image: "/placeholder.svg?height=300&width=600&text=Brand+Ambassador",
    timeRemaining: 25,
    date: "July 3, 2023",
    points: 0,
    joined: true,
  },
  {
    id: 7,
    slug: "fitness-challenge",
    title: "Fitness Challenge",
    description: "Show how our products help with your fitness journey",

    status: "Live",
    platform: "instagram",
    image: "/placeholder.svg?height=300&width=600&text=Fitness+Challenge",
    timeRemaining: 20,
    date: "June 25, 2023",
    points: 400,
    joined: true,
    engagement: {
      views: 2500,
      likes: 320,
      comments: 45,
    },
    postUrl: "https://www.instagram.com/p/GHI789",
  },
  {
    id: 8,
    slug: "beauty-routine",
    title: "Beauty Routine Campaign",
    description: "Share your daily beauty routine featuring our products",

    status: "Completed",
    platform: "instagram",
    image: "/placeholder.svg?height=300&width=600&text=Beauty+Routine",
    timeRemaining: 0,
    date: "June 15, 2023",
    points: 500,
    joined: true,
    engagement: {
      views: 3200,
      likes: 485,
      comments: 68,
    },
    postUrl: "https://www.instagram.com/p/JKL012",
  },
  {
    id: 9,
    slug: "lifestyle-blog",
    title: "Lifestyle Blog Feature",
    description: "Create blog-style content showcasing our products in your lifestyle",

    status: "Completed",
    platform: "tiktok",
    image: "/placeholder.svg?height=300&width=600&text=Lifestyle+Blog",
    timeRemaining: 0,
    date: "June 10, 2023",
    points: 350,
    joined: true,
    engagement: {
      views: 1800,
      likes: 220,
      comments: 35,
    },
    postUrl: "https://www.tiktok.com/@user/video/987654321",
  },
];

// Available campaigns data
export const availableCampaigns: AvailableCampaign[] = [
  {
    slug: "winter-collection",
    title: "Winter Collection Preview",
    description: "Be the first to showcase our winter collection",

    status: "Available",
    image: "/placeholder.svg?height=300&width=600&text=Winter+Collection",
    timeRemaining: 14,
    points: 10,
    joined: false,
  },
  {
    slug: "product-review",
    title: "Product Review Challenge",
    description: "Create an honest review of our flagship product",

    status: "Available",
    image: "/placeholder.svg?height=300&width=600&text=Product+Review",
    timeRemaining: 21,
    points: 15,
    joined: false,
  },
  {
    slug: "holiday-special",
    title: "Holiday Special",
    description: "Share how our products make holidays special",

    status: "Available",
    image: "/placeholder.svg?height=300&width=600&text=Holiday+Special",
    timeRemaining: 30,
    points: 10,
    joined: false,
  },
  {
    slug: "user-testimonial",
    title: "User Testimonial",
    description: "Share your experience with our products",

    status: "Available",
    image: "/placeholder.svg?height=300&width=600&text=User+Testimonial",
    timeRemaining: 18,
    points: 10,
    joined: false,
  },
];

// Performance metrics
export const dashboardMetrics = {
  points: { value: 3250, change: "+350 this month" },
  content: { value: 28, change: "+5 this month" },
  views: { value: "12.4K", change: "+2.3K this month" },
  likes: { value: 1842, change: "+342 this month" },
  comments: { value: 580, change: "+125 this month" },
};
