import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList, AppStackScreenProps } from "../navigators"
import { Button, Header, Icon, Screen, Text } from "../components"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { colors, spacing } from "../theme"
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"


export const AuthenticationScreen: FC<AppStackScreenProps<"Authentication">> = observer(function AuthenticationScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()


  const navigation = useNavigation()
  const route = useRoute<RouteProp<AppStackParamList, "Authentication">>()
  const params = route.params
  const headerTilte = params.user == "landlord" ?
    `List your room or apartment for rent` : `Discover a place \nyou'll love to live`
  const subHeaderTilte = params.user == "landlord" ?
    `Abode matches you with the right tenants looking to rent a room or apartment like yours in a matter of days.` :
    `We are the solution for those of you who are looking for their next rent anywhere`
  console.log(params.user)
  return (
    <Screen style={$root} preset="fixed">

      <LinearGradient
        colors={[colors.palette.secondary400, colors.palette.primary400]}
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
        <Text
          text={headerTilte}
          preset="bold"
          style={$dicover} />
        <Text
          text={subHeaderTilte}
          preset="default"
          style={$weAre} />
        <View
          style={$buttonGroup}>
          <Button
            LeftAccessory={(props) => <Icon icon="google" size={24} />}
            text="Continue with Google"
            preset="default"
            textStyle={[$authText, { color: colors.black }]}
            style={$authButton} />
          {/* <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={5}
            style={{
              width: 200,
              height: 44
            }}

            onPress={async () => {
              try {
                const credential = await AppleAuthentication.signInAsync({
                  requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                  ],
                });
                // signed in
              } catch (e) {
                if (e.code === 'ERR_CANCELED') {
                  // handle that the user canceled the sign-in flow
                } else {
                  // handle other errors
                }
              }
            }}
          /> */}
          <Button
            LeftAccessory={(props) => <FontAwesome name="apple" size={24} color="white" />}
            text="Continue with Apple" preset="default"
            textStyle={[$authText, { color: colors.background }]}
            style={[$authButton, { backgroundColor: "black", borderWidth: 0 }]}
          />

        </View>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background
}
const $gradientStyle: ViewStyle = {
  flex: 1,
  opacity: 0.5,
  flexBasis: "55%",
  borderBottomLeftRadius: 35,
  borderBottomRightRadius: 35
}
const $closeIcon: ViewStyle = {
  flex: 1,
  alignItems: "flex-end",
  paddingHorizontal: spacing.medium,
  marginTop: spacing.huge
}
const $bottomSheet: ViewStyle = {
  backgroundColor: colors.background,
  paddingVertical: spacing.large,
  paddingHorizontal: spacing.medium,
  flexBasis: "50%"
}
const $dicover: TextStyle = {
  fontSize: 26,
  lineHeight: 34,
  textAlign: "center",
  letterSpacing: 2
}
const $weAre: TextStyle = {
  color: colors.textDim,
  fontSize: 14,
  paddingVertical: spacing.medium,
  textAlign: "center",
  letterSpacing: 1
}
const $authText: TextStyle = {
  fontSize: 16,
  paddingLeft: spacing.medium
}

const $buttonGroup: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "center",

  marginVertical: spacing.extraLarge
}
const $authButton: ViewStyle = {
  width: "80%",
  justifyContent: "center",
  borderRadius: 10,
  marginBottom: spacing.medium
}

const $closeView: ViewStyle = {
  height: 40,
  width: 40,
  backgroundColor: colors.palette.secondary50,
  borderRadius: 100,
  justifyContent: "center",
  alignItems: "center"
}
