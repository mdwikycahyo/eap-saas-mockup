"use client"

import * as React from "react"
import { useState, useEffect, useMemo } from "react"
import { CaretSortIcon } from "@radix-ui/react-icons"
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { Search, Plus, Upload, Download, Pencil, Mail, Coins, UserIcon, Instagram } from "lucide-react"
import { TikTokIcon } from "@/components/tik-tok-icon" // Ensure TikTokIcon is correctly imported or defined if not already
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"
import { CustomPagination } from "@/components/ui/custom-pagination" // Import CustomPagination
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// --- Mock Indonesian Regions Data ---
interface IndonesianRegion {
  id: string
  name: string
}
interface IndonesianCity extends IndonesianRegion {
  province_id: string
}
interface IndonesianRegionsData {
  provinces: IndonesianRegion[]
  cities: IndonesianCity[]
}

const mockProvinces: IndonesianRegion[] = [
  { id: "1", name: "DKI Jakarta" },
  { id: "2", name: "West Java" },
  { id: "3", name: "East Java" },
  { id: "4", name: "Central Java" },
  { id: "5", name: "Yogyakarta" },
  { id: "6", name: "Banten" },
  { id: "7", name: "Bali" },
  { id: "8", name: "North Sumatra" },
  { id: "9", name: "South Sulawesi" },
  { id: "10", name: "Other" },
]

const mockCities: IndonesianCity[] = [
  { id: "101", province_id: "1", name: "Jakarta" },
  { id: "201", province_id: "2", name: "Bandung" },
  { id: "202", province_id: "2", name: "Bogor" },
  { id: "203", province_id: "2", name: "Bekasi" },
  { id: "301", province_id: "3", name: "Surabaya" },
  { id: "302", province_id: "3", name: "Malang" },
  { id: "401", province_id: "4", name: "Semarang" },
  { id: "402", province_id: "4", name: "Solo" },
  { id: "501", province_id: "5", name: "Yogyakarta" },
  { id: "601", province_id: "6", name: "Tangerang" },
  { id: "701", province_id: "7", name: "Denpasar" },
  { id: "801", province_id: "8", name: "Medan" },
  { id: "901", province_id: "9", name: "Makassar" },
  { id: "1001", province_id: "10", name: "Other City" },
]

const regionsData: IndonesianRegionsData = {
  provinces: mockProvinces,
  cities: mockCities,
}
// --- End Mock Indonesian Regions Data ---

export type Creator = {
  id: string
  fullName: string
  email: string
  avatarUrl?: string
  phoneNumber?: string
  role: "Creator" | "Admin"
  invitationStatus: "Accepted" | "Pending Invitation"
  province?: string
  city?: string
  department?: string
  points: number
  campaignsParticipated?: CampaignParticipation[]
  pointHistory?: PointHistoryEntry[]
  instagramUsername?: string // New field
  tiktokUsername?: string // New field
}

export interface CampaignParticipation {
  id: string
  campaignName: string
  status: "Active" | "Completed" | "Pending Review"
  pointsEarned: number
  submissionDate: string
}

export interface PointHistoryEntry {
  id: string
  date: string
  description: string
  points: number
  balance: number
}

