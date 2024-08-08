import Image from "next/image"
import { SearchIcon } from "lucide-react"

import { db } from "./_lib/prisma"

import { Header } from "./_components/header"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { BarbershopItem } from "./_components/barbershop-item"

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
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Appointments
        </h2>
        <Card>
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmed</Badge>
              <h3 className="font-semibold">Hair cut</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png" />
                </Avatar>
                <p className="text-sm">Queen&#39;s Barber</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">August</p>
              <p className="text-2xl">7th</p>
              <p className="text-sm">04:00 pm</p>
            </div>
          </CardContent>
        </Card>

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
