"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
// DatePicker import removed as we are switching to Input type="date"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronLeft, Search } from "lucide-react"
import Link from "next/link"
import { useState, useMemo, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CustomPagination } from "@/components/ui/custom-pagination"
import { cn } from "@/lib/utils" // For conditional class names

// Helper to format Date to YYYY-MM-DD string
const formatDateToYYYYMMDD = (date: Date | undefined | null): string => {
  if (!date) return ""
  return date.toISOString().split("T")[0]
}

// Helper to get today's date as YYYY-MM-DD string
const getTodayString = () => {
  return new Date().toISOString().split("T")[0]
}

// Mock data for creators (updated: department -> email)
const creators = [
  { id: 1, name: "Sarah Johnson", email: "sarah.johnson@example.com", province: "Jakarta", city: "Jakarta Selatan" },
  { id: 2, name: "Michael Chen", email: "michael.chen@example.com", province: "Jakarta", city: "Jakarta Pusat" },
  { id: 3, name: "Emily Rodriguez", email: "emily.rodriguez@example.com", province: "Jawa Barat", city: "Bandung" },
  { id: 4, name: "David Wilson", email: "david.wilson@example.com", province: "Jawa Timur", city: "Surabaya" },
  { id: 5, name: "Lisa Thompson", email: "lisa.thompson@example.com", province: "Bali", city: "Denpasar" },
  { id: 6, name: "Ahmad Rizki", email: "ahmad.rizki@example.com", province: "Jawa Barat", city: "Bogor" },
  { id: 7, name: "Siti Nurhayati", email: "siti.nurhayati@example.com", province: "Jawa Tengah", city: "Semarang" },
  { id: 8, name: "Budi Santoso", email: "budi.santoso@example.com", province: "Yogyakarta", city: "Yogyakarta" },
  { id: 9, name: "Dewi Lestari", email: "dewi.lestari@example.com", province: "Sumatera Utara", city: "Medan" },
  { id: 10, name: "Rini Puspita", email: "rini.puspita@example.com", province: "Sulawesi Selatan", city: "Makassar" },
  { id: 11, name: "Andi Pratama", email: "andi.pratama@example.com", province: "Jakarta", city: "Jakarta Barat" },
  { id: 12, name: "Maya Sari", email: "maya.sari@example.com", province: "Jakarta", city: "Jakarta Timur" },
  { id: 13, name: "Rizky Hakim", email: "rizky.hakim@example.com", province: "Jakarta", city: "Jakarta Utara" },
  { id: 14, name: "Indira Putri", email: "indira.putri@example.com", province: "Jawa Barat", city: "Bandung" },
  { id: 15, name: "Fajar Ramadhan", email: "fajar.ramadhan@example.com", province: "Jawa Barat", city: "Bogor" },
  { id: 16, name: "Lestari Wulan", email: "lestari.wulan@example.com", province: "Jawa Tengah", city: "Semarang" },
  { id: 17, name: "Bayu Setiawan", email: "bayu.setiawan@example.com", province: "Jawa Timur", city: "Surabaya" },
  { id: 18, name: "Citra Dewi", email: "citra.dewi@example.com", province: "Bali", city: "Denpasar" },
  { id: 19, name: "Doni Kurniawan", email: "doni.kurniawan@example.com", province: "Yogyakarta", city: "Yogyakarta" },
  { id: 20, name: "Eka Fitriani", email: "eka.fitriani@example.com", province: "Sumatera Utara", city: "Medan" },
  {
    id: 21,
    name: "Gilang Pratama",
    email: "gilang.pratama@example.com",
    province: "Sulawesi Selatan",
    city: "Makassar",
  },
  { id: 22, name: "Hana Safitri", email: "hana.safitri@example.com", province: "Jakarta", city: "Jakarta Selatan" },
  { id: 23, name: "Ivan Nugroho", email: "ivan.nugroho@example.com", province: "Jakarta", city: "Jakarta Pusat" },
  { id: 24, name: "Jihan Amelia", email: "jihan.amelia@example.com", province: "Jawa Barat", city: "Bandung" },
  { id: 25, name: "Kevin Wijaya", email: "kevin.wijaya@example.com", province: "Jawa Barat", city: "Bogor" },
]

