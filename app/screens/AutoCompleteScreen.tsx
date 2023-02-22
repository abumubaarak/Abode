import { RouteProp, useRoute } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { ContentStyle, FlashList } from "@shopify/flash-list"
import { create } from "apisauce"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { Close, Text } from "../components"
import { InputField } from "../components/InputField"
import Config from "../config"
import { AppStackParamList, AppStackScreenProps, navigate } from "../navigators"
import { colors, spacing, typography } from "../theme"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const AutoCompleteScreen: FC<StackScreenProps<AppStackScreenProps, "AutoComplete">> =
  observer(function AutoCompleteScreen() {
    const route = useRoute<RouteProp<AppStackParamList, "AutoComplete">>()

    const { control, watch, getValues } = useForm()
    const [suggestion, setSuggestion] = useState<any>()
    const throttling = useRef(false)
    const api = create({
      baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
    })

    const handleSearch = (city: string) => {
      if (throttling.current) {
        return
      }
      if (city?.length < 3) return
      throttling.current = true
      setSuggestion(undefined)
      setTimeout(async () => {
        throttling.current = false
        try {
          const response = await api.get<unknown>(
            `/${city}.json?` +
            new URLSearchParams({
              access_token:
                Config.MAP_TOKEN,
              autocomplete: "true",
              limit: "5",
            }),
          )
          console.log(response.config)
          setSuggestion(response.data)
        } catch (err) {
          console.error(err)
        }
      }, 500)
    }

    const handleSuggestion = (item: any) => {
      const country = item.context[item?.context?.length - 1]
      const city = `${item?.text}, ${country?.text}`
      navigate("PropertySearch", { keyword: city })
    }
    useEffect(() => {
      const { city } = getValues()
      if (!city) return
      handleSearch(city)
    }, [watch("city")])

    return (
      <View style={$containerMain}>
        <View style={$container}>
          <Close variant="black" />
          <View style={$card}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <InputField
                  marginTop={10}
                  label={"Type a city"}
                  value={value}
                  onChange={onChange}
                />
              )}
              name="city"
            />
            <Text text="" />
          </View>
        </View>
        {suggestion && (
          <FlashList
            data={suggestion.features}
            contentContainerStyle={$listRoot}
            ItemSeparatorComponent={() => <View style={$separator} />}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleSuggestion(item)}>
                <View style={{ paddingHorizontal: spacing.large }}>
                  <Text text={item?.text} preset="formLabel" />
                  <Text text={item?.place_name} style={$label} />
                </View>
              </Pressable>
            )}
            estimatedItemSize={200}
          />
        )}
      </View>
    )
  })

const $containerMain: ViewStyle = {
  backgroundColor: colors.white,
  flex: 1,
}

const $card: ViewStyle = {
  marginHorizontal: spacing.large,
}
const $container: ViewStyle = {
  backgroundColor: colors.white,
  paddingVertical: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  paddingLeft: 5,
  borderRadius: 10,
  shadowRadius: 35,
  elevation: 5,
  marginVertical: 10,
}
const $label: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 15,
  opacity: 0.6,
}
const $separator: ViewStyle = {
  height: spacing.medium,
}
const $listRoot: ContentStyle = {
  paddingTop: spacing.small,
}
