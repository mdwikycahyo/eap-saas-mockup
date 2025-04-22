import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Building, Search, Plus, Filter, MoreHorizontal, Users, Calendar, CreditCard } from "lucide-react"

export default function ClientManagement() {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Client Management</h1>
          <p className="text-muted-foreground">Manage client organizations and their settings</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            Add New Client
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search clients..." className="pl-8" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Client List */}
      <Card>
        <CardHeader>
          <CardTitle>Client Organizations</CardTitle>
          <CardDescription>Manage all client accounts on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 p-4 bg-slate-50 text-sm font-medium text-slate-500">
              <div className="col-span-4">Organization</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Users</div>
              <div className="col-span-2">Subscription</div>
              <div className="col-span-2">Actions</div>
            </div>

            {/* Client 1 */}
            <div className="grid grid-cols-12 p-4 border-t items-center">
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center">
                  <Building className="h-5 w-5 text-slate-500" />
                </div>
                <div>
                  <p className="font-medium">Acme Corporation</p>
                  <p className="text-xs text-muted-foreground">acme.com</p>
                </div>
              </div>
              <div className="col-span-2">
                <Badge variant="outline" className="text-green-500 border-green-500">
                  Active
                </Badge>
              </div>
              <div className="col-span-2 flex items-center gap-1">
                <Users className="h-4 w-4 text-slate-400" />
                <span>342</span>
              </div>
              <div className="col-span-2 flex items-center gap-1">
                <CreditCard className="h-4 w-4 text-slate-400" />
                <span>Enterprise</span>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Client 2 */}
            <div className="grid grid-cols-12 p-4 border-t items-center">
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center">
                  <Building className="h-5 w-5 text-slate-500" />
                </div>
                <div>
                  <p className="font-medium">TechNova Inc.</p>
                  <p className="text-xs text-muted-foreground">technova.io</p>
                </div>
              </div>
              <div className="col-span-2">
                <Badge variant="outline" className="text-green-500 border-green-500">
                  Active
                </Badge>
              </div>
              <div className="col-span-2 flex items-center gap-1">
                <Users className="h-4 w-4 text-slate-400" />
                <span>128</span>
              </div>
              <div className="col-span-2 flex items-center gap-1">
                <CreditCard className="h-4 w-4 text-slate-400" />
                <span>Business</span>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Client 3 */}
            <div className="grid grid-cols-12 p-4 border-t items-center">
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center">
                  <Building className="h-5 w-5 text-slate-500" />
                </div>
                <div>
                  <p className="font-medium">Global Retail Group</p>
                  <p className="text-xs text-muted-foreground">globalretail.com</p>
                </div>
              </div>
              <div className="col-span-2">
                <Badge variant="outline" className="text-amber-500 border-amber-500">
                  Trial
                </Badge>
              </div>
              <div className="col-span-2 flex items-center gap-1">
                <Users className="h-4 w-4 text-slate-400" />
                <span>56</span>
              </div>
              <div className="col-span-2 flex items-center gap-1">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span>14 days left</span>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Client 4 */}
            <div className="grid grid-cols-12 p-4 border-t items-center">
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center">
                  <Building className="h-5 w-5 text-slate-500" />
                </div>
                <div>
                  <p className="font-medium">HealthPlus Medical</p>
                  <p className="text-xs text-muted-foreground">healthplus.org</p>
                </div>
              </div>
              <div className="col-span-2">
                <Badge variant="outline" className="text-red-500 border-red-500">
                  Expired
                </Badge>
              </div>
              <div className="col-span-2 flex items-center gap-1">
                <Users className="h-4 w-4 text-slate-400" />
                <span>98</span>
              </div>
              <div className="col-span-2 flex items-center gap-1">
                <CreditCard className="h-4 w-4 text-slate-400" />
                <span>Renewal needed</span>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Client 5 */}
            <div className="grid grid-cols-12 p-4 border-t items-center">
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center">
                  <Building className="h-5 w-5 text-slate-500" />
                </div>
                <div>
                  <p className="font-medium">EcoSolutions Ltd.</p>
                  <p className="text-xs text-muted-foreground">ecosolutions.co</p>
                </div>
              </div>
              <div className="col-span-2">
                <Badge variant="outline" className="text-green-500 border-green-500">
                  Active
                </Badge>
              </div>
              <div className="col-span-2 flex items-center gap-1">
                <Users className="h-4 w-4 text-slate-400" />
                <span>76</span>
              </div>
              <div className="col-span-2 flex items-center gap-1">
                <CreditCard className="h-4 w-4 text-slate-400" />
                <span>Business</span>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Client 6 */}
            <div className="grid grid-cols-12 p-4 border-t items-center">
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center">
                  <Building className="h-5 w-5 text-slate-500" />
                </div>
                <div>
                  <p className="font-medium">Quantum Dynamics</p>
                  <p className="text-xs text-muted-foreground">quantumdynamics.tech</p>
                </div>
              </div>
              <div className="col-span-2">
                <Badge variant="outline" className="text-green-500 border-green-500">
                  Active
                </Badge>
              </div>
              <div className="col-span-2 flex items-center gap-1">
                <Users className="h-4 w-4 text-slate-400" />
                <span>112</span>
              </div>
              <div className="col-span-2 flex items-center gap-1">
                <CreditCard className="h-4 w-4 text-slate-400" />
                <span>Enterprise</span>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">Showing 1-6 of 24 clients</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-slate-100">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                4
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
