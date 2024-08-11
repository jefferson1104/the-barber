import Image from "next/image"
import { BarbershopService } from "@prisma/client"

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

interface ServiceItemProps {
  service: BarbershopService
}

export const ServiceItem = ({ service }: ServiceItemProps) => {
  // Renders
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        {/* Image */}
        <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            className="rounded-lg object-cover"
            fill
            src={service.imageUrl}
            alt={service.name}
          />
        </div>

        {/* Info */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>

          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(Number(service.price))}
            </p>
            <Button variant="secondary" size="sm">
              Book
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
