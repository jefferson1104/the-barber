import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"

import { db } from "@/app/_lib/prisma"

import { Button } from "@/app/_components/ui/button"
import { ServiceItem } from "@/app/_components/service-item"
import { PhoneItem } from "@/app/_components/phone-item"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { Sidebar } from "@/app/_components/sidebar"

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

  // Renders
  if (!barbershop) {
    return notFound()
  }

  return (
    <div>
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
        <h2 className="text-xs font-bold uppercase text-gray-400">About us</h2>
        <p className="text-justify text-sm">{barbershop.description}</p>
      </div>

      {/* Services */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Services</h2>
        <div className="space-y-3">
          {barbershop.services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Contacts */}
      <div className="space-y-3 p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Contacts</h2>
        {barbershop.phones.map((phone) => (
          <PhoneItem phone={phone} key={phone} />
        ))}
      </div>
    </div>
  )
}

export default BarbershopPage
