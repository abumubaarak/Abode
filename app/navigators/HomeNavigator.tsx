import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle, TouchableOpacity } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import { SearchScreen, InboxScreen, WishlistScreen, ProfileScreen } from "../screens"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"


export type HomeNavigatorParamList = {
  Search: undefined,
  Inbox: undefined,
  Wishlist: undefined,
  Profile: undefined
}

export type HomeTabScreenProps<T extends keyof HomeNavigatorParamList> = CompositeScreenProps<
  BottomTabScreenProps<HomeNavigatorParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createMaterialBottomTabNavigator<HomeNavigatorParamList>();

//const Tab = createBottomTabNavigator<HomeNavigatorParamList>()

export const HomeNavigator = () => {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      initialRouteName="Search"
      barStyle={{
        borderTopWidth: 1,
        borderTopColor: colors.separator,
        backgroundColor: 'transparent',
      }}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: translate("tabNavigator.searchTab"),
          tabBarIcon: ({ focused }) => <Icon icon="search" color={focused && colors.tint} />
        }}

      />
      <Tab.Screen
        name="Inbox"
        component={InboxScreen}

        options={{
          tabBarLabel: translate("tabNavigator.inboxTab"),
          tabBarIcon: ({ focused }) => <Icon icon="inbox" color={focused && colors.tint} />,
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarLabel: translate("tabNavigator.wishlistTab"),
          tabBarIcon: ({ focused }) => <Icon icon="heart" color={focused && colors.tint} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: translate("tabNavigator.profileTab"),
          tabBarIcon: ({ focused }) => <Icon icon="community" color={focused && colors.tint} />,
        }}
      />

    </Tab.Navigator>
  )
}
const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.medium,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}
