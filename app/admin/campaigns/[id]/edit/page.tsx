"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, Search } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useMemo } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useParams } from "next/navigation"
import { CustomPagination } from "@/components/ui/custom-pagination"
import { cn } from "@/lib/utils"

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
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    province: "Jakarta",
    city: "Jakarta Selatan",
    selected: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    province: "Jakarta",
    city: "Jakarta Pusat",
    selected: true,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    province: "Jawa Barat",
    city: "Bandung",
    selected: false,
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@example.com",
    province: "Jawa Timur",
    city: "Surabaya",
    selected: true,
  },
  {
    id: 5,
    name: "Lisa Thompson",
    email: "lisa.thompson@example.com",
    province: "Bali",
    city: "Denpasar",
    selected: false,
  },
  {
    id: 6,
    name: "Ahmad Rizki",
    email: "ahmad.rizki@example.com",
    province: "Jawa Barat",
    city: "Bogor",
    selected: false,
  },
  {
    id: 7,
    name: "Siti Nurhayati",
    email: "siti.nurhayati@example.com",
    province: "Jawa Tengah",
    city: "Semarang",
    selected: false,
  },
  {
    id: 8,
    name: "Budi Santoso",
    email: "budi.santoso@example.com",
    province: "Yogyakarta",
    city: "Yogyakarta",
    selected: true,
  },
  {
    id: 9,
    name: "Dewi Lestari",
    email: "dewi.lestari@example.com",
    province: "Sumatera Utara",
    city: "Medan",
    selected: false,
  },
  {
    id: 10,
    name: "Rini Puspita",
    email: "rini.puspita@example.com",
    province: "Sulawesi Selatan",
    city: "Makassar",
    selected: false,
  },
  {
    id: 11,
    name: "Andi Pratama",
    email: "andi.pratama@example.com",
    province: "Jakarta",
    city: "Jakarta Barat",
    selected: false,
  },
  {
    id: 12,
    name: "Maya Sari",
    email: "maya.sari@example.com",
    province: "Jakarta",
    city: "Jakarta Timur",
    selected: true,
  },
  {
    id: 13,
    name: "Rizky Hakim",
    email: "rizky.hakim@example.com",
    province: "Jakarta",
    city: "Jakarta Utara",
    selected: false,
  },
  {
    id: 14,
    name: "Indira Putri",
    email: "indira.putri@example.com",
    province: "Jawa Barat",
    city: "Bandung",
    selected: true,
  },
  {
    id: 15,
    name: "Fajar Ramadhan",
    email: "fajar.ramadhan@example.com",
    province: "Jawa Barat",
    city: "Bogor",
    selected: false,
  },
  {
    id: 16,
    name: "Lestari Wulan",
    email: "lestari.wulan@example.com",
    province: "Jawa Tengah",
    city: "Semarang",
    selected: false,
  },
  {
    id: 17,
    name: "Bayu Setiawan",
    email: "bayu.setiawan@example.com",
    province: "Jawa Timur",
    city: "Surabaya",
    selected: true,
  },
  { id: 18, name: "Citra Dewi", email: "citra.dewi@example.com", province: "Bali", city: "Denpasar", selected: false },
  {
    id: 19,
    name: "Doni Kurniawan",
    email: "doni.kurniawan@example.com",
    province: "Yogyakarta",
    city: "Yogyakarta",
    selected: false,
  },
  {
    id: 20,
    name: "Eka Fitriani",
    email: "eka.fitriani@example.com",
    province: "Sumatera Utara",
    city: "Medan",
    selected: true,
  },
  {
    id: 21,
    name: "Gilang Pratama",
    email: "gilang.pratama@example.com",
    province: "Sulawesi Selatan",
    city: "Makassar",
    selected: false,
  },
  {
    id: 22,
    name: "Hana Safitri",
    email: "hana.safitri@example.com",
    province: "Jakarta",
    city: "Jakarta Selatan",
    selected: false,
  },
  {
    id: 23,
    name: "Ivan Nugroho",
    email: "ivan.nugroho@example.com",
    province: "Jakarta",
    city: "Jakarta Pusat",
    selected: true,
  },
  {
    id: 24,
    name: "Jihan Amelia",
    email: "jihan.amelia@example.com",
    province: "Jawa Barat",
    city: "Bandung",
    selected: false,
  },
  {
    id: 25,
    name: "Kevin Wijaya",
    email: "kevin.wijaya@example.com",
    province: "Jawa Barat",
    city: "Bogor",
    selected: true,
  },
]

