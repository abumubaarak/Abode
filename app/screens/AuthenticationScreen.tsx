import auth from "@react-native-firebase/auth"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"

import { FontAwesome } from "@expo/vector-icons"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, ImageBackground, Platform, TextStyle, View, ViewStyle } from "react-native"
import { Button, Close, Icon, Text } from "../components"
import { colors, spacing, typography } from "../theme"
import { onAppleButtonPress, onGoogleButtonPress } from "../utils/firebase"
GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  webClientId: "980427352092-vaihpt46rgqge0vns0ctne7ql9qoajmt.apps.googleusercontent.com",
})
export const AuthenticationScreen = observer(function AuthenticationScreen() {
  const [isLoading, setLoading] = useState<boolean>(false)
  const getStarted = require("../../assets/images/09.jpg")

  const navigation = useNavigation()

  useEffect(() => {
    if (auth().currentUser?.uid != null) {
      navigation.goBack()
    }
  }, [auth().currentUser?.uid])


  const continueWithGoogle = () => {
    setLoading(true)
    onGoogleButtonPress()
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
  }
  const continueWithApple = () => {
    setLoading(true)
    onAppleButtonPress()
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
  }

  return (
    <View style={$root} >
      <ImageBackground resizeMode="cover" source={getStarted} style={$root} >
        <Close />
      </ImageBackground>
      <View style={$bottomContainer}>
        <Text text={`Discover a place you'll \nlove to live`} preset="heading" style={$labelHeading} />
        <Text text="We are the solution for those of you who are looking for their next rent anywhere." preset="default" style={$labelSubHeading} />

        <View style={$buttonGroup}>
          <Button
            LeftAccessory={(props) =>
              isLoading ? (
                <ActivityIndicator
                  animating={isLoading}
                  size="small"
                  color={colors?.palette.primary300}
                />
              ) : (
                <Icon icon="google" size={24} />
              )
            }
            text="Continue with Google"
            preset="default"
            disabled={isLoading}
            onPress={continueWithGoogle}
            textStyle={[$authText, { color: colors?.black }]}
            style={$authButton}
          />
          {Platform.OS !== "android" && <Button
            LeftAccessory={(props) =>
              isLoading ? (
                <ActivityIndicator
                  animating={isLoading}
                  size="small"
                  color={colors?.palette.primary300}
                />
              ) : (
                <FontAwesome name="apple" size={24} color="white" />
              )
            }
            text="Continue with Apple"
            preset="default"
            disabled={isLoading}
            onPress={() => continueWithApple()}

            textStyle={[$authText, { color: colors?.background }]}
            style={[$authButton, { backgroundColor: "black", borderWidth: 0 }]}
          />}

        </View>
      </View>
    </View>

  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors?.background,
}

const $authText: TextStyle = {
  fontSize: 16,
  paddingLeft: spacing.medium,
}

const $buttonGroup: ViewStyle = {
  marginTop: Platform.OS === "ios" ? 25 : 50
}
const $authButton: ViewStyle = {
  width: "100%",
  justifyContent: "center",
  marginBottom: 9,
  borderRadius: 10,
}

const $bottomContainer: ViewStyle = {
  backgroundColor: "white",
  paddingTop: 25,
  marginTop: -25,
  paddingBottom: spacing.medium,
  paddingHorizontal: spacing.medium,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
}
const $labelHeading: TextStyle = {
  fontSize: 25,
  lineHeight: 38,
  fontFamily: typography.primary.semiBold,
}
const $labelSubHeading: TextStyle = {
  paddingVertical: spacing.tiny,
  lineHeight: 29,
}
