import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../components"
import { HomeTabScreenProps } from "../navigators"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

export const ProfileScreen: FC<HomeTabScreenProps<"Profile">> = observer(function ProfileScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll" safeAreaEdges={["top"]}>
      <Text text="profile" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
