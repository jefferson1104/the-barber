"use client"

import Link from "next/link"
import Image from "next/image"
import { signIn, signOut, useSession } from "next-auth/react"

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"

import { categories } from "../_utils/categories"

import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Avatar, AvatarImage } from "./ui/avatar"

export const Sidebar = () => {
  // Hooks
  const { data } = useSession()

  // Methods
  const loginWithGoogleHandler = () => signIn("google")
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
                <DialogHeader>
                  <DialogTitle>Sign in to the platform</DialogTitle>
                  <DialogDescription>
                    Sign in using your Google account
                  </DialogDescription>
                </DialogHeader>

                <Button
                  className="gap-1 font-bold"
                  variant="outline"
                  onClick={loginWithGoogleHandler}
                >
                  <Image
                    src="/icons/google.svg"
                    width={18}
                    height={18}
                    alt="google sign in"
                  />
                  Google
                </Button>
              </DialogContent>
            </Dialog>
          </>
        )}
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
        <Button
          className="justify-start gap-2"
          variant="ghost"
          onClick={signOutHandler}
        >
          <LogOutIcon size={18} />
          Sign Out
        </Button>
      </div>
    </SheetContent>
  )
}
