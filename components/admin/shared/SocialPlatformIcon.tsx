import { Instagram } from "lucide-react";
import { TikTokIcon } from "@/components/tik-tok-icon";
import { SocialPlatform } from "@/types/admin";

interface SocialPlatformIconProps {
  platform: SocialPlatform;
  className?: string;
}

export function SocialPlatformIcon({ platform, className }: SocialPlatformIconProps) {
  if (platform === "instagram")
    return <Instagram className={className || "h-4 w-4 text-pink-600"} />;
  if (platform === "tiktok")
    return <TikTokIcon className={className || "h-4 w-4"} />;
  return null;
}
