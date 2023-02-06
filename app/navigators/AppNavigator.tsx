/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import auth from "@react-native-firebase/auth"
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
  useNavigation
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import MapboxGL from "@rnmapbox/maps"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { useColorScheme } from "react-native"
import { Icon } from "../components"
import Config from "../config"
import {
  ApplyScreen,
  AuthenticationScreen,
  ListingDetailsScreen,
  MapSearchScreen,
  PropertySearchScreen,
  SingleSelectionScreen,
  VerifyScreen
} from "../screens"
import { AutoCompleteScreen } from "../screens/AutoCompleteScreen"
import CheckoutScreen from "../screens/CheckoutScreen"
import { ConversationScreen } from "../screens/ConversationScreen"
import { colors } from "../theme"
import { HomeNavigator, HomeNavigatorParamList } from "./HomeNavigator"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  Home: NavigatorScreenParams<HomeNavigatorParamList> // @demo remove-current-line
  Payment: undefined
  AutoComplete: undefined
  MapSearch: { listings: FirebaseFirestoreTypes.DocumentData[] }
  Verify: undefined
  SingleSelection: {
    data: React.Dispatch<React.SetStateAction<string>>
    type: "gender" | "language"
  }
  PropertySearch: { keyword: string }
  Authentication: undefined
  ListingDetails: { id: string }
  Apply: {
    lid: string
    pName: string
    address: string
    tid: string
    tName: string
    pId: string
    hasApplied: React.Dispatch<React.SetStateAction<boolean>>
  }
  Conversation: { message_id: string; tenant_id: string; landlord_id: string }
  Checkout: { id: string }

  // 🔥 Your screens go here
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()
const Modal = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  MapboxGL.setAccessToken(Config.MAP_TOKEN)

  const [initializing, setInitializing] = useState(true)
  const navigation = useNavigation()

  function onAuthStateChanged() {
    if (initializing) {
      setInitializing(false)
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeNavigator} />
      <Stack.Screen name="AutoComplete" component={AutoCompleteScreen} />

      <Stack.Screen
        name="MapSearch"
        component={MapSearchScreen}
        options={{ animation: "slide_from_bottom" }}
      />

      <Stack.Group
        screenOptions={{
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="ListingDetails"
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
            headerBackTitleVisible: false,
            headerTintColor: colors.black,
          }}
          component={ListingDetailsScreen}
        />
        <Stack.Screen
          name="PropertySearch"
          component={PropertySearchScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Conversation"
          component={ConversationScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="Verify" component={VerifyScreen} options={{ headerShown: true }} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: "fullScreenModal",
          animation: "slide_from_bottom",
        }}
      >
        <Modal.Screen name="SingleSelection" component={SingleSelectionScreen} />
        <Modal.Screen name="Authentication" component={AuthenticationScreen} />
        <Modal.Screen
          name="Apply"
          component={ApplyScreen}
          options={{
            headerShown: false,
            headerRight: () => <Icon icon="x" onPress={() => navigation.goBack()} />,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
})

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> { }

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
