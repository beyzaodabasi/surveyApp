import React, { useState, useEffect, useCallback } from "react"
import { View, Text, ScrollView, LayoutAnimation, TouchableOpacity, FlatList, Image } from "react-native"
import { styles } from "./styles"
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import * as Progress from "react-native-progress"
import { useSharedValue } from "react-native-reanimated"
import { Slider } from "react-native-awesome-slider"
import { useNavigation } from "@react-navigation/native"
import { Chip } from "react-native-paper"
import Alert from "../../components/Alert"
import Loader from "../../components/Loader"
import { moderateScale } from "react-native-size-matters"
import i18n from "../../config/i18n.config"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import * as authActions from "../../redux/actions/authActions"

const Question = ({ ...props }) => {
  const { surveyTemplate, surveyList, updateSurveyList } = props
  const navigation = useNavigation()
  const [selected, setSelected] = useState()
  const [sliderValue, setSliderValue] = useState(0)
  const [selectValue, setSelectValue] = useState()
  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState("")
  const [success, setSuccess] = useState(false)
  const [timer, setTimer] = useState("00:00")
  const progress = useSharedValue(sliderValue)
  const min = useSharedValue(0)
  const max = useSharedValue(2)

  useEffect(() => {
    console.log("SurveyList Changed!")
    // console.log("Last of survey: ", surveyList[surveyList.length - 1])
  }, [surveyList])

  /* const template = {
    ID: ID,
    maxSeconds: 1800,
    isCompleted: false,
    updatedDate: createdDate,
    createdDate: createdDate,
    point: 0,
    questions: [
      {
        ID: 1,
        Description: "Lorem Ipsum is simply dummy text of the printing industry.",
        options: [
          {
            id: 1,
            title: "ÇOK İYİ",
            color: "#25C133",
          },
          {
            id: 2,
            title: "İYİ",
            color: "#7ABC11",
          },
          {
            id: 3,
            title: "NORMAL",
            color: "#E3C700",
          },
          {
            id: 4,
            title: "KÖTÜ",
            color: "#FF8B00",
          },
          {
            id: 5,
            title: "ÇOK KÖTÜ",
            color: "#FF1D25",
          },
        ],
        value: null,
      },
      {
        ID: 2,
        Description: "Su anda nasil hissediyorsunuz?",
        options: [1, 2, 3],
        value: null,
      },
      {
        ID: 3,
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s?",
        options: ["Tesekkur Ediyorum", "Evet", "Hayir", "Kullanmiyorum", "Lorem ipsum", "Lorem ipsum", "Kullaniyorum", "Lorem"],
        value: null,
      },
    ],
  } */

  // find the first not finished survey in surveyList
  const [currentSurvey, setCurrentSurvey] = useState({})
  const [questions, setQuestions] = useState([])
  useEffect(() => {
    if (!surveyList) return
    if (currentSurvey && currentSurvey.ID) return
    const current = surveyList.find((survey) => survey.isCompleted === false) || {}
    console.log(`🚀 ~ useEffect ~ current: `, current)

    // // check the time is out, if it is out than change the screen
    // const now = new Date()
    // const start = new Date(current.createdDate)
    // const elapsed = Math.floor((now - start) / 1000)
    // if (elapsed >= current.maxSeconds) {
    //   // Time is out, mark survey as completed and navigate back
    //   const updatedSurveyList = surveyList.map((survey) => {
    //     if (survey.ID === current.ID) {
    //       return { ...survey, isCompleted: true }
    //     }
    //     return survey
    //   })
    //   updateSurveyList(updatedSurveyList)
    //   navigation.navigate("Tabs")
    //   return
    // }


    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
    console.log(`🚀 ~ useEffect ~ QUESTIONS: `, current.questions)
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)

    setCurrentSurvey(current)
    setQuestions(current.questions || [])
  }, [surveyList])

  // find the first null valued question for setting index of him
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  useEffect(() => {
    if (currentSurvey && !currentQuestionIndex && currentSurvey.questions) {
      const index = currentSurvey.questions.findIndex((question) => question.value === null) || 0
      setCurrentQuestionIndex(index)
    }
  }, [currentSurvey])

  const currentQuestion = questions[currentQuestionIndex]

  const handleOptionSelect = (value) => {
    const updatedQuestions = [...questions]
    updatedQuestions[currentQuestionIndex].value = value
    setQuestions(updatedQuestions)

    // Find the current survey in the list and update its questions
    const updatedSurveyList = surveyList.map((survey) => {
      if (survey.ID === currentSurvey.ID) {
        return {
          ...survey,
          questions: updatedQuestions,
        }
      }
      return survey
    })
    updateSurveyList(updatedSurveyList)

    // // Bir sonraki soruya geç
    // if (currentQuestionIndex < questions.length - 1) {
    //   // setCurrentQuestionIndex(currentQuestionIndex + 1)
    // } else {
    //   // Son soru ise anket tamamlandı
    //   console.log("Anket tamamlandı!")
    // }
  }

  const handleValueChange = (value) => {
    setSliderValue(value)
    progress.value = value
  
    // Update with consistent object structure
    const updatedQuestions = [...questions]
    const valueNEW = { 
      id: Math.floor(value) + 1,
      title: String(Math.floor(value) + 1), 
      color: "#25C133" 
    }
    updatedQuestions[currentQuestionIndex].value = valueNEW
    setQuestions(updatedQuestions)
  
    const updatedSurveyList = surveyList.map((survey) => {
      if (survey.ID === currentSurvey.ID) {
        return {
          ...survey,
          updatedDate: new Date(),
          questions: updatedQuestions,
        }
      }
      return survey
    })
    updateSurveyList(updatedSurveyList)
  }

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const start = new Date(currentSurvey.createdDate)
      const elapsed = Math.floor((now - start) / 1000)
      const remaining = currentSurvey.maxSeconds - elapsed
      const minutes = Math.floor(remaining / 60)
      const seconds = remaining % 60
      setTimer(`${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`)
    }, 1000)

    return () => clearInterval(interval)
  }, [currentSurvey])

  // check timeout but with useCallback method
  const checkTimeOut = useCallback(() => {
    const now = new Date()
    const start = new Date(currentSurvey.createdDate)
    const elapsed = Math.floor((now - start) / 1000)
    if (elapsed >= currentSurvey.maxSeconds) {
      // Time is out, mark survey as completed and navigate back
      const updatedSurveyList = surveyList.map((survey) => {
        if (survey.ID === currentSurvey.ID) {
          return { ...survey, isCompleted: true }
        }
        return survey
      })
      updateSurveyList(updatedSurveyList)
      navigation.navigate("Tabs")
    }
  }, [currentSurvey, surveyList])

  useEffect(() => {
    const timeoutId = setTimeout(checkTimeOut, 5000)

    return () => clearTimeout(timeoutId) // Cleanup
  }, [])

  // Finish the survey
  function finishTheSurvey() {
    // update the surveyList
    const updatedSurveyList = surveyList.map((survey) => {
      if (survey.ID === currentSurvey.ID) {
        return { ...survey, isCompleted: true }
      }
      return survey
    })
    updateSurveyList(updatedSurveyList)

    navigation.navigate("Tabs")
  }

  //STATE CLEANER
  useEffect(() => {
    return () => {
      setCurrentSurvey({})
      setQuestions([])
      setCurrentQuestionIndex(0)
      setTimer("00:00")
    }
  }, [])

  return (
    <View style={styles().main}>
      <View style={styles().topView}>
        <View style={styles().top2View}>
          {/* Home icon ve Sayaç */}
          <TouchableOpacity
            style={styles().iconView}
            onPress={() => {
              navigation.navigate("Tabs")
            }}
          >
            <Ionicons name="home-sharp" size={20} color="#0300A3" />
          </TouchableOpacity>
          <AnimatedCircularProgress
            size={100}
            width={15}
            fill={75}
            tintColor="#FFFFFF"
            onAnimationComplete={() => console.log("onAnimationComplete")}
            backgroundColor="#4240BA"
            arcSweepAngle={230}
            rotation={245}
            lineCap="round"
            duration={1000}
            style={styles().animationProgress}
          >
            {() => <Text style={styles().circularText}>{timer}</Text>}
          </AnimatedCircularProgress>
        </View>
        <View style={styles().surveyView}>
          {/* Anket konu başlığı ve status bar */}
          <Text style={styles().subjectTitle}>{i18n.t("questions.anket_konu_basligi")}</Text>
          <View style={styles().barView}>
            <Progress.Bar progress={currentQuestionIndex === 0 ? 0 : currentQuestionIndex === 1 ? 0.33 : currentQuestionIndex === 2 ? 0.66 : currentQuestionIndex === 3 ? 1 : 0} width={300} unfilledColor="#4240BA" color="white" borderColor="#4240BA" />
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text style={styles().pointTitle}>{currentQuestionIndex + 1}</Text>
              <Text style={styles().pointTitle2}>/{questions.length + 1}</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView showsHorizontalScrollIndicator={false}>
        {currentQuestionIndex < questions.length ? (
          <>
            <View style={styles().textView}>
              <Text style={styles().questiontext}>{currentQuestion.Description}</Text>
            </View>
            <View style={styles().chipView}>
              {/* Seçenekler */}
              {currentQuestion.ID === 1 ? (
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
              ) : currentQuestion.ID === 2 ? (
                <>
                  {sliderValue === 0 ? (
                    <>
                      <Feather name="frown" size={120} color="#0300A3" />
                    </>
                  ) : sliderValue === 1 ? (
                    <>
                      <Feather name="meh" size={120} color="#0300A3" />
                    </>
                  ) : (
                    <>
                      <Feather name="smile" size={120} color="#0300A3" />
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
                      handleValueChange(value)
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
              ) : (
                currentQuestion.ID === 3 && (
                  <>
                    {/* <FlatList
                      data={currentQuestion.options}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                        <>
                          <TouchableOpacity
                            onPress={() => {
                              handleOptionSelect(item)
                              setSelectValue(item.id)
                            }}
                            style={{
                              ...styles().chip1,
                              backgroundColor: selectValue !== item.id ? "#EFEFFF" : "#0300A3",
                            }}
                          >
                            <Text
                              style={{
                                ...styles().chipText,
                                color: selectValue !== item.id ? "rgba(29, 29, 27, 0.4)" : "#FFFFFF",
                              }}
                            >
                              {item.title}
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}
                      ItemSeparatorComponent={() => <View style={{ width: 6 }} />}
                      horizontal
                      
                    /> */}
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
              )}
            </View>
          </>
        ) : (
          <>
            <View style={styles().completedView}>
              <Image source={require("../../assets/onboarding/cansav.jpg")} />
              <Text style={styles().completedText}>{i18n.t("questions.anket_tamamlandi")}!</Text>
              <Text style={styles().finishButtonText}>{i18n.t("questions.veriler_olusturuluyor")}...</Text>
            </View>
          </>
        )}
      </ScrollView>

      <View style={styles().bottomView}>
        {/* Back Button */}
        <TouchableOpacity
          style={{
            ...styles().backButton,
            backgroundColor: currentQuestionIndex === 0 ? "#B1B0FF" : "#0300A3",
            opacity: currentQuestionIndex === 0 ? 0.4 : 1,
          }}
          disabled={currentQuestionIndex === 0}
          onPress={() => {
            // bir önceki soruya geç
            if (currentQuestionIndex > 0) {
              setCurrentQuestionIndex(currentQuestionIndex - 1)
            } else {
              // ilk soruda ise anketi kapat
              navigation.navigate("Tabs")
            }
          }}
        >
          <Ionicons name="arrow-back" size={22} color={currentQuestionIndex === 0 ? "#0300A3" : "#FFFFFF"} />
        </TouchableOpacity>
        {/* Next Button */}
        <TouchableOpacity
          style={styles().nextButton}
          onPress={() => {
            // Bir sonraki soruya geç
            if (currentQuestionIndex < questions.length) {
              // redux store'a kaydet
              setCurrentQuestionIndex(currentQuestionIndex + 1)
            } else {
              finishTheSurvey()
            }
          }}
        >
          <Text style={styles().nextButtonText}>{currentQuestionIndex < questions.length ? i18n.t("questions.sonraki_soru") : i18n.t("questions.bitir")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

Question.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object,
  updateUserLogin: PropTypes.func,
  surveyTemplate: PropTypes.object,
  surveyList: PropTypes.array,
  updateSurveyTemplate: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    userToken: state.auth.userToken,
    user: state.auth.user,
    surveyTemplate: state.auth.surveyTemplate,
    surveyList: state.auth.surveyList,
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateUserToken: (userToken) => dispatch(authActions.updateUserToken(userToken)),
  updateUserLogin: (user) => dispatch(authActions.updateUserLogin(user)),
  updateSurveyTemplate: (surveyTemplate) => dispatch(authActions.updateSurveyTemplate(surveyTemplate)),
  updateSurveyList: (surveyList) => dispatch(authActions.updateSurveyList(surveyList)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Question)
