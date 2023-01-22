import auth from "@react-native-firebase/auth"
import { useState } from "react"
import { api, BaseResponse, BaseResponseObject, Conversations, Messages } from "../services/api"

type Checkout = {
  id: string
  paymentIntent: string
  ephemeralKey: string
  customer: string
  publishableKey: string
}
const useApi = () => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [messages, setMessages] = useState<BaseResponse<Messages>>()
  const [conversations, setConversations] = useState<BaseResponse<Conversations>>()
  const [checkout, setCheckout] = useState<BaseResponseObject<Checkout>>()

  const initConversation = async (messages: Omit<Messages, "_id" | "__v">) => {
    setLoading(true)
    const response = await api.apisauce.post("messages", { ...messages })
    if (response.ok) {
      setLoading(false)
    }
  }

  const getMessageList = async () => {
    const response = await api.apisauce.get<BaseResponse<Messages>>("messages", {
      id: auth().currentUser.uid,
      user: "tenant",
    })
    if (response.ok) {
      setMessages(response.data)
      setLoading(false)
    } else if (response.problem) {
      setLoading(false)
    }
  }

  const getConversation = async (id: string) => {
    const response = await api.apisauce.get<BaseResponse<Conversations>>("conversations", { id })
    if (response.ok) {
      setConversations(response.data)
      setLoading(false)
    } else if (response.problem) {
      setLoading(false)
    }
  }

  const initCheckout = async (property_id: string, tenant_id: string) => {
    const response = await api.apisauce.post<BaseResponseObject<Checkout>>("payments", {
      property_id,
      tenant_id,
    })
    if (response.ok) {
      setCheckout(response.data)
      setLoading(false)
    } else if (response.problem) {
      setLoading(false)
    }
  }

  return {
    initConversation,
    isLoading,
    getMessageList,
    messages,
    conversations,
    getConversation,
    checkout,
    initCheckout,
  }
}

export default useApi
