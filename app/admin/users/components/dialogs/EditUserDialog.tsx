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

interface EditUserDialogProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  user: User | null
  onUserUpdated: (updatedUser: User) => void
}

export function EditUserDialog({ isOpen, onOpenChange, user, onUserUpdated }: EditUserDialogProps) {
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
    if (user) {
      setFullName(user.fullName)
      setEmail(user.email)
      setPhoneNumber(user.phoneNumber || "")
      setRole(user.role)
      setInvitationStatus(user.invitationStatus)
      const province = regionsData.provinces.find((p) => p.name === user.province) || null
      setSelectedProvince(province)
      if (province) {
        const city = regionsData.cities.find((c) => c.name === user.city && c.province_id === province.id) || null
        setSelectedCity(city)
      } else {
        setSelectedCity(null)
      }
    }
  }, [user])

  useEffect(() => {
    if (user && selectedProvince && user.province !== selectedProvince.name) {
      setSelectedCity(null)
    }
  }, [selectedProvince, user])

  const handleSubmit = () => {
    if (!user || !fullName || !email || !selectedProvince || !selectedCity || !role) {
      toast({
        title: "Missing Information",
        description: "Full Name, Email, Province, City, and Role are mandatory.",
        variant: "destructive",
      })
      return
    }
    const updatedUser: User = {
      ...user,
      fullName,
      email,
      phoneNumber: phoneNumber || undefined,
      role,
      invitationStatus,
      province: selectedProvince.name,
      city: selectedCity.name,
    }
    onUserUpdated(updatedUser)
    toast({ title: "User Updated", description: `${fullName}'s details have been updated.` })
    onOpenChange(false)
  }

  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update details for {user.fullName}.</DialogDescription>
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
