"use client"

import { useRouter } from "next/navigation"
import { SearchIcon } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"

const formSchema = z.object({
  search: z.string().trim().min(3),
})

export const Search = () => {
  // Hooks
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  })

  // Methods
  const onSubmitHandler = (formData: z.infer<typeof formSchema>) => {
    router.push(`/barbershops?search=${formData.search}`)
  }

  // Renders
  return (
    <Form {...form}>
      <form
        className="flex gap-2"
        onSubmit={form.handleSubmit(onSubmitHandler)}
      >
        <FormField
          name="search"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Search for barbershops"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <SearchIcon />
        </Button>
      </form>
    </Form>
  )
}
