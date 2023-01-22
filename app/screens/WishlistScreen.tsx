import auth from "@react-native-firebase/auth"
import { ContentStyle, FlashList } from "@shopify/flash-list"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { View, ViewStyle } from "react-native"
import { ListingCard } from "../components"
import { Loader } from "../components/Loader"
import useFirestore from "../hooks/useFirestore"
import { HomeTabScreenProps } from "../navigators"
import { spacing } from "../theme"

export const WishlistScreen: FC<HomeTabScreenProps<"Wishlist">> = observer(
  function WishlistScreen() {
    const { queryWishlist, data: userWishList, isLoading } = useFirestore()
    useEffect(() => {
      if (auth()?.currentUser?.uid) {
        queryWishlist()
      }
    }, [])

    if (isLoading) return <Loader />

    return (
      <FlashList
        data={userWishList}
        contentContainerStyle={$root}
        ItemSeparatorComponent={() => <View style={$separator} />}
        renderItem={({ item }) => <ListingCard addMargin={true} key={item.id} item={item} />}
        estimatedItemSize={200}
      />
    )
  },
)

const $root: ContentStyle = {
  paddingTop: spacing.small,
  paddingHorizontal: spacing.medium,
}

const $separator: ViewStyle = {
  height: spacing.medium,
}
