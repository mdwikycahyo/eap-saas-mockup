import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw, Save } from "lucide-react"

export default function SystemConfiguration() {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Configuration</h1>
          <p className="text-muted-foreground">Manage platform settings and configurations</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" className="gap-1">
            <RefreshCw className="h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button className="gap-1">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="features" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="features">Feature Toggles</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="defaults">System Defaults</TabsTrigger>
        </TabsList>

        <TabsContent value="features">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Management</CardTitle>
                <CardDescription>Enable or disable platform features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Core Features</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="campaigns-feature" className="font-normal">
                          Campaigns
                        </Label>
                        <p className="text-xs text-muted-foreground">Enable campaign creation and management</p>
                      </div>
                      <Switch id="campaigns-feature" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="content-moderation" className="font-normal">
                          Content Moderation
                        </Label>
                        <p className="text-xs text-muted-foreground">Enable content review and approval workflow</p>
                      </div>
                      <Switch id="content-moderation" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="analytics-feature" className="font-normal">
                          Analytics
                        </Label>
                        <p className="text-xs text-muted-foreground">Enable performance analytics and reporting</p>
                      </div>
                      <Switch id="analytics-feature" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="rewards-feature" className="font-normal">
                          Rewards System
                        </Label>
                        <p className="text-xs text-muted-foreground">Enable points and rewards functionality</p>
                      </div>
                      <Switch id="rewards-feature" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Advanced Features</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="ai-suggestions" className="font-normal">
                          AI Content Suggestions
                        </Label>
                        <p className="text-xs text-muted-foreground">Enable AI-powered content recommendations</p>
                      </div>
                      <Switch id="ai-suggestions" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-moderation" className="font-normal">
                          Automated Content Moderation
                        </Label>
                        <p className="text-xs text-muted-foreground">Enable AI-powered content screening</p>
                      </div>
                      <Switch id="auto-moderation" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="advanced-analytics" className="font-normal">
                          Advanced Analytics
                        </Label>
                        <p className="text-xs text-muted-foreground">Enable predictive analytics and insights</p>
                      </div>
                      <Switch id="advanced-analytics" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="multi-language" className="font-normal">
                          Multi-language Support
                        </Label>
                        <p className="text-xs text-muted-foreground">Enable platform translation and localization</p>
                      </div>
                      <Switch id="multi-language" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Platform Access</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="mobile-app" className="font-normal">
                          Mobile App Access
                        </Label>
                        <p className="text-xs text-muted-foreground">Enable access via mobile applications</p>
                      </div>
                      <Switch id="mobile-app" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="api-access" className="font-normal">
                          API Access
                        </Label>
                        <p className="text-xs text-muted-foreground">Enable external API integrations</p>
                      </div>
                      <Switch id="api-access" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sso-access" className="font-normal">
                          Single Sign-On
                        </Label>
                        <p className="text-xs text-muted-foreground">Enable secure authentication via SSO providers</p>
                      </div>
                      <Switch id="sso-access" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Data Management</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="data-backup" className="font-normal">
                          Automated Data Backups
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Schedule regular data backups for disaster recovery
                        </p>
                      </div>
                      <Switch id="data-backup" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="data-retention" className="font-normal">
                          Data Retention Policy
                        </Label>
                        <p className="text-xs text-muted-foreground">Define data retention periods for compliance</p>
                      </div>
                      <Switch id="data-retention" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Third-Party Integrations</CardTitle>
                <CardDescription>Manage external service connections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Marketing Tools</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="mailchimp-integration" className="font-normal">
                          Mailchimp Integration
                        </Label>
                        <p className="text-xs text-muted-foreground">Connect to Mailchimp for email campaigns</p>
                      </div>
                      <Switch id="mailchimp-integration" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="hubspot-integration" className="font-normal">
                          HubSpot Integration
                        </Label>
                        <p className="text-xs text-muted-foreground">Connect to HubSpot for marketing automation</p>
                      </div>
                      <Switch id="hubspot-integration" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Analytics Platforms</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="google-analytics" className="font-normal">
                          Google Analytics
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Connect to Google Analytics for website tracking
                        </p>
                      </div>
                      <Switch id="google-analytics" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="mixpanel-integration" className="font-normal">
                          Mixpanel Integration
                        </Label>
                        <p className="text-xs text-muted-foreground">Connect to Mixpanel for product analytics</p>
                      </div>
                      <Switch id="mixpanel-integration" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Payment Gateways</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="stripe-integration" className="font-normal">
                          Stripe Integration
                        </Label>
                        <p className="text-xs text-muted-foreground">Connect to Stripe for payment processing</p>
                      </div>
                      <Switch id="stripe-integration" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="paypal-integration" className="font-normal">
                          PayPal Integration
                        </Label>
                        <p className="text-xs text-muted-foreground">Connect to PayPal for payment processing</p>
                      </div>
                      <Switch id="paypal-integration" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maintenance">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Maintenance</CardTitle>
                <CardDescription>Schedule and manage system maintenance tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Database Maintenance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="db-optimization" className="font-normal">
                          Database Optimization
                        </Label>
                        <p className="text-xs text-muted-foreground">Schedule database optimization tasks</p>
                      </div>
                      <Switch id="db-optimization" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="db-cleanup" className="font-normal">
                          Database Cleanup
                        </Label>
                        <p className="text-xs text-muted-foreground">Schedule database cleanup tasks</p>
                      </div>
                      <Switch id="db-cleanup" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Cache Management</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="cache-clearing" className="font-normal">
                          Cache Clearing
                        </Label>
                        <p className="text-xs text-muted-foreground">Schedule cache clearing tasks</p>
                      </div>
                      <Switch id="cache-clearing" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="cdn-refresh" className="font-normal">
                          CDN Refresh
                        </Label>
                        <p className="text-xs text-muted-foreground">Schedule CDN refresh tasks</p>
                      </div>
                      <Switch id="cdn-refresh" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Log Management</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="log-rotation" className="font-normal">
                          Log Rotation
                        </Label>
                        <p className="text-xs text-muted-foreground">Configure log rotation settings</p>
                      </div>
                      <Switch id="log-rotation" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="log-archiving" className="font-normal">
                          Log Archiving
                        </Label>
                        <p className="text-xs text-muted-foreground">Configure log archiving settings</p>
                      </div>
                      <Switch id="log-archiving" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="defaults">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Defaults</CardTitle>
                <CardDescription>Configure default system settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">User Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="default-language" className="font-normal">
                          Default Language
                        </Label>
                        <p className="text-xs text-muted-foreground">Set the default language for new users</p>
                      </div>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="default-timezone" className="font-normal">
                          Default Timezone
                        </Label>
                        <p className="text-xs text-muted-foreground">Set the default timezone for new users</p>
                      </div>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="est">EST</SelectItem>
                          <SelectItem value="pst">PST</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Content Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="default-content-type" className="font-normal">
                          Default Content Type
                        </Label>
                        <p className="text-xs text-muted-foreground">Set the default content type for new posts</p>
                      </div>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Content Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="image">Image</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="default-license" className="font-normal">
                          Default License
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Set the default license for user-generated content
                        </p>
                      </div>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select License" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cc-by">CC BY</SelectItem>
                          <SelectItem value="cc-nc">CC NC</SelectItem>
                          <SelectItem value="cc-sa">CC SA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Notification Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="default-notification-email" className="font-normal">
                          Default Notification Email
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Set the default email address for system notifications
                        </p>
                      </div>
                      <Input id="default-notification-email" type="email" placeholder="admin@example.com" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="default-notification-sms" className="font-normal">
                          Default Notification SMS
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Set the default phone number for system notifications
                        </p>
                      </div>
                      <Input id="default-notification-sms" type="tel" placeholder="+15551234567" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
