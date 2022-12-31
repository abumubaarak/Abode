/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { useState, useEffect } from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import firestore from '@react-native-firebase/firestore';
import { useStores } from "../models"
import {
  AuthenticationScreen,
  InboxScreen,
  PaymentScreen,
  ProfileScreen,
  SearchScreen,
  WelcomeScreen,
  WishlistScreen,
} from "../screens"
import { HomeNavigator, HomeNavigatorParamList } from "./HomeNavigator"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

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
  Welcome: undefined,
  Home: NavigatorScreenParams<HomeNavigatorParamList>, // @demo remove-current-line
  Payment: undefined,
  Authentication: { user: String }


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

const AppStack = observer(function AppStack() {

  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user: FirebaseAuthTypes.User) {
    if (initializing) {
      setInitializing(false)
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeNavigator} />
      <Stack.Group screenOptions={{
        presentation: 'fullScreenModal'

      }}>
        <Stack.Screen name="Authentication"
          initialParams={{ user: "tenant" }}
          component={AuthenticationScreen} />
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
