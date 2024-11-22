import React, { useState, useEffect, useCallback } from "react"
import { View, Text, ScrollView, ImageBackground, TouchableOpacity } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { moderateScale, scale } from "react-native-size-matters"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "@react-native-community/blur"
import { styles } from "./styles"
import i18n from "../../config/i18n.config"
import Alert from "../../components/Alert"
import Loader from "../../components/Loader"
import { useNavigation } from "@react-navigation/native"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import * as authActions from "../../redux/actions/authActions"

const Home = ({ ...props }) => {
  const { user, surveyTemplate, updateSurveyTemplate, surveyList, updateSurveyList } = props
  const navigation = useNavigation()
  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  function createSurvey() {
    // 6 digit random number + 4 alphabet
    const ID = Math.floor(100000 + Math.random() * 900000) + Math.random().toString(36).substring(2, 6).toUpperCase()
    const createdDate = new Date()
    const template = {
      ID: ID,
      // maxSeconds: 1800,
      maxSeconds: 80,
      isCompleted: false,
      updatedDate: createdDate,
      createdDate: createdDate,
      point: 50,
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
          options: [
            { id: 1, title: "1", color: "#25C133" },
            { id: 2, title: "2", color: "#7ABC11" },
            { id: 3, title: "3", color: "#E3C700" },
          ],
          value: null,
        },
        {
          ID: 3,
          Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s?",
          options: [
            { id: 1, title: "Tesekkur Ediyorum", color: "#25C133" },
            { id: 2, title: "Evet", color: "#7ABC11" },
            { id: 3, title: "Hayir", color: "#E3C700" },
            { id: 4, title: "Kullanmiyorum", color: "#FF8B00" },
            { id: 5, title: "Lorem ipsum", color: "#FF1D25" },
            { id: 6, title: "Lorem Ipsum", color: "#25C133" },
            { id: 7, title: "Kullaniyorum", color: "#7ABC11" },
            { id: 8, title: "Lorem", color: "#E3C700" },
          ],
          value: null,
        },
      ],
    }
    // check all survey objects and if one of them is not completed yet, dont create the new survey, find the not finished one
    // const unfinishedSurvey = surveyList.find((survey) => !survey.isCompleted)
    // if (unfinishedSurvey) {
    //   setAlertText(i18n.t("home.tamamlanmamis_anket_bulunmaktadir"))
    //   setSuccess(false)
    //   setAlert(true)
    //   setTimeout(() => {
    //     navigation.navigate("Questions")
    //   }, 2000)
    //   return
    // }

    // // add new object end of the surveyList
    // let currentList = surveyList
    // currentList.push(template)
    // updateSurveyList(currentList)

    // navigation.navigate("Questions")

    // Check for unfinished surveys with expired time and mark them as completed
    const currentDate = new Date()

    const updatedSurveyList = surveyList.map((survey) => {
      // If survey is not completed and its time is expired
      if (!survey.isCompleted) {
        const elapsed = Math.floor((currentDate - new Date(survey.createdDate)) / 1000)
        if (elapsed >= survey.maxSeconds) {
          // Mark the expired survey as completed
          return { ...survey, isCompleted: true }
        }
      }
      return survey
    })

    // Update the survey list with completed surveys
    updateSurveyList(updatedSurveyList)

    // Check if there is still an unfinished survey
    const unfinishedSurvey = updatedSurveyList.find((survey) => !survey.isCompleted)
    if (unfinishedSurvey) {
      // Show alert if there is an unfinished survey
      setAlertText(i18n.t("home.tamamlanmamis_anket_bulunmaktadir"))
      setSuccess(false)
      setAlert(true)

      // Redirect to "Questions" screen after a delay
      setTimeout(() => {
        navigation.navigate("Questions")
      }, 2000)
      return
    }

    // Add the new survey if there is no unfinished survey
    updatedSurveyList.push(template)
    updateSurveyList(updatedSurveyList)

    // Redirect to "Questions" screen after adding the new survey
    navigation.navigate("Questions")
  }

  // check timeouted surveys when Home screen is focused
  useFocusEffect(
    useCallback(() => {
      const currentDate = new Date()
      // const timeoutedSurveys = surveyList.filter((survey) => {
      //   const surveyDate = new Date(survey.updatedDate)
      //   const diff = currentDate - surveyDate
      //   const seconds = Math.floor(diff / 1000)
      //   return seconds > survey.maxSeconds
      // })

      // do it more efficient way
      const updatedSurveyList = surveyList.map((survey) => {
        if (survey.isCompleted !== true) {
          const start = survey.createdDate
          const elapsed = Math.floor((currentDate - start) / 1000)
          if (elapsed >= survey.maxSeconds) {
            return { ...survey, isCompleted: true }
          }
        }
        return survey
      })

      if (JSON.stringify(updatedSurveyList) !== JSON.stringify(surveyList)) {
        updateSurveyList(updatedSurveyList)
      }
    }, [surveyList])
  )
  // useFocusEffect(
  //   useCallback(() => {
  //     const checkTimeoutSurveys = () => {
  //       if (!surveyList) return

  //       const now = new Date()
  //       const updatedSurveyList = surveyList.map((survey) => {
  //         console.log("HOME Is Survey Completed: ", survey.isCompleted)
  //         if (survey.isCompleted !== true) {
  //           const start = survey.createdDate
  //           const elapsed = Math.floor((now - start) / 1000)
  //           if (elapsed >= survey.maxSeconds) {
  //             return { ...survey, isCompleted: true }
  //           }
  //         }
  //         return survey
  //       })

  //       if (JSON.stringify(updatedSurveyList) !== JSON.stringify(surveyList)) {
  //         updateSurveyList(updatedSurveyList)
  //       }
  //     }

  //     checkTimeoutSurveys()

  //   }, [surveyList])
  // )

  return (
    <View style={styles().loginMain}>
      <Loader loading={loading} />
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Alert
          alert={alert}
          setAlert={setAlert}
          success={success}
          text={alertText}
          onRequestClose={() => {
            setAlert(false)
          }}
        />
        <ImageBackground source={require("../../assets/onboarding/background.jpg")} resizeMode="cover" style={styles().image}>
          {/* <BlurView
              style={styles().blurView}
              blurType="light"
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            /> */}
          <LinearGradient colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)", "rgba(255,255,255,1)", "rgba(255,255,255,1)"]} style={styles().gradientOverlay}>
            <View style={styles().card}>
              <View style={styles().textView}>
                <Text style={styles().welcomeText}>{i18n.t("home.merhaba")} </Text>
                <Text style={styles().nicknameText}>{user.nickname}</Text>
              </View>
              <TouchableOpacity
                style={styles().button}
                onPress={() => {
                  createSurvey()
                }}
              >
                <Text style={styles().buttonText}>{i18n.t("home.ankete_basla")}</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ImageBackground>
      </ScrollView>
    </View>
  )
}

Home.propTypes = {
  user: PropTypes.object,
  surveyTemplate: PropTypes.object,
  surveyList: PropTypes.array,
  updateSurveyTemplate: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    surveyTemplate: state.auth.surveyTemplate,
    surveyList: state.auth.surveyList,
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateUserLogin: (user) => dispatch(authActions.updateUserLogin(user)),
  updateSurveyTemplate: (surveyTemplate) => dispatch(authActions.updateSurveyTemplate(surveyTemplate)),
  updateSurveyList: (surveyList) => dispatch(authActions.updateSurveyList(surveyList)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
