"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, CreditCard, Smartphone, Gift, Sparkles, ChevronRight } from "lucide-react"
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
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    title: "Rp 250.000 E-Money",
    points: 1250,
    type: "e-money",
    description: "Redeem your points for Rp 250.000 e-money that can be sent to your phone number.",
    image: "/placeholder.svg?height=300&width=300",
    color: "from-blue-400 to-cyan-300",
  },
  {
    id: 3,
    title: "Rp 100.000 E-Money",
    points: 500,
    type: "e-money",
    description: "Redeem your points for Rp 100.000 e-money that can be sent to your phone number.",
    image: "/placeholder.svg?height=300&width=300",
    color: "from-blue-300 to-cyan-200",
  },
  {
    id: 4,
    title: "Rp 200.000 Phone Credit",
    points: 1000,
    type: "phone-credit",
    description: "Redeem your points for Rp 200.000 phone credit that can be sent to your phone number.",
    image: "/placeholder.svg?height=300&width=300",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 5,
    title: "Rp 100.000 Phone Credit",
    points: 500,
    type: "phone-credit",
    description: "Redeem your points for Rp 100.000 phone credit that can be sent to your phone number.",
    image: "/placeholder.svg?height=300&width=300",
    color: "from-purple-400 to-pink-400",
  },
  {
    id: 6,
    title: "Rp 50.000 Phone Credit",
    points: 250,
    type: "phone-credit",
    description: "Redeem your points for Rp 50.000 phone credit that can be sent to your phone number.",
    image: "/placeholder.svg?height=300&width=300",
    color: "from-purple-300 to-pink-300",
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
        <div className="mt-4 md:mt-0 p-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-white/80">Your Points Balance</p>
            <p className="text-2xl font-bold">{userPoints.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full mb-6">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="all" className="flex-1 md:flex-none">
            <Gift className="h-4 w-4 mr-2" /> All Rewards
          </TabsTrigger>
          <TabsTrigger value="e-money" className="flex-1 md:flex-none">
            <CreditCard className="h-4 w-4 mr-2" /> E-Money
          </TabsTrigger>
          <TabsTrigger value="phone-credit" className="flex-1 md:flex-none">
            <Smartphone className="h-4 w-4 mr-2" /> Phone Credit
          </TabsTrigger>
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
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg border-0 bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col h-[320px]">
      <div className={`h-24 bg-gradient-to-r ${reward.color} relative overflow-hidden`}>
        <Badge className="absolute top-3 right-3 z-10 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 border-0 text-white font-semibold">
          <Sparkles className="h-3 w-3 mr-1" /> {reward.points} pts
        </Badge>
        <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
          {reward.type === "e-money" ? (
            <CreditCard className="h-12 w-12 text-white/80" />
          ) : (
            <Smartphone className="h-12 w-12 text-white/80" />
          )}
        </div>
        <div className="absolute -bottom-6 -right-6 bg-white/20 rounded-full h-20 w-20"></div>
        <div className="absolute -top-4 -left-4 bg-white/10 rounded-full h-16 w-16"></div>
      </div>

      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-xl font-bold">{reward.title}</CardTitle>
        <CardDescription className="flex items-center text-sm">
          {reward.type === "e-money" ? "E-money reward" : "Phone credit reward"}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2">{reward.description}</p>
      </CardContent>

      <CardFooter className="mt-auto">
        <Button
          className={`w-full group-hover:translate-y-0 transition-all ${
            canRedeem
              ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
              : "bg-gradient-to-r from-slate-400 to-slate-500"
          }`}
          onClick={() => onRedeemClick(reward)}
          disabled={!canRedeem}
        >
          {canRedeem ? (
            <span className="flex items-center">
              Redeem Reward <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </span>
          ) : (
            "Not Enough Points"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
