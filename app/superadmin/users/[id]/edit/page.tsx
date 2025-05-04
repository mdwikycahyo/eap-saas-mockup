"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, ArrowLeft, Loader2, ChevronDown, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter, useParams } from "next/navigation"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Mock data for companies
const mockCompanies = [
  { id: 1, name: "Acme Corporation" },
  { id: 2, name: "TechNova Inc." },
  { id: 3, name: "Global Retail Group" },
  { id: 4, name: "HealthPlus Medical" },
]

// Indonesian provinces data
const indonesianProvinces = [
  { id: "ID-AC", name: "Aceh" },
  { id: "ID-BA", name: "Bali" },
  { id: "ID-BB", name: "Bangka Belitung" },
  { id: "ID-BT", name: "Banten" },
  { id: "ID-BE", name: "Bengkulu" },
  { id: "ID-JT", name: "Central Java" },
  { id: "ID-KT", name: "Central Kalimantan" },
  { id: "ID-ST", name: "Central Sulawesi" },
  { id: "ID-JI", name: "East Java" },
  { id: "ID-KI", name: "East Kalimantan" },
  { id: "ID-NT", name: "East Nusa Tenggara" },
  { id: "ID-GO", name: "Gorontalo" },
  { id: "ID-JK", name: "Jakarta" },
  { id: "ID-JA", name: "Jambi" },
  { id: "ID-LA", name: "Lampung" },
  { id: "ID-MA", name: "Maluku" },
  { id: "ID-MU", name: "North Maluku" },
  { id: "ID-SA", name: "North Sulawesi" },
  { id: "ID-SU", name: "North Sumatra" },
  { id: "ID-PA", name: "Papua" },
  { id: "ID-RI", name: "Riau" },
  { id: "ID-SR", name: "South East Sulawesi" },
  { id: "ID-KS", name: "South Kalimantan" },
  { id: "ID-SN", name: "South Sulawesi" },
  { id: "ID-SS", name: "South Sumatra" },
  { id: "ID-JB", name: "West Java" },
  { id: "ID-KB", name: "West Kalimantan" },
  { id: "ID-NB", name: "West Nusa Tenggara" },
  { id: "ID-PB", name: "West Papua" },
  { id: "ID-SB", name: "West Sulawesi" },
  { id: "ID-SM", name: "West Sumatra" },
  { id: "ID-YO", name: "Yogyakarta" },
]

// Indonesian cities data (sample for a few provinces)
const indonesianCities = {
  "ID-JK": [
    { id: "JK-01", name: "Central Jakarta" },
    { id: "JK-02", name: "East Jakarta" },
    { id: "JK-03", name: "North Jakarta" },
    { id: "JK-04", name: "South Jakarta" },
    { id: "JK-05", name: "West Jakarta" },
  ],
  "ID-JB": [
    { id: "JB-01", name: "Bandung" },
    { id: "JB-02", name: "Bekasi" },
    { id: "JB-03", name: "Bogor" },
    { id: "JB-04", name: "Cimahi" },
    { id: "JB-05", name: "Cirebon" },
    { id: "JB-06", name: "Depok" },
    { id: "JB-07", name: "Sukabumi" },
    { id: "JB-08", name: "Tasikmalaya" },
  ],
  "ID-JI": [
    { id: "JI-01", name: "Surabaya" },
    { id: "JI-02", name: "Malang" },
    { id: "JI-03", name: "Gresik" },
    { id: "JI-04", name: "Sidoarjo" },
    { id: "JI-05", name: "Mojokerto" },
    { id: "JI-06", name: "Pasuruan" },
  ],
  "ID-BA": [
    { id: "BA-01", name: "Denpasar" },
    { id: "BA-02", name: "Badung" },
    { id: "BA-03", name: "Bangli" },
    { id: "BA-04", name: "Buleleng" },
    { id: "BA-05", name: "Gianyar" },
    { id: "BA-06", name: "Jembrana" },
    { id: "BA-07", name: "Karangasem" },
    { id: "BA-08", name: "Klungkung" },
    { id: "BA-09", name: "Tabanan" },
  ],
}

// Mock users data
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@acme.com",
    role: "Admin",
    company: "Acme Corporation",
    status: "Active",
    lastActive: "2023-05-15",
    phoneNumber: "+62 812 3456 7890",
    province: "Jakarta",
    city: "South Jakarta",
    invitationStatus: "Confirmed",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@acme.com",
    role: "Creator",
    company: "Acme Corporation",
    status: "Active",
    lastActive: "2023-05-14",
    phoneNumber: "+62 813 9876 5432",
    province: "West Java",
    city: "Bandung",
    invitationStatus: "Confirmed",
  },
]

export default function EditUserPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchUser = () => {
      setIsLoading(true)
      const userId = params.id
      const user = mockUsers.find((u) => u.id === userId)

      if (user) {
        setUserData(user)
      } else {
        toast({
          title: "Error",
          description: "User not found",
          variant: "destructive",
        })
        router.push("/superadmin/users")
      }

      setIsLoading(false)
    }

    fetchUser()
  }, [params.id, router, toast])

  const handleUpdateUser = (formData) => {
    // In a real app, this would be an API call
    toast({
      title: "User Updated",
      description: `${formData.name} has been successfully updated.`,
    })

    // Only redirect after successful update
    router.push("/superadmin/users")
  }

  const handleCancel = () => {
    router.push("/superadmin/users")
  }

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-[calc(100vh-100px)]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading user data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Edit User: {userData?.name}</h1>
      </div>

      {userData && (
        <EditUserForm
          onSubmit={handleUpdateUser}
          onCancel={handleCancel}
          initialData={userData}
          companies={mockCompanies}
        />
      )}
    </div>
  )
}

