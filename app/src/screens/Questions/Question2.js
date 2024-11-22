import React from "react"
import { View, Text, TouchableOpacity, FlatList } from "react-native"
import { styles } from "./styles"
import PropTypes from "prop-types"
import Feather from "react-native-vector-icons/Feather"
import { Slider } from "react-native-awesome-slider"

const Question2 = (props) => {
  // min={min}
  // max={max}
  // sliderValue={sliderValue}
  // progress={progress}
  // updateQuestionValue={updateQuestionValue}
  // updateQuestionValue(questionIndex, value)

  const { min, max, sliderValue, progress, updateQuestionValue } = props

  return (
    <>
      {sliderValue === 3 ? (
        <>
          <Feather name="smile" size={120} color="#0300A3" />
        </>
      ) : sliderValue === 2 ? (
        <>
          <Feather name="meh" size={120} color="#0300A3" />
        </>
      ) : (
        <>
          <Feather name="frown" size={120} color="#0300A3" />
        </>
      )}

      <Slider
        style={{
          width: 300,
          height: 100,
        }}
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        hapticMode="step"
        steps={2}
        onSlidingComplete={(value) => {
          // handleValueChange(value)
          updateQuestionValue(2, value)
        }}
        theme={{
          disableMinTrackTintColor: "red",
          maximumTrackTintColor: "rgba(3, 0, 163, 0.2)",
          minimumTrackTintColor: "#0300A3",
          cacheTrackTintColor: "#333",
          bubbleBackgroundColor: "#666",
          heartbeatColor: "#999",
        }}
      />
    </>
  )
}

Question2.propTypes = {
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
  sliderValue: PropTypes.number.isRequired,
  progress: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
  updateQuestionValue: PropTypes.func.isRequired,
}

export default Question2
