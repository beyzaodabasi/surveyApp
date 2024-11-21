import React, { useEffect, useState, useRef } from "react"
import { Image, Text, Platform, Linking, TouchableOpacity } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/native"
import Tabs from "./Tabs"
// import Main from "../screens/Main/index"
import Login from "../screens/Login/index"
import Questions from "../screens/Questions/index"
// import Onboarding from "../screens/Onboarding/index"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import * as authActions from "../redux/actions/authActions"
import { scale } from "react-native-size-matters"
import Alert from "../components/Alert/index"
import Ion from "react-native-vector-icons/Ionicons"
import { AngleLeftB, TrashAlt } from "react-native-unicons"
import i18n from "./../config/i18n.config"
import axiosConfig from "../config/axios.config"

const AuthStack = ({ ...props }) => {
  const { isOnboardingDisabled, userToken, updateUserToken, updateSurveyTemplate } = props
  const navigation = useNavigation()
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      // Uygulama ilk açıldığında Onboarding ekranı gösterilir.
      // Eğer kullanıcı onboarding ekranını geçtiyse ve user bilgisi doluysa direk Home'a yönlendirilir.
      initialRouteName={userToken ? "Tabs" : "Login"}
      // initialRouteName="Home"
    >
      <Stack.Screen name="Tabs" component={Tabs} />
      {/* <Stack.Screen name="Main" component={Main} /> */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Questions"
        component={Questions}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  )
}

AuthStack.propTypes = {
  userToken: PropTypes.string,
  updateUserToken: PropTypes.func,
  isOnboardingDisabled: PropTypes.bool.isRequired,
  updateSurveyTemplate: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    userToken: state.auth.userToken,
    isOnboardingDisabled: state.auth.isOnboardingDisabled,
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateUserToken: (userToken) => dispatch(authActions.updateUserToken(userToken)),
  updateSurveyTemplate: (surveyTemplate) => dispatch(authActions.updateSurveyTemplate(surveyTemplate)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthStack)
