import { MaterialIcons } from "@expo/vector-icons"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField } from "../components"
import { Loader } from "../components/Loader"
import useFirestore from "../hooks/useFirestore"
import { AppStackParamList, AppStackScreenProps } from "../navigators"
import { colors, spacing, typography } from "../theme"
import { avatarName } from "../utils"
import { USERS } from "../utils/firebase"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ApplyScreen: FC<StackScreenProps<AppStackScreenProps, "Apply">> = observer(
  function ApplyScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const navigation = useNavigation()

    const route = useRoute<RouteProp<AppStackParamList, "Apply">>()
    const params = route.params
    const { pId, lid, address, pName, tid, hasApplied, tName } = params
    const { getDocument: getLandlord, document: landlord, isLoading } = useFirestore()
    const { applyRent, isLoading: applyRentIsLoading, document: data } = useFirestore()
    const [message, setMessage] = useState<string>(`I am interested in ${pName} , ${address}.`)

    useEffect(() => {
      getLandlord(USERS, lid)
    }, [lid])

    useEffect(() => {
      if (data?.id) {
        hasApplied(true)
        navigation.goBack()
      }
    }, [applyRentIsLoading])

    // Pull in navigation via hook

    const handleApply = () => {
      applyRent({ lid, pId, tid, message, tName })
    }

    if (isLoading || applyRentIsLoading) return <Loader />

    return (
      <View style={$root}>
        <Screen preset="auto" style={$contentContainer}>
          <View style={$closeIcon}>
            <View style={$closeView}>
              <Icon icon="x" onPress={() => navigation.goBack()} />
            </View>
          </View>
          <View style={$content}>
            <Text text="Your Request" style={$requestLabel} />
            <Text
              style={$requestInfo}
              text="Adding a message increases your chances of finding your next home."
            />
            <View style={$landlordProfileContainer}>
              <View style={$avatar}>
                <Text text={avatarName(landlord?.displayName)} style={$avatarLabel} />
              </View>
              <View style={$labelContainer}>
                <View style={$nameContainer}>
                  <Text numberOfLines={1} style={$labelName} text={landlord?.displayName} />
                  <MaterialIcons name="verified" size={24} color={colors.palette.primary100} />
                </View>
                <Text text="Landlord" style={$labelTag} />
              </View>
            </View>
            <TextField
              style={$requestField}
              multiline
              value={message}
              onChangeText={(text) => setMessage(text)}
            />
          </View>
        </Screen>

        <View style={$buttonContainer}>
          <Button text="Apply" style={$button} textStyle={$buttonLabel} onPress={handleApply} />
        </View>
      </View>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.white,
}
const $closeIcon: ViewStyle = {
  flex: 1,
  alignItems: "flex-end",
  marginTop: spacing.huge,
}
const $contentContainer: ViewStyle = {
  flexBasis: "90%",
  paddingHorizontal: spacing.medium,
}
const $buttonContainer: ViewStyle = {
  paddingHorizontal: spacing.medium,
  justifyContent: "center",
  flexBasis: "12%",
  backgroundColor: colors.white,
}
const $buttonLabel: TextStyle = {
  color: "white",
  fontFamily: typography.primary.semiBold,
}

const $button: ViewStyle = {
  borderWidth: 0,
  borderRadius: 30,
  backgroundColor: colors.palette.primary50,
}

const $closeView: ViewStyle = {
  height: 40,
  width: 40,
  backgroundColor: colors?.lightgrey,
  borderRadius: 100,
  justifyContent: "center",
  alignItems: "center",
}

const $requestLabel: TextStyle = {
  lineHeight: 43,
  fontSize: 27,
  fontFamily: typography.primary.bold,
}
const $requestInfo: TextStyle = {
  paddingTop: spacing.medium,
  color: colors.gray,
  fontFamily: typography.primary.light,
}
const $landlordProfileContainer: ViewStyle = {
  marginBottom: 10,
  flexDirection: "row",
  alignItems: "center",
  marginTop: 20,
  paddingBottom: spacing.medium,
}
const $nameContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center"

}
const $avatar: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  height: 65,
  width: 65,
  backgroundColor: colors.palette.primary100,
  borderRadius: 100,
}
const $content: ViewStyle = {
  marginTop: 30,
}

const $avatarLabel: TextStyle = {
  fontFamily: typography.primary.medium,
  color: colors.white,
  letterSpacing: 3,
  fontSize: 27,
  paddingTop: 15,
}
const $labelContainer: ViewStyle = {
  paddingLeft: 10,
}
const $labelName: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
}
const $labelTag: TextStyle = {
  color: colors.gray,
  fontFamily: typography.primary.light,
}
const $requestField: TextStyle = {
  height: 150,
  paddingVertical: 10,
  fontFamily: typography.primary.light,
}