export default function EditCampaignPage() {
  const params = useParams()
  const campaignId = params.id

  // Form state
  const [campaignName, setCampaignName] = useState<string>("")
  const [campaignDescription, setCampaignDescription] = useState<string>("")
  const [campaignStatus, setCampaignStatus] = useState<string>("draft")
  const [selectedCreators, setSelectedCreators] = useState<Set<number>>(new Set())

  // Filter and search state
  const [selectedProvince, setSelectedProvince] = useState<string>("all")
  const [selectedCity, setSelectedCity] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [campaignData, setCampaignData] = useState<any>(null)

  // Date state for editable fields, stores YYYY-MM-DD strings
  const [editableStartDate, setEditableStartDate] = useState<string>("")
  const [editableEndDate, setEditableEndDate] = useState<string>("")
  const [minEditableEndDate, setMinEditableEndDate] = useState<string>("")

  // Pagination state for creators
  const [creatorsCurrentPage, setCreatorsCurrentPage] = useState(1)
  const [creatorsItemsPerPage, setCreatorsItemsPerPage] = useState(5)

  useEffect(() => {
    setTimeout(() => {
      const fetchedCampaignData = {
        id: campaignId,
        name: "Product Launch Campaign",
        description: "Help us promote our new product launch with engaging social media content. Share your experience with our products and how they've made a difference in your life.",
        startDate: new Date(2025, 5, 15), // Example: June 15, 2025
        endDate: new Date(2025, 5, 29), // Example: June 29, 2025
        status: "active",
      }
      setCampaignData(fetchedCampaignData)

      // Initialize form state with fetched data
      setCampaignName(fetchedCampaignData.name)
      setCampaignDescription(fetchedCampaignData.description)
      setCampaignStatus(fetchedCampaignData.status)

      // Initialize editable date states with formatted strings from fetched data
      setEditableStartDate(formatDateToYYYYMMDD(fetchedCampaignData.startDate))
      setEditableEndDate(formatDateToYYYYMMDD(fetchedCampaignData.endDate))

      // Initialize selected creators based on mock data
      const initiallySelected = creators.filter(creator => creator.selected).map(creator => creator.id)
      setSelectedCreators(new Set(initiallySelected))

      setIsLoading(false)
    }, 500)
  }, [campaignId])

  useEffect(() => {
    if (editableStartDate) {
      const start = new Date(editableStartDate)
      start.setDate(start.getDate() + 1)
      const newMinEndDate = formatDateToYYYYMMDD(start)
      setMinEditableEndDate(newMinEndDate)
      if (editableEndDate && new Date(editableEndDate) <= new Date(editableStartDate)) {
        setEditableEndDate(newMinEndDate)
      }
    } else {
      setMinEditableEndDate("")
    }
  }, [editableStartDate, editableEndDate])

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

  // Validation function
  const isFormValid = useMemo(() => {
    const hasRequiredFields = 
      campaignName.trim() !== "" &&
      campaignDescription.trim() !== "" &&
      editableStartDate !== "" &&
      editableEndDate !== "" &&
      selectedCreators.size > 0

    return hasRequiredFields
  }, [campaignName, campaignDescription, editableStartDate, editableEndDate, selectedCreators])

  // Handle creator selection
  const handleCreatorSelection = (creatorId: number, checked: boolean) => {
    const newSelectedCreators = new Set(selectedCreators)
    if (checked) {
      newSelectedCreators.add(creatorId)
    } else {
      newSelectedCreators.delete(creatorId)
    }
    setSelectedCreators(newSelectedCreators)
  }

  // Handle select all creators
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allCreatorIds = paginatedCreators.map(creator => creator.id)
      setSelectedCreators(new Set([...selectedCreators, ...allCreatorIds]))
    } else {
      const currentPageIds = paginatedCreators.map(creator => creator.id)
      const newSelected = new Set(selectedCreators)
      currentPageIds.forEach(id => newSelected.delete(id))
      setSelectedCreators(newSelected)
    }
  }

  // Check if all current page creators are selected
  const areAllCurrentPageSelected = paginatedCreators.every(creator => selectedCreators.has(creator.id))

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading campaign data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/campaigns">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Campaign</h1>
            <p className="text-muted-foreground">Update campaign details for {campaignData.name}</p>
          </div>
        </div>
      </div>

      <form className="space-y-8">
        {/* Campaign Details Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-800 text-primary-foreground rounded-full text-sm font-bold">
                1
              </div>
              Campaign Details
            </CardTitle>
            <CardDescription>Enter the essential details of your campaign.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name-edit">Campaign Name *</Label>
              <Input 
                id="name-edit" 
                placeholder="Enter campaign name" 
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className={cn(campaignName.trim() === "" && "border-red-500")}
              />
              {campaignName.trim() === "" && (
                <p className="text-xs text-red-500">Campaign name is required</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description-edit">Description & Brief *</Label>
              <Textarea
                id="description-edit"
                placeholder="Enter campaign description and brief for creators to follow"
                className={cn("min-h-[150px]", campaignDescription.trim() === "" && "border-red-500")}
                value={campaignDescription}
                onChange={(e) => setCampaignDescription(e.target.value)}
              />
              {campaignDescription.trim() === "" && (
                <p className="text-xs text-red-500">Description is required</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date-edit">Start Date *</Label>
                <Input
                  id="start-date-edit"
                  type="date"
                  value={editableStartDate}
                  onChange={(e) => setEditableStartDate(e.target.value)}
                  min={getTodayString()} // Or remove if past start dates are allowed for editing
                  className={cn("w-full", editableStartDate === "" && "border-red-500")}
                />
                {editableStartDate === "" && (
                  <p className="text-xs text-red-500">Start date is required</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date-edit">End Date *</Label>
                <Input
                  id="end-date-edit"
                  type="date"
                  value={editableEndDate}
                  onChange={(e) => setEditableEndDate(e.target.value)}
                  min={minEditableEndDate || getTodayString()}
                  disabled={!editableStartDate}
                  className={cn("w-full", !editableStartDate && "bg-muted cursor-not-allowed", editableEndDate === "" && "border-red-500")}
                />
                {!editableStartDate && (
                  <p className="text-xs text-muted-foreground">Please select a start date first</p>
                )}
                {editableStartDate && editableEndDate === "" && (
                  <p className="text-xs text-red-500">End date is required</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status-edit">Status</Label>
              <Select value={campaignStatus} onValueChange={setCampaignStatus}>
                <SelectTrigger id="status-edit">
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

        {/* Invite Creators Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-800 text-primary-foreground rounded-full text-sm font-bold">
                2
              </div>
              Invite Creators
            </CardTitle>
            <CardDescription>Select which creators to invite to this campaign. *</CardDescription>
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
                      <Checkbox 
                        checked={areAllCurrentPageSelected}
                        onCheckedChange={handleSelectAll}
                      />
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
                          <Checkbox 
                            id={`creator-edit-${creator.id}`}
                            checked={selectedCreators.has(creator.id)}
                            onCheckedChange={(checked) => handleCreatorSelection(creator.id, checked as boolean)}
                          />
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

            {selectedCreators.size === 0 && (
              <p className="text-xs text-red-500">Please select at least one creator</p>
            )}

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

        {/* Content Assets Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-800 text-primary-foreground rounded-full text-sm font-bold">
                3
              </div>
              Content Assets
            </CardTitle>
            <CardDescription>Upload assets for creators to use in their content.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Campaign Assets</h3>
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
          <Button variant="outline" className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            Save as Draft
          </Button>
          <Button 
            className={cn(
              "w-full sm:w-auto bg-gray-800 hover:bg-gray-600 text-white",
              !isFormValid && "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
            )}
            disabled={!isFormValid}
          >
            Update Campaign
          </Button>
        </div>
      </form>
    </div>
  )
}