function EditUserForm({ onSubmit, onCancel, companies, initialData }) {
  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
    email: initialData?.email || "",
    role: initialData?.role || "Creator",
    company: initialData?.company || "",
    phoneNumber: initialData?.phoneNumber || "",
    province: initialData?.province || "",
    city: initialData?.city || "",
    status: initialData?.status || "Active",
  })

  const [formErrors, setFormErrors] = useState({})
  const [openProvinceCombobox, setOpenProvinceCombobox] = useState(false)
  const [openCityCombobox, setOpenCityCombobox] = useState(false)
  const [provinceSearch, setProvinceSearch] = useState("")
  const [citySearch, setCitySearch] = useState("")
  const [availableCities, setAvailableCities] = useState([])
  const { toast } = useToast()

  // Initialize available cities based on the initial province
  useEffect(() => {
    if (initialData?.province) {
      const provinceId = indonesianProvinces.find((p) => p.name === initialData.province)?.id
      if (provinceId && indonesianCities[provinceId]) {
        setAvailableCities(indonesianCities[provinceId])
      }
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    // If province changes, reset city
    if (name === "province") {
      setFormData((prev) => ({ ...prev, city: "" }))

      // Set available cities based on selected province
      const provinceId = indonesianProvinces.find((p) => p.name === value)?.id
      if (provinceId && indonesianCities[provinceId]) {
        setAvailableCities(indonesianCities[provinceId])
      } else {
        setAvailableCities([])
      }
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.name) errors.name = "Full name is required"
    if (!formData.email) errors.email = "Email is required"
    if (!formData.company) errors.company = "Company is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    } else {
      toast({
        title: "Form Incomplete",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive",
      })
    }
  }

  // Filter provinces based on search
  const filteredProvinces = provinceSearch
    ? indonesianProvinces.filter((province) => province.name.toLowerCase().includes(provinceSearch.toLowerCase()))
    : indonesianProvinces

  // Filter cities based on search
  const filteredCities = citySearch
    ? availableCities.filter((city) => city.name.toLowerCase().includes(citySearch.toLowerCase()))
    : availableCities

  // Modify the EditUserForm component to use a two-column grid layout

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className={cn(formErrors.name && "text-destructive")}>
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={cn(formErrors.name && "border-destructive")}
              required
            />
            {formErrors.name && <p className="text-xs text-destructive mt-1">{formErrors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className={cn(formErrors.email && "text-destructive")}>
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={cn(formErrors.email && "border-destructive")}
              required
            />
            {formErrors.email && <p className="text-xs text-destructive mt-1">{formErrors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+62 xxx xxxx xxxx"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">
              Role <span className="text-destructive">*</span>
            </Label>
            <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Creator">Creator</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="company" className={cn(formErrors.company && "text-destructive")}>
              Company <span className="text-destructive">*</span>
            </Label>
            <Select value={formData.company} onValueChange={(value) => handleSelectChange("company", value)}>
              <SelectTrigger className={cn(formErrors.company && "border-destructive")}>
                <SelectValue placeholder="Select company" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.name}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formErrors.company && <p className="text-xs text-destructive mt-1">{formErrors.company}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="province">Province</Label>
            <Popover open={openProvinceCombobox} onOpenChange={setOpenProvinceCombobox}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openProvinceCombobox}
                  className="w-full justify-between"
                >
                  {formData.province || "Select province..."}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Search province..."
                    value={provinceSearch}
                    onValueChange={setProvinceSearch}
                  />
                  <CommandList>
                    <CommandEmpty>No province found.</CommandEmpty>
                    <CommandGroup className="max-h-[200px] overflow-y-auto">
                      {filteredProvinces.map((province) => (
                        <CommandItem
                          key={province.id}
                          value={province.name}
                          onSelect={() => {
                            handleSelectChange("province", province.name)
                            setOpenProvinceCombobox(false)
                            setProvinceSearch("")
                          }}
                        >
                          <div className="flex items-center">
                            {formData.province === province.name && (
                              <Check className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                            )}
                            <span className={formData.province === province.name ? "font-medium" : ""}>
                              {province.name}
                            </span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Popover open={openCityCombobox} onOpenChange={setOpenCityCombobox} disabled={!formData.province}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCityCombobox}
                  className={cn("w-full justify-between", !formData.province && "opacity-50 cursor-not-allowed")}
                  disabled={!formData.province}
                >
                  {formData.city || (formData.province ? "Select city..." : "Select province first")}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              {formData.province && (
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search city..." value={citySearch} onValueChange={setCitySearch} />
                    <CommandList>
                      {availableCities.length === 0 ? (
                        <CommandEmpty>No cities available for this province.</CommandEmpty>
                      ) : filteredCities.length === 0 ? (
                        <CommandEmpty>No city found.</CommandEmpty>
                      ) : (
                        <CommandGroup className="max-h-[200px] overflow-y-auto">
                          {filteredCities.map((city) => (
                            <CommandItem
                              key={city.id}
                              value={city.name}
                              onSelect={() => {
                                handleSelectChange("city", city.name)
                                setOpenCityCombobox(false)
                                setCitySearch("")
                              }}
                            >
                              <div className="flex items-center">
                                {formData.city === city.name && (
                                  <Check className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                                )}
                                <span className={formData.city === city.name ? "font-medium" : ""}>{city.name}</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              )}
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {Object.keys(formErrors).length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Please fill in all required fields marked with an asterisk (*).</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end gap-4 pt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Update User</Button>
      </div>
    </form>
  )
}
