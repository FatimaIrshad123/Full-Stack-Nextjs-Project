'use client'

import { useToast } from "@/components/ui/use-toast"
import { Message } from "@/model/User"
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema"
import { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

const page = () => {
    const [messages,setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSwitchLoading,setIsSwitchLoading] = useState(false)

    const {toast} = useToast()

    const handleDeleteMessage = (messageId: string) => {
        setMessages(messages.filter((message) => message._id !== messageId))
    }

    const {data: session} = useSession()

    const form = useForm({
        resolver: zodResolver(acceptMessageSchema)
    })

    const {register, watch, setValue} = form;
    const acceptMessages = watch('acceptMessages')

    const fetchAcceptMessage = useCallback(async () => {
        setIsSwitchLoading(true)
        try {
           const response = await axios.get<ApiResponse>('/api/accept-messages')
           setValue('acceptMessages', response.data.isAcceptingMessage)
        }catch(error){
            const axiosError = error as AxiosError<ApiResponse>
            toast ({
                title: "Error",
                description: axiosError.response?.data.message || "Failed to fetch message settings",
                variant: "destructive"
            })
        } finally {
            setIsSwitchLoading(false)
        }
    },[setValue])

    const fetchMessages = useCallback(async(refresh: boolean = false) => {
        setIsLoading(true)
        setIsSwitchLoading(false)
        try {
            const response = await axios.get<ApiResponse>('/api/get-messages')
            setMessages(response.data.messages || [])
            if (refresh){
                toast ({
                    title: "Rereshed Messages",
                    description: "Showing latest messages"
                })
            }
        }catch (error){
            const axiosError = error as AxiosError<ApiResponse>
            toast ({
                title: "Error",
                description: axiosError.response?.data.message || "Failed to fetch message settings",
                variant: "destructive"
            })
        }finally {
            setIsLoading(false)
            setIsSwitchLoading(false)
        }
    },[setIsLoading,setMessages])

    useEffect(() => {

        if (!session || !session.user) return 
        fetchMessages()
        fetchAcceptMessage()
    },[session, setValue, fetchAcceptMessage, fetchMessages])

    

    return (
        <div>
            Dashboard
        </div>
    )
}

export default page