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


\
\
