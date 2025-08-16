"use client"

import { useState, useEffect, useMemo } from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { User, IndonesianRegion, IndonesianCity } from "../../types/user"
import { regionsData } from "../../data/mockUsers"

interface AddUserDialogProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onUserAdded: (newUser: User) => void
}

export function AddUserDialog({ isOpen, onOpenChange, onUserAdded }: AddUserDialogProps) {
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
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>Enter the details for the new user. Phone number is optional.</DialogDescription>
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
