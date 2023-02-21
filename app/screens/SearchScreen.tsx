import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import {
  Dimensions,
  ImageBackground,
  ImageStyle,
  Pressable,
  TextStyle,
  View,
  ViewStyle
} from "react-native"
import Carousel from "react-native-snap-carousel"
import { FeaturedImage, Icon, ListingCard, Screen, Text } from "../components"
import { Loader } from "../components/Loader"
import useFirestore from "../hooks/useFirestore"
import { HomeTabScreenProps, navigate } from "../navigators"
import { colors, spacing, typography } from "../theme"

const HORIZONTAL_MARGIN = 15

export const SearchScreen: FC<HomeTabScreenProps<"Search">> = observer(function SearchScreen() {
  const { getCollection, data, isLoading } = useFirestore()

  useEffect(() => {
    getCollection("Property")
  }, [])

  const sliderWidth = Dimensions.get("window").width
  const itemWidth = sliderWidth - 100 + HORIZONTAL_MARGIN * 2

  const bannerTop = require("../../assets/images/09.jpg")
  const berlin = require("../../assets/images/berlin.jpg")
  const london = require("../../assets/images/london.jpg")
  const paris = require("../../assets/images/paris.jpg")
  const dubai = require("../../assets/images/dubai.jpg")

  return (
    <Screen style={$root} preset="auto">
      <ImageBackground style={$banner} resizeMode="cover" source={bannerTop}>
        <Text text={`Discover a place \nyou'll love to live`} testID="discover-text" style={$bannerLabel} />
        <Pressable onPress={() => navigate("AutoComplete")} testID="search">
          <View style={$searchContainer}>
            <View style={$search}>
              <Icon icon="search" style={$searchIcon} />
              <Text text="Search Location" style={$searchLabel} />
            </View>
          </View>
        </Pressable>
      </ImageBackground>

      <View style={$recomContainer}>
        <Text text="Recommeded" style={$label} />
        {isLoading && <Loader />}
        {!isLoading && (
          <Carousel
            vertical={false}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            activeSlideAlignment="start"
            inactiveSlideScale={1}
            containerCustomStyle={$carouselContainer}
            inactiveSlideOpacity={1}
            data={data}
            renderItem={({ item }) => (
              <View style={$listingCard}>
                <ListingCard item={item} />
              </View>
            )}
          />
        )}

        <Text text="Featured cities" style={[$label, { paddingTop: 36 }]} />

        <View style={$featuredContainer}>
          <FeaturedImage image={dubai} text="Dubai" />
          <FeaturedImage image={london} text="London" />
        </View>
        <View style={[$featuredContainer, { marginTop: 10 }]}>
          <FeaturedImage image={paris} text="Paris" />
          <FeaturedImage image={berlin} text="Berlin" />
        </View>
      </View>
    </Screen>
  )
})
const $label: TextStyle = {
  opacity: 0.9,
  fontSize: 20,
  fontFamily: typography.primary.semiBold,
  paddingBottom: 14,
}

const $root: ViewStyle = {
  flex: 1,
}
const $banner: ViewStyle = {
  paddingTop: 130,
  paddingHorizontal: spacing.medium,
  justifyContent: "flex-end",
}

const $bannerLabel: TextStyle = {
  color: colors.white,
  fontSize: 32,
  paddingBottom: 40,
  lineHeight: 38,
  fontFamily: typography.primary.bold,
  letterSpacing: 0.4,
}
const $searchContainer: ViewStyle = {
  marginBottom: 30,
}

const $search: ViewStyle = {
  paddingHorizontal: spacing.small,
  flexDirection: "row",
  alignItems: "center",
  height: 50,
  borderRadius: 7,
  backgroundColor: colors.white,
}
const $searchIcon: ImageStyle = {
  opacity: 0.4,
}
const $searchLabel: TextStyle = {
  paddingLeft: 8,
  opacity: 0.4,
  fontFamily: typography.primary.light,
}
const $recomContainer: ViewStyle = {
  marginTop: 35,
  paddingHorizontal: spacing.medium,
  marginRight: 10,
  marginBottom: 30,
}

const $listingCard: ViewStyle = {
  paddingRight: HORIZONTAL_MARGIN,
  backgroundColor: colors.transparent,
  paddingBottom: 4,
}
const $featuredContainer: ViewStyle = {
  justifyContent: "space-between",
  flexDirection: "row",
  flex: 1,
}
const $carouselContainer: ViewStyle = {
  overflow: "visible",
}
