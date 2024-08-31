"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { MenuIcon, LogInIcon, ChevronRightIcon } from "lucide-react"

import { Sidebar } from "./sidebar"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { Dialog, DialogContent } from "./ui/dialog"
import { SignInModal } from "./sign-in-modal"
import { Avatar, AvatarImage } from "./ui/avatar"

export const Header = () => {
  // Hooks
  const { data } = useSession()

  // States
  const [signInModalIsOpen, setSignInModalIsOpen] = useState(false)

  // Renders
  return (
    <>
      <Card>
        <CardContent className="flex flex-row items-center justify-between p-5 xl:px-32">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="The Barber"
              height={18}
              width={120}
            />
          </Link>

          {/* Mobile version */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <Sidebar />
            </Sheet>
          </div>

          {/* Desktop version */}
          <div className="hidden md:contents">
            {data?.user && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="hover:bg-transparent">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src={data.user.image ?? ""}
                          alt="user avatar"
                        />
                      </Avatar>
                      <p className="font-bold">{data.user.name}</p>
                      <ChevronRightIcon />
                    </div>
                  </Button>
                </SheetTrigger>
                <Sidebar />
              </Sheet>
            )}

            {!data?.user && (
              <Button onClick={() => setSignInModalIsOpen(true)}>
                <LogInIcon className="mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sign In Modal */}
      <Dialog
        open={signInModalIsOpen}
        onOpenChange={(open) => setSignInModalIsOpen(open)}
      >
        <DialogContent className="w-[90%]">
          <SignInModal />
        </DialogContent>
      </Dialog>
    </>
  )
}
