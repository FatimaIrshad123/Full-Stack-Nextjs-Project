
'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import * as  z from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceValue, useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, { AxiosError } from 'axios';
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"


const page = () => {

  const { toast } = useToast()
  const router = useRouter()

  // zod implementation
    const form = useForm<z.infer<typeof signInSchema>>({
      resolver: zodResolver(signInSchema),
      defaultValues: {
        identifier: '',
        password: ''
      }
    })


    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
      const result = await signIn('credentials', {
        redirect: false,
        identifier: data.identifier,
        password: data.password
      })
      if (result?.error){
        toast({
          title: "Login Failed",
          description: "Incorrect username or password",
          variant: "destructive"
        })
      }
      if (result?.url){
        router.replace('/dashboard')
      }
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-cyan-700">
      <div className="w-full max-w-md p-8 rounded-lg shadow-md bg-white space-y-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight lg:text-5xl mb-6 font-extrabold">
            Join Mystery Message
          </h1>
          <p className="mb-4">Sign in to start your anonymus adventure </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Email/Username" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password"
                    placeholder="Password" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <Button type="submit" >
            Signin
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member? {' '}
            <Link href="/sign-up" className="hover:text-blue-800 text-blue-400">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default page;