export default function CreateCampaignPage() {
  const [campaignType, setCampaignType] = useState<string>("quick-share")
  const [selectedProvince, setSelectedProvince] = useState<string>("all")
  const [selectedCity, setSelectedCity] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")

  // Date state now stores YYYY-MM-DD strings
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [minEndDate, setMinEndDate] = useState<string>("")

  // Pagination state for creators
  const [creatorsCurrentPage, setCreatorsCurrentPage] = useState(1)
  const [creatorsItemsPerPage, setCreatorsItemsPerPage] = useState(5)

  useEffect(() => {
    if (startDate) {
      const start = new Date(startDate)
      start.setDate(start.getDate() + 1) // Minimum end date is the day after start date
      setMinEndDate(formatDateToYYYYMMDD(start))
      if (endDate && new Date(endDate) <= new Date(startDate)) {
        setEndDate(formatDateToYYYYMMDD(start)) // Auto-adjust end date if it's no longer valid
      }
    } else {
      setMinEndDate("")
      setEndDate("") // Clear end date if start date is cleared
    }
  }, [startDate, endDate])

  // Filter creators based on selected province, city, and search term
  const filteredCreators = useMemo(() => {
    return creators.filter((creator) => {
      const matchesProvince = selectedProvince === "all" || creator.province === selectedProvince
      const matchesCity = selectedCity === "all" || creator.city === selectedCity
      const matchesSearch =
        creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.email.toLowerCase().includes(searchTerm.toLowerCase()) || // Search by email
        creator.city.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesProvince && matchesCity && matchesSearch
    })
  }, [selectedProvince, selectedCity, searchTerm])

  // Paginate filtered creators
  const totalCreatorPages = Math.ceil(filteredCreators.length / creatorsItemsPerPage)
  const paginatedCreators = filteredCreators.slice(
    (creatorsCurrentPage - 1) * creatorsItemsPerPage,
    creatorsCurrentPage * creatorsItemsPerPage,
  )

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
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={getTodayString()}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={minEndDate || getTodayString()}
                    disabled={!startDate}
                    className={cn("w-full", !startDate && "bg-muted cursor-not-allowed")}
                  />
                  {!startDate && <p className="text-xs text-muted-foreground">Please select a start date first</p>}
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
                    placeholder="Search creators by name, email, city..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCreatorsCurrentPage(1)
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <Select
                    value={selectedProvince}
                    onValueChange={(value) => {
                      setSelectedProvince(value)
                      setCreatorsCurrentPage(1)
                    }}
                  >
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
                  <Select
                    value={selectedCity}
                    onValueChange={(value) => {
                      setSelectedCity(value)
                      setCreatorsCurrentPage(1)
                    }}
                  >
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
                      <TableHead>Email</TableHead>
                      <TableHead>Province</TableHead>
                      <TableHead>City</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedCreators.length > 0 ? (
                      paginatedCreators.map((creator) => (
                        <TableRow key={creator.id}>
                          <TableCell>
                            <Checkbox id={`creator-${creator.id}`} />
                          </TableCell>
                          <TableCell>
                            <span>{creator.name}</span>
                          </TableCell>
                          <TableCell>{creator.email}</TableCell>
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

              {totalCreatorPages > 1 && (
                <CustomPagination
                  currentPage={creatorsCurrentPage}
                  totalPages={totalCreatorPages}
                  totalItems={filteredCreators.length}
                  itemsPerPage={creatorsItemsPerPage}
                  onPageChange={setCreatorsCurrentPage}
                  onItemsPerPageChange={(value) => {
                    setCreatorsItemsPerPage(value)
                    setCreatorsCurrentPage(1)
                  }}
                  itemName="creators"
                />
              )}
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
