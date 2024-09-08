import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ChevronLeftIcon,
  MapPin,
  MapPinIcon,
  MenuIcon,
  StarIcon,
} from "lucide-react"

import { db } from "@/app/_lib/prisma"

import { Button } from "@/app/_components/ui/button"
import { ServiceItem } from "@/app/_components/service-item"
import { PhoneItem } from "@/app/_components/phone-item"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { Sidebar } from "@/app/_components/sidebar"
import { Header } from "@/app/_components/header"
import { Badge } from "@/app/_components/ui/badge"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"

interface BarberShopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarberShopPageProps) => {
  // Constants
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  // Utils
  const operatingDays = [
    { day: "Monday", open: "10:00", close: "20:00" },
    { day: "Tuesday", open: "10:00", close: "20:00" },
    { day: "Wednesday", open: "10:00", close: "20:00" },
    { day: "Thursday", open: "10:00", close: "20:00" },
    { day: "Friday", open: "10:00", close: "20:00" },
    { day: "Saturday", open: "10:00", close: "20:00" },
    { day: "Sunday", open: "10:00", close: "20:00" },
  ]

  // Renders
  if (!barbershop) {
    return notFound()
  }

  return (
    <>
      {/* Mobile Version */}
      <main className="md:hidden">
        {/* Image */}
        <div className="relative h-[250px] w-full">
          <Image
            className="object-cover"
            fill
            src={barbershop.imageUrl}
            alt={barbershop.name}
          />

          <Button
            className="absolute left-4 top-4"
            variant="secondary"
            size="icon"
            asChild
          >
            <Link href="/">
              <ChevronLeftIcon />
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="absolute right-4 top-4"
                size="icon"
                variant="outline"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <Sidebar />
          </Sheet>
        </div>

        {/* Info */}
        <div className="border-b border-solid p-5">
          <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>

          <div className="mb-2 flex items-center gap-2">
            <MapPinIcon className="text-primary" size={18} />
            <p className="text-sm">{barbershop.address}</p>
          </div>

          <div className="mb-2 flex items-center gap-2">
            <StarIcon className="fill-primary text-primary" size={18} />
            <p className="text-sm">4,8 {"(120 Reviews)"} </p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3 border-b border-solid p-5">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            About us
          </h2>
          <p className="text-justify text-sm">{barbershop.description}</p>
        </div>

        {/* Services */}
        <div className="space-y-3 border-b border-solid p-5">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Services
          </h2>
          <div className="space-y-3">
            {barbershop.services.map((service) => (
              <ServiceItem
                key={service.id}
                barbershop={JSON.parse(JSON.stringify(barbershop))}
                service={JSON.parse(JSON.stringify(service))}
              />
            ))}
          </div>
        </div>

        {/* Contacts */}
        <div className="space-y-3 p-5">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Contacts
          </h2>
          {barbershop.phones.map((phone, index) => (
            <PhoneItem phone={phone} key={index} />
          ))}
        </div>
      </main>

      {/* Desktop Version */}
      <main className="hidden md:contents">
        <Header />
        <div className="mb-12 mt-6 grid grid-cols-[1fr_0.5fr] gap-4 px-5 xl:px-32">
          {/* Left content */}
          <div className="w-full">
            <Image
              className="w-full rounded-sm"
              src={barbershop.imageUrl}
              alt={barbershop.name}
              width={758}
              height={487}
            />

            {/* Name, Address and Rate */}
            <div className="mt-4 flex flex-row justify-between">
              <div>
                <h2 className="text-3xl font-bold">{barbershop.name}</h2>
                <div className="flex flex-row items-center gap-1">
                  <MapPin className="color-primary text-primary" size={16} />
                  <p className="text-base">{barbershop.address}</p>
                </div>
              </div>

              <Badge
                className="flex h-16 w-32 flex-col justify-center gap-1 rounded-md"
                variant="secondary"
              >
                <div className="flex flex-row items-center gap-1">
                  <StarIcon className="fill-primary text-primary" size={20} />
                  <p className="text-base font-semibold">5,0</p>
                </div>
                <p className="text-sm">485 Reviews</p>
              </Badge>
            </div>

            {/* Services */}
            <div className="mt-12 space-y-3">
              <h2 className="text-sm font-bold uppercase text-gray-400">
                Services
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {barbershop.services.map((service) => (
                  <ServiceItem
                    key={service.id}
                    barbershop={JSON.parse(JSON.stringify(barbershop))}
                    service={JSON.parse(JSON.stringify(service))}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right content */}
          <Card>
            <CardContent className="p-5">
              {/* Name and Address */}
              <div className="relative flex h-[180px] w-full items-end">
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

              {/* About Us*/}
              <div className="space-y-1 py-4">
                <h2 className="text-sm font-bold uppercase">About Us</h2>
                <p className="text-sm text-gray-400">
                  {barbershop.description}
                </p>
              </div>

              {/* Contacts */}
              <div className="space-y-3 border-b-2 border-t-2 py-4">
                {barbershop.phones.map((phone, index) => (
                  <PhoneItem key={index} phone={phone} />
                ))}
              </div>

              {/* Operating days */}
              <div className="py-4">
                {operatingDays.map((day, index) => (
                  <div
                    key={index}
                    className="mt-2 flex items-center justify-between"
                  >
                    <p className="text-sm text-gray-400">{day.day}</p>
                    <p className="text-sm">
                      {day.open} - {day.close}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}

export default BarbershopPage
