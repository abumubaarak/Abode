import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import auth from "@react-native-firebase/auth"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { ActivityIndicator, Dimensions, Pressable, TextStyle, View, ViewStyle } from "react-native"
import FastImage, { ImageStyle } from 'react-native-fast-image'
import { Carousel, Pagination } from "react-native-snap-carousel"
import { Button, ListingTag, Screen, Text } from "../components"
import LisitingFeaturesTag from "../components/LisitingFeaturesTag"
import { Loader } from "../components/Loader"
import useFirestore from "../hooks/useFirestore"
import { AppStackParamList, AppStackScreenProps } from "../navigators"
import { colors, typography } from "../theme"

import { addWishlist, PROPERTY, removeWishlist, REQUEST, WISHLISTS } from "../utils/firebase"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ListingDetailsScreen: FC<StackScreenProps<AppStackScreenProps, "ListingDetails">> =
  observer(function ListingDetailsScreen() {
    // Pull in navigation via hook
    const navigation = useNavigation()
    const sliderWidth = Dimensions.get("window").width
    const route = useRoute<RouteProp<AppStackParamList, "ListingDetails">>()
    const params = route.params
    const { getDocument, document, isLoading } = useFirestore()
    const { queryDocument, data: userWishList, isLoading: load } = useFirestore()
    const { queryDocument: queryRequest, data: requestResponse, isLoading: requestIsLoading } = useFirestore()

    const [activeSlide, setActiveSlide] = useState<number>(0)
    const [applied, setApplied] = useState<boolean>(false)

    useEffect(() => {
      getDocument(PROPERTY, params.id)
      if (auth()?.currentUser?.uid) {
        Promise.all(
          [queryRequest(REQUEST, "pId", "==", params.id),
          queryDocument(WISHLISTS, "propertyId", "==", params.id)]
        )
      }
    }, [])
    console.log(requestResponse, params.id)
    const handleWishList = () => {
      if (auth()?.currentUser?.uid) {
        if (userWishList[0]?.propertyId === params.id) {
          removeWishlist(userWishList[0]?.id)
        } else {
          addWishlist(params.id)
        }
        queryDocument(WISHLISTS, "propertyId", "==", params.id)
      } else {
        navigation.navigate("Authentication")
      }
    }

    const handleInterested = () => {
      if (auth()?.currentUser?.uid) {
        navigation.navigate("Apply", {
          lid: document?.uid,
          pName: document?.name,
          address: document?.address,
          tid: auth().currentUser.uid,
          tName: auth().currentUser.displayName,
          pId: params.id,
          hasApplied: setApplied
        })
      } else {
        navigation.navigate("Authentication")
      }
    }
    if (isLoading) return <Loader />

    return (
      <View style={$root}>
        <Screen preset="auto" style={$contentContainer}>
          <Carousel
            vertical={false}
            sliderWidth={sliderWidth}
            itemWidth={sliderWidth}
            activeSlideAlignment="start"
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            onSnapToItem={(index) => setActiveSlide(index)}
            data={document?.remoteImages}
            renderItem={({ item }) =>
              <FastImage style={$slidingImage}
                source={{
                  uri: item,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            }
          />
          <Pagination
            dotsLength={document?.remoteImages?.length}
            dotContainerStyle={{ height: 0 }}
            activeDotIndex={activeSlide}
            containerStyle={$paginationContainer}
            dotStyle={$paginationDot}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.8}
          />
          <View style={$wishListContainer}>
            <Pressable onPress={handleWishList}>
              <View style={$heartIcon}>
                <AntDesign
                  name={userWishList[0]?.propertyId === params.id ? "heart" : "hearto"}
                  size={20}
                  color={colors.palette.primary50}
                />
              </View>
            </Pressable>
          </View>

          <View style={$propertyInfoContainer}>
            <View>
              <Text text={document?.name} preset="subheading" style={$propertyNameLabel} />
              <View style={$tagContainer}>
                <ListingTag
                  label={`${document?.avaliableBedroom} Bedroom`}
                  icon={<Ionicons name="ios-bed" size={16} color={colors.gray100} />}
                />

                <ListingTag
                  label={`${document?.avaliableBathroom} Bathroom`}
                  icon={
                    <MaterialCommunityIcons
                      name="bathtub-outline"
                      size={16}
                      color={colors.gray100}
                    />
                  }
                />

                <ListingTag
                  label={`${document?.propertySize} sqft`}
                  icon={
                    <MaterialCommunityIcons name="vector-square" size={16} color={colors.gray100} />
                  }
                />
              </View>
              <View style={$priceContainer}>
                <Text text={`$${document?.cost}`} style={$priceLabel} />
                <Text style={$pricePer} text="/year" />
              </View>
            </View>

            <Text text="Description" style={$label} />
            <Text style={$propertyInfoLabel} text={document?.description} />

            <Text text="Amenities" style={$label} />
            <LisitingFeaturesTag item={document?.amenities} type="amenities" />

            <Text text="Property Type" style={$label} />
            <Text style={$propertyInfoLabel} text={document?.propertyType} />

            <Text text="Room Size" style={$label} />
            <Text style={$propertyInfoLabel} text={`${document?.roomSize} sqft`} />

            <Text text="Rules" style={$label} />
            <LisitingFeaturesTag item={document?.rules} type="rules" />

            <Text text="Location" style={$label} />
            <Text style={$propertyInfoLabel} text={document?.address} />
          </View>
        </Screen>

        <View style={$buttonContainer}>
          <Button
            text="I'm Interested"
            style={[$button, { opacity: requestResponse[0]?.pId == params?.id || applied ? 0.4 : 1 }]}
            disabled={requestIsLoading || requestResponse[0]?.pId == params.id || applied}
            LeftAccessory={(_) =>
              isLoading && (
                <ActivityIndicator
                  animating={requestIsLoading}
                  size="small"
                  color={colors?.palette.primary300}
                />
              )
            }
            textStyle={$buttonLabel}
            onPress={handleInterested}
          />
        </View>
      </View>
    )
  })

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.white,
}
const $contentContainer: ViewStyle = {
  flexBasis: "90%",
}
const $slidingImage: ImageStyle = {
  height: 320,
  width: "100%",
}

