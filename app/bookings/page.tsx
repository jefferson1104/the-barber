import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

import { authOptions } from "../_lib/auth"

import { getConfirmedBookings } from "../_data/get-confirmed-bookings"
import { getFinalizedBookings } from "../_data/get-finalized-bookings"

import { Header } from "../_components/header"
import { BookingItem } from "../_components/booking-item"

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
    <>
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
    </>
  )
}

export default Bookings
