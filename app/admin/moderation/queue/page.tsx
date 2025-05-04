import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ModerationQueuePage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Moderation Queue</h1>
          <p className="text-muted-foreground">Review and approve creator content submissions.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by campaign" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              <SelectItem value="summer">Summer Collection</SelectItem>
              <SelectItem value="holiday">Holiday Special</SelectItem>
              <SelectItem value="launch">Product Launch</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Refresh</Button>
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">
            Pending Review <Badge className="ml-2 bg-amber-500">12</Badge>
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved <Badge className="ml-2">48</Badge>
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected <Badge className="ml-2">7</Badge>
          </TabsTrigger>
          <TabsTrigger value="flagged">
            Flagged <Badge className="ml-2 bg-red-500">3</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Content Item 1 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">Jane Doe</CardTitle>
                      <CardDescription>Summer Collection Campaign</CardDescription>
                    </div>
                  </div>
                  <Badge>2 days ago</Badge>
                </div>
              </CardHeader>
              <div className="p-4">
                <p className="text-sm mb-3">
                  Looking forward to sharing our new summer collection with my followers! The colors in this line are
                  absolutely stunning. #SummerVibes
                </p>
                <img
                  src="/placeholder.svg?height=200&width=380"
                  alt="Content preview"
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
                <div className="flex items-center justify-end space-x-2 mt-2">
                  <Button variant="destructive" size="sm">
                    Reject
                  </Button>
                  <Button variant="default" size="sm">
                    Approve
                  </Button>
                </div>
              </div>
            </Card>

            {/* Content Item 2 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>MS</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">Mark Smith</CardTitle>
                      <CardDescription>Holiday Special Campaign</CardDescription>
                    </div>
                  </div>
                  <Badge>3 hours ago</Badge>
                </div>
              </CardHeader>
              <div className="p-4">
                <p className="text-sm mb-3">
                  I've been using this product for a month now and the results are amazing! Can't wait to share more
                  about the holiday deals coming up.
                </p>
                <img
                  src="/placeholder.svg?height=200&width=380"
                  alt="Content preview"
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
                <div className="flex items-center justify-end space-x-2 mt-2">
                  <Button variant="destructive" size="sm">
                    Reject
                  </Button>
                  <Button variant="default" size="sm">
                    Approve
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4 mt-4">
          <p className="text-muted-foreground">Displaying 48 approved content items.</p>
          {/* Approved content would go here */}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4 mt-4">
          <p className="text-muted-foreground">Displaying 7 rejected content items.</p>
          {/* Rejected content would go here */}
        </TabsContent>

        <TabsContent value="flagged" className="space-y-4 mt-4">
          <p className="text-muted-foreground">Displaying 3 flagged content items that need urgent review.</p>
          {/* Flagged content would go here */}
        </TabsContent>
      </Tabs>
    </div>
  )
}
