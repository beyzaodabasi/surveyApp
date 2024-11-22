import React from "react"
import { View, Text, TouchableOpacity, FlatList } from "react-native"
import { styles } from "./styles"
import PropTypes from "prop-types"

const Question1 = (props) => {
  const { moderateScale, currentQuestion, selected, setSelected, updateQuestionValue } = props

  return (
    <>
      <FlatList
        data={currentQuestion.options}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              onPress={() => {
                updateQuestionValue(1, item.title)
                setSelected(item.title)
              }}
              style={{
                ...styles().chip,
                backgroundColor: item.color,
                transform: [
                  {
                    translateY: selected !== item.title ? moderateScale(10) : 0,
                  },
                ],
              }}
            >
              <Text style={styles().chipText}>{item.title}</Text>
            </TouchableOpacity>
            {/* 
    A horizontal line for wich touchable is selected, draw a blue line under the selected touchable
    */}
            <View style={styles().line} />
            {selected === item.title && (
              <View
                style={{
                  ...styles().selectedLine,
                  backgroundColor: item.color,
                }}
              />
            )}
          </>
        )}
        ItemSeparatorComponent={() => <View style={{ width: 6 }} />}
        horizontal
      />
    </>
  )
}

Question1.propTypes = {
  moderateScale: PropTypes.func,
  currentQuestion: PropTypes.object,
  selected: PropTypes.string,
  setSelected: PropTypes.func,
  handleOptionSelect: PropTypes.func,
  updateQuestionValue: PropTypes.func,
}

export default Question1
