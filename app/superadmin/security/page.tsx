import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, Lock, Shield, ShieldAlert, UserCog } from "lucide-react"

export default function SecurityPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security Management</h1>
          <p className="text-muted-foreground">Manage platform security settings and monitor security events</p>
        </div>
        <Button variant="destructive" className="gap-2">
          <ShieldAlert className="h-4 w-4" />
          Security Audit
        </Button>
      </div>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="settings">Security Settings</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="logs">Security Logs</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Settings</CardTitle>
              <CardDescription>Configure authentication methods and security policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all admin and super admin accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Password Policy</Label>
                    <p className="text-sm text-muted-foreground">Enforce strong password requirements</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">Automatically log out inactive users</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input type="number" defaultValue="30" className="w-20" />
                    <span className="text-sm text-muted-foreground">minutes</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Security</CardTitle>
              <CardDescription>Manage API keys and access controls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">API Rate Limiting</Label>
                    <p className="text-sm text-muted-foreground">Limit API requests per client</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">IP Whitelisting</Label>
                    <p className="text-sm text-muted-foreground">Restrict API access to specific IP addresses</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Role-Based Access Control</CardTitle>
              <CardDescription>Configure permissions for different user roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <UserCog className="h-5 w-5" />
                    Super Admin Permissions
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="sa-user-mgmt" defaultChecked />
                      <Label htmlFor="sa-user-mgmt">User Management</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sa-client-mgmt" defaultChecked />
                      <Label htmlFor="sa-client-mgmt">Client Management</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sa-security" defaultChecked />
                      <Label htmlFor="sa-security">Security Settings</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sa-billing" defaultChecked />
                      <Label htmlFor="sa-billing">Billing Access</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <UserCog className="h-5 w-5" />
                    Admin Client Permissions
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="admin-campaigns" defaultChecked />
                      <Label htmlFor="admin-campaigns">Campaign Management</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="admin-creators" defaultChecked />
                      <Label htmlFor="admin-creators">Creator Management</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="admin-moderation" defaultChecked />
                      <Label htmlFor="admin-moderation">Content Moderation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="admin-analytics" defaultChecked />
                      <Label htmlFor="admin-analytics">Analytics Access</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Event Logs</CardTitle>
              <CardDescription>Review security events and authentication attempts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="bg-muted px-4 py-2 flex items-center justify-between">
                    <div className="font-medium">Recent Events</div>
                    <Button variant="outline" size="sm">
                      Export Logs
                    </Button>
                  </div>
                  <div className="divide-y">
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">Successful login</p>
                          <p className="text-sm text-muted-foreground">admin@example.com</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">Today, 10:42 AM</div>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        <div>
                          <p className="font-medium">Failed login attempt</p>
                          <p className="text-sm text-muted-foreground">unknown@example.com</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">Today, 09:17 AM</div>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Lock className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">Password changed</p>
                          <p className="text-sm text-muted-foreground">superadmin@example.com</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">Yesterday, 4:23 PM</div>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="font-medium">Security settings updated</p>
                          <p className="text-sm text-muted-foreground">superadmin@example.com</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">Yesterday, 2:15 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Management</CardTitle>
              <CardDescription>Manage compliance settings and documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Compliance Documents</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Privacy Policy</p>
                        <p className="text-sm text-muted-foreground">Last updated: April 15, 2025</p>
                      </div>
                      <Button variant="outline">Update</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Terms of Service</p>
                        <p className="text-sm text-muted-foreground">Last updated: March 22, 2025</p>
                      </div>
                      <Button variant="outline">Update</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Data Processing Agreement</p>
                        <p className="text-sm text-muted-foreground">Last updated: February 10, 2025</p>
                      </div>
                      <Button variant="outline">Update</Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Compliance Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">GDPR Compliance</Label>
                        <p className="text-sm text-muted-foreground">Enable GDPR compliance features</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Data Retention Policy</Label>
                        <p className="text-sm text-muted-foreground">Automatically delete user data after inactivity</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input type="number" defaultValue="24" className="w-20" />
                        <span className="text-sm text-muted-foreground">months</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
