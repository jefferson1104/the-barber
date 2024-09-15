import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

import { authOptions } from "../_lib/auth"

import { getConfirmedBookings } from "../_data/get-confirmed-bookings"
import { getFinalizedBookings } from "../_data/get-finalized-bookings"

import { Header } from "../_components/header"
import { BookingItem } from "../_components/booking-item"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../_components/ui/carousel"

const Bookings = async () => {
  // Constants
  const session = await getServerSession(authOptions)
  const confirmedBookings = await getConfirmedBookings()
  const finalizedBookings = await getFinalizedBookings()

  // Renders
  if (!session?.user) {
    return notFound()
  }

  return (
    <section>
      {/* Mobile Version */}
      <div className="lg:hidden">
        <Header />
        <div className="space-y-3 p-5">
          <h1 className="text-xl font-bold">Bookings</h1>

          {/* Empty Bookings */}
          {confirmedBookings.length === 0 && finalizedBookings.length === 0 && (
            <div className="mt-6 text-center text-gray-400">
              No bookings found
            </div>
          )}

          {/* Confirmed Bookings */}
          {confirmedBookings.length > 0 && (
            <>
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                Confirmed
              </h2>
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </>
          )}

          {/* Finalized Bookings */}
          {finalizedBookings.length > 0 && (
            <>
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                Finalized
              </h2>
              {finalizedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {/* Desktop Version */}
      <div className="hidden lg:contents">
        <Header />
        <div className="mt-12 space-y-3 px-32">
          <h1 className="text-xl font-bold">Bookings</h1>

          {/* Empty Bookings */}
          {confirmedBookings.length === 0 && finalizedBookings.length === 0 && (
            <div className="mt-6 px-16 text-left text-gray-400">
              No confirmed bookings found.
            </div>
          )}

          {/* Confirmed Bookings */}
          {confirmedBookings.length > 0 && (
            <div className="max-w-[1380px] space-y-3 px-16">
              <h2 className="mt-6 text-xs font-bold uppercase text-gray-400">
                Confirmed
              </h2>
              <Carousel
                key={confirmedBookings.length}
                opts={{ align: "start" }}
              >
                <CarouselContent className="cursor-pointer lg:w-[420px]">
                  {confirmedBookings.map((booking) => (
                    <CarouselItem key={booking.id}>
                      <BookingItem
                        booking={JSON.parse(JSON.stringify(booking))}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="ml-5 h-12 w-12" />
                <CarouselNext className="mr-5 h-12 w-12" />
              </Carousel>
            </div>
          )}

          {/* Finalized Bookings */}
          {finalizedBookings.length > 0 && (
            <div className="space-y-3 px-16 py-4">
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                Finalized
              </h2>
              <div className="flex flex-wrap gap-4">
                {finalizedBookings.map((booking) => (
                  <div key={booking.id} className="w-[405px]">
                    <BookingItem
                      booking={JSON.parse(JSON.stringify(booking))}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Bookings
