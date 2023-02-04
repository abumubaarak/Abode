import { Feather, Ionicons } from "@expo/vector-icons"
import { observer } from "mobx-react-lite"
import * as React from "react"
import {
  ImageStyle,
  Platform,
  Pressable,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { colors, spacing, typography } from "../theme"
import { Text } from "./Text"

import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { goBack, navigate } from "../navigators"

export interface SearchBarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  keyword: string
  data: FirebaseFirestoreTypes.DocumentData[]
}

/**
 * Describe your component here
 */
export const SearchBar = observer(function SearchBar(props: SearchBarProps) {
  const { keyword, data } = props

  return (
    <View style={$container}>
      <Pressable style={$searchContainer}>
        <View style={$search}>
          <Pressable onPress={() => goBack()}>
            {Platform.OS === "ios" ? (
              <Ionicons name="chevron-back" size={28} style={$searchIcon} />
            ) : (
              <Ionicons name="arrow-back" size={28} style={$searchIcon} />
            )}
          </Pressable>
          <Text text={keyword} style={$searchLabel} />
        </View>
      </Pressable>
      <Pressable onPress={() => navigate("MapSearch", { listings: data })} style={$mapIcon}>
        <Feather name="map-pin" size={24} color="black" />
      </Pressable>
    </View>
  )
})

const $container: ViewStyle = {
  flexDirection: "row",
  flex: 1,
}

const $searchContainer: ViewStyle = {
  marginRight: 15,
  marginBottom: 10,
  flexGrow: 1.5,
}
const $mapIcon: ViewStyle = {
  height: 50,
  width: 50,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 100,
  backgroundColor: colors.white,
}

const $search: ViewStyle = {
  paddingHorizontal: spacing.tiny,
  flexDirection: "row",
  alignItems: "center",
  height: 50,
  borderRadius: 7,
  backgroundColor: colors.white,
}
const $searchIcon: ImageStyle = {
  opacity: 1,
}
const $searchLabel: TextStyle = {
  paddingLeft: 8,
  fontFamily: typography.primary.medium,
}
