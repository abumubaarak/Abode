import { FontAwesome } from "@expo/vector-icons"
import auth from "@react-native-firebase/auth"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, TextStyle, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text } from "../components"
import { colors, spacing } from "../theme"

import { GoogleSignin } from "@react-native-google-signin/google-signin"
import LinearGradient from "react-native-linear-gradient"
import { onGoogleButtonPress } from "../utils/firebase"

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  webClientId: "980427352092-vaihpt46rgqge0vns0ctne7ql9qoajmt.apps.googleusercontent.com",
})
export const AuthenticationScreen = observer(function AuthenticationScreen() {
  // Pull in one of our MST stores
  const [isLoading, setLoading] = useState<boolean>(false)

  const navigation = useNavigation()

  useEffect(() => {
    if (auth().currentUser?.uid != null) {
      navigation.goBack()
    }
  }, [auth().currentUser?.uid])

  const continueWithGoogle = () => {
    setLoading(true)
    onGoogleButtonPress().then(() => setLoading(false))
  }
  return (
    <Screen style={$root} preset="fixed">
      <LinearGradient
        colors={[colors?.palette.secondary400, colors?.palette.primary400]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.1, y: 0.9 }}
        style={$gradientStyle}
      >
        <View style={$closeIcon}>
          <View style={$closeView}>
            <Icon icon="x" onPress={() => navigation.goBack()} />
          </View>
        </View>
      </LinearGradient>
      <View style={$bottomSheet}>
        <Text text={`Discover a place \nyou'll love to live`} preset="bold" style={$dicover} />
        <Text
          text="We are the solution for those of you who are looking for their next rent anywhere"
          preset="default"
          style={$weAre}
        />
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
          <Button
            LeftAccessory={(props) => <FontAwesome name="apple" size={24} color="white" />}
            text="Continue with Apple"
            preset="default"
            disabled={isLoading}
            textStyle={[$authText, { color: colors?.background }]}
            style={[$authButton, { backgroundColor: "black", borderWidth: 0 }]}
          />
        </View>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors?.background,
}
const $gradientStyle: ViewStyle = {
  flex: 1,
  opacity: 0.5,
  flexBasis: "55%",
  borderBottomLeftRadius: 35,
  borderBottomRightRadius: 35,
}
const $closeIcon: ViewStyle = {
  flex: 1,
  alignItems: "flex-end",
  paddingHorizontal: spacing.medium,
  marginTop: spacing.huge,
}
const $bottomSheet: ViewStyle = {
  backgroundColor: colors?.background,
  paddingVertical: spacing.large,
  paddingHorizontal: spacing.medium,
  flexBasis: "50%",
}
const $dicover: TextStyle = {
  fontSize: 26,
  lineHeight: 34,
  textAlign: "center",
  letterSpacing: 2,
}
const $weAre: TextStyle = {
  color: colors?.textDim,
  fontSize: 14,
  paddingVertical: spacing.medium,
  textAlign: "center",
  letterSpacing: 1,
}
const $authText: TextStyle = {
  fontSize: 16,
  paddingLeft: spacing.medium,
}

const $buttonGroup: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "center",
  marginVertical: spacing.extraLarge,
}
const $authButton: ViewStyle = {
  width: "80%",
  justifyContent: "center",
  borderRadius: 10,
  marginBottom: spacing.medium,
}

const $closeView: ViewStyle = {
  height: 40,
  width: 40,
  backgroundColor: colors?.palette.secondary100,
  borderRadius: 100,
  justifyContent: "center",
  alignItems: "center",
}
