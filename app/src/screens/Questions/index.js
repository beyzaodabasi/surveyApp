import React, { useState, useEffect, useCallback } from "react"
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native"
import { styles } from "./styles"
import Ionicons from "react-native-vector-icons/Ionicons"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import * as Progress from "react-native-progress"
import { useSharedValue } from "react-native-reanimated"
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import Alert from "../../components/Alert"
import Loader from "../../components/Loader"
import { moderateScale } from "react-native-size-matters"
import i18n from "../../config/i18n.config"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import * as authActions from "../../redux/actions/authActions"

// Question Components
import Question1 from "./Question1"
import Question2 from "./Question2"
import Question3 from "./Question3"

const Question = ({ ...props }) => {
  const { surveyTemplate, surveyList, updateSurveyList } = props
  const navigation = useNavigation()
  const [selected, setSelected] = useState("")
  const [sliderValue, setSliderValue] = useState(0)
  const [selectValue, setSelectValue] = useState("")
  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState("")
  const [success, setSuccess] = useState(false)
  const [timer, setTimer] = useState("00:00")
  const progress = useSharedValue(sliderValue)
  const min = useSharedValue(1)
  const max = useSharedValue(3)
  const [currentQuestion, setCurrentQuestion] = useState({})
  const [currentSurvey, setCurrentSurvey] = useState({})
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        if (!currentSurvey?.createdDate) return

        const now = new Date()
        const start = new Date(currentSurvey.createdDate)
        const elapsed = Math.floor((now - start) / 1000)
        const remaining = currentSurvey.maxSeconds - elapsed

        if (remaining <= 0) {
          // Timer sıfırlandı
          setTimer("00:00")

          // Anket listesini güncelle
          const updatedSurveyList = surveyList.map((survey) => {
            if (survey.ID === currentSurvey.ID && !survey.isCompleted) {
              return { ...survey, isCompleted: true }
            }
            return survey
          })

          if (JSON.stringify(updatedSurveyList) !== JSON.stringify(surveyList)) {
            updateSurveyList(updatedSurveyList)
          }

          // Alert göster
          setSuccess(false)
          setAlertText(i18n.t("questions.anket_zaman_asimi"))
          setAlert(true)

          setTimeout(() => {
            finishTheSurvey()
          }, 3000)

          clearInterval(interval) // Interval'i temizle
          return
        }

        // Kalan süreyi hesaplayıp göster
        const minutes = Math.floor(remaining / 60)
        const seconds = remaining % 60
        setTimer(`${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`)
      }, 1000)

      return () => clearInterval(interval) // Cleanup when focus lost
    }, [currentSurvey, surveyList, updateSurveyList, navigation])
  )

  useEffect(() => {
    // Check for not finished survey, if it is there
    // then set the current survey to it
    // if there is no not finished survey, then set the last survey

    if (!surveyList) return
    if (currentSurvey && currentSurvey.ID) return

    // Get the survey based on completion status
    const notCompletedSurveys = surveyList.filter((survey) => !survey.isCompleted)
    const surveyToResume = notCompletedSurveys.length > 0 ? notCompletedSurveys[0] : surveyList[surveyList.length - 1]

    if (!surveyToResume || !surveyToResume.questions) {
      setAlertText(i18n.t("questions.anket_verileri_eksik_veya_hatali"))
      setAlert(true)
      return
    }

    setCurrentSurvey(surveyToResume)
    setQuestions([...surveyToResume.questions])
  }, [surveyList])

  useEffect(() => {
    setCurrentQuestionIndex(0)
  }, [currentSurvey])

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      setCurrentQuestion(questions[currentQuestionIndex])

      // local states and other values(child passing values) update from current question
      if (questions[currentQuestionIndex].value) {
        switch (questions[currentQuestionIndex].ID) {
          case 1:
            setSelected(questions[currentQuestionIndex].value)
            break
          case 2:
            console.log("value222", questions[currentQuestionIndex].value)
            setSliderValue(questions[currentQuestionIndex].value)
            progress.value = questions[currentQuestionIndex].value
            break
          case 3:
            setSelectValue(questions[currentQuestionIndex].value)
            break
          default:
            break
        }
      } else {
      }
    }
  }, [questions, currentQuestionIndex])

  useEffect(() => {
    if (currentQuestion && currentQuestion.value) {
      switch (currentQuestion.ID) {
        case 1:
          setSelected(currentQuestion.value)
          break
        case 2:
          console.log("value333", currentQuestion.value)
          setSliderValue(currentQuestion.value - 1)
          progress.value = currentQuestion.value - 1
          break
        case 3:
          setSelectValue(currentQuestion.value)
          break
        default:
          break
      }
    }
  }, [currentQuestion, progress])

  useEffect(() => {
    if (surveyList && currentSurvey && currentSurvey.questions) {
      const unansweredQuestionIndex = currentSurvey.questions.findIndex((question) => question.value === null)

      if (unansweredQuestionIndex >= 0) {
        setCurrentQuestionIndex(unansweredQuestionIndex)
      } else {
        setCurrentQuestionIndex(0)
      }
    }
  }, [surveyList, currentSurvey])

  function updateQuestionValue(questionId, value) {
    const updatedQuestions = [...questions]
    const questionIndex = updatedQuestions.findIndex((q) => q.ID === questionId)

    if (questionIndex !== -1) {
      updatedQuestions[questionIndex].value = value

      // if question is 2 then update the slider value and progress value
      if (questionId === 2) {
        console.log("value", value)
        setSliderValue(value)
        progress.value = value
      }

      setQuestions(updatedQuestions)
    }
  }

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

    setSuccess(true)
    setAlertText(i18n.t("questions.anket_tamamlandi"))
    setAlert(true)
    setTimeout(() => {
      navigation.navigate("Tabs")
    }, 3000)
  }

  //STATE CLEANER
  useEffect(() => {
    return () => {
      setCurrentSurvey({})
      setQuestions([])
      setCurrentQuestionIndex(0)
      setTimer("00:00")
      setSliderValue(0)
      setSelectValue("")
      setSelected("")
      setAlert(false)
      setAlertText("")
      setSuccess(false)
      setCurrentQuestion({})
    }
  }, [])

  // a null check for if below values are null then return a error message
  // if (!currentSurvey || !currentSurvey.ID || !currentQuestion) {
  //   return (
  //     <View style={styles().main}>
  //       <Text style={styles().errorText}>{alertText || "Anket verileri yükleniyor. Lütfen bekleyin..."}</Text>
  //     </View>
  //   )
  // }

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
            // sayacın doluluk oranı
            fill={((currentSurvey.maxSeconds - new Date().getTime() + new Date(currentSurvey.createdDate).getTime()) / 1000 / currentSurvey.maxSeconds) * 100}
            tintColor="#FFFFFF"
            onAnimationComplete={() => {}}
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
      <Alert
        alert={alert}
        setAlert={setAlert}
        success={success}
        text={alertText}
        onRequestClose={() => {
          setAlert(false)
        }}
      />
      <ScrollView showsHorizontalScrollIndicator={false}>
        {currentQuestionIndex < questions.length ? (
          <>
            <View style={styles().textView}>
              <Text style={styles().questiontext}>{currentQuestion.Description}</Text>
            </View>
            <View style={styles().chipView}>
              {/* Seçenekler / Questions */}
              {currentQuestion.ID === 1 ? (
                <Question1 currentQuestion={currentQuestion} selected={selected} setSelected={setSelected} updateQuestionValue={updateQuestionValue} moderateScale={moderateScale} />
              ) : currentQuestion.ID === 2 ? (
                <Question2 min={min} max={max} sliderValue={sliderValue} progress={progress} updateQuestionValue={updateQuestionValue} />
              ) : (
                currentQuestion.ID === 3 && <Question3 currentQuestion={currentQuestion} selectValue={selectValue} setSelectValue={setSelectValue} updateQuestionValue={updateQuestionValue} />
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
