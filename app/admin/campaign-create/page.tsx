"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronLeft, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CreateCampaignPage() {
  const [campaignType, setCampaignType] = useState<string>("quick-share")
  const [selectedProvince, setSelectedProvince] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")

  // Mock data for creators
  const creators = [
    { id: 1, name: "Sarah Johnson", department: "Marketing", province: "Jakarta", city: "Jakarta Selatan" },
    { id: 2, name: "Michael Chen", department: "Product", province: "Jakarta", city: "Jakarta Pusat" },
    { id: 3, name: "Emily Rodriguez", department: "Customer Success", province: "Jawa Barat", city: "Bandung" },
    { id: 4, name: "David Wilson", department: "Sales", province: "Jawa Timur", city: "Surabaya" },
    { id: 5, name: "Lisa Thompson", department: "Engineering", province: "Bali", city: "Denpasar" },
    { id: 6, name: "Ahmad Rizki", department: "Marketing", province: "Jawa Barat", city: "Bogor" },
    { id: 7, name: "Siti Nurhayati", department: "Finance", province: "Jawa Tengah", city: "Semarang" },
    { id: 8, name: "Budi Santoso", department: "Operations", province: "Yogyakarta", city: "Yogyakarta" },
    { id: 9, name: "Dewi Lestari", department: "HR", province: "Sumatera Utara", city: "Medan" },
    { id: 10, name: "Rini Puspita", department: "Marketing", province: "Sulawesi Selatan", city: "Makassar" },
  ]

  // Filter creators based on selected province and search term
  const filteredCreators = creators.filter((creator) => {
    const matchesProvince = selectedProvince === "all" || creator.province === selectedProvince
    const matchesSearch =
      creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.city.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesProvince && matchesSearch
  })

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/campaigns">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create Campaign</h1>
            <p className="text-muted-foreground">Create a new campaign for your creators to promote.</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Campaign Details</TabsTrigger>
          <TabsTrigger value="creators">Invite Creators</TabsTrigger>
          <TabsTrigger value="content">Content Assets</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the essential details of your campaign.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input id="name" placeholder="Enter campaign name" />
              </div>

              <div className="space-y-2">
                <Label>Campaign Type</Label>
                <RadioGroup defaultValue="quick-share" onValueChange={(value) => setCampaignType(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="quick-share" id="quick-share" />
                    <Label htmlFor="quick-share">Quick Share</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="creative-challenge" id="creative-challenge" />
                    <Label htmlFor="creative-challenge">Creative Challenge</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter campaign description" className="min-h-[100px]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div>
                    <Label>Start Date</Label>
                  </div>
                  <DatePicker />
                </div>
                <div className="space-y-2">
                  <div>
                    <Label>End Date</Label>
                  </div>
                  <DatePicker />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="draft">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="objective">Campaign Objective</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select objective" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="w-[400px] max-h-[300px] overflow-y-auto">
                    <SelectItem value="awareness-general">General Awareness</SelectItem>
                    <SelectItem value="awareness-reach">Reach</SelectItem>
                    <SelectItem value="awareness-recognition">Brand Recognition</SelectItem>
                    <SelectItem value="engagement-general">General Engagement</SelectItem>
                    <SelectItem value="engagement-likes">Likes & Comments</SelectItem>
                    <SelectItem value="engagement-shares">Shares & Saves</SelectItem>
                    <SelectItem value="conversion-traffic">Website Traffic</SelectItem>
                    <SelectItem value="conversion-leads">Lead Generation</SelectItem>
                    <SelectItem value="conversion-sales">Sales</SelectItem>
                    <SelectItem value="other-recruitment">Recruitment</SelectItem>
                    <SelectItem value="other-education">Education</SelectItem>
                    <SelectItem value="other-csr">CSR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="creators" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Invite Creators</CardTitle>
              <CardDescription>Select which creators to invite to this campaign.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search creators..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Provinces</SelectItem>
                      <SelectItem value="Jakarta">Jakarta</SelectItem>
                      <SelectItem value="Jawa Barat">Jawa Barat</SelectItem>
                      <SelectItem value="Jawa Tengah">Jawa Tengah</SelectItem>
                      <SelectItem value="Jawa Timur">Jawa Timur</SelectItem>
                      <SelectItem value="Bali">Bali</SelectItem>
                      <SelectItem value="Sumatera Utara">Sumatera Utara</SelectItem>
                      <SelectItem value="Yogyakarta">Yogyakarta</SelectItem>
                      <SelectItem value="Sulawesi Selatan">Sulawesi Selatan</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cities</SelectItem>
                      <SelectItem value="Jakarta Selatan">Jakarta Selatan</SelectItem>
                      <SelectItem value="Jakarta Pusat">Jakarta Pusat</SelectItem>
                      <SelectItem value="Jakarta Barat">Jakarta Barat</SelectItem>
                      <SelectItem value="Jakarta Timur">Jakarta Timur</SelectItem>
                      <SelectItem value="Jakarta Utara">Jakarta Utara</SelectItem>
                      <SelectItem value="Bandung">Bandung</SelectItem>
                      <SelectItem value="Surabaya">Surabaya</SelectItem>
                      <SelectItem value="Semarang">Semarang</SelectItem>
                      <SelectItem value="Yogyakarta">Yogyakarta</SelectItem>
                      <SelectItem value="Denpasar">Denpasar</SelectItem>
                      <SelectItem value="Medan">Medan</SelectItem>
                      <SelectItem value="Makassar">Makassar</SelectItem>
                      <SelectItem value="Bogor">Bogor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Province</TableHead>
                      <TableHead>City</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCreators.length > 0 ? (
                      filteredCreators.map((creator) => (
                        <TableRow key={creator.id}>
                          <TableCell>
                            <Checkbox id={`creator-${creator.id}`} />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                              <span>{creator.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{creator.department}</TableCell>
                          <TableCell>{creator.province}</TableCell>
                          <TableCell>{creator.city}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          No creators found matching your filters
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">{filteredCreators.length} creators shown</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Assets</CardTitle>
              <CardDescription>Upload assets and provide content for creators to use.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">
                  {campaignType === "quick-share" ? "Campaign Assets" : "Upload Brief"}
                </h3>
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
                    <p className="text-xs text-muted-foreground">
                      {campaignType === "quick-share" ? "PNG, JPG, GIF, MP4 up to 10MB" : "PDF up to 10MB"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-medium mb-3">
                  {campaignType === "quick-share" ? "Caption Template" : "Campaign Brief"}
                </h3>
                <div className="space-y-2">
                  <Textarea
                    id="caption"
                    placeholder={
                      campaignType === "quick-share"
                        ? "Enter a template caption that creators can use or modify"
                        : "Write a detailed brief for creators to follow"
                    }
                    className="min-h-[200px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Save as Draft</Button>
        <Button>Publish Campaign</Button>
      </div>
    </div>
  )
}
