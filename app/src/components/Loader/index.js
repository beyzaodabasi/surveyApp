import React from "react"
import { View, Modal } from "react-native"
import { styles } from "./styles"
import { ActivityIndicator } from "react-native-paper"


const Loader = (props) => {
  const { loading } = props

  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={loading}
      onRequestClose={() => {
        loading = false
      }}

    >
      <View style={styles().modalBackground}>
        <View style={styles().activityIndicatorWrapper}>
          <ActivityIndicator animating={loading} color="#0300A3" size="large" />
        </View>
      </View>
    </Modal>
  )
}

export default Loader
