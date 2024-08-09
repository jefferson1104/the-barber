"use client"
import { toast } from "sonner"
import { SmartphoneIcon } from "lucide-react"

import { Button } from "./ui/button"

interface PhoneItemProps {
  phone: string
}

export const PhoneItem = ({ phone }: PhoneItemProps) => {
  // Methods
  const copyHandler = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast.success("Phone number copied to clipboard")
  }

  // Renders
  return (
    <div className="flex justify-between" key={phone}>
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p className="text-sm">{phone}</p>
      </div>
      <Button variant="outline" size="sm" onClick={() => copyHandler(phone)}>
        Copy
      </Button>
    </div>
  )
}
