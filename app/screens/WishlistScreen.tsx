import auth from "@react-native-firebase/auth"
import { ContentStyle, FlashList } from "@shopify/flash-list"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { RefreshControl, View, ViewStyle } from "react-native"
import { Empty, ListingCard } from "../components"
import { Loader } from "../components/Loader"
import useFirestore from "../hooks/useFirestore"
import { useUtils } from "../hooks/useUtils"
import { HomeTabScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

export const WishlistScreen: FC<HomeTabScreenProps<"Wishlist">> = observer(
  function WishlistScreen() {
    const { queryWishlist, data: userWishList, isLoading } = useFirestore()
    const { refreshing, onRefresh } = useUtils()

    useEffect(() => {
      if (auth()?.currentUser?.uid) {
        queryWishlist()
      }
    }, [])
    useEffect(() => {
      if (auth()?.currentUser?.uid) {
        if (!refreshing) return
        queryWishlist()
      }
    }, [refreshing])

    if (isLoading) return <Loader />
    if (userWishList.length === 0) return <Empty message="Nothing in Wishlist" />

    return (
      <FlashList
        data={userWishList}
        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.black}
        />}
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
