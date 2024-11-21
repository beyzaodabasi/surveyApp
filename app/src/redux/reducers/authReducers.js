import { UPDATE_ONBOARDING_STATUS, UPDATE_USER_LOGIN, UPDATE_USER_TOKEN, UPDATE_SURVEY_TEMPLATE, UPDATE_SURVEY_LIST } from "../constants"

const initialState = {
  isOnboardingDisabled: false,
  user: {},
  userToken: "",
  surveyTemplate: {},
  surveyList: [],
}

const authReducer = (state = initialState, action) => {
  const { status, type, user, userToken, surveyTemplate, surveyList } = action

  switch (type) {
    case UPDATE_ONBOARDING_STATUS:
      return {
        ...state,
        isOnboardingDisabled: status,
      }
    case UPDATE_USER_LOGIN:
      return {
        ...state,
        user: user,
      }
    case UPDATE_USER_TOKEN:
      return {
        ...state,
        userToken: userToken,
      }
    case UPDATE_SURVEY_TEMPLATE:
      return {
        ...state,
        surveyTemplate: surveyTemplate,
      }
    case UPDATE_SURVEY_LIST:
      return {
        ...state,
        surveyList: surveyList,
      }
    default:
      return state
  }
}

export default authReducer
