"use client"

import { useState, useEffect, useMemo } from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { X, User as UserIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { User, IndonesianRegion, IndonesianCity } from "../../types/user"
import { regionsData } from "../../data/mockUsers"

interface AddUserPanelProps {
  isOpen: boolean
  onClose: () => void
  onUserAdded: (newUser: User) => void
}

export function AddUserPanel({ isOpen, onClose, onUserAdded }: AddUserPanelProps) {
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

  // Reset form when panel opens
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

  // Reset city when province changes
  useEffect(() => {
    setSelectedCity(null)
  }, [selectedProvince])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  const handleSubmit = () => {
    if (!fullName || !email || !selectedProvince || !selectedCity || !role) {
      toast({
        title: "Missing Information",
        description: "Full Name, Email, Province, City, and Role are mandatory.",
        variant: "destructive",
      })
      return
    }

    const newUser: User = {
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

    onUserAdded(newUser)
    toast({ title: "User Added", description: `${fullName} has been invited.` })
    onClose()
  }

  const handleReset = () => {
    setFullName("")
    setEmail("")
    setPhoneNumber("")
    setSelectedProvince(null)
    setSelectedCity(null)
    setRole("Creator")
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex"
      onClick={handleBackdropClick}
      style={{ margin: 0, padding: 0 }}
    >
      {/* Backdrop */}
      <div className="flex-1 bg-black/20" />
      
      {/* Panel */}
      <div className="w-[45%] h-screen bg-white shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="border-b p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* User Icon */}
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <UserIcon className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Add New User</h2>
                <p className="text-sm text-muted-foreground">Create a new user account</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div>
            <h3 className="text-xl font-semibold mb-4">User Information</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-base text-muted-foreground">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-base text-muted-foreground">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="employee@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phoneNumber" className="text-base text-muted-foreground">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="province" className="text-base text-muted-foreground">
                    Province <span className="text-red-500">*</span>
                  </Label>
                  <Popover open={openProvincePopover} onOpenChange={setOpenProvincePopover}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openProvincePopover}
                        className="w-full justify-between mt-2"
                      >
                        {selectedProvince ? selectedProvince.name : "Select province..."}{" "}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" side="bottom" align="start">
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

                <div>
                  <Label htmlFor="city" className="text-base text-muted-foreground">
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Popover open={openCityPopover} onOpenChange={setOpenCityPopover}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openCityPopover}
                        className="w-full justify-between mt-2"
                        disabled={!selectedProvince || availableCities.length === 0}
                      >
                        {selectedCity ? selectedCity.name : "Select city..."}{" "}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" side="bottom" align="start">
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

              <div>
                <Label htmlFor="role-select" className="text-base text-muted-foreground">
                  Role <span className="text-red-500">*</span>
                </Label>
                <Select value={role} onValueChange={(value: "Creator" | "Admin") => setRole(value)}>
                  <SelectTrigger id="role-select" className="mt-2">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Creator">Creator</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Fields marked with <span className="text-red-500">*</span> are required. Phone number is optional.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={handleSubmit}
              className="bg-gray-800 hover:bg-gray-600 text-white"
            >
              Add User
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
