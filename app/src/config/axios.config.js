import axios from "axios"
import * as SecureStore from "expo-secure-store"
import i18n from "./i18n.config"
import appjson from "../../../app.json"

const instance = axios.create({
  baseURL: "https://fakestoreapi.com/",
})

instance.interceptors.request.use(
  async (config) => {
    const value = await SecureStore.getItemAsync("token")
    const keys = JSON.parse(value)
    const version = appjson.expo.version
    config.headers = {
      Authorization: `Bearer ${keys}`,
      language: i18n.locale,
      version: version,
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export default instance
