"use client";

interface DashboardHeaderProps {
  userName?: string;
}

export function DashboardHeader({ userName = "Sarah" }: DashboardHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome back, {userName}! Here's your advocacy overview.
      </p>
    </div>
  );
}
