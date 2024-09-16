import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import NextTopLoader from "nextjs-toploader"

import AuthProvider from "./_providers/auth"

import { Footer } from "./_components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Barber",
  description: "Book the best ones with The Barber",
  applicationName: "The Barber",
  referrer: "origin",
  creator: "Jefferson Soares",
  publisher: "Jefferson Soares",
  icons: {
    icon: "/images/thebarber.png",
    shortcut: "/images/thebarber.png",
    apple: "/images/thebarber.png",
  },
  appleWebApp: {
    capable: true,
    title: "MyLinkIn",
  },
  authors: [
    {
      name: "SoaresDev",
      url: "https://soaresdev.com",
    },
    {
      name: "Jefferson Soares",
      url: "https://links.soaresdev.com",
    },
  ],
  keywords: [
    "Barbershop",
    "The Barber",
    "Barber",
    "Hair cut",
    "Beard",
    "Eyebrows",
    "Corte de cabelo",
    "Sobrancelhas",
    "Barbearia",
    "Barbeiro",
  ],
  openGraph: {
    type: "website",
    url: "https://soaresdev.com",
    title: "The Barber",
    description: "Book the best ones with The Barber.",
    siteName: "The Barber",
    images: [{ url: "/images/social-banner.png" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="shortcut icon"
          href="/images/thebarber.png"
          type="image/png"
        />
        <title>The Barber</title>
      </head>
      <body className={inter.className}>
        <NextTopLoader color="#8161FF" showSpinner={false} />
        <AuthProvider>
          <div className="flex h-full flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
