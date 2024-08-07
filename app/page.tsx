"use client"

import Image from "next/image"
import { SearchIcon } from "lucide-react"

import { Header } from "./_components/header"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"

export default function Home() {
  // Renders
  return (
    <div>
      {/* header */}
      <Header />

      {/* Content */}
      <div className="p-5">
        <h2 className="text-xl font-bold">Hello, Jefferson Soares!</h2>
        <p>Wednesday, August 5th</p>

        <div className="mt-6 flex flex-row items-center gap-2">
          <Input placeholder="do your search..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            className="rounded-xl object-cover"
            src="/images/banner.png"
            alt="Book the best ones with The Barber"
            fill
          />
        </div>
      </div>
    </div>
  )
}
