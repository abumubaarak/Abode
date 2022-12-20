import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, HomeTabScreenProps } from "../navigators"
import { Screen, Text } from "../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"



export const InboxScreen: FC<HomeTabScreenProps<"Inbox">> = observer(function InboxScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll" safeAreaEdges={["top"]}>
      <Text text="inbox" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
