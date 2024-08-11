"use client"
import { useState } from "react"
import Image from "next/image"
import { Barbershop, BarbershopService } from "@prisma/client"
import { format, set } from "date-fns"
import { enUS } from "date-fns/locale"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

import { createBooking } from "../_actions/create-booking"

import { TIME_LIST } from "../_utils/time-list"

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Calendar } from "./ui/calendar"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

export const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  // Hooks
  const { data } = useSession()

  // States
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  // Methods
  const selectDateHandler = (date: Date | undefined) => {
    setSelectedDate(date)
  }

  const selectTimeHandler = (time: string) => {
    setSelectedTime(time)
  }

  const createBookingHandler = async () => {
    if (!selectedDate || !selectedTime) return

    const hour = Number(selectedTime?.split(":")[0])
    const minute = Number(selectedTime?.split(":")[1])
    const newDate = set(selectedDate, {
      minutes: minute,
      hours: hour,
    })

    try {
      await createBooking({
        serviceId: service.id,
        userId: (data?.user as any).id,
        date: newDate,
      })
      toast.success("Booking created successfully")
    } catch (error) {
      console.error("createBookingHandler() Error ", JSON.stringify(error))
      toast.error("Error creating booking")
    }
  }

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
        <div className="w-full space-y-3">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(Number(service.price))}
            </p>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm">
                  Book
                </Button>
              </SheetTrigger>
              <SheetContent className="px-0">
                <SheetHeader>
                  <SheetTitle>Book a service</SheetTitle>
                </SheetHeader>

                <div className="border-b border-solid py-5">
                  <Calendar
                    mode="single"
                    locale={enUS}
                    selected={selectedDate}
                    onSelect={selectDateHandler}
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "100%",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32px",
                      },
                      caption: {},
                    }}
                  />
                </div>

                {selectedDate && (
                  <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                    {TIME_LIST.map((time) => (
                      <Button
                        className="rounded-full"
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => selectTimeHandler(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}

                {selectedDate && selectedTime && (
                  <div className="p-5">
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
                            {format(selectedDate, "MMMM dd", { locale: enUS })}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Time</h2>
                          <p className="text-sm">{selectedTime}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Barber shop</h2>
                          <p className="text-sm">{barbershop.name}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <SheetFooter className="mt-5 px-5">
                  <SheetClose asChild>
                    <Button
                      onClick={createBookingHandler}
                      disabled={!selectedDate || !selectedTime}
                    >
                      Confirm
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
