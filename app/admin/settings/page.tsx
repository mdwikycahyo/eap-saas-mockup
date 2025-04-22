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
          <p className="text-muted-foreground">Manage your account and platform settings</p>
        </div>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="connections">Social Connections</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
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

                <div className="grid grid-cols-2 gap-4">
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
                  <Select defaultValue="utc-7">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                      <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                      <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="utc+0">UTC</SelectItem>
                      <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                      <SelectItem value="utc+8">China Standard Time (UTC+8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="new-submission" className="font-normal">
                        New Content Submissions
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Receive notifications when creators submit content
                      </p>
                    </div>
                    <Switch id="new-submission" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="campaign-updates" className="font-normal">
                        Campaign Updates
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Receive notifications about campaign status changes
                      </p>
                    </div>
                    <Switch id="campaign-updates" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="reward-redemptions" className="font-normal">
                        Reward Redemptions
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Receive notifications when creators redeem rewards
                      </p>
                    </div>
                    <Switch id="reward-redemptions" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="performance-reports" className="font-normal">
                        Performance Reports
                      </Label>
                      <p className="text-xs text-muted-foreground">Receive weekly performance reports</p>
                    </div>
                    <Switch id="performance-reports" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">In-App Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="in-app-submissions" className="font-normal">
                        Content Submissions
                      </Label>
                      <p className="text-xs text-muted-foreground">Show notifications for new content submissions</p>
                    </div>
                    <Switch id="in-app-submissions" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="in-app-messages" className="font-normal">
                        Creator Messages
                      </Label>
                      <p className="text-xs text-muted-foreground">Show notifications for creator messages</p>
                    </div>
                    <Switch id="in-app-messages" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="in-app-redemptions" className="font-normal">
                        Reward Redemptions
                      </Label>
                      <p className="text-xs text-muted-foreground">Show notifications for reward redemptions</p>
                    </div>
                    <Switch id="in-app-redemptions" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Delivery</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="digest-email" className="font-normal">
                        Daily Digest Email
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Receive a daily summary instead of individual emails
                      </p>
                    </div>
                    <Switch id="digest-email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notification-email">Notification Email</Label>
                    <Input id="notification-email" type="email" defaultValue="john.doe@company.com" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Branding Settings</CardTitle>
              <CardDescription>Customize the platform appearance for your creators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Company Branding</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Company Logo</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                      <div className="w-32 h-12 bg-slate-200 rounded flex items-center justify-center mb-4">
                        <Globe className="h-6 w-6 text-slate-400" />
                      </div>
                      <Button variant="outline" size="sm">
                        Upload Logo
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">SVG, PNG or JPG. Max 1MB.</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Favicon</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                      <div className="w-12 h-12 bg-slate-200 rounded flex items-center justify-center mb-4">
                        <Globe className="h-6 w-6 text-slate-400" />
                      </div>
                      <Button variant="outline" size="sm">
                        Upload Favicon
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">ICO, PNG. Max 512KB.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Color Scheme</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded-md bg-blue-600"></div>
                      <Input id="primary-color" defaultValue="#2563EB" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded-md bg-slate-600"></div>
                      <Input id="secondary-color" defaultValue="#475569" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Platform Customization</h3>
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="Employee Advocacy Platform" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="welcome-message">Welcome Message</Label>
                  <Textarea
                    id="welcome-message"
                    defaultValue="Welcome to our Employee Advocacy Platform! Share your voice and amplify our brand."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="custom-font" className="font-normal">
                      Use Custom Font
                    </Label>
                    <p className="text-xs text-muted-foreground">Upload and use a custom font for the platform</p>
                  </div>
                  <Switch id="custom-font" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  Preview
                </Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connections">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Connections</CardTitle>
              <CardDescription>Connect and manage social media accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Connected Accounts</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                        <Instagram className="h-5 w-5 text-rose-600" />
                      </div>
                      <div>
                        <p className="font-medium">Instagram</p>
                        <p className="text-xs text-muted-foreground">Connected as @companyname</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Reconnect
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        Disconnect
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                        <Twitter className="h-5 w-5 text-cyan-600" />
                      </div>
                      <div>
                        <p className="font-medium">Twitter</p>
                        <p className="text-xs text-muted-foreground">Connected as @companyname</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Reconnect
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        Disconnect
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Linkedin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">LinkedIn</p>
                        <p className="text-xs text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                    <Button size="sm">Connect</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Facebook className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Facebook</p>
                        <p className="text-xs text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                    <Button size="sm">Connect</Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Default Sharing Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-hashtags" className="font-normal">
                        Auto-append Hashtags
                      </Label>
                      <p className="text-xs text-muted-foreground">Automatically add company hashtags to all posts</p>
                    </div>
                    <Switch id="auto-hashtags" defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="default-hashtags">Default Hashtags</Label>
                    <Input id="default-hashtags" defaultValue="#CompanyName #EmployeeAdvocacy" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-mention" className="font-normal">
                        Auto-mention Company
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically mention company accounts in all posts
                      </p>
                    </div>
                    <Switch id="auto-mention" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Password</h3>
                <div className="space-y-4">
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
                  <Button>Update Password</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-2fa" className="font-normal">
                      Enable Two-Factor Authentication
                    </Label>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch id="enable-2fa" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Session Management</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-xs text-muted-foreground">Started 2 hours ago</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Chrome on Windows • IP: 192.168.1.1</p>
                    </div>
                  </div>

                  <Button variant="outline">Sign Out of All Other Sessions</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Account Access</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="login-notifications" className="font-normal">
                        Login Notifications
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Receive email notifications for new logins to your account
                      </p>
                    </div>
                    <Switch id="login-notifications" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Security Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
