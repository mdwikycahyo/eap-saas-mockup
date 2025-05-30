import { Building, Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const metricsData = {
  totalClients: {
    count: 22, // Recalculated: active (18) + inactive (4)
    active: 18,
    inactive: 4,
  },
  totalUsers: {
    count: 3842,
    admins: 124,
    creators: 3718,
  },
}

export default function DashboardPage() {
  const greeting = "Good Morning"

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{greeting}, Super Admin</h1>
          <p className="text-muted-foreground">Here is an overview of your platform</p>
        </div>
      </div>

      {/* Platform Metrics */}
      <div className="grid gap-4 md:grid-cols-2 mb-6">
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
      </div>
    </div>
  )
}
