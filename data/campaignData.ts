export interface CampaignAsset {
  name: string;
  type: "IMAGE" | "VIDEO";
  url: string;
  caption?: string;
}

export interface SubmittedContent {
  assets: CampaignAsset[];
  caption: string;
}

export interface Campaign {
  title: string;
  subtitle?: string;
  description: string;
  fullDescription: string;
  status: "Available" | "URL Required" | "URL Under Review" | "Approved";
  platforms: string[];
  timeRemaining: string;
  points: number;
  assets?: CampaignAsset[];
  submittedContent?: SubmittedContent;
  submissionDate?: string | null;
  publishedUrl?: string;
}

export interface CampaignData {
  [key: string]: Campaign;
}

// Mock campaign data - in a real app, this would come from an API
export const campaignData: CampaignData = {
  "summer-launch": {
    title: "Summer Product Launch",
    subtitle: "Share our new summer collection",
    description: "Share our new summer collection with your followers and highlight your favorite products.",
    fullDescription:
      "Our summer collection is here! We're looking for creators to share our new products with their followers. Choose your favorite items from the collection and create authentic content that showcases how they fit into your lifestyle.",
    status: "URL Required",
    platforms: ["Instagram"],
    timeRemaining: "5 days",
    points: 10,
    assets: [
      {
        name: "Summer Collection Image 1",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800",
        caption:
          "Check out our new summer collection! Perfect for those sunny days ahead. #SummerVibes #BrandCampaign @brandname [Creator: @yourhandle]",
      },
      {
        name: "Summer Collection Image 2",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800&text=Summer+Collection+2",
        caption:
          "Check out our new summer collection! Perfect for those sunny days ahead. #SummerVibes #BrandCampaign @brandname [Creator: @yourhandle]",
      },
      {
        name: "Summer Collection Video",
        type: "VIDEO",
        url: "/placeholder.svg?height=600&width=800&text=Summer+Video",
        caption:
          "Excited to share this amazing summer collection with you all! The colors are vibrant and the quality is amazing. #SummerVibes #BrandCampaign @brandname [Creator: @yourhandle]",
      },
    ],
    submissionDate: "June 15, 2023",
  },
  "brand-challenge": {
    title: "Brand Challenge",
    description: "Create a video using our branded hashtag and show how you use our products in your daily life.",
    fullDescription:
      "We're challenging creators to show how our products fit into their daily routines. Create an engaging video that demonstrates the benefits of our products in a creative way.",
    status: "URL Required",
    platforms: ["TikTok"],
    timeRemaining: "12 days",
    points: 10,
    assets: [
      {
        name: "Brand Challenge Image",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800&text=Brand+Challenge",
        caption:
          "Taking on the brand challenge! Here's how I use our amazing products in my daily routine. #BrandChallenge #DailyLife @brandname [Creator: @yourhandle]",
      },
    ],
    submissionDate: null,
  },
  "customer-stories": {
    title: "Customer Stories",
    description: "Share testimonials from happy customers and highlight how our products have made a difference.",
    fullDescription:
      "Help us showcase the real impact our products have on people's lives. Share authentic testimonials from customers who have experienced positive results with our products.",
    status: "Approved",
    platforms: ["Instagram", "TikTok"],
    timeRemaining: "8 days",
    points: 10,
    assets: [
      {
        name: "Customer Testimonial Image",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800",
        caption:
          "Hear what our customers are saying! 'This product changed my life!' - Jane D. #RealResults #CustomerStories @brandname [Creator: @yourhandle]",
      },
    ],
    submissionDate: "June 10, 2023",
    publishedUrl: "https://www.instagram.com/p/ABC123",
  },
  sustainability: {
    title: "Sustainability Initiative",
    description: "Share our commitment to sustainability",
    fullDescription: "Help us spread the word about our sustainability initiatives and eco-friendly products.",
    status: "URL Under Review",
    platforms: ["Instagram"],
    timeRemaining: "15 days",
    points: 10,
    assets: [
      {
        name: "Sustainability Image",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800",
        caption:
          "Proud to partner with a brand that cares about our planet! Check out these eco-friendly products. #GreenLiving #SustainableFuture @brandname [Creator: @yourhandle]",
      },
    ],
    submissionDate: "July 5, 2023",
    publishedUrl: "https://www.instagram.com/p/DEF456",
  },
  "product-tutorial": {
    title: "Product Tutorial",
    description: "Create a tutorial showing how to use our products",
    fullDescription: "We're looking for creative tutorials that showcase the versatility of our products.",
    status: "URL Under Review",
    platforms: ["TikTok"],
    timeRemaining: "10 days",
    points: 10,
    submittedContent: {
      assets: [
        {
          name: "Tutorial Video",
          type: "VIDEO",
          url: "/placeholder.svg?height=600&width=800&text=Tutorial+Video",
        },
        {
          name: "Tutorial Image 1",
          type: "IMAGE",
          url: "/placeholder.svg?height=600&width=800&text=Tutorial+Image+1",
        },
        {
          name: "Tutorial Image 2",
          type: "IMAGE",
          url: "/placeholder.svg?height=600&width=800&text=Tutorial+Image+2",
        },
      ],
      caption:
        "Here's my tutorial on how to use our amazing products. I've highlighted the key features and provided some tips for beginners. #HowToUse #ProductTutorial @brandname",
    },
    submissionDate: "July 1, 2023",
  },
  "winter-collection": {
    title: "Winter Collection Preview",
    description: "Be the first to showcase our winter collection",
    fullDescription:
      "Our winter collection is coming soon! We're looking for creators to preview our new products with their followers.",
    status: "Available",
    platforms: ["Instagram"],
    timeRemaining: "14 days",
    points: 10,
    assets: [
      {
        name: "Winter Collection Image 1",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800",
        caption:
          "Sneak peek at the upcoming winter collection! Cozy and stylish for the cold months ahead. #WinterVibes #BrandCampaign @brandname [Creator: @yourhandle]",
      },
    ],
  },
  "product-review": {
    title: "Product Review Challenge",
    description: "Create an honest review of our flagship product",
    fullDescription:
      "We want your honest opinion! Create a comprehensive review of our flagship product and share your experience with your followers.\n\nIn your review, please consider covering the following aspects:\n- Product quality and build\n- Ease of use and functionality\n- Value for money\n- How it compares to similar products\n- Your personal experience and recommendations\n\nFeel free to be creative with your content format - whether it's a detailed video review, before/after photos, or a series of posts showing the product in action. Your authentic voice and honest feedback is what makes your content valuable to your audience.",
    status: "Available",
    platforms: ["TikTok"],
    timeRemaining: "21 days",
    points: 10,
    assets: [
      {
        name: "Product Review Image 1",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800&text=Product+Review+1",
        caption:
          "Here's my honest review of this amazing product! I've been using it for weeks and here are my thoughts. #ProductReview #HonestOpinion @brandname [Creator: @yourhandle]",
      },
      {
        name: "Product Review Image 2",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800&text=Product+Review+2",
        caption:
          "Another angle of the product in action! The quality and results speak for themselves. #ProductReview #HonestOpinion @brandname [Creator: @yourhandle]",
      },
    ],
  },
  "holiday-special": {
    title: "Holiday Special",
    description: "Share how our products make holidays special",
    fullDescription:
      "The holidays are here! Show how our products add joy and convenience to your holiday celebrations.",
    status: "Available",
    platforms: ["Instagram", "TikTok"],
    timeRemaining: "20 days",
    points: 10,
    assets: [
      {
        name: "Holiday Collection Image",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800",
        caption:
          "Making the holidays special with our amazing products! Perfect gifts for everyone on your list. #HolidayMagic #GiftGuide @brandname [Creator: @yourhandle]",
      },
    ],
  },
  "behind-scenes": {
    title: "Behind the Scenes",
    description: "Share behind-the-scenes content from your workplace",
    fullDescription:
      "Give your followers a glimpse into your work life and show how our products help you succeed in your professional environment.",
    status: "Available",
    platforms: ["Instagram", "TikTok"],
    timeRemaining: "7 days",
    points: 10,
    assets: [
      {
        name: "Behind the Scenes Image",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800&text=Behind+the+Scenes",
        caption:
          "Behind the scenes at work! Here's how our products help me stay productive and organized throughout the day. #BehindTheScenes #WorkLife @brandname [Creator: @yourhandle]",
      },
    ],
  },
  "employee-spotlight": {
    title: "Employee Spotlight",
    description: "Share your experience working with our products",
    fullDescription:
      "As an employee, you have unique insights into our products. Share your personal experience and how our products help you in your daily work.",
    status: "Available",
    platforms: ["Instagram"],
    timeRemaining: "14 days",
    points: 10,
    assets: [
      {
        name: "Employee Spotlight Image",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800&text=Employee+Spotlight",
        caption:
          "Proud to work with such amazing products! Here's my personal experience and how they help me succeed every day. #EmployeeSpotlight #TeamMember @brandname [Creator: @yourhandle]",
      },
    ],
  },
  "lifestyle-blog": {
    title: "Lifestyle Blog Feature",
    description: "Create blog-style content showcasing our products in your lifestyle",
    fullDescription:
      "We're looking for authentic lifestyle content that shows how our products seamlessly integrate into your daily life. Create engaging blog-style posts that demonstrate the practical benefits and aesthetic appeal of our products in real-world scenarios. Share your personal experiences and highlight how our products enhance your lifestyle.",
    status: "Approved",
    platforms: ["TikTok"],
    timeRemaining: "0 days",
    points: 10,
    assets: [
      {
        name: "Lifestyle Blog Image 1",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800&text=Lifestyle+Blog+1",
        caption:
          "Sharing my authentic lifestyle featuring our amazing products! Here's how they perfectly fit into my daily routine. #LifestyleBlog #AuthenticLife @brandname [Creator: @yourhandle]",
      },
      {
        name: "Lifestyle Blog Image 2",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800&text=Lifestyle+Blog+2",
        caption:
          "Another day, another way our products make life better! Love how they blend seamlessly into my lifestyle. #LifestyleBlog #DailyLife @brandname [Creator: @yourhandle]",
      },
    ],
    submissionDate: "June 10, 2023",
    publishedUrl: "https://www.tiktok.com/@user/video/987654321",
  },
  "beauty-routine": {
    title: "Beauty Routine Campaign",
    description: "Share your daily beauty routine featuring our products",
    fullDescription:
      "Show your followers how our beauty products fit perfectly into your daily routine. Create authentic content that demonstrates the effectiveness and quality of our products. Share tips, techniques, and your personal experience with our beauty line to inspire others to incorporate our products into their own routines.",
    status: "Approved",
    platforms: ["Instagram"],
    timeRemaining: "0 days",
    points: 10,
    assets: [
      {
        name: "Beauty Routine Image 1",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800&text=Beauty+Routine+1",
        caption:
          "My daily beauty routine featuring these amazing products! Love how they make my skin glow. #BeautyRoutine #SkinCare @brandname [Creator: @yourhandle]",
      },
      {
        name: "Beauty Routine Image 2",
        type: "IMAGE",
        url: "/placeholder.svg?height=600&width=800&text=Beauty+Routine+2",
        caption:
          "Step by step beauty routine with my favorite products! Results speak for themselves. #BeautyRoutine #GlowUp @brandname [Creator: @yourhandle]",
      },
    ],
    submissionDate: "June 15, 2023",
    publishedUrl: "https://www.instagram.com/p/JKL012",
  },
};
