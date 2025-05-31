"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Search, Plus, Award, Edit, Trash2, CheckCircle, XCircle, ImageIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CustomPagination } from "@/components/ui/custom-pagination"

const rewardFormSchema = z.object({
  name: z.string().min(2, {
    message: "Reward name must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  points: z.coerce.number().min(1, {
    // Coerce to number and ensure it's at least 1
    message: "Points must be at least 1.",
  }),
  rupiah_value: z.coerce.number().min(0, {
    message: "Rupiah value must be a positive number.",
  }),
  description: z.string().optional(),
  status: z.enum(["active", "inactive"]),
  imageUrl: z.string().min(1, {
    message: "Banner image is required.",
  }),
})

type RewardFormValues = z.infer<typeof rewardFormSchema>

type Reward = {
  id: string
  name: string
  category: string
  points: number
  rupiah_value: number
  status: string
  redemptions: number
  description?: string
  imageUrl: string
}

const POINT_TO_RUPIAH_RATE = 100

function RewardsCatalog({
  rewards,
  onEdit,
  onDelete,
  onToggleStatus,
}: {
  rewards: Reward[]
  onEdit: (reward: Reward) => void
  onDelete: (rewardId: string) => void
  onToggleStatus: (rewardId: string) => void
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {rewards.map((reward) => (
        <RewardCard
          key={reward.id}
          reward={reward}
          onEdit={() => onEdit(reward)}
          onDelete={() => onDelete(reward.id)}
          onToggleStatus={() => onToggleStatus(reward.id)}
        />
      ))}
    </div>
  )
}

