import { observer } from "mobx-react-lite"
import * as React from "react"
import {
  ImageBackground,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native"
import { colors, typography } from "../theme"
import { Text } from "./Text"

export interface FeaturedImageProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  image: ImageSourcePropType
  text: string
}

export const FeaturedImage = observer(function FeaturedImage(props: FeaturedImageProps) {
  const { image, text } = props

  return (
    <ImageBackground source={image} imageStyle={$imageContainerStyle} style={$containerStyle}>
      <Text text={text} preset="subheading" style={$text} />
    </ImageBackground>
  )
})

const $imageContainerStyle: ImageStyle = {
  borderRadius: 5,
}
const $containerStyle: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  marginRight: 5,
  flexBasis: "50%",
}

const $text: TextStyle = {
  paddingVertical: 100,
  color: colors.white,
  fontFamily: typography.primary.bold,
  letterSpacing: 0.9,
  fontSize: 21,
}
