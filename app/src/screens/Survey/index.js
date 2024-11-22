import React, { useState } from "react"
import { View, Text, ScrollView, LayoutAnimation, TouchableOpacity, FlatList } from "react-native"
import { styles } from "./styles"
import Alert from "../../components/Alert"
import Loader from "../../components/Loader"
import { Divider } from "react-native-elements"
import Ionicons from "react-native-vector-icons/Ionicons"
import { moderateScale } from "react-native-size-matters"
import i18n from "../../config/i18n.config"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import * as authActions from "../../redux/actions/authActions"

const Survey = ({ ...props }) => {
  const { surveyList, updateSurveyList } = props
  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})

  function clearSurveyList() {
    updateSurveyList([])
  }

  return (
    <View style={styles().main}>
      <Loader loading={loading} />
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
        <View style={styles().mainView}>
          <Text style={styles().mainText}>{i18n.t("survey.tamamlanan_anketler")}</Text>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <View style={styles().view1}>
              <Text style={styles().numText}>30</Text>
              <Text>{i18n.t("survey.puan")}</Text>
            </View>
            <Divider
              style={{
                backgroundColor: "#D9D9D9",
                // height: "100%",
                width: 1,
                height: "80%",
              }}
            />
            <View style={styles().view2}>
              <Text style={styles().numText}>7</Text>
              <Text>{i18n.t("survey.toplam")}</Text>
            </View>
            <Divider
              style={{
                backgroundColor: "#D9D9D9",
                // height: "100%",
                width: 1,
                height: "80%",
              }}
            />
            <View style={styles().view3}>
              <Text style={styles().numText}>2</Text>
              <Text>{i18n.t("survey.bugun")}</Text>
            </View>
          </View>
        </View>
        <View style={styles().listView}>
          <View style={styles().listItem}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="menu-outline" size={24} />
              <Text style={styles().listText}>{i18n.t("survey.liste")}</Text>
            </View>
            <TouchableOpacity onPress={() => clearSurveyList()}>
              <Text style={styles().listText}>{i18n.t("survey.temizle")}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={surveyList}
            scrollEnabled={false}
            keyExtractor={(item) => item.ID.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles().card}
                onPress={() => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
                  setExpanded(!expanded)
                  setSelectedCard(item)
                  if (selectedCard.ID != item.ID) setExpanded(true)
                }}
              >
                <View style={styles().item1}>
                  <Text
                    style={{
                      fontSize: moderateScale(12),
                      fontWeight: "400",
                      color: expanded && selectedCard.ID == item.ID ? "#0300A3" : "#1D1D1B",
                    }}
                  >
                    {i18n.t("survey.anket")}
                  </Text>
                  {expanded && selectedCard.ID == item.ID ? <Ionicons name="chevron-down" size={18} /> : <Ionicons name="chevron-forward" size={18} />}
                </View>
                <View style={styles().item2}>
                  <Ionicons name="calendar-outline" size={18} style={styles().icon} color={"#0300A3"} />
                  <Text style={styles().text1}>{new Date(item.createdDate).toLocaleDateString()}</Text>
                  <Ionicons name="time-outline" size={18} style={styles().icon} color={"#0300A3"} />
                  <Text style={styles().text1}>{new Date(item.createdDate).toLocaleTimeString()}</Text>
                </View>
                {expanded && selectedCard.ID == item.ID && (
                  <View style={styles().buttonView}>
                    <View></View>
                    <View style={styles().button}>
                      <Text style={styles().buttonText}>{i18n.t("survey.modunuz")}: </Text>
                      <Text style={styles().buttonText}>{item.point}</Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>

      <View style={{ height: "10%" }}></View>
    </View>
  )
}

Survey.propTypes = {
  surveyList: PropTypes.array,
  updateSurveyTemplate: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    surveyList: state.auth.surveyList,
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateSurveyList: (surveyList) => dispatch(authActions.updateSurveyList(surveyList)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Survey)
