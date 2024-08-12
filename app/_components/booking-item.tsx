import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { enUS } from "date-fns/locale"

import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import { PhoneItem } from "./phone-item"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: { service: { include: { barbershop: true } } }
  }>
}

export const BookingItem = ({ booking }: BookingItemProps) => {
  // Constants
  const isConfirmed = isFuture(booking.date)
  const {
    service: { barbershop },
  } = booking

  // Renders
  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed ? "Confirmed" : "Finalized"}
              </Badge>
              <h3 className="text-left font-semibold">
                {booking.service.name}
              </h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: enUS })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", { locale: enUS })}
              </p>
              <p className="text-sm">
                {format(booking.date, "hh:mm a", { locale: enUS })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[90%]">
        <SheetHeader>
          <SheetTitle className="text-left">Booking information</SheetTitle>
        </SheetHeader>

        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Image
            className="rounded-xl object-cover"
            alt="map of barbershop location"
            src="/images/map.png"
            fill
          />
          <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>
              <div className="">
                <h3 className="font-bold">{barbershop.name}</h3>
                <p className="text-xs">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmed" : "Finalized"}
          </Badge>

          <Card className="mb-6 mt-3">
            <CardContent className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <p className="text-sm font-bold">
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(Number(booking.service.price))}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Date</h2>
                <p className="text-sm">
                  {format(booking.date, "MMMM dd", {
                    locale: enUS,
                  })}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Time</h2>
                <p className="text-sm">
                  {format(booking.date, "hh:mm a", { locale: enUS })}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Barber shop</h2>
                <p className="text-sm">{barbershop.name}</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {barbershop.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
