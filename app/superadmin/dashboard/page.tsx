import { Card, CardContent } from "@/components/ui/card"
import { Building2, Users, Shield, Speech } from "lucide-react"

const metricsData = {
  totalClients: {
    count: 20,
  },
  totalUsers: {
    count: 3800,
    admins: 200,
    creators: 3600,
  },
}

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Welcome, Super Admin!</h1>
        <p className="text-muted-foreground">Here is your platform summary</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Clients Card */}
        <Card className="p-6">
          <CardContent className="flex items-center space-x-4 p-0">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Clients</p>
              <p className="text-2xl font-bold">{metricsData.totalClients.count}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardContent className="flex items-center space-x-4 p-0">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Users</p>
              <p className="text-2xl font-bold">{metricsData.totalUsers.count.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Admin Card */}
        <Card className="p-6">
          <CardContent className="flex items-center space-x-4 p-0">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Admin</p>
              <p className="text-2xl font-bold">{metricsData.totalUsers.admins}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardContent className="flex items-center space-x-4 p-0">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Speech className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Creators</p>
              <p className="text-2xl font-bold">{metricsData.totalUsers.creators.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
