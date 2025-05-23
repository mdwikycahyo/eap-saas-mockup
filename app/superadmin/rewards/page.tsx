"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

// Form schema for adding/editing rewards
const rewardFormSchema = z.object({
  name: z.string().min(2, {
    message: "Reward name must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  points: z.coerce.number().min(1, {
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

// Reward type definition
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

// Exchange rate: 1 point = X rupiah
const POINT_TO_RUPIAH_RATE = 100

export default function RewardsManagement() {
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: "1",
      name: "Company Branded T-Shirt",
      category: "Merchandise",
      points: 500,
      rupiah_value: 50000,
      status: "active",
      redemptions: 28,
      description: "High-quality cotton t-shirt with company logo.",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "2",
      name: "Wireless Earbuds",
      category: "Electronics",
      points: 2500,
      rupiah_value: 250000,
      status: "active",
      redemptions: 8,
      description: "Premium wireless earbuds with noise cancellation.",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "3",
      name: "Coffee Shop Gift Card",
      category: "Gift Cards",
      points: 1000,
      rupiah_value: 100000,
      status: "active",
      redemptions: 15,
      description: "Gift card for popular coffee shop chain.",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "4",
      name: "Premium Notebook Set",
      category: "Office Supplies",
      points: 750,
      rupiah_value: 75000,
      status: "active",
      redemptions: 12,
      description: "Set of premium notebooks with company branding.",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "5",
      name: "Weekend Getaway",
      category: "Experiences",
      points: 10000,
      rupiah_value: 1000000,
      status: "active",
      redemptions: 1,
      description: "Two-night stay at a luxury hotel.",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "6",
      name: "Limited Edition Hoodie",
      category: "Merchandise",
      points: 1200,
      rupiah_value: 120000,
      status: "inactive",
      redemptions: 20,
      description: "Limited edition hoodie with exclusive design.",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [isAddRewardOpen, setIsAddRewardOpen] = useState(false)
  const [isEditRewardOpen, setIsEditRewardOpen] = useState(false)
  const [currentReward, setCurrentReward] = useState<Reward | null>(null)
  const { toast } = useToast()

  // Get unique categories for filter
  const categories = Array.from(new Set(rewards.map((reward) => reward.category)))

  // Filter rewards based on search query and category filter
  const filteredRewards = rewards.filter(
    (reward) =>
      (searchQuery === "" ||
        reward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reward.description?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (categoryFilter === null || reward.category === categoryFilter),
  )

  // Function to handle adding a new reward
  const handleAddReward = (data: RewardFormValues) => {
    const newReward: Reward = {
      id: `${rewards.length + 1}`,
      name: data.name,
      category: data.category,
      points: data.points,
      rupiah_value: data.rupiah_value,
      status: data.status,
      redemptions: 0,
      description: data.description,
      imageUrl: data.imageUrl,
    }

    setRewards([...rewards, newReward])
    setIsAddRewardOpen(false)

    toast({
      title: "Reward Added",
      description: `${data.name} has been added to the rewards catalog.`,
    })
  }

  // Function to handle editing a reward
  const handleEditReward = (data: RewardFormValues) => {
    if (!currentReward) return

    const updatedRewards = rewards.map((reward) =>
      reward.id === currentReward.id
        ? {
            ...reward,
            name: data.name,
            category: data.category,
            points: data.points,
            rupiah_value: data.rupiah_value,
            status: data.status,
            description: data.description,
            imageUrl: data.imageUrl,
          }
        : reward,
    )

    setRewards(updatedRewards)
    setIsEditRewardOpen(false)
    setCurrentReward(null)

    toast({
      title: "Reward Updated",
      description: `${data.name} has been updated successfully.`,
    })
  }

  // Function to handle deleting a reward
  const handleDeleteReward = (rewardId: string) => {
    const rewardToDelete = rewards.find((r) => r.id === rewardId)
    if (!rewardToDelete) return

    const updatedRewards = rewards.filter((reward) => reward.id !== rewardId)
    setRewards(updatedRewards)

    toast({
      title: "Reward Deleted",
      description: `${rewardToDelete.name} has been removed from the rewards catalog.`,
    })
  }

  // Function to handle toggling reward status
  const handleToggleStatus = (rewardId: string) => {
    const updatedRewards = rewards.map((reward) =>
      reward.id === rewardId
        ? {
            ...reward,
            status: reward.status === "active" ? "inactive" : "active",
          }
        : reward,
    )

    const updatedReward = updatedRewards.find((r) => r.id === rewardId)
    setRewards(updatedRewards)

    toast({
      title: `Reward ${updatedReward?.status === "active" ? "Activated" : "Deactivated"}`,
      description: `${updatedReward?.name} has been ${updatedReward?.status === "active" ? "activated" : "deactivated"}.`,
    })
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Rewards Management</h1>
          <p className="text-muted-foreground">Manage rewards catalog and redemptions</p>
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
              placeholder="Search rewards..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={categoryFilter || "all"}
            onValueChange={(value) => setCategoryFilter(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <RewardsCatalog
          rewards={filteredRewards}
          onEdit={(reward) => {
            setCurrentReward(reward)
            setIsEditRewardOpen(true)
          }}
          onDelete={handleDeleteReward}
          onToggleStatus={handleToggleStatus}
        />
      </div>

      {/* Add Reward Modal */}
      <AddRewardModal
        isOpen={isAddRewardOpen}
        onClose={() => setIsAddRewardOpen(false)}
        onSubmit={handleAddReward}
        pointToRupiahRate={POINT_TO_RUPIAH_RATE}
      />

      {/* Edit Reward Modal */}
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

function RewardsCatalog({
  rewards,
  onEdit,
  onDelete,
  onToggleStatus,
}: {
  rewards: Reward[]
  onEdit: (reward: Reward) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
}) {
  return (
    <div>
      {rewards.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground border rounded-md">
          No rewards found. Add a new reward to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        <img src={reward.imageUrl || "/placeholder.svg"} alt={reward.name} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2">
          <Badge
            variant={reward.status === "active" ? "default" : "secondary"}
            className={reward.status === "inactive" ? "bg-slate-100 text-slate-800 hover:bg-slate-100" : ""}
          >
            {reward.status === "active" ? "Active" : "Inactive"}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded-md flex items-center gap-1">
          <Award className="h-4 w-4" />
          <span className="font-semibold">{reward.points.toLocaleString()} points</span>
        </div>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{reward.name}</CardTitle>
            <CardDescription className="text-xs">{reward.category}</CardDescription>
            <p className="text-xs text-muted-foreground mt-1">Value: Rp {reward.rupiah_value.toLocaleString()}</p>
          </div>
          <div className="flex space-x-1">
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
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{reward.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-xs text-muted-foreground">{reward.redemptions} redemptions</div>
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
      category: "",
      points: 0,
      rupiah_value: 0,
      description: "",
      status: "active",
      imageUrl: "/placeholder.svg?height=200&width=400", // Default placeholder
    },
  })

  // Update rupiah value when points change
  useEffect(() => {
    const points = form.getValues("points")
    if (points && !isNaN(points)) {
      form.setValue("rupiah_value", points * pointToRupiahRate, { shouldValidate: true })
    }
  }, [form.getValues("points"), pointToRupiahRate, form])

  function handleSubmit(data: z.infer<typeof rewardFormSchema>) {
    onSubmit(data)
    form.reset()
  }

  // Simulated image upload function
  function handleImageUpload() {
    // In a real app, this would open a file picker and upload the image
    // For now, we'll just simulate with a random placeholder
    const randomId = Math.floor(Math.random() * 1000)
    form.setValue("imageUrl", `/placeholder.svg?height=200&width=400&text=Reward_${randomId}`)
    toast({
      title: "Image Uploaded",
      description: "The banner image has been uploaded successfully.",
    })
  }

  const { toast } = useToast()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] h-[70vh] max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Reward</DialogTitle>
          <DialogDescription>Create a new reward for the catalog. Fill in all the required fields.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner Image</FormLabel>
                  <div className="flex flex-col gap-2">
                    <div className="border rounded-md overflow-hidden">
                      <img
                        src={field.value || "/placeholder.svg"}
                        alt="Reward banner"
                        className="w-full h-40 object-cover"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" className="w-full" onClick={handleImageUpload}>
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                    </div>
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
                    <Input placeholder="Enter reward name" {...field} />
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
                      <Input type="number" min="1" {...field} />
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
                    <FormLabel>Value in Rupiah (IDR)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormDescription>1 point = Rp {pointToRupiahRate}</FormDescription>
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
                    <Textarea placeholder="Enter reward description" {...field} />
                  </FormControl>
                  <FormDescription>Provide a brief description of the reward.</FormDescription>
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
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
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
      name: reward.name,
      category: reward.category,
      points: reward.points,
      rupiah_value: reward.rupiah_value,
      description: reward.description || "",
      status: reward.status as "active" | "inactive",
      imageUrl: reward.imageUrl,
    },
  })

  // Update rupiah value when points change
  useEffect(() => {
    const points = form.getValues("points")
    if (points && !isNaN(points)) {
      form.setValue("rupiah_value", points * pointToRupiahRate, { shouldValidate: true })
    }
  }, [form.getValues("points"), pointToRupiahRate, form])

  function handleSubmit(data: z.infer<typeof rewardFormSchema>) {
    onSubmit(data)
    form.reset()
  }

  // Simulated image upload function
  function handleImageUpload() {
    // In a real app, this would open a file picker and upload the image
    // For now, we'll just simulate with a random placeholder
    const randomId = Math.floor(Math.random() * 1000)
    form.setValue("imageUrl", `/placeholder.svg?height=200&width=400&text=Reward_${randomId}`)
    toast({
      title: "Image Updated",
      description: "The banner image has been updated successfully.",
    })
  }

  const { toast } = useToast()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] h-[70vh] max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Reward</DialogTitle>
          <DialogDescription>Update the reward details. Fill in all the required fields.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner Image</FormLabel>
                  <div className="flex flex-col gap-2">
                    <div className="border rounded-md overflow-hidden">
                      <img
                        src={field.value || "/placeholder.svg"}
                        alt="Reward banner"
                        className="w-full h-40 object-cover"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" className="w-full" onClick={handleImageUpload}>
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Change Image
                      </Button>
                    </div>
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
                    <Input placeholder="Enter reward name" {...field} />
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
                      <Input type="number" min="1" {...field} />
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
                    <FormLabel>Value in Rupiah (IDR)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormDescription>1 point = Rp {pointToRupiahRate}</FormDescription>
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
                    <Textarea placeholder="Enter reward description" {...field} />
                  </FormControl>
                  <FormDescription>Provide a brief description of the reward.</FormDescription>
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
            <DialogFooter>
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
