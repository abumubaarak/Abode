import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, HomeTabScreenProps } from "../navigators"
import { Button, Icon, Screen, Text } from "../components"
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from "../theme"
import Ripple from 'react-native-material-ripple';

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"



export const SearchScreen: FC<HomeTabScreenProps<"Search">> = observer(function SearchScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll" safeAreaEdges={["top"]}>
      <Text text="search" />
      <View style={$landlordCallout}>
        <Text style={$landlordCalloutLabel} text={`Got a room or an apartment to rent \n out?`} />
        <Ripple>
          <Button style={{ width: "60%" }}
            preset="default"
            text="Publish a listing"
            LeftAccessory={(props) => (
              <Ionicons name="add" size={27} color="black" />
            )}
          />
        </Ripple>

      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
const $landlordCallout: ViewStyle = {
  flex: 1,
  marginTop: spacing.extraLarge,
  alignItems: "center",
}
const $landlordCalloutLabel: TextStyle = {
  textAlign: "center",
  paddingBottom: spacing.medium

}

