import { UPDATE_ONBOARDING_STATUS, UPDATE_USER_LOGIN, UPDATE_USER_TOKEN, UPDATE_SURVEY_TEMPLATE, UPDATE_SURVEY_LIST } from "../constants"

export const updateOnboarding = (status) => {
  return {
    type: UPDATE_ONBOARDING_STATUS,
    status,
  }
}

export const updateUserLogin = (user) => {
  return {
    type: UPDATE_USER_LOGIN,
    user,
  }
}

export const updateUserToken = (userToken) => {
  return {
    type: UPDATE_USER_TOKEN,
    userToken,
  }
}

export const updateSurveyTemplate = (surveyTemplate) => {
  return {
    type: UPDATE_SURVEY_TEMPLATE,
    surveyTemplate,
  }
}

export const updateSurveyList = (surveyList) => {
  return {
    type: UPDATE_SURVEY_LIST,
    surveyList,
  }
}
