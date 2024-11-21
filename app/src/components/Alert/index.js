import React, { useRef } from "react"
import { Text, View, Modal, TouchableOpacity } from "react-native"
import { ExclamationCircle, Times } from "react-native-unicons"
import { Divider } from "react-native-elements"
import { styles } from "./styles"

const Alert = (props) => {
  const { alert, success, ...attributes } = props
  const ref = useRef()


  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={alert}
      ref={ref}
      onRequestClose={() => {
        props.setAlert(false)
      }}
    >
      <View style={styles().modalBackground}>
        <View style={styles().alertModal}>
          <View style={styles().header}>
            <View style={{ flexDirection: "row" }}>
              {success == true ? <ExclamationCircle color={"#17D384"} /> : <ExclamationCircle color={"#F34040"} />}
              <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: 20 }}>SurveyApp</Text>
            </View>
            <TouchableOpacity
              onPress={props.onRequestClose}
            >
              <Times color={"#660FAE"} />
            </TouchableOpacity>
          </View>
          <Divider
            style={{
              backgroundColor: "lightgray",
              width: "90%",
            }}
          />
          <View style={styles().content}>
            <Text style={{ fontSize: 16 }}>{props.text}</Text>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default Alert
