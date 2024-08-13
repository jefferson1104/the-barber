import { format } from "date-fns"

import { Card, CardContent } from "./ui/card"
import { Barbershop, BarbershopService } from "@prisma/client"
import { enUS } from "date-fns/locale"

interface BookingSummaryProps {
  service: Pick<BarbershopService, "name" | "price">
  barbershop: Pick<Barbershop, "name">
  selectedDate: Date
}

export const BookingSummary = ({
  service,
  barbershop,
  selectedDate,
}: BookingSummaryProps) => {
  // Renders
  return (
    <div>
      <Card>
        <CardContent className="space-y-3 p-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm font-bold">
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(Number(service.price))}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-gray-400">Date</h2>
            <p className="text-sm">
              {format(selectedDate, "MMMM dd", {
                locale: enUS,
              })}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-gray-400">Time</h2>
            {/* <p className="text-sm">{selectedTime}</p> */}
            <p className="text-sm">
              {format(selectedDate, "hh:mm a", { locale: enUS })}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-gray-400">Barber shop</h2>
            <p className="text-sm">{barbershop.name}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
