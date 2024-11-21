import { DefaultTheme, DarkTheme } from "@react-navigation/native"

export default {
  asyncStorageKey: "SurveyApp001",
  BASE_URL: "http://192.168.1.64:8082/api/v1",
  THEME: {
    primary: "#062743",
    secondary: "#182952",

    // colors
    black: "#1E1F20",
    white: "#FFFFFF",

    lightGray: "#f5f5f5",
    lightGray2: "#f6f6f7",
    lightGray3: "#EFEFF1",
    lightGray4: "#F8F8F9",
    lightGray5: "#9ea9b3",
  },
  MyLightTheme: {
    ...DefaultTheme,
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      primary: "#062743",
      secondary: "#182952",

      // colors
      black: "#1E1F20",
      white: "#FFFFFF",

      lightGray: "#f5f5f5",
      lightGray2: "#f6f6f7",
      lightGray3: "#EFEFF1",
      lightGray4: "#F8F8F9",
      lightGray5: "#9ea9b3",
    },
  },
  MyDarkTheme: {
    ...DarkTheme,
    dark: true,
    colors: {
      ...DarkTheme.colors,
      primary: "#062743",
      secondary: "#182952",
      card: "#1f1f1f",
      black: "#1E1F20",
      white: "#FFFFFF",

      lightGray: "#f5f5f5",
      lightGray2: "#f6f6f7",
      lightGray3: "#EFEFF1",
      lightGray4: "#F8F8F9",
      lightGray5: "#9ea9b3",
    },
  },
}
