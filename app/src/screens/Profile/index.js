import React, { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { styles } from "./styles"
import Alert from "../../components/Alert"
import Loader from "../../components/Loader"
import Ionicons from "react-native-vector-icons/Ionicons"
import { moderateScale } from "react-native-size-matters"
import { TextInput } from "react-native-paper"
import { TextInputMask } from "react-native-masked-text"
import i18n from "../../config/i18n.config"
import { useNavigation } from "@react-navigation/native"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import * as authActions from "../../redux/actions/authActions"

const Profile = ({ ...props }) => {
  const { user, userToken, updateUserLogin } = props
  const navigation = useNavigation()
  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [nickname, setNickname] = useState(user?.nickname || "")
  const [email, setEmail] = useState(user?.email || "")
  const [birthDate, setBirthDate] = useState(user?.birthDate || "")
  const [gender, setGender] = useState(user?.gender || "")

  const handleLogout = () => {
    // dispatch(logoutUser())
    navigation.navigate("Login")
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
          <View style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="person" size={20} color={"#0300A3"} style={styles().iconPerson} />
              <Text style={styles().mainText}>{i18n.t("profile.profil")}</Text>
            </View>

            <TouchableOpacity
              // TODO: redux içerisindeki veriler sıfırlanacak, login ekranına yönlendirilecek
              onPress={() => handleLogout()}
            >
              <Ionicons name="exit-outline" size={24} color={"#e63946"} style={styles().iconPerson} />
            </TouchableOpacity>
          </View>
          <View style={styles().listItem}>
            <Text style={styles().listText}>{i18n.t("profile.hesap_bilgileri")}</Text>
          </View>
        </View>
        <View style={styles().listView}>
          <TextInput
            value={nickname}
            onChangeText={(text) => setNickname(text)}
            maxLength={20}
            style={{
              width: "100%",
              height: moderateScale(50),
              borderRadius: moderateScale(6),
              marginBottom: moderateScale(10),
              backgroundColor: "#F1F1F1",
              fontSize: moderateScale(12),
              fontWeight: "400",
              color: "#1D1D1B",
            }}
            label={i18n.t("profile.nickname")}
            placeholder={i18n.t("profile.nickname")}
            mode="flat"
            outlineColor="#F1F1F1"
            underlineColor="#F1F1F1"
            theme={{
              colors: {
                primary: "#0300A3",
              },
            }}
            // right={<TextInput.Icon icon="square-edit-outline" color={"#0300A3"} />}
          />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={{
              width: "100%",
              height: moderateScale(50),
              borderRadius: moderateScale(6),
              marginBottom: moderateScale(10),
              backgroundColor: "#F1F1F1",
              fontSize: moderateScale(12),
              fontWeight: "400",
              color: "#1D1D1B",
            }}
            label={i18n.t("profile.email")}
            placeholder={i18n.t("profile.email")}
            mode="flat"
            outlineColor="#F1F1F1"
            underlineColor="#F1F1F1"
            theme={{
              colors: {
                primary: "#0300A3",
              },
            }}
            // right={<TextInput.Icon icon="square-edit-outline" color={"#0300A3"} />}
          />
          <TextInput
            value={birthDate}
            // onChangeText={(text) => setBirthDate(text)}
            style={{
              width: "100%",
              height: moderateScale(50),
              borderRadius: moderateScale(6),
              marginBottom: moderateScale(10),
              backgroundColor: "#F1F1F1",
              fontSize: moderateScale(12),
              fontWeight: "400",
              color: "#1D1D1B",
            }}
            label={i18n.t("profile.dogum_tarihi")}
            placeholder={i18n.t("profile.dogum_tarihi")}
            mode="flat"
            outlineColor="#F1F1F1"
            underlineColor="#F1F1F1"
            theme={{
              colors: {
                primary: "#0300A3",
              },
            }}
            // right={<TextInput.Icon icon="square-edit-outline" color={"#0300A3"} />}
            render={(props) => (
              <TextInputMask
                {...props}
                value={birthDate}
                type={"datetime"}
                options={{
                  format: "DD/MM/YYYY",
                }}
                onChangeText={(text) => setBirthDate(text)}
              />
            )}
          />
          <TextInput
            value={gender == "K" ? i18n.t("profile.kadin") : gender == "E" ? i18n.t("profile.erkek") : gender}
            onChangeText={(text) => setGender(text)}
            style={{
              width: "100%",
              height: moderateScale(50),
              borderRadius: moderateScale(6),
              marginBottom: moderateScale(10),
              backgroundColor: "#F1F1F1",
              fontSize: moderateScale(12),
              fontWeight: "400",
              color: "#1D1D1B",
            }}
            label={i18n.t("profile.cinsiyet")}
            placeholder={i18n.t("profile.cinsiyet")}
            mode="flat"
            outlineColor="#F1F1F1"
            underlineColor="#F1F1F1"
            theme={{
              colors: {
                primary: "#0300A3",
              },
            }}
            // right={<TextInput.Icon icon="square-edit-outline" color={"#0300A3"} />}
          />
        </View>
        <View
          style={{
            paddingTop: moderateScale(10),
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={styles().button}
            onPress={() => {
              setLoading(true)
              setTimeout(async () => {
                const userData = {
                  nickname,
                  email,
                  birthDate,
                  gender,
                }
                await updateUserLogin(userData)
                setAlertText(i18n.t("profile.bilgiler_guncellendi"))
                setSuccess(true)
                setAlert(true)
                setLoading(false)
              }, 1000)
            }}
          >
            <Text style={styles().buttonText}>{i18n.t("profile.guncelle")}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles().listItem}>
          <Text style={styles().listText}>{i18n.t("profile.hakkimizda")}</Text>
        </View>
        <TouchableOpacity style={styles().card}>
          <Text style={styles().cardText}>{i18n.t("profile.gizlilik_politikasi")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles().card}>
          <Text style={styles().cardText}>{i18n.t("profile.sartlar_ve_kosullar")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

Profile.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object,
  updateUserLogin: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    userToken: state.auth.userToken,
    user: state.auth.user,
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateUserToken: (userToken) => dispatch(authActions.updateUserToken(userToken)),
  updateUserLogin: (user) => dispatch(authActions.updateUserLogin(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
