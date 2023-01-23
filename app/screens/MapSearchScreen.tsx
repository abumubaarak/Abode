import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { Icon, Screen } from "../components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const MapSearchScreen: FC<StackScreenProps<AppStackScreenProps, "MapSearch">> = observer(
  function MapSearchScreen() {
    const navigation = useNavigation()
    return (
      <Screen style={$root} preset="scroll">
        <View style={$closeIcon}>
          <View style={$closeView}>
            <Icon icon="x" onPress={() => navigation.goBack()} />
          </View>
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
const $closeIcon: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.medium,
  marginTop: spacing.huge,
}
const $closeView: ViewStyle = {
  height: 45,
  width: 45,
  backgroundColor: colors?.white,
  borderRadius: 100,
  justifyContent: "center",
  alignItems: "center",
}
