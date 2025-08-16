import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Megaphone, Radio, TrendingUp } from "lucide-react";
import { DashboardStats } from "@/types/admin";

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <>
      {/* Mobile: Minimalist single row stats */}
      <div className="block md:hidden mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center">
              <Users className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
              <div className="text-xl font-bold">{stats.creators}</div>
              <div className="text-xs text-muted-foreground">Creators</div>
            </div>
            <div className="text-center">
              <Megaphone className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
              <div className="text-xl font-bold">{stats.campaigns}</div>
              <div className="text-xs text-muted-foreground">Campaigns</div>
            </div>
            <div className="text-center">
              <Radio className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
              <div className="text-xl font-bold">{stats.contents}</div>
              <div className="text-xs text-muted-foreground">Contents</div>
            </div>
            <div className="text-center">
              <TrendingUp className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
              <div className="text-xl font-bold">{stats.engagement}</div>
              <div className="text-xs text-muted-foreground">Engagement</div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Keep existing card-based layout */}
      <div className="hidden md:grid md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Creators</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.creators}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Campaigns</CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.campaigns}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Contents</CardTitle>
            <Radio className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.contents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.engagement}</div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