export default function RewardsManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddRewardOpen, setIsAddRewardOpen] = useState(false)
  const [isEditRewardOpen, setIsEditRewardOpen] = useState(false)
  const [currentReward, setCurrentReward] = useState<Reward | null>(null)
  const { toast } = useToast()

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)

  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: "1",
      name: "GoPay Balance Rp 50.000",
      category: "E-Money",
      points: 500,
      rupiah_value: 500 * POINT_TO_RUPIAH_RATE,
      status: "active",
      redemptions: 28,
      description: "Saldo GoPay senilai Rp 50.000 untuk berbagai transaksi.",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "2",
      name: "Telkomsel Pulsa Rp 25.000",
      category: "Pulsa",
      points: 250,
      rupiah_value: 250 * POINT_TO_RUPIAH_RATE,
      status: "active",
      redemptions: 45,
      description: "Pulsa Telkomsel senilai Rp 25.000 untuk telepon dan data.",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "3",
      name: "OVO Cash Rp 100.000",
      category: "E-Money",
      points: 1000,
      rupiah_value: 1000 * POINT_TO_RUPIAH_RATE,
      status: "active",
      redemptions: 15,
      description: "Saldo OVO Cash senilai Rp 100.000 untuk pembayaran dan transfer.",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "4",
      name: "Indosat Pulsa Rp 50.000",
      category: "Pulsa",
      points: 500,
      rupiah_value: 500 * POINT_TO_RUPIAH_RATE,
      status: "active",
      redemptions: 30,
      description: "Pulsa Indosat Ooredoo senilai Rp 50.000.",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "5",
      name: "ShopeePay Balance Rp 75.000",
      category: "E-Money",
      points: 750,
      rupiah_value: 750 * POINT_TO_RUPIAH_RATE,
      status: "inactive",
      redemptions: 10,
      description: "Saldo ShopeePay senilai Rp 75.000 untuk belanja online.",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "6",
      name: "XL Axiata Pulsa Rp 100.000",
      category: "Pulsa",
      points: 1000,
      rupiah_value: 1000 * POINT_TO_RUPIAH_RATE,
      status: "active",
      redemptions: 22,
      description: "Pulsa XL Axiata senilai Rp 100.000.",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "7",
      name: "Dana Balance Rp 200.000",
      category: "E-Money",
      points: 2000,
      rupiah_value: 2000 * POINT_TO_RUPIAH_RATE,
      status: "active",
      redemptions: 8,
      description: "Saldo DANA senilai Rp 200.000 untuk berbagai kebutuhan.",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "8",
      name: "Tri Pulsa Rp 10.000",
      category: "Pulsa",
      points: 100,
      rupiah_value: 100 * POINT_TO_RUPIAH_RATE,
      status: "active",
      redemptions: 50,
      description: "Pulsa Tri (3) senilai Rp 10.000.",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
  ])

  const filteredRewards = rewards.filter(
    (reward) =>
      searchQuery === "" ||
      reward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reward.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredRewards.length / itemsPerPage)
  const paginatedRewards = filteredRewards.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value)
    setCurrentPage(1)
  }

  const handleAddReward = (data: RewardFormValues) => {
    const newReward: Reward = {
      id: `${rewards.length + 1}`,
      ...data,
      redemptions: 0,
    }
    setRewards([...rewards, newReward])
    setIsAddRewardOpen(false)
    toast({
      title: "Reward Added",
      description: `${data.name} has been added.`,
    })
  }

  const handleEditReward = (data: RewardFormValues) => {
    if (!currentReward) return
    setRewards(rewards.map((reward) => (reward.id === currentReward.id ? { ...currentReward, ...data } : reward)))
    setIsEditRewardOpen(false)
    setCurrentReward(null)
    toast({
      title: "Reward Updated",
      description: `${data.name} has been updated.`,
    })
  }

  const handleDeleteReward = (rewardId: string) => {
    const rewardToDelete = rewards.find((r) => r.id === rewardId)
    if (!rewardToDelete) return
    setRewards(rewards.filter((reward) => reward.id !== rewardId))
    toast({
      title: "Reward Deleted",
      description: `${rewardToDelete.name} has been removed.`,
    })
  }

  const handleToggleStatus = (rewardId: string) => {
    const updatedRewards = rewards.map((reward) =>
      reward.id === rewardId ? { ...reward, status: reward.status === "active" ? "inactive" : "active" } : reward,
    )
    const updatedReward = updatedRewards.find((r) => r.id === rewardId)
    setRewards(updatedRewards)
    toast({
      title: `Reward ${updatedReward?.status === "active" ? "Activated" : "Deactivated"}`,
      description: `${updatedReward?.name} status changed.`,
    })
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Rewards Management</h1>
          <p className="text-muted-foreground">Manage e-money, pulsa, and other rewards.</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button className="gap-1" onClick={() => setIsAddRewardOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Reward
          </Button>
        </div>
      </div>

      <div className="w-full mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search rewards (e.g., GoPay, Telkomsel)..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
        </div>

        {filteredRewards.length === 0 && searchQuery !== "" && (
          <div className="p-8 text-center text-muted-foreground border rounded-md">
            No rewards found for "{searchQuery}".
          </div>
        )}
        {filteredRewards.length === 0 && searchQuery === "" && (
          <div className="p-8 text-center text-muted-foreground border rounded-md">
            No rewards available. Add a new reward to get started.
          </div>
        )}

        {paginatedRewards.length > 0 && (
          <RewardsCatalog
            rewards={paginatedRewards}
            onEdit={(reward) => {
              setCurrentReward(reward)
              setIsEditRewardOpen(true)
            }}
            onDelete={handleDeleteReward}
            onToggleStatus={handleToggleStatus}
          />
        )}

        {totalPages > 1 && (
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredRewards.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            itemName="rewards"
          />
        )}
      </div>

      <AddRewardModal
        isOpen={isAddRewardOpen}
        onClose={() => setIsAddRewardOpen(false)}
        onSubmit={handleAddReward}
        pointToRupiahRate={POINT_TO_RUPIAH_RATE}
      />

      {currentReward && (
        <EditRewardModal
          isOpen={isEditRewardOpen}
          onClose={() => {
            setIsEditRewardOpen(false)
            setCurrentReward(null)
          }}
          reward={currentReward}
          onSubmit={handleEditReward}
          pointToRupiahRate={POINT_TO_RUPIAH_RATE}
        />
      )}
    </div>
  )
}

