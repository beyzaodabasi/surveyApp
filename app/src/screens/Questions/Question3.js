import React from "react"
import { View, Text, TouchableOpacity, FlatList } from "react-native"
import { styles } from "./styles"
import PropTypes from "prop-types"

const Question3 = (props) => {
  const { currentQuestion, handleOptionSelect, selectValue, setSelectValue } = props

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "90%",
          alignSelf: "center",
        }}
      >
        {currentQuestion.options.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              handleOptionSelect(item.title)
              setSelectValue(item.title)
            }}
            style={{
              ...styles().chip1,
              backgroundColor: selectValue !== item.title ? "#EFEFFF" : "#0300A3",
            }}
          >
            <Text
              style={{
                ...styles().chipText,
                color: selectValue !== item.title ? "rgba(29, 29, 27, 0.4)" : "#FFFFFF",
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  )
}

Question3.propTypes = {
  currentQuestion: PropTypes.object,
  handleOptionSelect: PropTypes.func,
  selectValue: PropTypes.string,
  setSelectValue: PropTypes.func,
}

export default Question3
