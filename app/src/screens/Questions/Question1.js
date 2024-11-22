import React from "react"
import { View, Text, TouchableOpacity, FlatList } from "react-native"
import { styles } from "./styles"
import PropTypes from "prop-types"

const Question1 = (props) => {
  const { currentQuestion, handleOptionSelect, selected, setSelected, moderateScale } = props

  return (
    <>
      <FlatList
        data={currentQuestion.options}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              onPress={() => {
                handleOptionSelect(item.title)
                setSelected(item.id)
              }}
              style={{
                ...styles().chip,
                backgroundColor: item.color,
                transform: [
                  {
                    translateY: selected !== item.id ? moderateScale(10) : 0,
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
            {selected === item.id && (
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
  currentQuestion: PropTypes.object,
  handleOptionSelect: PropTypes.func,
  setSelected: PropTypes.func,
  selected: PropTypes.number,
  moderateScale: PropTypes.func,
}

export default Question1
