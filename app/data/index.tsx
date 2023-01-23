import { AntDesign, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import React from "react"
import { colors } from "../theme"

const ICON_SIZE = 30
export const RULES = [
  {
    name: "Family allowed",
    tag: "family",
    icon: <MaterialIcons name="family-restroom" size={ICON_SIZE} color="black" />,
  },
  {
    name: "Noise free",
    tag: "noise",
    icon: <MaterialIcons name="speaker-phone" size={ICON_SIZE} color="black" />,
  },
  {
    name: "Pet friendly",
    tag: "pet",
    icon: <MaterialIcons name="pets" size={ICON_SIZE} color="black" />,
  },
]
export const AMENITIES = [
  {
    name: "Wifi",
    tag: "wifi",
    icon: <AntDesign name="wifi" size={ICON_SIZE} color={colors.gray100} />,
  },
  {
    name: "Elevator",
    tag: "elevator",
    icon: <MaterialCommunityIcons name="elevator" size={ICON_SIZE} color={colors.gray100} />,
  },
  {
    name: "Dryer",
    tag: "dryer",
    icon: <MaterialCommunityIcons name="tumble-dryer" size={ICON_SIZE} color="black" />,
  },
  {
    name: "Furnished",
    tag: "furnished",
    icon: <MaterialCommunityIcons name="chair-school" size={ICON_SIZE} color="black" />,
  },
  {
    name: "Storage",
    tag: "storage",
    icon: <MaterialIcons name="storage" size={ICON_SIZE} color="black" />,
  },
  {
    name: "Gym",
    tag: "gym",
    icon: <MaterialCommunityIcons name="weight-lifter" size={ICON_SIZE} color="black" />,
  },
  {
    name: "Garden",
    tag: "garden",
    icon: <MaterialCommunityIcons name="tree-outline" size={ICON_SIZE} color="black" />,
  },
  {
    name: "Fireplace",
    tag: "fireplace",
    icon: <MaterialCommunityIcons name="fireplace" size={ICON_SIZE} color="black" />,
  },
  {
    name: "CCTV",
    tag: "CCTV",
    icon: <MaterialCommunityIcons name="cctv" size={ICON_SIZE} color="black" />,
  },
  {
    name: "Parking",
    tag: "parking",
    icon: <MaterialCommunityIcons name="car-parking-lights" size={ICON_SIZE} color="black" />,
  },
  {
    name: "Pool",
    tag: "pool",
    icon: <MaterialCommunityIcons name="pool" size={ICON_SIZE} color="black" />,
  },
  {
    name: "A.C",
    tag: "A.C",
    icon: <MaterialCommunityIcons name="air-conditioner" size={ICON_SIZE} color="black" />,
  },
]

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
export const LANGUAGES = [
  { name: "English" },
  { name: "French" },
  { name: "Italian" },
  { name: "German" },
  { name: "Arabic" },
  { name: "Yoruba" },
  { name: "Hausa" },
  { name: "Japanese" },
  { name: "Spanish" },
  { name: "Chinese" },
]
export const GENDER = [{ name: "Male" }, { name: "Female" }]
