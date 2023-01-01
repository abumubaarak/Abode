import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Image, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { colors, typography } from "../theme"
import { Card } from "./Card"
import { ListingAmentiesTag } from "./ListingAmentiesTag"
import { Text } from "./Text"

export interface ListingCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

const RADIUS = 10

export const ListingCard = observer(function ListingCard(_: ListingCardProps) {
  const gallery = require("../../assets/images/08.jpg")

  return (
    <Card
      preset="default"
      verticalAlignment="space-between"
      style={$container}
      HeadingComponent={<Image source={gallery} style={$cardImage} />}
      ContentComponent={
        <View style={$contentContainer}>
          <Text
            style={$labelHeading}
            text="Modern Apartment With A Lot Of Space And Direct View Of The Naschmarkt"
            numberOfLines={1}
          />

          <Text
            style={$labelSubHeading}
            text="Rechte Wienzeile 5, 1040 Vienna, Austria"
            numberOfLines={1}
          />

          <View style={$tagContainer}>
            <ListingAmentiesTag
              label="3 Bed"
              icon={<Ionicons name="ios-bed" size={16} color={colors.gray100} />}
            />
            <ListingAmentiesTag
              label="4 Bath"
              icon={<MaterialCommunityIcons name="bathtub-outline" size={16} color={colors.gray100} />}
            />

            <ListingAmentiesTag
              label="1540 sqft"
              icon={<MaterialCommunityIcons name="set-square" size={16} color={colors.gray100} />}
            />
          </View>

          <View style={$priceContainer}>
            <Text text="$12,500" style={$priceLabel} />
            <Text style={$pricePer} text=" / year" />
          </View>
        </View>
      }
    />
  )
})

const $container: ViewStyle = {
  padding: 0,
  borderRadius: RADIUS,
  borderWidth: 0,
}

const $cardImage: ImageStyle = {
  height: 180,
  width: "100%",
  borderTopLeftRadius: RADIUS,
  borderTopRightRadius: RADIUS,
}

const $contentContainer: ViewStyle = {
  paddingHorizontal: 9,
  paddingTop: 10,
}

const $labelHeading: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.semiBold,
}

const $labelSubHeading: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  opacity: 0.5,
}

const $tagContainer: TextStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingVertical: 2,
  paddingRight: 10,
}

const $priceContainer: ViewStyle = {
  flexDirection: "row",
  paddingVertical: 3,
}

const $priceLabel: TextStyle = {
  color: colors.palette.primary200,
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
}

const $pricePer: TextStyle = {
  fontSize: 9,
  color: colors.gray,
  fontFamily: typography.primary.medium,
}
