import BottomSheetModal from "@gorhom/bottom-sheet"
import React, { useMemo, useRef } from "react"
import { View } from "react-native"
import { Text } from "./Text"

const Receipt = () => {
  const bottomSheetRef = useRef<BottomSheetModal>()
  bottomSheetRef.current.close()
  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], [])

  return (
    <BottomSheetModal ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
      <View>
        <Text text="testing" />
      </View>
    </BottomSheetModal>
  )
}

export default Receipt
