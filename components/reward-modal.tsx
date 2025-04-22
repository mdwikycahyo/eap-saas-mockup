"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Phone, AlertCircle } from "lucide-react"

interface RewardModalProps {
  isOpen: boolean
  onClose: () => void
  reward: {
    title: string
    points: number
    type: "e-money" | "phone-credit"
  }
}

export function RewardModal({ isOpen, onClose, reward }: RewardModalProps) {
  const [step, setStep] = useState(1)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  const [error, setError] = useState("")

  const validatePhone = (phone: string) => {
    // Simple validation for Indonesian phone numbers
    const isValid = /^08[1-9][0-9]{7,10}$/.test(phone)
    setIsPhoneValid(isValid)
    return isValid
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPhoneNumber(value)
    validatePhone(value)
    setError("")
  }

  const handleSubmit = () => {
    if (!phoneNumber) {
      setError("Please enter your phone number")
      return
    }

    if (validatePhone(phoneNumber)) {
      setStep(2)
    } else {
      setError("Please enter a valid Indonesian phone number")
    }
  }

  const handleConfirm = () => {
    setStep(3)
    // In a real app, we would submit the redemption request here
  }

  const handleClose = () => {
    setStep(1)
    setPhoneNumber("")
    setIsPhoneValid(false)
    setError("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>Redeem {reward.title}</DialogTitle>
              <DialogDescription>
                Enter your phone number to receive your {reward.type === "e-money" ? "e-money" : "phone credit"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  <Phone className="h-4 w-4 ml-auto" />
                </Label>
                <div className="col-span-3">
                  <Input
                    id="phone"
                    placeholder="08xxxxxxxxxx"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    className={error ? "border-red-500" : ""}
                  />
                  {error && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-span-4">
                  <p className="text-sm text-muted-foreground">
                    This will deduct {reward.points} points from your balance.
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Continue</Button>
            </DialogFooter>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle>Confirm Redemption</DialogTitle>
              <DialogDescription>Please review your redemption details</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="border rounded-md p-4">
                <p className="font-medium mb-2">{reward.title}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Your {reward.title} will be sent as {reward.type === "e-money" ? "e-money" : "phone credit"} to{" "}
                  {phoneNumber}
                </p>
                <p className="text-sm font-medium">Points to be deducted: {reward.points}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleConfirm}>Confirm Redemption</Button>
            </DialogFooter>
          </>
        )}

        {step === 3 && (
          <>
            <DialogHeader>
              <div className="flex flex-col items-center justify-center py-6">
                <div className="rounded-full bg-green-100 p-3 mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <DialogTitle>Redemption Successful!</DialogTitle>
                <DialogDescription className="text-center mt-2">
                  Your {reward.title} has been successfully redeemed and will be processed within 24 hours.
                </DialogDescription>
              </div>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleClose} className="w-full">
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