const initialMockCreators: Creator[] = [
  {
    id: "1",
    fullName: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    phoneNumber: "081234567890",
    role: "Creator",
    invitationStatus: "Accepted",
    province: "DKI Jakarta",
    city: "Jakarta",
    department: "Marketing",
    points: 4250,
    instagramUsername: "sarah_creative",
    tiktokUsername: "sarahj_official",
    campaignsParticipated: [
      {
        id: "cp1",
        campaignName: "Summer Product Launch",
        status: "Completed",
        pointsEarned: 300,
        submissionDate: "2025-05-10",
      },
    ],
    pointHistory: [
      { id: "ph1", date: "2025-05-12", description: "Points for Summer Launch", points: 300, balance: 4250 },
      { id: "ph2", date: "2025-04-20", description: "Redeemed Gift Card", points: -500, balance: 3950 },
    ],
  },
  {
    id: "2",
    fullName: "Michael Chen",
    email: "michael.chen@company.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    phoneNumber: "082345678901",
    role: "Creator",
    invitationStatus: "Accepted",
    province: "West Java",
    city: "Bandung",
    department: "Product",
    points: 3820,
    instagramUsername: "michael_chen_art",
  },
  // ... (ensure other creators also have avatarUrls with queries if they were just placeholder.svg)
  // ... (ensure Emily Rodriguez (Admin) does NOT have social media usernames)
  {
    id: "3",
    fullName: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    phoneNumber: "083456789012",
    role: "Admin",
    invitationStatus: "Accepted",
    province: "East Java",
    city: "Surabaya",
    department: "Customer Success",
    points: 1500, // Admins can have points, but it won't be displayed in their table column
  },
  {
    id: "4",
    fullName: "David Wilson",
    email: "david.wilson@company.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    role: "Creator",
    invitationStatus: "Pending Invitation",
    province: "Bali",
    city: "Denpasar",
    department: "Sales",
    points: 0,
  },
  {
    id: "5",
    fullName: "Lisa Thompson",
    email: "lisa.thompson@company.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    phoneNumber: "085678901234",
    role: "Creator",
    invitationStatus: "Accepted",
    province: "Yogyakarta",
    city: "Yogyakarta",
    department: "HR",
    points: 0,
  },
  {
    id: "6",
    fullName: "James Brown",
    email: "james.brown@company.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    role: "Creator",
    invitationStatus: "Pending Invitation",
    province: "Central Java",
    city: "Semarang",
    department: "Engineering",
    points: 0,
  },
  {
    id: "7",
    fullName: "Olivia Davis",
    email: "olivia.davis@company.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    role: "Creator",
    invitationStatus: "Accepted",
    province: "DKI Jakarta",
    city: "Jakarta",
    department: "Marketing",
    points: 2200,
  },
  {
    id: "8",
    fullName: "William Garcia",
    email: "william.garcia@company.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    role: "Admin",
    invitationStatus: "Pending Invitation",
    province: "West Java",
    city: "Bogor",
    department: "Operations",
    points: 0,
  },
  {
    id: "9",
    fullName: "Sophia Martinez",
    email: "sophia.martinez@company.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    phoneNumber: "081122334455",
    role: "Creator",
    invitationStatus: "Accepted",
    province: "East Java",
    city: "Malang",
    department: "Sales",
    points: 3100,
  },
  {
    id: "10",
    fullName: "Daniel Miller",
    email: "daniel.miller@company.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    role: "Creator",
    invitationStatus: "Accepted",
    province: "Bali",
    city: "Denpasar",
    department: "Product",
    points: 1950,
  },
  {
    id: "11",
    fullName: "Isabella Anderson",
    email: "isabella.anderson@company.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    role: "Creator",
    invitationStatus: "Pending Invitation",
    province: "Yogyakarta",
    city: "Yogyakarta",
    department: "Customer Success",
    points: 0,
  },
]

