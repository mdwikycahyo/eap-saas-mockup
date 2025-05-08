import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Instagram, Twitter, Facebook, Linkedin, Globe, User } from "lucide-react"

export default function AdminSettings() {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account and profile settings</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your account profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center">
                <User className="h-8 w-8 text-slate-400" />
              </div>
              <div>
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
                <p className="text-xs text-muted-foreground mt-1">JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" defaultValue="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@company.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-title">Job Title</Label>
              <Input id="job-title" defaultValue="Marketing Manager" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select defaultValue="marketing">
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Update your contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Office Location</Label>
              <Input id="address" defaultValue="Headquarters, Floor 12" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="utc+7">
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc+7">Western Indonesian Time (UTC+7)</SelectItem>
                  <SelectItem value="utc+8">Central Indonesian Time (UTC+8)</SelectItem>
                  <SelectItem value="utc+9">Eastern Indonesian Time (UTC+9)</SelectItem>
                  <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                  <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                  <SelectItem value="utc+0">UTC</SelectItem>
                  <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Update your password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <div className="flex justify-end">
              <Button>Update Password</Button>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
