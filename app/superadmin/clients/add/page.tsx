"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { PlusCircle, Upload, AlertCircle, Check, ArrowLeft, ChevronDown, Coins } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Initial industries list
const initialIndustries = [
  "Technology",
  "Manufacturing",
  "Energy",
  "Defense",
  "Pharmaceuticals",
  "Finance",
  "Retail",
  "Healthcare",
  "Education",
  "Transportation",
  "Hospitality",
  "Media",
  "Agriculture",
  "Construction",
  "Telecommunications",
]

export default function AddClientPage() {
  const router = useRouter()
  const { toast } = useToast()

  const handleAddClient = (formData) => {
    // In a real app, this would be an API call
    toast({
      title: "Company Added",
      description: `${formData.name} has been successfully added.`,
    })

    router.push("/superadmin/clients")
  }

  const handleCancel = () => {
    router.push("/superadmin/clients")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Add New Company</h1>
      </div>

      <AddClientForm onSubmit={handleAddClient} onCancel={handleCancel} />
    </div>
  )
}

function AddClientForm({ onSubmit, onCancel, initialData = null, isEditing = false }) {
  const [formData, setFormData] = useState({
    // Company Information
    id: initialData?.id || null,
    name: initialData?.name || "",
    industry: initialData?.industry || "",
    subdomain: initialData?.subdomain || "",
    address: initialData?.address || "",
    rewardBalance: initialData?.rewardBalance || "0",
    status: "Inactive", // Add this line
  })

  const [industries, setIndustries] = useState(initialIndustries)
  const [newIndustry, setNewIndustry] = useState("")
  const [formErrors, setFormErrors] = useState({})
  const { toast } = useToast()
  const [industrySearch, setIndustrySearch] = useState("")
  const [openIndustryCombobox, setOpenIndustryCombobox] = useState(false)
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)

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
  }

  const handleAddIndustry = () => {
    if (newIndustry && !industries.includes(newIndustry)) {
      const updatedIndustries = [...industries, newIndustry]
      setIndustries(updatedIndustries)
      setFormData((prev) => ({ ...prev, industry: newIndustry }))
      toast({
        title: "Industry Added",
        description: `"${newIndustry}" has been added to the industries list.`,
      })
    }
    setShowConfirmationDialog(false)
    setNewIndustry("")
  }

  const validateForm = () => {
    const errors = {}

    // Required fields in Company Information tab
    if (!formData.name) errors.name = "Company name is required"
    if (!formData.industry) errors.industry = "Industry is required"
    if (!formData.subdomain) errors.subdomain = "Subdomain is required"

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

  // Filter industries based on search
  const filteredIndustries = industrySearch
    ? industries.filter((industry) => industry.toLowerCase().includes(industrySearch.toLowerCase()))
    : industries

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Company Information */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Company Information</h3>
            <p className="text-sm text-muted-foreground">Enter the basic information about the company</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className={cn(formErrors.name && "text-destructive")}>
                Company Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter company name"
                className={cn(formErrors.name && "border-destructive")}
                required
              />
              {formErrors.name && <p className="text-xs text-destructive mt-1">{formErrors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry" className={cn(formErrors.industry && "text-destructive")}>
                Industry <span className="text-destructive">*</span>
              </Label>
              <Popover open={openIndustryCombobox} onOpenChange={setOpenIndustryCombobox}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openIndustryCombobox}
                    className={cn(
                      "w-full justify-between",
                      formErrors.industry && "border-destructive",
                      !formData.industry && "text-muted-foreground",
                    )}
                  >
                    {formData.industry || "Select industry..."}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search industry..."
                      value={industrySearch}
                      onValueChange={setIndustrySearch}
                    />
                    <CommandList>
                      {filteredIndustries.length > 0 ? (
                        <CommandGroup>
                          {filteredIndustries.map((industry) => (
                            <CommandItem
                              key={industry}
                              value={industry}
                              onSelect={() => {
                                setFormData((prev) => ({ ...prev, industry }))
                                setOpenIndustryCombobox(false)
                                setIndustrySearch("")
                                if (formErrors.industry) {
                                  setFormErrors((prev) => ({ ...prev, industry: undefined }))
                                }
                              }}
                            >
                              <div className="flex items-center">
                                {formData.industry === industry && (
                                  <Check className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                                )}
                                <span className={formData.industry === industry ? "font-medium" : ""}>{industry}</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      ) : (
                        <CommandEmpty className="py-6 text-center">
                          <p className="text-sm text-muted-foreground mb-4">No matching industries found</p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setNewIndustry(industrySearch)
                              setShowConfirmationDialog(true)
                              setOpenIndustryCombobox(false)
                            }}
                          >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add "{industrySearch}"
                          </Button>
                        </CommandEmpty>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {formErrors.industry && <p className="text-xs text-destructive mt-1">{formErrors.industry}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subdomain" className={cn(formErrors.subdomain && "text-destructive")}>
                Company Subdomain <span className="text-destructive">*</span>
              </Label>
              <div className="flex items-center">
                <Input
                  id="subdomain"
                  name="subdomain"
                  value={formData.subdomain}
                  onChange={handleChange}
                  className={cn("rounded-r-none", formErrors.subdomain && "border-destructive")}
                  placeholder="companyname"
                />
                <div className="bg-muted px-3 py-2 border border-l-0 border-input rounded-r-md text-muted-foreground">
                  .hypearn.com
                </div>
              </div>
              {formErrors.subdomain ? (
                <p className="text-xs text-destructive mt-1">{formErrors.subdomain}</p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  This subdomain will be used for company access and participant registration
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address Information</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="min-h-[100px]"
                placeholder="Enter company address"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Branding */}
        <div className="space-y-6">
          <div className="col-span-2">
            <h3 className="text-lg font-medium">Company Branding</h3>
            <p className="text-sm text-muted-foreground">Upload company logo in both square and horizontal formats</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-4">
                <Label>Square Logo (1:1)</Label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-slate-50">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-8 w-8 text-slate-400" />
                    <p className="text-sm font-medium">Upload square logo</p>
                    <p className="text-xs text-muted-foreground">SVG, PNG, JPG (max. 2MB)</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    Select File
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  This logo will be used for profile icons and small displays
                </p>
              </div>

              <div className="space-y-4">
                <Label>Horizontal Logo (3:1)</Label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-slate-50">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-8 w-8 text-slate-400" />
                    <p className="text-sm font-medium">Upload horizontal logo</p>
                    <p className="text-xs text-muted-foreground">SVG, PNG, JPG (max. 2MB)</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    Select File
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">This logo will be used for headers and wider displays</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmationDialog} onOpenChange={setShowConfirmationDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm New Industry</DialogTitle>
            <DialogDescription>Are you sure you want to add "{newIndustry}" as a new industry?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmationDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddIndustry}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
        <Button type="submit">{isEditing ? "Update Company" : "Save Company"}</Button>
      </div>
    </form>
  )
}
