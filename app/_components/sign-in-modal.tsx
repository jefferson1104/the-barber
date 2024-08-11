import Image from "next/image"
import { signIn } from "next-auth/react"

import { Button } from "./ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"

export const SignInModal = () => {
  // Methods
  const loginWithGoogleHandler = () => signIn("google")

  // Renders
  return (
    <>
      <DialogHeader>
        <DialogTitle>Sign in to the platform</DialogTitle>
        <DialogDescription>Sign in using your Google account</DialogDescription>
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
    </>
  )
}
