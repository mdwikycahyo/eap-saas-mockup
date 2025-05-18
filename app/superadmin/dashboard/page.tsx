"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, Users, Bell, Share2, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Update the metricsData object to include the new breakdown information
const metricsData = {
  totalClients: {
    count: 24,
    active: 18,
    inactive: 4,
    expired: 2,
  },
  totalUsers: {
    count: 3842,
    admins: 124,
    creators: 3718,
  },
  activeCampaigns: {
    count: 156,
    totalRewardsRedeemed: "Rp 45.7M",
  },
}

export default function SuperAdminDashboard() {
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
  ]

  // State for notifications
  const [unreadNotifications, setUnreadNotifications] = useState(1)
  const [notificationItems, setNotificationItems] = useState(notificationsMock)

  // Function to mark notification as read
  const markNotificationAsRead = (notificationId) => {
    setNotificationItems((prev) =>
      prev.map((notification) => (notification.id === notificationId ? { ...notification, read: true } : notification)),
    )

    // Update unread count
    const unreadCount = notificationItems.filter((n) => !n.read).length - 1
    setUnreadNotifications(unreadCount > 0 ? unreadCount : 0)
  }

  // Function to mark all notifications as read
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
          <p className="text-muted-foreground">Here is an overview of your platform</p>
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
            <CardTitle className="text-sm font-medium">Total Company Clients</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metricsData.totalClients.count}</div>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Active:</span>
                <span className="font-medium">{metricsData.totalClients.active}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Inactive:</span>
                <span className="font-medium">{metricsData.totalClients.inactive}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Expired:</span>
                <span className="font-medium">{metricsData.totalClients.expired}</span>
              </div>
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
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Admins:</span>
                <span className="font-medium">{metricsData.totalUsers.admins.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Creators:</span>
                <span className="font-medium">{metricsData.totalUsers.creators.toLocaleString()}</span>
              </div>
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
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Total Rewards Redeemed:</span>
                <span className="font-medium">{metricsData.activeCampaigns.totalRewardsRedeemed}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
