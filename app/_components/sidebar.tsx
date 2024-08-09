import Link from "next/link"
import Image from "next/image"

import { CalendarIcon, HomeIcon, LogOutIcon } from "lucide-react"

import { categories } from "../_utils/categories"

import { Button } from "./ui/button"
import { Avatar, AvatarImage } from "./ui/avatar"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"

export const Sidebar = () => {
  // Renders
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center gap-3 border-b border-solid py-5">
        <Avatar>
          <AvatarImage
            src="https://plus.unsplash.com/premium_photo-1711987238385-fc2a6736fdb4?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="user avatar"
          />
        </Avatar>

        <div>
          <p className="font-bold">Jefferson Soares</p>
          <p className="text-sm">jeffersonscjunior@gmail.com</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 border-b border-solid p-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Home
            </Link>
          </Button>
        </SheetClose>

        <Button className="justify-start gap-2" variant="ghost">
          <CalendarIcon size={18} />
          Appointments
        </Button>
      </div>

      <div className="flex flex-col gap-1 border-b border-solid p-5">
        {categories.map((category) => (
          <Button
            className="justify-start gap-2"
            variant="ghost"
            key={category.title}
          >
            <Image
              src={category.imageUrl}
              alt={category.title}
              height={18}
              width={18}
            />
            {category.title}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-1 p-5">
        <Button className="justify-start gap-2" variant="ghost">
          <LogOutIcon size={18} />
          Log Out
        </Button>
      </div>
    </SheetContent>
  )
}
