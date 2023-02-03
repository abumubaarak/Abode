import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import MapboxGL from "@rnmapbox/maps"
import { observer } from "mobx-react-lite"

import React, { FC, useState } from "react"
import { Dimensions, Image, View, ViewStyle } from "react-native"
import { Carousel } from "react-native-snap-carousel"
import { Close, ListingTag, Text } from "../components"
import { AppStackParamList, AppStackScreenProps } from "../navigators"
import { colors, spacing, typography } from "../theme"

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
    return (
      <View style={$container}>
        <MapboxGL.MapView styleURL={MapboxGL.StyleURL.Street} style={$map}>
          <Close />

          <MapboxGL.Camera
            animationMode="moveTo"
            zoomLevel={13}
            animationDuration={0}
            type="CameraStop"
            centerCoordinate={[13.381777, 52.531677]} />

          <MapboxGL.PointAnnotation
            id="point"
            coordinate={[13.381777, 52.531677]} >

          </MapboxGL.PointAnnotation>
          <Carousel
            vertical={false}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            activeSlideAlignment="start"
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            containerCustomStyle={{ marginBottom: 28 }}
            onSnapToItem={(index) => setActiveSlide(index)}
            data={listings}
            renderItem={({ item }) => (
              <View style={{ paddingLeft: 10, flex: 1, justifyContent: "flex-end" }}>
                <View style={{ flexDirection: "row", height: 100, backgroundColor: colors.white, borderRadius: 6, paddingLeft: 4 }}>
                  <Image style={{ height: "85%", width: 123, alignSelf: "center", borderRadius: 4 }} source={require("../../assets/images/01.jpg")} />
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2, flexShrink: 1, justifyContent: "space-between" }}>
                    <Text text={`${item.propertyType.toUpperCase()}`} style={{ fontSize: 13, color: colors.palette.secondary100, fontFamily: typography.primary.medium }} />
                    <Text text={item?.name} numberOfLines={1} style={{ fontSize: 14 }} />

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <ListingTag
                        label={`${item?.avaliableBedroom} Bed`}
                        icon={<Ionicons name="ios-bed" size={16} color={colors.gray100} />}
                      />
                      <ListingTag
                        label={`${item?.avaliableBathroom} Bath`}
                        icon={
                          <MaterialCommunityIcons name="bathtub-outline" size={16} color={colors.gray100} />
                        }
                      />
                      <ListingTag
                        label={`${item?.propertySize} sqft`}
                        icon={
                          <MaterialCommunityIcons name="vector-square" size={16} color={colors.gray100} />
                        }
                      />
                    </View>

                    <View style={{ flexDirection: "row", }}>
                      <Text text={`$${item.cost}`} style={{ fontFamily: typography.primary.semiBold, fontSize: 14, color: colors.palette.primary100 }} />
                      <Text text="/month" style={{ fontSize: 10.5, color: colors.gray100 }} />
                    </View>
                  </View>
                </View>
              </View>
            )}
          />


        </MapboxGL.MapView>
      </View>
      // <Screen style={$root} preset="scroll">
      //   <View style={$closeIcon}>
      //     <View style={$closeView}>
      //       <Icon icon="x" onPress={() => navigation.goBack()} />
      //     </View>
      //   </View>
      // </Screen>
    )
  },
)

const $container: ViewStyle = {
  flex: 1
}
const $map: ViewStyle = {
  flex: 1
}

// < View style = { $container } >
//   <MapboxGL.MapView styleURL={MapboxGL.StyleURL.Street} zoomEnabled={false} scrollEnabled={false} style={$map}>
//     <MapboxGL.Camera
//       animationMode="moveTo"
//       zoomLevel={14}
//       animationDuration={0}
//       type="CameraStop"
//       centerCoordinate={document?.addresssLocation} />

//     <MapboxGL.PointAnnotation
//       id="point"

//       coordinate={document?.addresssLocation} >
//       <View style={$point}>
//         <AntDesign name="home" size={20} color="white" />
//       </View>
//     </MapboxGL.PointAnnotation>

//   </MapboxGL.MapView>
//           </View >

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
