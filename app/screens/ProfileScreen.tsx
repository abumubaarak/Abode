import { MaterialIcons, Octicons } from '@expo/vector-icons'
import auth from "@react-native-firebase/auth"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text } from "../components"
import { Loader } from '../components/Loader'
import useFirestore from '../hooks/useFirestore'
import useUser from '../hooks/useUser'
import { HomeTabScreenProps } from "../navigators"
import { colors, spacing, typography } from "../theme"
import { avatarName } from '../utils'
import { USERS } from '../utils/firebase'
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

export const ProfileScreen: FC<HomeTabScreenProps<"Profile">> = observer(function ProfileScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { displayName, email, uid } = useUser()
  const { getDocument, document, isLoading } = useFirestore()

  useEffect(() => {
    getDocument(USERS, uid)
  }, [])

  const handleLogout = () => {
    auth().signOut()
  }

  if (isLoading) return <Loader />

  return (
    <Screen style={$root} preset="scroll">
      <View style={[$card, { alignItems: "center", }]}>
        <View style={$avatarContainer}>
          <Text text={avatarName(displayName)} style={$avatarLabel} />
        </View>
        <View style={$userInfo}>
          <View style={$nameConatiner}>
            <Text text={displayName} style={$label} />
            {document?.isVerify ?
              <MaterialIcons name="verified" size={24} color={colors.palette.primary100} />
              :
              <Octicons name="unverified" size={24} color="black" style={$icon} />
            }
          </View>
          <Text text="Tenant" style={$subLabel} />
        </View>
      </View>

      <View style={[$card, { paddingLeft: 15 }]}>
        <Text text="Email" style={$label} />
        <Text text={email} style={$subLabel} />
      </View>
      {document?.isVerify ?
        <View style={[$card, { paddingLeft: 15 }]}>
          <Text text="Profession" style={$label} />
          <Text text="Software Engineer" style={$subLabel} />
          <Text text="Age" style={[$label, { paddingTop: 10 }]} />
          <Text text="23" style={$subLabel} />
          <Text text="Gender" style={[$label, { paddingTop: 10 }]} />
          <Text text="Male" style={$subLabel} />
          <Text text="Language" style={[$label, { paddingTop: 10 }]} />
          <Text text="English" style={$subLabel} />

        </View> :


        <View style={[$card, { paddingLeft: 15, paddingHorizontal: 15, }]}>
          <View style={{ flexDirection: "row", }}>
            <Text text='Verify your account' style={$label} />
            <Octicons name="unverified" size={24} color="black" style={$icon} />
          </View>
          <Text
            text='Add more personal details to start applying for rent.'
            style={[$subLabel, { paddingTop: 5 }]} />
        </View>
      }




      <Pressable onPress={handleLogout}>
        <View style={$logoutContainer}>
          <Text text="Log out" style={$logout} />
        </View>
      </Pressable>


    </Screen>
  )
})


const $root: ViewStyle = {
  flex: 1,
  paddingTop: 20,
  paddingHorizontal: spacing.small,
  backgroundColor: colors.white
}

const $card: ViewStyle = {
  backgroundColor: colors.white, paddingVertical: 15,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  paddingLeft: 5,
  borderRadius: 10,
  shadowRadius: 35,

  elevation: 5,
  marginBottom: 20
}
const $avatarContainer: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.palette.primary100, width: 70,
  height: 70, borderRadius: 100
}
const $avatarLabel: TextStyle = {
  fontSize: 30,
  paddingTop: 19,
  fontFamily: typography.primary.semiBold,
  color: colors.white
}
const $userInfo: ViewStyle = {
  alignItems: "center",
  paddingLeft: 10,
  paddingVertical: 8
}
const $nameConatiner: ViewStyle = {
  flexDirection: "row"
}
const $label: TextStyle = {
  fontFamily: typography.primary.semiBold,
  fontSize: 17
}
const $subLabel: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 15,
  opacity: 0.8
}
const $icon: ImageStyle = {
  marginLeft: 5
}
const $logout: TextStyle = {
  fontSize: 18,
  color: colors.error,
  fontFamily: typography.primary.bold
}
const $logoutContainer: ViewStyle = {
  alignItems: "center"
}