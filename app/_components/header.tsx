import Image from "next/image"
import { MenuIcon } from "lucide-react"

import { Sidebar } from "./sidebar"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Sheet, SheetTrigger } from "./ui/sheet"
import Link from "next/link"

export const Header = () => {
  // Renders
  return (
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

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <Sidebar />
        </Sheet>
      </CardContent>
    </Card>
  )
}