function AddCreatorDialog({
  isOpen,
  onOpenChange,
  onCreatorAdded,
}: {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onCreatorAdded: (newCreator: Creator) => void
}) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedProvince, setSelectedProvince] = useState<IndonesianRegion | null>(null)
  const [selectedCity, setSelectedCity] = useState<IndonesianCity | null>(null)
  const [role, setRole] = useState<"Creator" | "Admin">("Creator")

  const [openProvincePopover, setOpenProvincePopover] = useState(false)
  const [openCityPopover, setOpenCityPopover] = useState(false)

  const availableCities = useMemo(() => {
    if (!selectedProvince) return []
    return regionsData.cities.filter((city) => city.province_id === selectedProvince.id)
  }, [selectedProvince])

  useEffect(() => {
    if (isOpen) {
      setFullName("")
      setEmail("")
      setPhoneNumber("")
      setSelectedProvince(null)
      setSelectedCity(null)
      setRole("Creator")
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedCity(null)
  }, [selectedProvince])

  const handleSubmit = () => {
    if (!fullName || !email || !selectedProvince || !selectedCity || !role) {
      toast({
        title: "Missing Information",
        description: "Full Name, Email, Province, City, and Role are mandatory.",
        variant: "destructive",
      })
      return
    }
    const newCreator: Creator = {
      id: Date.now().toString(),
      fullName,
      email,
      phoneNumber: phoneNumber || undefined,
      role,
      invitationStatus: "Pending Invitation",
      province: selectedProvince.name,
      city: selectedCity.name,
      avatarUrl: `/placeholder.svg?height=40&width=40&query=${encodeURIComponent(fullName)}`,
      points: 0,
      department: "N/A",
    }
    onCreatorAdded(newCreator)
    toast({ title: "User Added", description: `${fullName} has been invited.` })
    onOpenChange(false)
  }
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>Enter the details for the new creator. Phone number is optional.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="employee@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="province">
                Province <span className="text-red-500">*</span>
              </Label>
              <Popover open={openProvincePopover} onOpenChange={setOpenProvincePopover}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openProvincePopover}
                    className="w-full justify-between"
                  >
                    {selectedProvince ? selectedProvince.name : "Select province..."}{" "}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search province..." />
                    <CommandList>
                      <CommandEmpty>No province found.</CommandEmpty>
                      <CommandGroup>
                        {regionsData.provinces.map((province) => (
                          <CommandItem
                            key={province.id}
                            value={province.name}
                            onSelect={() => {
                              setSelectedProvince(province)
                              setOpenProvincePopover(false)
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedProvince?.id === province.id ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {province.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">
                City <span className="text-red-500">*</span>
              </Label>
              <Popover open={openCityPopover} onOpenChange={setOpenCityPopover}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCityPopover}
                    className="w-full justify-between"
                    disabled={!selectedProvince || availableCities.length === 0}
                  >
                    {selectedCity ? selectedCity.name : "Select city..."}{" "}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search city..." />
                    <CommandList>
                      <CommandEmpty>No city found.</CommandEmpty>
                      <CommandGroup>
                        {availableCities.map((city) => (
                          <CommandItem
                            key={city.id}
                            value={city.name}
                            onSelect={() => {
                              setSelectedCity(city)
                              setOpenCityPopover(false)
                            }}
                          >
                            <CheckIcon
                              className={cn("mr-2 h-4 w-4", selectedCity?.id === city.id ? "opacity-100" : "opacity-0")}
                            />
                            {city.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role-select">
              Role <span className="text-red-500">*</span>
            </Label>
            <Select value={role} onValueChange={(value: "Creator" | "Admin") => setRole(value)}>
              <SelectTrigger id="role-select">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Creator">Creator</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function EditCreatorDialog({
  isOpen,
  onOpenChange,
  creator,
  onCreatorUpdated,
}: {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  creator: Creator | null
  onCreatorUpdated: (updatedCreator: Creator) => void
}) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedProvince, setSelectedProvince] = useState<IndonesianRegion | null>(null)
  const [selectedCity, setSelectedCity] = useState<IndonesianCity | null>(null)
  const [role, setRole] = useState<"Creator" | "Admin">("Creator")
  const [invitationStatus, setInvitationStatus] = useState<"Accepted" | "Pending Invitation">("Pending Invitation")

  const [openProvincePopover, setOpenProvincePopover] = useState(false)
  const [openCityPopover, setOpenCityPopover] = useState(false)

  const availableCities = useMemo(() => {
    if (!selectedProvince) return []
    return regionsData.cities.filter((city) => city.province_id === selectedProvince.id)
  }, [selectedProvince])

  useEffect(() => {
    if (creator) {
      setFullName(creator.fullName)
      setEmail(creator.email)
      setPhoneNumber(creator.phoneNumber || "")
      setRole(creator.role)
      setInvitationStatus(creator.invitationStatus)
      const province = regionsData.provinces.find((p) => p.name === creator.province) || null
      setSelectedProvince(province)
      if (province) {
        const city = regionsData.cities.find((c) => c.name === creator.city && c.province_id === province.id) || null
        setSelectedCity(city)
      } else {
        setSelectedCity(null)
      }
    }
  }, [creator])

  useEffect(() => {
    if (creator && selectedProvince && creator.province !== selectedProvince.name) {
      setSelectedCity(null)
    }
  }, [selectedProvince, creator])

  const handleSubmit = () => {
    if (!creator || !fullName || !email || !selectedProvince || !selectedCity || !role) {
      toast({
        title: "Missing Information",
        description: "Full Name, Email, Province, City, and Role are mandatory.",
        variant: "destructive",
      })
      return
    }
    const updatedCreator: Creator = {
      ...creator,
      fullName,
      email,
      phoneNumber: phoneNumber || undefined,
      role,
      invitationStatus,
      province: selectedProvince.name,
      city: selectedCity.name,
    }
    onCreatorUpdated(updatedCreator)
    toast({ title: "User Updated", description: `${fullName}'s details have been updated.` })
    onOpenChange(false)
  }

  if (!creator) return null
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update details for {creator.fullName}.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input id="edit-fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-email">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input id="edit-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-phoneNumber">Phone Number</Label>
            <Input id="edit-phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-province">
                Province <span className="text-red-500">*</span>
              </Label>
              <Popover open={openProvincePopover} onOpenChange={setOpenProvincePopover}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" className="w-full justify-between">
                    {selectedProvince ? selectedProvince.name : "Select province..."}{" "}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search province..." />
                    <CommandList>
                      <CommandEmpty>No province found.</CommandEmpty>
                      <CommandGroup>
                        {regionsData.provinces.map((province) => (
                          <CommandItem
                            key={province.id}
                            value={province.name}
                            onSelect={() => {
                              setSelectedProvince(province)
                              setOpenProvincePopover(false)
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedProvince?.id === province.id ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {province.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-city">
                City <span className="text-red-500">*</span>
              </Label>
              <Popover open={openCityPopover} onOpenChange={setOpenCityPopover}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                    disabled={!selectedProvince || availableCities.length === 0}
                  >
                    {selectedCity ? selectedCity.name : "Select city..."}{" "}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search city..." />
                    <CommandList>
                      <CommandEmpty>No city found.</CommandEmpty>
                      <CommandGroup>
                        {availableCities.map((city) => (
                          <CommandItem
                            key={city.id}
                            value={city.name}
                            onSelect={() => {
                              setSelectedCity(city)
                              setOpenCityPopover(false)
                            }}
                          >
                            <CheckIcon
                              className={cn("mr-2 h-4 w-4", selectedCity?.id === city.id ? "opacity-100" : "opacity-0")}
                            />
                            {city.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-role-select">
                Role <span className="text-red-500">*</span>
              </Label>
              <Select value={role} onValueChange={(value: "Creator" | "Admin") => setRole(value)}>
                <SelectTrigger id="edit-role-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Creator">Creator</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-invitationStatus">
                Invitation Status <span className="text-red-500">*</span>
              </Label>
              <Select
                value={invitationStatus}
                onValueChange={(value: "Accepted" | "Pending Invitation") => setInvitationStatus(value)}
              >
                <SelectTrigger id="edit-invitationStatus">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Accepted">Accepted</SelectItem>
                  <SelectItem value="Pending Invitation">Pending Invitation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ViewProfileDialog({
  isOpen,
  onOpenChange,
  creator,
}: {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  creator: Creator | null
}) {
  if (!creator) return null

  // Only show campaign participation and point history for accepted creators
  const mockCampaigns: CampaignParticipation[] =
    creator.invitationStatus === "Accepted"
      ? creator.campaignsParticipated || [
          {
            id: "1",
            campaignName: "Summer Sale UGC",
            status: "Completed",
            pointsEarned: 250,
            submissionDate: "2025-05-15",
          },
          {
            id: "2",
            campaignName: "New Feature TikTok Challenge",
            status: "Active",
            pointsEarned: 0,
            submissionDate: "2025-06-01",
          },
        ]
      : []

  const mockPointHistory: PointHistoryEntry[] =
    creator.invitationStatus === "Accepted"
      ? creator.pointHistory || [
          {
            id: "h1",
            date: "2025-05-16",
            description: "Points for Summer Sale UGC",
            points: 250,
            balance: creator.points || 250,
          },
          {
            id: "h2",
            date: "2025-04-10",
            description: "Welcome Bonus",
            points: 100,
            balance: (creator.points || 250) - 150,
          },
        ]
      : []

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Creator Profile</DialogTitle>
          <DialogDescription>Details for {creator.fullName}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold">{creator.fullName}</h3>
                <p className="text-sm text-muted-foreground">{creator.email}</p>
                <p className="text-sm text-muted-foreground">{creator.phoneNumber}</p>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <span className="font-medium">Role:</span> {creator.role}
              </div>
              <div>
                <span className="font-medium">Invitation:</span>{" "}
                <Badge
                  variant={creator.invitationStatus === "Accepted" ? "default" : "outline"}
                  className={
                    creator.invitationStatus === "Pending Invitation"
                      ? "border-amber-500 text-amber-600 bg-amber-50"
                      : "bg-green-100 text-green-700"
                  }
                >
                  {creator.invitationStatus}
                </Badge>
              </div>
              <div>
                <span className="font-medium">Province:</span> {creator.province}
              </div>
              <div>
                <span className="font-medium">City:</span> {creator.city}
              </div>
              {creator.role === "Creator" && (
                <>
                  <div>
                    <span className="font-medium">Points:</span> {creator.points?.toLocaleString() || 0}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {creator.role === "Creator" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Participation</CardTitle>
                </CardHeader>
                <CardContent>
                  {creator.invitationStatus === "Pending Invitation" ? (
                    <p className="text-sm text-muted-foreground">
                      No campaign participation data available. User has not accepted invitation yet.
                    </p>
                  ) : mockCampaigns.length > 0 ? (
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {mockCampaigns.map((campaign) => (
                        <div key={campaign.id} className="p-3 border rounded-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-medium">{campaign.campaignName}</h5>
                              <p className="text-xs text-muted-foreground">
                                Submitted on {new Date(campaign.submissionDate).toLocaleDateString("en-GB")}
                              </p>
                            </div>
                            <Badge
                              variant={
                                campaign.status === "Active"
                                  ? "default"
                                  : campaign.status === "Completed"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {campaign.status}
                            </Badge>
                          </div>
                          <div className="mt-1 text-sm">
                            <p>
                              {campaign.pointsEarned > 0
                                ? `${campaign.pointsEarned} points earned`
                                : "Awaiting review/points"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No campaign participation data.</p>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Point History</CardTitle>
                </CardHeader>
                <CardContent className="max-h-60 overflow-y-auto">
                  {creator.invitationStatus === "Pending Invitation" ? (
                    <p className="text-sm text-muted-foreground">
                      No point history available. User has not accepted invitation yet.
                    </p>
                  ) : mockPointHistory.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Points</TableHead>
                          <TableHead className="text-right">Balance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockPointHistory.map((entry) => (
                          <TableRow key={entry.id}>
                            <TableCell className="text-xs">
                              {new Date(entry.date).toLocaleDateString("en-GB")}
                            </TableCell>
                            <TableCell>{entry.description}</TableCell>
                            <TableCell
                              className={`text-right font-medium ${entry.points >= 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {entry.points >= 0 ? `+${entry.points}` : entry.points}
                            </TableCell>
                            <TableCell className="text-right">{entry.balance.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-sm text-muted-foreground">No point history data.</p>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function AdjustPointsDialog({
  isOpen,
  onOpenChange,
  creator,
  onPointsAdjusted,
}: {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  creator: Creator | null
  onPointsAdjusted: (creatorId: string, newPoints: number) => void
}) {
  const [pointsToAdjust, setPointsToAdjust] = useState(100)
  const [action, setAction] = useState<"add" | "remove">("add")
  const [reason, setReason] = useState("")

  useEffect(() => {
    if (isOpen) {
      setPointsToAdjust(100)
      setAction("add")
      setReason("")
    }
  }, [isOpen])

  const handleSubmit = () => {
    if (!creator) return
    const currentPoints = creator.points || 0
    let newPoints = action === "add" ? currentPoints + pointsToAdjust : currentPoints - pointsToAdjust
    if (newPoints < 0) newPoints = 0

    onPointsAdjusted(creator.id, newPoints)
    toast({
      title: "Points Adjusted",
      description: `${pointsToAdjust} points ${action === "add" ? "added to" : "removed from"} ${creator.fullName}. New balance: ${newPoints}. Reason: ${reason || "N/A"}`,
    })
    onOpenChange(false)
  }

  if (!creator) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adjust Points</DialogTitle>
          <DialogDescription>
            For {creator.fullName} (Current: {creator.points.toLocaleString()} points)
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="points-adjust">Points</Label>
              <Input
                id="points-adjust"
                type="number"
                value={pointsToAdjust}
                onChange={(e) => setPointsToAdjust(Math.max(0, Number.parseInt(e.target.value) || 0))}
              />
            </div>
            <div>
              <Label htmlFor="action-adjust">Action</Label>
              <Select value={action} onValueChange={(value: "add" | "remove") => setAction(value)}>
                <SelectTrigger id="action-adjust">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add Points</SelectItem>
                  <SelectItem value="remove">Remove Points</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="reason-adjust">Reason (Optional)</Label>
            <Input
              id="reason-adjust"
              placeholder="Reason for adjustment"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function ManageCreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>(initialMockCreators)
  const [isAddCreatorOpen, setIsAddCreatorOpen] = useState(false)
  const [isEditCreatorOpen, setIsEditCreatorOpen] = useState(false)
  const [editingCreator, setEditingCreator] = useState<Creator | null>(null)
  const [isImportCreatorsOpen, setIsImportCreatorsOpen] = useState(false)
  const [isViewProfileOpen, setIsViewProfileOpen] = useState(false)
  const [viewingCreatorProfile, setViewingCreatorProfile] = useState<Creator | null>(null)
  const [isAdjustPointsOpen, setIsAdjustPointsOpen] = useState(false)
  const [adjustingPointsForCreator, setAdjustingPointsForCreator] = useState<Creator | null>(null)
  const [isResendDialogOpen, setIsResendDialogOpen] = useState(false)
  const [creatorToResend, setCreatorToResend] = useState<Creator | null>(null)

  const [creatorSorting, setCreatorSorting] = React.useState<SortingState>([])
  const [creatorGlobalFilter, setCreatorGlobalFilter] = useState("")
  const [creatorInvitationStatusFilter, setCreatorInvitationStatusFilter] = useState<string>("all")

  const [adminSorting, setAdminSorting] = React.useState<SortingState>([])
  const [adminGlobalFilter, setAdminGlobalFilter] = useState("")
  const [adminInvitationStatusFilter, setAdminInvitationStatusFilter] = useState<string>("all")

  // Split creators into two lists
  const creatorUsers = useMemo(() => creators.filter((c) => c.role === "Creator"), [creators])
  const adminUsers = useMemo(() => creators.filter((c) => c.role === "Admin"), [creators])

  const filteredCreatorUsers = useMemo(() => {
    let data = [...creatorUsers]
    if (creatorInvitationStatusFilter !== "all")
      data = data.filter((c) => c.invitationStatus === creatorInvitationStatusFilter)
    if (creatorGlobalFilter) {
      data = data.filter(
        (creator) =>
          creator.fullName.toLowerCase().includes(creatorGlobalFilter.toLowerCase()) ||
          creator.email.toLowerCase().includes(creatorGlobalFilter.toLowerCase()),
      )
    }
    return data
  }, [creatorUsers, creatorInvitationStatusFilter, creatorGlobalFilter])

  const filteredAdminUsers = useMemo(() => {
    let data = [...adminUsers]
    if (adminInvitationStatusFilter !== "all")
      data = data.filter((c) => c.invitationStatus === adminInvitationStatusFilter)
    if (adminGlobalFilter) {
      data = data.filter(
        (admin) =>
          admin.fullName.toLowerCase().includes(adminGlobalFilter.toLowerCase()) ||
          admin.email.toLowerCase().includes(adminGlobalFilter.toLowerCase()),
      )
    }
    return data
  }, [adminUsers, adminInvitationStatusFilter, adminGlobalFilter])

  const handleAddCreator = (newCreator: Creator) => setCreators((prev) => [newCreator, ...prev])
  const handleUpdateCreator = (updatedCreator: Creator) => {
    setCreators((prev) => prev.map((c) => (c.id === updatedCreator.id ? updatedCreator : c)))
    setIsEditCreatorOpen(false)
  }
  const handleEditCreator = (creator: Creator) => {
    setEditingCreator(creator)
    setIsEditCreatorOpen(true)
  }
  const handleViewProfile = (creator: Creator) => {
    setViewingCreatorProfile(creator)
    setIsViewProfileOpen(true)
  }

  const confirmResendInvitation = (creator: Creator) => {
    setCreatorToResend(creator)
    setIsResendDialogOpen(true)
  }

  const executeResendInvitation = () => {
    if (creatorToResend) {
      toast({ title: "Invitation Resent", description: `Invitation has been resent to ${creatorToResend.fullName}.` })
    }
    setIsResendDialogOpen(false)
    setCreatorToResend(null)
  }

  const handleOpenAdjustPointsDialog = (creator: Creator) => {
    setAdjustingPointsForCreator(creator)
    setIsAdjustPointsOpen(true)
  }
  const handlePointsAdjusted = (creatorId: string, newPoints: number) => {
    setCreators((prev) => prev.map((c) => (c.id === creatorId ? { ...c, points: newPoints } : c)))
  }

  const creatorColumns: ColumnDef<Creator>[] = [
    {
      accessorKey: "fullName",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Creator <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue("fullName")}</div>
          <div className="text-xs text-muted-foreground">{row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: "invitationStatus",
      header: "Invitation Status",
      cell: ({ row }) => {
        const status: "Accepted" | "Pending Invitation" = row.getValue("invitationStatus")
        return (
          <Badge
            variant={status === "Accepted" ? "default" : "outline"}
            className={
              status === "Pending Invitation"
                ? "border-amber-500 text-amber-600 bg-amber-50"
                : "bg-green-100 text-green-700"
            }
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <div>
          <div>{row.original.province || "-"}</div>
          <div className="text-xs text-muted-foreground">{row.original.city || "-"}</div>
        </div>
      ),
    },
    {
      accessorKey: "points",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Total Points <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const points = row.original.points
        return <div className="font-medium">{points.toLocaleString()}</div>
      },
    },
    {
      accessorKey: "socialMedia",
      header: "Social Media",
      cell: ({ row }) => {
        const creator = row.original
        const igUsername = creator.instagramUsername
        const ttUsername = creator.tiktokUsername
        return (
          <div className="flex flex-col space-y-1 text-xs">
            {igUsername && (
              <a
                href={`https://instagram.com/${igUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <Instagram className="h-3.5 w-3.5" />
                {igUsername}
              </a>
            )}
            {ttUsername && (
              <a
                href={`https://tiktok.com/@${ttUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <TikTokIcon className="h-3.5 w-3.5" />
                {ttUsername}
              </a>
            )}
            {!igUsername && !ttUsername && <span className="text-muted-foreground">N/A</span>}
          </div>
        )
      },
    },
    {
      id: "actions",
      header: () => <div className="">Actions</div>,
      cell: ({ row }) => {
        const creator = row.original
        return (
          <div className="flex items-center justify-start gap-0.5">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => handleViewProfile(creator)}>
                    <UserIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Profile</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => handleEditCreator(creator)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit Creator</p>
                </TooltipContent>
              </Tooltip>
              {creator.invitationStatus === "Pending Invitation" && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => confirmResendInvitation(creator)}>
                      <Mail className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Resend Invitation</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {creator.invitationStatus === "Accepted" && ( // Adjust points only for accepted creators
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => handleOpenAdjustPointsDialog(creator)}>
                      <Coins className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Adjust Points</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </TooltipProvider>
          </div>
        )
      },
    },
  ]

  // Define columns for Admins
  const adminColumns: ColumnDef<Creator>[] = [
    {
      accessorKey: "fullName",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Admin <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue("fullName")}</div>
          <div className="text-xs text-muted-foreground">{row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: "invitationStatus",
      header: "Invitation Status",
      cell: ({ row }) => {
        const status: "Accepted" | "Pending Invitation" = row.getValue("invitationStatus")
        return (
          <Badge
            variant={status === "Accepted" ? "default" : "outline"}
            className={
              status === "Pending Invitation"
                ? "border-amber-500 text-amber-600 bg-amber-50"
                : "bg-green-100 text-green-700"
            }
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <div>
          <div>{row.original.province || "-"}</div>
          <div className="text-xs text-muted-foreground">{row.original.city || "-"}</div>
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="">Actions</div>,
      cell: ({ row }) => {
        const admin = row.original
        return (
          <div className="flex items-center justify-start gap-0.5">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => handleViewProfile(admin)}>
                    <UserIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Profile</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => handleEditCreator(admin)}>
                    {" "}
                    {/* Still uses handleEditCreator */}
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit Admin</p>
                </TooltipContent>
              </Tooltip>
              {/* Always show resend invitation for admins, but disable if accepted */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => confirmResendInvitation(admin)}
                    disabled={admin.invitationStatus === "Accepted"} // Disable if accepted
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{admin.invitationStatus === "Accepted" ? "Invitation Accepted" : "Resend Invitation"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )
      },
    },
  ]

  const creatorTable = useReactTable({
    data: filteredCreatorUsers,
    columns: creatorColumns,
    onSortingChange: setCreatorSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting: creatorSorting, globalFilter: creatorGlobalFilter },
    onGlobalFilterChange: setCreatorGlobalFilter,
    initialState: { pagination: { pageSize: 5 } },
  })

  const adminTable = useReactTable({
    data: filteredAdminUsers,
    columns: adminColumns,
    onSortingChange: setAdminSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting: adminSorting, globalFilter: adminGlobalFilter },
    onGlobalFilterChange: setAdminGlobalFilter,
    initialState: { pagination: { pageSize: 5 } },
  })

  const handleDownloadTemplate = () =>
    toast({ title: "Template Downloaded", description: "The creator import template has been downloaded." })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Manage User</h1>
        <Button onClick={() => setIsAddCreatorOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New User
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setIsImportCreatorsOpen(true)}>
          <Upload className="mr-2 h-4 w-4" /> Upload Users
        </Button>
        <Button variant="outline" onClick={handleDownloadTemplate}>
          <Download className="mr-2 h-4 w-4" /> Download Template
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage creators and administrators in your organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="creators" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="creators">Creators ({filteredCreatorUsers.length})</TabsTrigger>
              <TabsTrigger value="administrators">Administrators ({filteredAdminUsers.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="creators" className="space-y-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-grow w-full md:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search creators..."
                    value={creatorGlobalFilter}
                    onChange={(e) => setCreatorGlobalFilter(e.target.value)}
                    className="pl-8 w-full"
                  />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <Select value={creatorInvitationStatusFilter} onValueChange={setCreatorInvitationStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="All Invitations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Invitations</SelectItem>
                      <SelectItem value="Accepted">Accepted</SelectItem>
                      <SelectItem value="Pending Invitation">Pending Invitation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {creatorTable.getHeaderGroups().map((hg) => (
                      <TableRow key={hg.id}>
                        {hg.headers.map((h) => (
                          <TableHead key={h.id}>
                            {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {creatorTable.getRowModel().rows?.length ? (
                      creatorTable.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={creatorColumns.length} className="h-24 text-center">
                          No creators found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <CustomPagination
                currentPage={creatorTable.getState().pagination.pageIndex + 1}
                totalPages={creatorTable.getPageCount()}
                totalItems={creatorTable.getFilteredRowModel().rows.length}
                itemsPerPage={creatorTable.getState().pagination.pageSize}
                onPageChange={(page) => creatorTable.setPageIndex(page - 1)}
                onItemsPerPageChange={(size) => creatorTable.setPageSize(size)}
                itemName="creators"
              />
            </TabsContent>

            <TabsContent value="administrators" className="space-y-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-grow w-full md:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search administrators..."
                    value={adminGlobalFilter}
                    onChange={(e) => setAdminGlobalFilter(e.target.value)}
                    className="pl-8 w-full"
                  />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <Select value={adminInvitationStatusFilter} onValueChange={setAdminInvitationStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="All Invitations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Invitations</SelectItem>
                      <SelectItem value="Accepted">Accepted</SelectItem>
                      <SelectItem value="Pending Invitation">Pending Invitation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {adminTable.getHeaderGroups().map((hg) => (
                      <TableRow key={hg.id}>
                        {hg.headers.map((h) => (
                          <TableHead key={h.id}>
                            {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {adminTable.getRowModel().rows?.length ? (
                      adminTable.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={adminColumns.length} className="h-24 text-center">
                          No administrators found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <CustomPagination
                currentPage={adminTable.getState().pagination.pageIndex + 1}
                totalPages={adminTable.getPageCount()}
                totalItems={adminTable.getFilteredRowModel().rows.length}
                itemsPerPage={adminTable.getState().pagination.pageSize}
                onPageChange={(page) => adminTable.setPageIndex(page - 1)}
                onItemsPerPageChange={(size) => adminTable.setPageSize(size)}
                itemName="administrators"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AddCreatorDialog
        isOpen={isAddCreatorOpen}
        onOpenChange={setIsAddCreatorOpen}
        onCreatorAdded={handleAddCreator}
      />
      {editingCreator && (
        <EditCreatorDialog
          isOpen={isEditCreatorOpen}
          onOpenChange={setIsEditCreatorOpen}
          creator={editingCreator}
          onCreatorUpdated={handleUpdateCreator}
        />
      )}
      {viewingCreatorProfile && (
        <ViewProfileDialog
          isOpen={isViewProfileOpen}
          onOpenChange={setIsViewProfileOpen}
          creator={viewingCreatorProfile}
        />
      )}
      {adjustingPointsForCreator && (
        <AdjustPointsDialog
          isOpen={isAdjustPointsOpen}
          onOpenChange={setIsAdjustPointsOpen}
          creator={adjustingPointsForCreator}
          onPointsAdjusted={handlePointsAdjusted}
        />
      )}

      {creatorToResend && (
        <AlertDialog open={isResendDialogOpen} onOpenChange={setIsResendDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Resend Invitation</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to resend the invitation to {creatorToResend.fullName}?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setCreatorToResend(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={executeResendInvitation}>Resend</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <Dialog open={isImportCreatorsOpen} onOpenChange={setIsImportCreatorsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Creators</DialogTitle>
            <DialogDescription>
              Upload an Excel file with creator information. Make sure to use the correct template format.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-center text-gray-600 mb-4">
                Drag and drop your Excel file here, or click to browse
              </p>
              <div className="flex gap-2">
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Browse Files
                </Button>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm text-amber-800">
              <p className="font-medium mb-1">Important Notes:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Make sure all required fields are filled in the template</li>
                <li>Email addresses must be unique and valid</li>
                <li>Supported file formats: .xlsx, .xls</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportCreatorsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({ title: "Upload Initiated", description: "Creator upload process has started." })
                setIsImportCreatorsOpen(false)
              }}
            >
              Upload File
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
