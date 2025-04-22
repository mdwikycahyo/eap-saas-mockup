import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function CreateCampaignPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Campaign</h1>
          <p className="text-muted-foreground">Create a new campaign for your creators to promote.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button>Publish Campaign</Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Campaign Details</TabsTrigger>
          <TabsTrigger value="content">Content Guidelines</TabsTrigger>
          <TabsTrigger value="rewards">Rewards & Points</TabsTrigger>
          <TabsTrigger value="targeting">Creator Targeting</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details of your campaign.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input id="name" placeholder="Enter campaign name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="draft">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter campaign description" className="min-h-[100px]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <DatePicker />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <DatePicker />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="featured" />
                <Label htmlFor="featured">Featured Campaign</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Goals</CardTitle>
              <CardDescription>Define what you want to achieve with this campaign.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="objective">Primary Objective</Label>
                <Select defaultValue="awareness">
                  <SelectTrigger>
                    <SelectValue placeholder="Select objective" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="awareness">Brand Awareness</SelectItem>
                    <SelectItem value="engagement">Engagement</SelectItem>
                    <SelectItem value="traffic">Website Traffic</SelectItem>
                    <SelectItem value="leads">Lead Generation</SelectItem>
                    <SelectItem value="sales">Sales Conversion</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="target-reach">Target Reach</Label>
                  <Input id="target-reach" type="number" placeholder="e.g. 10000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-engagement">Target Engagement</Label>
                  <Input id="target-engagement" type="number" placeholder="e.g. 1000" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="kpis">Key Performance Indicators</Label>
                <Textarea id="kpis" placeholder="Enter KPIs to track for this campaign" className="min-h-[100px]" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Guidelines</CardTitle>
              <CardDescription>Provide guidelines for creators to follow when creating content.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="guidelines">Content Guidelines</Label>
                <Textarea id="guidelines" placeholder="Enter content guidelines" className="min-h-[150px]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hashtags">Required Hashtags</Label>
                <Input id="hashtags" placeholder="e.g. #BrandCampaign #CompanyName" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mentions">Required Mentions</Label>
                <Input id="mentions" placeholder="e.g. @CompanyHandle" />
              </div>

              <div className="space-y-2">
                <Label>Approved Media</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="images" defaultChecked />
                    <Label htmlFor="images">Images</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="videos" defaultChecked />
                    <Label htmlFor="videos">Videos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="stories" />
                    <Label htmlFor="stories">Stories</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="reels" />
                    <Label htmlFor="reels">Reels/Short Videos</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Brand Assets</CardTitle>
              <CardDescription>Upload brand assets for creators to use in their content.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div className="border-2 border-dashed rounded-lg p-12 text-center">
                  <div className="mx-auto flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-muted-foreground mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF, MP4 up to 10MB</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Rewards Structure</CardTitle>
              <CardDescription>Define how creators will be rewarded for their participation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="base-points">Base Points</Label>
                  <Input id="base-points" type="number" placeholder="e.g. 100" />
                  <p className="text-xs text-muted-foreground">Points awarded for basic participation</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bonus-points">Bonus Points</Label>
                  <Input id="bonus-points" type="number" placeholder="e.g. 50" />
                  <p className="text-xs text-muted-foreground">Additional points for exceptional content</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Performance Bonuses</Label>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="likes-threshold">Likes Threshold</Label>
                      <Input id="likes-threshold" type="number" placeholder="e.g. 100" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shares-threshold">Shares Threshold</Label>
                      <Input id="shares-threshold" type="number" placeholder="e.g. 50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="comments-threshold">Comments Threshold</Label>
                      <Input id="comments-threshold" type="number" placeholder="e.g. 25" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="likes-bonus">Likes Bonus</Label>
                      <Input id="likes-bonus" type="number" placeholder="e.g. 25" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shares-bonus">Shares Bonus</Label>
                      <Input id="shares-bonus" type="number" placeholder="e.g. 50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="comments-bonus">Comments Bonus</Label>
                      <Input id="comments-bonus" type="number" placeholder="e.g. 25" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Budget</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="total-budget">Total Budget (IDR)</Label>
                    <Input id="total-budget" type="number" placeholder="e.g. 5000000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-creators">Maximum Creators</Label>
                    <Input id="max-creators" type="number" placeholder="e.g. 50" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="targeting" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Creator Targeting</CardTitle>
              <CardDescription>Define which creators are eligible for this campaign.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Eligibility</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="all-creators" />
                    <Label htmlFor="all-creators">All Creators</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="selected-creators" defaultChecked />
                    <Label htmlFor="selected-creators">Selected Creators</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Creator Filters</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="min-followers">Minimum Followers</Label>
                    <Input id="min-followers" type="number" placeholder="e.g. 1000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-engagement">Minimum Engagement Rate</Label>
                    <Input id="min-engagement" type="number" placeholder="e.g. 2.5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="jakarta">Jakarta</SelectItem>
                        <SelectItem value="bandung">Bandung</SelectItem>
                        <SelectItem value="surabaya">Surabaya</SelectItem>
                        <SelectItem value="bali">Bali</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Content Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="beauty">Beauty</SelectItem>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="tech">Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Selected Creators</Label>
                <div className="border rounded-md p-4">
                  <p className="text-sm text-muted-foreground">
                    No creators selected yet. Use the filters above to select creators.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button variant="outline">Save as Draft</Button>
        <Button>Publish Campaign</Button>
      </div>
    </div>
  )
}
