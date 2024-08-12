"use client"

import Link from "next/link"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"

import { categories } from "../_utils/categories"

import { Button } from "./ui/button"
import { Avatar, AvatarImage } from "./ui/avatar"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { SignInModal } from "./sign-in-modal"

export const Sidebar = () => {
  // Hooks
  const { data } = useSession()

  // Methods
  const signOutHandler = () => signOut()

  // Renders
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data.user.image ?? ""} alt="user avatar" />
            </Avatar>

            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="text-sm">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Hello, sign in!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <SignInModal />
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      <div className="flex flex-col gap-1 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Home
            </Link>
          </Button>
        </SheetClose>

        <Button className="justify-start gap-2" variant="ghost" asChild>
          <Link href="/bookings">
            <CalendarIcon size={18} />
            Bookings
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-1 border-b border-solid py-5">
        {categories.map((category) => (
          <SheetClose key={category.title} asChild>
            <Button className="justify-start gap-2" variant="ghost" asChild>
              <Link href={`/barbershops?service=${category.title}`}>
                <Image
                  src={category.imageUrl}
                  alt={category.title}
                  height={18}
                  width={18}
                />
                {category.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>

      {data?.user && (
        <div className="flex flex-col gap-1 py-5">
          <Button
            className="justify-start gap-2"
            variant="ghost"
            onClick={signOutHandler}
          >
            <LogOutIcon size={18} />
            Sign Out
          </Button>
        </div>
      )}
    </SheetContent>
  )
}
