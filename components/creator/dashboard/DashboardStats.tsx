"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Award,
  Users,
  Instagram,
  BarChart,
  TrendingUp,
} from "lucide-react";
import { TikTokIcon } from "@/components/tik-tok-icon";
import type { DashboardMetrics } from "@/types/creator";

interface DashboardStatsProps {
  metrics: DashboardMetrics;
}

export function DashboardStats({ metrics }: DashboardStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 mb-8">
      {/* Combined Total Points and Content Published Card */}
      <Card className="bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 text-white shadow-xl border-0 overflow-hidden">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 h-full">
            {/* Total Points Section */}
            <div className="flex flex-col justify-center text-center sm:text-left py-4 sm:py-0">
              <div className="text-white/90 text-sm font-medium mb-2 sm:mb-4">
                Total Points
              </div>
              <div className="text-4xl sm:text-6xl font-bold">{metrics.points.value}</div>
            </div>
            
            {/* Content Published Section - White Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="text-gray-600 text-sm font-medium mb-3 sm:mb-4">Content Published</div>
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">{metrics.content.value}</div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Instagram className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500" />
                    <span className="text-gray-700 font-medium text-sm sm:text-base">Instagram</span>
                  </div>
                  <div className="text-gray-900 font-bold text-base sm:text-lg">18</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <TikTokIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                    <span className="text-gray-700 font-medium text-sm sm:text-base">TikTok</span>
                  </div>
                  <div className="text-gray-900 font-bold text-base sm:text-lg">10</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Card */}
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-gray-700 text-sm font-medium">Engagement</CardTitle>
        </CardHeader>
        <CardContent className="pb-6">
          {/* Main metrics row */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{metrics.views.value}</div>
              <div className="text-sm text-gray-500 mt-1">Views</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{metrics.likes.value.toLocaleString()}</div>
              <div className="text-sm text-gray-500 mt-1">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{metrics.comments.value}</div>
              <div className="text-sm text-gray-500 mt-1">Comments</div>
            </div>
          </div>

          {/* Platform breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Instagram className="h-5 w-5 text-pink-500" />
                <span className="text-gray-700 font-medium">Instagram</span>
              </div>
              <div className="text-gray-600 font-medium">
                8.2K / 1,245 / 380
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TikTokIcon className="h-5 w-5" />
                <span className="text-gray-700 font-medium">TikTok</span>
              </div>
              <div className="text-gray-600 font-medium">
                4.2K / 597 / 200
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
