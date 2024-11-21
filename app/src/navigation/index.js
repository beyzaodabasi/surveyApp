import "react-native-gesture-handler"
import React, { useEffect } from "react"
import AuthStack from "./AuthStack"
import { NavigationContainer } from "@react-navigation/native"
import Constant from "./../constants/index"
import axios from "axios"

const { MyDarkTheme, MyLightTheme, BASE_URL } = Constant

const RootNavigation = () => {
  const setUrlConfig = () => {
    axios.defaults.baseURL = BASE_URL
  }
  useEffect(() => {
    setUrlConfig()
  }, [])
  return (
    // <NavigationContainer>
      <AuthStack />
    // </NavigationContainer>
  )
}

export default RootNavigation
