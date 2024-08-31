import Image from "next/image"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { format } from "date-fns"

import { db } from "./_lib/prisma"
import { authOptions } from "./_lib/auth"

import { getConfirmedBookings } from "./_data/get-confirmed-bookings"

import { categories } from "./_utils/categories"

import { Header } from "./_components/header"
import { Button } from "./_components/ui/button"
import { BarbershopItem } from "./_components/barbershop-item"
import { BookingItem } from "./_components/booking-item"
import { Search } from "./_components/search"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./_components/ui/carousel"

const Home = async () => {
  // Constants
  const session = await getServerSession(authOptions)
  const today = format(new Date(), "EEEE, MMMM d")
  const confirmedBookings = await getConfirmedBookings()
  const hasConfirmedBookings = confirmedBookings.length > 0
  const recommendedBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  })
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  // Renders
  return (
    <main>
      {/* header */}
      <Header />

      {/* Mobile Content */}
      <div className="p-5 md:hidden">
        {/* Welcome */}
        <h2 className="text-xl font-bold">
          Hello, {session?.user ? session.user.name?.split(" ")[0] : "Welcome"}!
        </h2>
        <p>{today}</p>

        {/* Search */}
        <div className="mt-6">
          <Search />
        </div>

        {/* Categories */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={category.title}
              asChild
            >
              <Link href={`/barbershops?service=${category.title}`}>
                <Image
                  src={category.imageUrl}
                  width={16}
                  height={16}
                  alt={category.title}
                />
                {category.title}
              </Link>
            </Button>
          ))}
        </div>

        {/* Banner */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            className="rounded-xl object-cover"
            src="/images/banner.png"
            alt="Book the best ones with The Barber"
            fill
          />
        </div>

        {/* Bookings */}
        {session?.user && hasConfirmedBookings && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Bookings
            </h2>
            <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </>
        )}

        {/* Recommended */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recommended
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {recommendedBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/* Popular */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Popular
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      {/* Desktop Content */}
      <div className="hidden md:contents">
        {/* Hero */}
        <section className="h-[464px] bg-[url('/images/barber-background-grayscale.jpg')] bg-cover px-16 py-16 xl:px-32">
          <div className="flex justify-between">
            <div className="flex flex-col justify-between">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold">
                  Hello,{" "}
                  {session?.user ? session.user.name?.split(" ")[0] : "Welcome"}
                  !
                </h2>
                <p className="mb-6">{today}</p>
                <div className="w-[360px]">
                  <Search />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                {session?.user && hasConfirmedBookings && (
                  <>
                    <h2 className="text-xs font-bold uppercase text-gray-400">
                      Bookings
                    </h2>
                    <BookingItem
                      key={confirmedBookings[0].id}
                      booking={JSON.parse(JSON.stringify(confirmedBookings[0]))}
                    />
                  </>
                )}
              </div>
            </div>
            {/* Recommended */}
            <div className="flex flex-col space-y-4">
              <h2 className="text-xs font-bold uppercase text-gray-400">
                Recommended
              </h2>
              <Carousel opts={{ align: "start" }}>
                <CarouselContent className="-ml-4 max-w-[490px] cursor-pointer xl:max-w-[720px]">
                  {recommendedBarbershops.map((barbershop) => (
                    <CarouselItem
                      key={barbershop.id}
                      className="basis-1/2 pl-4 xl:basis-1/3"
                    >
                      <BarbershopItem barbershop={barbershop} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* <CarouselPrevious className="h-12 w-12 ml-5" /> */}
                <CarouselNext className="mr-6 h-12 w-12" />
              </Carousel>
            </div>
          </div>
        </section>

        {/* Popular */}
        <section className="px-16 pt-8 xl:px-32">
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase">Popular</h2>
          <Carousel opts={{ align: "start" }}>
            <CarouselContent className="-ml-4 cursor-pointer">
              {popularBarbershops.map((barbershop) => (
                <CarouselItem key={barbershop.id} className="basis-1/5 pl-4">
                  <BarbershopItem barbershop={barbershop} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-5 h-12 w-12" />
            <CarouselNext className="mr-5 h-12 w-12" />
          </Carousel>
        </section>

        {/* Most visited */}
        <section className="px-16 py-8 xl:px-32">
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase">
            Most visited
          </h2>
          <Carousel opts={{ align: "start" }}>
            <CarouselContent className="-ml-4 cursor-pointer">
              {popularBarbershops.map((barbershop) => (
                <CarouselItem key={barbershop.id} className="basis-1/5 pl-4">
                  <BarbershopItem barbershop={barbershop} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-5 h-12 w-12" />
            <CarouselNext className="mr-5 h-12 w-12" />
          </Carousel>
        </section>
      </div>
    </main>
  )
}

export default Home