function RewardCard({
  reward,
  onEdit,
  onDelete,
  onToggleStatus,
}: {
  reward: Reward
  onEdit: () => void
  onDelete: () => void
  onToggleStatus: () => void
}) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="relative">
        <img
          src={reward.imageUrl || `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(reward.name)}`}
          alt={reward.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge
            variant={reward.status === "active" ? "default" : "secondary"}
            className={`${reward.status === "active" ? "bg-green-600 text-white" : "bg-slate-200 text-slate-700"} hover:bg-opacity-90 text-xs px-2 py-1`}
          >
            {reward.status === "active" ? "Active" : "Inactive"}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-3 py-1.5 rounded-md flex items-center gap-1.5">
          <Award className="h-4 w-4" />
          <span className="font-semibold text-sm">{reward.points.toLocaleString()} points</span>
        </div>
      </div>
      <CardHeader className="pt-4 pb-2">
        <CardTitle className="text-lg leading-tight">{reward.name}</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Value: Rp {reward.rupiah_value.toLocaleString()}</p>
      </CardHeader>
      <CardContent className="flex-grow pt-1 pb-3">
        <p className="text-sm text-muted-foreground line-clamp-3">{reward.description}</p>
      </CardContent>
      <CardFooter className="border-t pt-3 pb-3 flex justify-end space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onEdit}>
                <Edit className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Reward</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${reward.status === "active" ? "text-amber-500 hover:text-amber-600" : "text-green-500 hover:text-green-600"}`}
                onClick={onToggleStatus}
              >
                {reward.status === "active" ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{reward.status === "active" ? "Deactivate" : "Activate"} Reward</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500 hover:text-red-600"
                onClick={onDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete Reward</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}

function AddRewardModal({
  isOpen,
  onClose,
  onSubmit,
  pointToRupiahRate,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: z.infer<typeof rewardFormSchema>) => void
  pointToRupiahRate: number
}) {
  const form = useForm<z.infer<typeof rewardFormSchema>>({
    resolver: zodResolver(rewardFormSchema),
    defaultValues: {
      name: "",
      category: "Other", // Set a default category
      points: 0, // Initialize as 0 for controlled input
      rupiah_value: 0,
      description: "",
      status: "active",
      imageUrl: "", // User will upload
    },
  })

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "points") {
        const points = Number(value.points) // Ensure points is treated as a number
        if (!isNaN(points) && points > 0) {
          form.setValue("rupiah_value", points * pointToRupiahRate, { shouldValidate: true })
        } else {
          form.setValue("rupiah_value", 0, { shouldValidate: true })
        }
      }
    })
    return () => subscription.unsubscribe()
  }, [form, pointToRupiahRate])

  function handleSubmit(data: z.infer<typeof rewardFormSchema>) {
    onSubmit(data)
    form.reset() // Reset form to defaultValues after submission
  }

  const { toast } = useToast()
  function handleImageUpload() {
    const randomId = Math.floor(Math.random() * 1000)
    const imageName = form.getValues("name") || `Reward_${randomId}`
    form.setValue("imageUrl", `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(imageName)}`)
    toast({
      title: "Image Placeholder Set",
      description: "A placeholder image has been set based on the reward name.",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] h-[80vh] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Reward</DialogTitle>
          <DialogDescription>Create a new reward. Points will auto-calculate Rupiah value.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-2">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner Image</FormLabel>
                  <div className="flex flex-col gap-2">
                    <div className="border rounded-md overflow-hidden aspect-video bg-muted flex items-center justify-center">
                      {field.value ? (
                        <img
                          src={field.value || "/placeholder.svg"}
                          alt="Reward banner"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                    <Input type="text" placeholder="Enter image URL or upload" {...field} className="hidden" />
                    <Button type="button" variant="outline" className="w-full" onClick={handleImageUpload}>
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Set Placeholder Image (based on name)
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reward Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., GoPay Rp 50.000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="points"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Points Required</FormLabel>
                    <FormControl>
                      {/* Ensure value is not undefined for controlled input */}
                      <Input
                        type="number"
                        min="1"
                        placeholder="e.g., 500"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10) || 0)}
                        value={field.value || 0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rupiah_value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value (IDR)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} readOnly className="bg-slate-100" />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Auto-calculated: 1 point = Rp {pointToRupiahRate}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief description of the reward" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset()
                  onClose()
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Add Reward</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

function EditRewardModal({
  isOpen,
  onClose,
  reward,
  onSubmit,
  pointToRupiahRate,
}: {
  isOpen: boolean
  onClose: () => void
  reward: Reward
  onSubmit: (data: z.infer<typeof rewardFormSchema>) => void
  pointToRupiahRate: number
}) {
  const form = useForm<z.infer<typeof rewardFormSchema>>({
    resolver: zodResolver(rewardFormSchema),
    defaultValues: {
      // Ensure all fields have defined initial values
      name: reward.name || "",
      category: reward.category || "Other",
      points: reward.points || 0,
      rupiah_value: reward.rupiah_value || 0,
      description: reward.description || "",
      status: (reward.status as "active" | "inactive") || "active",
      imageUrl: reward.imageUrl || "",
    },
  })

  useEffect(() => {
    // Reset form when reward prop changes
    form.reset({
      name: reward.name || "",
      category: reward.category || "Other", // Keep existing category or default
      points: reward.points || 0,
      rupiah_value: reward.rupiah_value || 0,
      description: reward.description || "",
      status: (reward.status as "active" | "inactive") || "active",
      imageUrl: reward.imageUrl || "",
    })
  }, [reward, form])

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "points") {
        const points = Number(value.points)
        if (!isNaN(points) && points > 0) {
          form.setValue("rupiah_value", points * pointToRupiahRate, { shouldValidate: true })
        } else {
          form.setValue("rupiah_value", 0, { shouldValidate: true })
        }
      }
    })
    return () => subscription.unsubscribe()
  }, [form, pointToRupiahRate])

  function handleSubmit(data: z.infer<typeof rewardFormSchema>) {
    onSubmit(data)
    // form.reset(); // No need to reset here, onClose will handle it or new data will come
  }
  const { toast } = useToast()
  function handleImageUpload() {
    const randomId = Math.floor(Math.random() * 1000)
    const imageName = form.getValues("name") || `Reward_${randomId}`
    form.setValue("imageUrl", `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(imageName)}`)
    toast({
      title: "Image Placeholder Updated",
      description: "A placeholder image has been set based on the reward name.",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] h-[80vh] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Reward</DialogTitle>
          <DialogDescription>Update the reward details. Points will auto-calculate Rupiah value.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-2">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner Image</FormLabel>
                  <div className="flex flex-col gap-2">
                    <div className="border rounded-md overflow-hidden aspect-video bg-muted flex items-center justify-center">
                      {field.value ? (
                        <img
                          src={field.value || "/placeholder.svg"}
                          alt="Reward banner"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                    <Input type="text" placeholder="Enter image URL or upload" {...field} className="hidden" />
                    <Button type="button" variant="outline" className="w-full" onClick={handleImageUpload}>
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Update Placeholder Image
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reward Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., GoPay Rp 50.000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="points"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Points Required</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="e.g., 500"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10) || 0)}
                        value={field.value || 0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rupiah_value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value (IDR)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} readOnly className="bg-slate-100" />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Auto-calculated: 1 point = Rp {pointToRupiahRate}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief description of the reward" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Update Reward</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
