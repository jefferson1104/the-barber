import Image from "next/image"
import { SearchIcon } from "lucide-react"

import { db } from "./_lib/prisma"

import { categories } from "./_utils/categories"

import { Header } from "./_components/header"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import { Card, CardContent } from "./_components/ui/card"
import { BarbershopItem } from "./_components/barbershop-item"
import { BookingItem } from "./_components/booking-item"

const Home = async () => {
  // Constants
  const recommendedBarbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  // Renders
  return (
    <div>
      {/* header */}
      <Header />

      <div className="p-5">
        {/* Text */}
        <h2 className="text-xl font-bold">Hello, Jefferson Soares!</h2>
        <p>Wednesday, August 5th</p>

        {/* Search */}
        <div className="mt-6 flex flex-row items-center gap-2">
          <Input placeholder="do your search..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* Categories */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => (
            <Button className="gap-2" variant="secondary" key={category.title}>
              <Image
                src={category.imageUrl}
                width={16}
                height={16}
                alt={category.title}
              />
              {category.title}
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

        {/* Appointments */}
        <BookingItem />

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

      {/* Footer */}
      <footer>
        <Card>
          <CardContent className="px-5 py-6">
            <p className="text-sm text-gray-400">
              @ 2024 <span className="font-bold">Soares Dev LTDA</span>. All
              rights reserved.
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}

export default Home
