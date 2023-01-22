import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native"
import React, { useEffect } from "react"
import { Alert } from "react-native"
import { Loader } from "../components/Loader"
import useApi from "../hooks/useApi"
import useUser from "../hooks/useUser"
import { AppStackParamList } from "../navigators"

export default function CheckoutScreen() {
    const route = useRoute<RouteProp<AppStackParamList, "Checkout">>()
    const params = route.params
    const navigation = useNavigation()
    const { uid } = useUser()
    const { checkout, initCheckout, isLoading } = useApi()

    useEffect(() => {
        initCheckout(params?.id, uid)
    }, [])

    useEffect(() => {
        if (!checkout?.data?.customer) return
            ; (async () => {
                const info = checkout?.data
                const { error } = await initPaymentSheet({
                    merchantDisplayName: "Abode",
                    customerId: info?.customer,
                    customerEphemeralKeySecret: info?.ephemeralKey,
                    paymentIntentClientSecret: info?.paymentIntent,
                    allowsDelayedPaymentMethods: false,
                })
                if (!error) {
                    openPaymentSheet()
                }
            })()
    }, [checkout])

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet()
        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message)
            navigation.goBack()
        } else {
            Alert.alert("Success", "Your payment is confirmed!")
            navigation.navigate("Payment")
        }
    }

    if (isLoading) return <Loader />

    return <></>
}