const $paginationContainer: ViewStyle = {
  paddingHorizontal: 0,
  marginTop: -47,
}
const $paginationDot: ViewStyle = {
  paddingHorizontal: 0,
  borderRadius: 5,
  height: 8,
  width: 8,
  backgroundColor: colors.white,
}
const $heartIcon: ViewStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 2,
  height: 40,
  width: 40,
  backgroundColor: colors.white,
  borderRadius: 100,
  alignItems: "center",
  justifyContent: "center",
}

const $wishListContainer: ViewStyle = {
  alignItems: "flex-end",
  marginRight: 20,
  marginTop: -31,
}
const $propertyInfoContainer: ViewStyle = {
  paddingVertical: 20,
  paddingHorizontal: 20,
  marginTop: -13,
}
const $propertyNameLabel: TextStyle = {
  fontSize: 22,
  lineHeight: 27,
  fontFamily: typography.primary.semiBold,
}

const $propertyInfoLabel: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.light,
  paddingTop: 6,
}
const $buttonContainer: ViewStyle = {
  paddingHorizontal: 15,
  justifyContent: "center",
  flexBasis: "12%",
  backgroundColor: colors.white,
}
const $label: TextStyle = {
  paddingTop: 15,
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
}
const $tagContainer: TextStyle = {
  flexDirection: "row",
  paddingRight: 30,
  justifyContent: "space-between",
  paddingVertical: 2,
}
const $priceContainer: ViewStyle = {
  flexDirection: "row",
  paddingTop: 10,
}

const $priceLabel: TextStyle = {
  color: colors.palette.primary100,
  fontSize: 19,
  fontFamily: typography.primary.semiBold,
}

const $pricePer: TextStyle = {
  fontSize: 14,
  color: colors.gray,
  fontFamily: typography.primary.medium,
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
