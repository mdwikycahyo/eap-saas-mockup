"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, CreditCard, Smartphone } from "lucide-react"
import { RewardModal } from "@/components/reward-modal"

// Sample rewards data
const allRewards = [
  {
    id: 1,
    title: "Rp 500.000 E-Money",
    points: 2500,
    type: "e-money",
    description: "Redeem your points for Rp 500.000 e-money that can be sent to your phone number.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    title: "Rp 250.000 E-Money",
    points: 1250,
    type: "e-money",
    description: "Redeem your points for Rp 250.000 e-money that can be sent to your phone number.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    title: "Rp 100.000 E-Money",
    points: 500,
    type: "e-money",
    description: "Redeem your points for Rp 100.000 e-money that can be sent to your phone number.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    title: "Rp 200.000 Phone Credit",
    points: 1000,
    type: "phone-credit",
    description: "Redeem your points for Rp 200.000 phone credit that can be sent to your phone number.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    title: "Rp 100.000 Phone Credit",
    points: 500,
    type: "phone-credit",
    description: "Redeem your points for Rp 100.000 phone credit that can be sent to your phone number.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 6,
    title: "Rp 50.000 Phone Credit",
    points: 250,
    type: "phone-credit",
    description: "Redeem your points for Rp 50.000 phone credit that can be sent to your phone number.",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function Rewards() {
  const [activeTab, setActiveTab] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedReward, setSelectedReward] = useState<any>(null)
  const userPoints = 3250

  // Filter rewards based on active tab
  const filteredRewards = allRewards.filter((reward) => {
    if (activeTab === "all") return true
    return reward.type === activeTab
  })

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleRedeemClick = (reward: any) => {
    setSelectedReward(reward)
    setIsModalOpen(true)
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Rewards Catalog</h1>
          <p className="text-muted-foreground">Redeem your points for exciting rewards</p>
        </div>
        <div className="mt-4 md:mt-0 p-4 bg-slate-100 rounded-lg flex items-center gap-3">
          <Award className="h-5 w-5 text-slate-600" />
          <div>
            <p className="text-sm font-medium">Your Points Balance</p>
            <p className="text-2xl font-bold">{userPoints.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full mb-6">
        <TabsList>
          <TabsTrigger value="all">All Rewards</TabsTrigger>
          <TabsTrigger value="e-money">E-Money</TabsTrigger>
          <TabsTrigger value="phone-credit">Phone Credit</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <RewardGrid rewards={filteredRewards} userPoints={userPoints} onRedeemClick={handleRedeemClick} />
        </TabsContent>

        <TabsContent value="e-money" className="mt-6">
          <RewardGrid rewards={filteredRewards} userPoints={userPoints} onRedeemClick={handleRedeemClick} />
        </TabsContent>

        <TabsContent value="phone-credit" className="mt-6">
          <RewardGrid rewards={filteredRewards} userPoints={userPoints} onRedeemClick={handleRedeemClick} />
        </TabsContent>
      </Tabs>

      {selectedReward && (
        <RewardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} reward={selectedReward} />
      )}
    </div>
  )
}

interface RewardGridProps {
  rewards: any[]
  userPoints: number
  onRedeemClick: (reward: any) => void
}

function RewardGrid({ rewards, userPoints, onRedeemClick }: RewardGridProps) {
  if (rewards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No rewards found</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {rewards.map((reward) => (
        <RewardCard key={reward.id} reward={reward} userPoints={userPoints} onRedeemClick={onRedeemClick} />
      ))}
    </div>
  )
}

interface RewardCardProps {
  reward: any
  userPoints: number
  onRedeemClick: (reward: any) => void
}

function RewardCard({ reward, userPoints, onRedeemClick }: RewardCardProps) {
  const canRedeem = userPoints >= reward.points

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <CardTitle>{reward.title}</CardTitle>
          <Badge>{reward.points} pts</Badge>
        </div>
        <CardDescription>{reward.type === "e-money" ? "E-money reward" : "Phone credit reward"}</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-40 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
          {reward.type === "e-money" ? (
            <CreditCard className="h-16 w-16 text-slate-400" />
          ) : (
            <Smartphone className="h-16 w-16 text-slate-400" />
          )}
        </div>
        <p className="text-sm text-muted-foreground">{reward.description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onRedeemClick(reward)} disabled={!canRedeem}>
          {canRedeem ? "Redeem Reward" : "Not Enough Points"}
        </Button>
      </CardFooter>
    </Card>
  )
}
