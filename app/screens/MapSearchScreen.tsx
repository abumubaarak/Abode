import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import MapboxGL from "@rnmapbox/maps"
import { observer } from "mobx-react-lite"

import React, { FC, useState } from "react"
import { Dimensions, Pressable, TextStyle, View, ViewStyle } from "react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import Carousel from "react-native-snap-carousel"
import { Close, ListingTag, Text } from "../components"
import { AppStackParamList, AppStackScreenProps, navigate } from "../navigators"
import { colors, spacing, typography } from "../theme"
import { currencyFormat } from "../utils"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const MapSearchScreen: FC<StackScreenProps<AppStackScreenProps, "MapSearch">> = observer(
  function MapSearchScreen() {
    const navigation = useNavigation()
    const [activeSlide, setActiveSlide] = useState<number>(0)
    const sliderWidth = Dimensions.get("window").width

    const itemWidth = sliderWidth - 29

    const route = useRoute<RouteProp<AppStackParamList, "MapSearch">>()
    const params = route.params
    const listings = params?.listings
    console.log(listings)
    const handleShowDetails = (item: FirebaseFirestoreTypes.DocumentData) => {
      navigate("ListingDetails", { id: item?.id })
    }
    return (
      <View style={{ flex: 1 }}>

        <View style={$container}>

          <MapboxGL.MapView
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            styleURL={MapboxGL.StyleURL.Street}
            style={$map}
          >

            <MapboxGL.Camera
              animationMode="flyTo"
              zoomLevel={17}
              animationDuration={2000}
              type="CameraStop"
              centerCoordinate={listings[activeSlide]?.addresssLocation}
            />

            {listings.map((item, index) => (
              <MapboxGL.PointAnnotation
                id="point"
                key={item?.addresssLocation}
                coordinate={item?.addresssLocation}
              >
                <View style={$point}>
                  <AntDesign name="home" size={20} color="white" />
                </View>
              </MapboxGL.PointAnnotation>
            ))}
          </MapboxGL.MapView>
        </View>

        <View style={{ top: 0, right: 0, position: "absolute" }}>
          <Close variant="white" />
        </View>
        <View style={{ bottom: 0, position: "absolute" }}>
          <Carousel
            vertical={false}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            activeSlideAlignment="start"
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            containerCustomStyle={$carouselContainer}
            onSnapToItem={(index) => setActiveSlide(index)}
            data={listings}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleShowDetails(item)} style={$cardContainer}>
                <View style={$cardItem}>
                  <FastImage
                    source={{
                      uri: item.remoteImages[0],
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={$cardImage}
                  />
                  <View style={$infoContainer}>
                    <Text text={`${item.propertyType.toUpperCase()}`} style={$pType} />
                    <Text text={item?.name} numberOfLines={1} style={$pName} />

                    <View style={$tagContainer}>
                      <ListingTag
                        label={`${item?.avaliableBedroom} Bed`}
                        icon={<Ionicons name="ios-bed" size={16} color={colors.gray100} />}
                      />
                      <ListingTag
                        label={`${item?.avaliableBathroom} Bath`}
                        icon={
                          <MaterialCommunityIcons
                            name="bathtub-outline"
                            size={16}
                            color={colors.gray100}
                          />
                        }
                      />
                      <ListingTag
                        label={`${item?.propertySize} sqft`}
                        icon={
                          <MaterialCommunityIcons
                            name="vector-square"
                            size={16}
                            color={colors.gray100}
                          />
                        }
                      />
                    </View>

                    <View style={$amountContainer}>
                      <Text text={`${currencyFormat(item.cost)}`} style={$amount} />
                      <Text text="/month" style={$month} />
                    </View>
                  </View>
                </View>
              </Pressable>
            )}
          />
        </View>


      </View>

    )
  },
)

const $container: ViewStyle = {
  flex: 1,
}
const $map: ViewStyle = {
  flex: 1,
}
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
const $point: ViewStyle = {
  width: 30,
  justifyContent: "center",
  alignItems: "center",
  height: 30,
  borderRadius: 100,
  backgroundColor: colors.palette.primary100,
}
const $cardContainer: ViewStyle = {
  zIndex: 1,
  paddingLeft: 10,
  flex: 1,
  justifyContent: "flex-end",
}
const $cardItem: ViewStyle = {
  flexDirection: "row",
  height: 100,
  backgroundColor: colors.white,
  borderRadius: 6,
  paddingLeft: 4,
}
const $cardImage: ImageStyle = {
  height: "85%",
  width: 123,
  alignSelf: "center",
  borderRadius: 4,
}
const $infoContainer: ViewStyle = {
  paddingHorizontal: 5,
  paddingVertical: 2,
  flexShrink: 1,
  justifyContent: "space-between",
}
const $pType: TextStyle = {
  fontSize: 13,
  color: colors.palette.secondary100,
  fontFamily: typography.primary.medium,
}
const $tagContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}
const $month: TextStyle = {
  fontSize: 10.5,
  color: colors.gray100,
}
const $amount: TextStyle = {
  fontFamily: typography.primary.semiBold,
  fontSize: 14,
  color: colors.palette.primary100,
}
const $amountContainer: ViewStyle = {
  flexDirection: "row",
}
const $pName: TextStyle = {
  fontSize: 14,
}
const $carouselContainer: ViewStyle = {
  marginBottom: 28,
}