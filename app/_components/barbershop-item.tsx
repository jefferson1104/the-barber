import Image from "next/image"
import { Barbershop } from "@prisma/client"
import { StarIcon } from "lucide-react"

import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

interface BarbershopItemProps {
  barbershop: Barbershop
}

export const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  // Renders
  return (
    <Card className="min-w-[167px] rounded-2xl">
      <CardContent className="p-0">
        <div className="relative h-[159px] w-full">
          <Image
            className="rounded-2xl object-cover p-1"
            fill
            alt={barbershop.name}
            src={barbershop.imageUrl}
          />
          <Badge
            className="absolute left-2 top-2 space-x-1"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>

        <div className="px-2 py-3">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barbershop.address}</p>
          <Button className="mt-3 w-full" variant="secondary">
            Book
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
