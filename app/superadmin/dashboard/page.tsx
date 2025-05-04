"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, Users, Bell, TrendingUp, Share2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for notifications
const notificationsMock = [
  {
    id: 1,
    type: "urgent",
    title: "Subscription Expiring",
    description: "HealthPlus Medical subscription expires in 3 days",
    time: "2 hours ago",
    icon: Calendar,
    iconColor: "text-red-600",
    bgColor: "bg-red-100",
    read: false,
  },
  {
    id: 2,
    type: "support",
    title: "Support Request",
    description: "Urgent support request from Global Retail Group",
    time: "5 hours ago",
    icon: MessageSquare,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100",
    read: false,
  },
  {
    id: 3,
    type: "success",
    title: "New Client Onboarded",
    description: "Global Retail Group has been successfully onboarded",
    time: "1 day ago",
    icon: Award,
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
    read: true,
  },
  {
    id: 4,
    type: "warning",
    title: "User Limit Approaching",
    description: "Acme Corporation is at 95% of their user limit",
    time: "1 day ago",
    icon: Users,
    iconColor: "text-violet-600",
    bgColor: "bg-violet-100",
    read: true,
  },
  {
    id: 5,
    type: "warning",
    title: "System Maintenance",
    description: "Scheduled maintenance in 2 days",
    time: "2 days ago",
    icon: AlertTriangle,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-100",
    read: true,
  },
]

// Import missing icons
import { Calendar, MessageSquare, Award, AlertTriangle } from "lucide-react"

// Mock data for metrics
const metricsData = {
  activeClients: { count: 24, change: 3, percentage: 14.3 },
  totalUsers: { count: 3842, change: 256, percentage: 7.1 },
  activeCampaigns: { count: 156, change: 12, percentage: 8.3 },
}

export default function SuperAdminDashboard() {
  // Add state for unread notifications count
  const [unreadNotifications, setUnreadNotifications] = useState(2)
  const [notificationItems, setNotificationItems] = useState(notificationsMock)

  // Add function to mark notification as read
  const markNotificationAsRead = (notificationId) => {
    setNotificationItems((prev) =>
      prev.map((notification) => (notification.id === notificationId ? { ...notification, read: true } : notification)),
    )

    // Update unread count
    const unreadCount = notificationItems.filter((n) => !n.read).length - 1
    setUnreadNotifications(unreadCount > 0 ? unreadCount : 0)
  }

  // Add function to mark all notifications as read
  const markAllAsRead = () => {
    setNotificationItems((prev) => prev.map((notification) => ({ ...notification, read: true })))
    setUnreadNotifications(0)
  }

  // Get current time for greeting
  const currentHour = new Date().getHours()
  let greeting = "Good morning"
  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon"
  } else if (currentHour >= 18) {
    greeting = "Good evening"
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{greeting}, Super Admin</h1>
          <p className="text-muted-foreground">Here's an overview of your platform</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="relative">
                <Bell className="h-4 w-4" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[380px]">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h3 className="font-semibold">Notifications</h3>
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {notificationItems.length === 0 ? (
                  <div className="py-6 text-center text-muted-foreground">No notifications</div>
                ) : (
                  notificationItems.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 border-b hover:bg-muted cursor-pointer ${
                        notification.read ? "bg-background" : "bg-blue-50"
                      }`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div className="flex gap-3">
                        <div
                          className={`rounded-full ${notification.bgColor} p-2 h-8 w-8 flex items-center justify-center flex-shrink-0`}
                        >
                          <notification.icon className={`h-4 w-4 ${notification.iconColor}`} />
                        </div>
                        <div>
                          <p className={`text-sm ${notification.read ? "font-normal" : "font-medium"}`}>
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{notification.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Platform Metrics */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metricsData.activeClients.count}</div>
            <p className="text-xs text-muted-foreground">+{metricsData.activeClients.change} from last month</p>
            <div className="mt-3 flex items-center text-xs text-green-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              {metricsData.activeClients.percentage}% increase
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metricsData.totalUsers.count.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{metricsData.totalUsers.change} from last month</p>
            <div className="mt-3 flex items-center text-xs text-green-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              {metricsData.totalUsers.percentage}% increase
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metricsData.activeCampaigns.count}</div>
            <p className="text-xs text-muted-foreground">+{metricsData.activeCampaigns.change} from last month</p>
            <div className="mt-3 flex items-center text-xs text-green-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              {metricsData.activeCampaigns.percentage}% increase
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional descriptive data */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Summary</CardTitle>
          <CardDescription>Key statistics and information about your platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium mb-2">Client Distribution</h3>
              <ul className="space-y-2">
                <li className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active clients:</span>
                  <span>18</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Inactive clients:</span>
                  <span>4</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Expired subscriptions:</span>
                  <span>2</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subscriptions expiring this month:</span>
                  <span>3</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">User Statistics</h3>
              <ul className="space-y-2">
                <li className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Admin users:</span>
                  <span>124</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Creator users:</span>
                  <span>3,718</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active users (last 30 days):</span>
                  <span>2,945</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pending invitations:</span>
                  <span>37</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
