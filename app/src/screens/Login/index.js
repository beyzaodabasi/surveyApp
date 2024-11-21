import React, { useState, useRef } from "react"
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { TextInput, Switch } from "react-native-paper"
import AppIntroSlider from "react-native-app-intro-slider"
import { moderateScale, scale } from "react-native-size-matters"
import { TextInputMask } from "react-native-masked-text"
import { CheckCircle } from "react-native-unicons"
import { styles } from "./styles"
import i18n from "../../config/i18n.config"
import axiosConfig from "../../config/axios.config"
import Alert from "../../components/Alert"
import Loader from "../../components/Loader"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import * as authActions from "../../redux/actions/authActions"

const Login = ({ ...props }) => {
  const { updateUserLogin, updateUserToken, user, userToken } = props
  const navigation = useNavigation()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const [login, setLogin] = useState(true)
  const [accept1, setAccept1] = useState(false)
  const [accept2, setAccept2] = useState(false)
  const [accept3, setAccept3] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [gender, setGender] = useState("")
  const [email, setEmail] = useState("")
  const [nickname, setNickname] = useState("")
  const [password2, setPassword2] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const sliderRef = useRef(null)

  const goToNextSlide = (index) => {
    sliderRef.current?.goToSlide(index, true) // true: geçiş animasyonu
  }

  const slides = [
    {
      key: "1",
    },
    {
      key: "2",
    },
  ]

  const defaultUserData = {
    gender: "K",
    email: "test@test.com",
    nickname: "test_nickname",
    password: "123456",
    birthDate: "01/01/1111",
  }

  const fetchLogin = async () => {
    // navigation.navigate("Tabs")
    setLoading(true)
    await axiosConfig
      .post("auth/login", {
        username: username,
        password: password,
      })
      .then(async (res) => {
        setLoading(false)
        await updateUserToken(res.data.token)
        await updateUserLogin(Object.keys(user).length === 0 ? defaultUserData : user)
        navigation.navigate("Tabs")
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        setSuccess(false)
        setAlertText(i18n.t("login.giris_hatasi"))
        setAlert(true)
      })
  }

  const _renderNextButton = () => {
    return (
      <View style={styles().button}>
        <Text style={styles().buttonText}>{i18n.t("login.ilerle")}</Text>
      </View>
    )
  }

  const _renderDoneButton = () => {
    return (
      //   <View style={styles().button}>
      //     <Text style={styles().buttonText}>{i18n.t("giris_yap")}</Text>
      //   </View>
      <View></View>
    )
  }

  const _renderSkipButton = () => {
    return <View></View>
  }

  const _onEndReached = () => {}

  const bottomButton = () => {
    ;<View></View>
  }

  const _renderItem = ({ item }) => {
    return (
      <View style={styles().card2}>
        {item.key == "1" ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={{ width: "100%" }}>
              <Text style={styles().genderText}>{i18n.t("login.cinsiyetinizi_secin")}</Text>
            </View>
            <View style={styles().selectGenderCards}>
              <TouchableOpacity
                style={gender == "K" ? styles().selectGenderCard : styles().genderCard}
                onPress={() => {
                  setGender("K")
                }}
              >
                <Text style={gender == "K" ? styles().selectText : styles().nicknameText}>{i18n.t("login.kadin")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={gender == "E" ? styles().selectGenderCard : styles().genderCard}
                onPress={() => {
                  setGender("E")
                }}
              >
                <Text style={gender == "E" ? styles().selectText : styles().nicknameText}>{i18n.t("login.erkek")}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ paddingBottom: moderateScale(8), width: "100%" }}>
              <Text style={styles().nicknameText}>{i18n.t("login.email")}</Text>
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                  width: "100%",
                  height: scale(40),
                  borderRadius: scale(6),
                  backgroundColor: "white",
                }}
              />
            </View>
            <View style={{ width: "100%" }}>
              <Text style={styles().nicknameText}>{i18n.t("login.nickname")}</Text>
              <TextInput
                value={nickname}
                onChangeText={(text) => setNickname(text)}
                maxLength={20}
                style={{
                  width: "100%",
                  height: scale(40),
                  borderRadius: scale(6),
                  backgroundColor: "white",
                }}
              />
              <Text style={styles().text}>{i18n.t("login.text")}</Text>
            </View>
            <View style={{ paddingBottom: moderateScale(8), width: "100%" }}>
              <Text style={styles().passwordText}>{i18n.t("login.sifre")}</Text>
              <TextInput
                value={password2}
                onChangeText={(text) => setPassword2(text)}
                style={{
                  width: "100%",
                  height: scale(40),
                  borderRadius: scale(6),
                  backgroundColor: "white",
                }}
                secureTextEntry={passwordVisible ? false : true}
                right={
                  <TextInput.Icon
                    icon={passwordVisible ? "eye-off" : "eye"}
                    onPress={() => {
                      setPasswordVisible(!passwordVisible)
                    }}
                  />
                }
              />
            </View>
            <View style={{ paddingBottom: moderateScale(8), width: "100%" }}>
              <Text style={styles().nicknameText}>{i18n.t("login.dogum_tarihi")}</Text>
              <TextInput
                value={birthDate}
                // onChangeText={(text) => setBirthDate(text)}
                style={{
                  width: "100%",
                  height: scale(40),
                  borderRadius: scale(6),
                  backgroundColor: "white",
                }}
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
            </View>
            {/* Buton */}
            <TouchableOpacity
              style={styles().button}
              onPress={() => {
                if ((gender == "", email == "" || nickname == "" || password2 == "" || birthDate == "")) {
                  setSuccess(false)
                  setAlertText(i18n.t("login.bos_alan_hata"))
                  setAlert(true)
                } else {
                  goToNextSlide(item.key === "1" ? 1 : 0) // Hedef slide key'ine göre geçiş
                }
              }}
            >
              <Text style={styles().buttonText}>{i18n.t("login.ilerle")}</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", padding: moderateScale(14) }}>
              <Text style={{ fontSize: moderateScale(12), fontWeight: "600" }}>{i18n.t("login.hesabiniz_var_mi")}</Text>
              <TouchableOpacity
                onPress={() => {
                  setLogin(true)
                }}
              >
                <Text style={{ fontSize: moderateScale(12), fontWeight: "600", color: "#0300A3" }}>{i18n.t("login.giris_yap")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles().kvkkTopText}>{i18n.t("login.hassas_veriler_hakkinda")}</Text>
            <Text style={styles().kvkkDes}>{i18n.t("login.hassas_veriler_hakkinda_text")}</Text>
            <View style={styles().textCard}>
              <Switch
                value={accept1}
                onValueChange={() => {
                  setAccept1(!accept1)
                }}
                color="#0300A3"
              />
              <View style={{ width: "80%" }}>
                <Text style={styles().kvkkDes1}>{i18n.t("login.accept_text1")}</Text>
                <Text style={styles().acceptText}>{i18n.t("login.kabul_ediyorum")}:</Text>
              </View>
            </View>
            <View style={styles().textCard}>
              <Switch
                value={accept2}
                onValueChange={() => {
                  setAccept2(!accept2)
                }}
                color="#0300A3"
              />
              <View style={{ width: "80%" }}>
                <Text style={styles().kvkkDes1}>{i18n.t("login.accept_text2")}</Text>
                <Text style={styles().acceptText}>{i18n.t("login.kabul_ediyorum")}:</Text>
              </View>
            </View>
            <View style={styles().textCard}>
              <Switch
                value={accept3}
                onValueChange={() => {
                  setAccept3(!accept3)
                }}
                color="#0300A3"
              />
              <View style={{ width: "80%" }}>
                <Text style={styles().kvkkDes1}>{i18n.t("login.accept_text3")}</Text>
                <Text style={styles().acceptText}>{i18n.t("login.kabul_ediyorum")}:</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles().button}
              onPress={() => {
                if ((gender == "", email == "" || nickname == "" || password2 == "" || birthDate == "")) {
                  setSuccess(false)
                  setAlertText(i18n.t("login.bos_alan_hata"))
                  setAlert(true)
                } else {
                  if (accept1 && accept2 && accept3) {
                    const userData = {
                      gender: gender,
                      email: email,
                      nickname: nickname,
                      password: password2,
                      birthDate: birthDate,
                    }
                    updateUserLogin(userData)
                    navigation.navigate("Tabs")
                  } else {
                    setSuccess(false)
                    setAlertText(i18n.t("login.kvkk_hata"))
                    setAlert(true)
                  }
                }
              }}
            >
              <Text style={styles().buttonText}>{i18n.t("login.ilerle")}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }

  if (login == true) {
    return (
      <View style={styles().loginMain}>
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
            <Loader loading={loading} />
            <View style={styles().card}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles().welcomeText}>{i18n.t("login.hosgeldiniz")}</Text>
                <View style={{ width: "100%" }}>
                  <Text style={styles().nicknameText}>{i18n.t("login.nickname")}</Text>
                  <TextInput
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    style={{
                      width: "100%",
                      height: scale(40),
                      borderRadius: scale(6),
                      backgroundColor: "white",
                    }}
                  />
                  <Text style={styles().text}>{i18n.t("login.text")}</Text>
                </View>
                <View style={{ width: "100%" }}>
                  <Text style={styles().passwordText}>{i18n.t("login.sifre")}</Text>
                  <TextInput
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={{
                      width: "100%",
                      height: scale(40),
                      borderRadius: scale(6),
                      backgroundColor: "white",
                    }}
                    secureTextEntry={passwordVisible ? false : true}
                    right={
                      <TextInput.Icon
                        icon={passwordVisible ? "eye-off" : "eye"}
                        onPress={() => {
                          setPasswordVisible(!passwordVisible)
                        }}
                      />
                    }
                  />
                  <TouchableOpacity>
                    <Text style={styles().passwordText2}>{i18n.t("login.sifremi_unuttum")}</Text>
                  </TouchableOpacity>
                </View>
                {/* Buton */}
                <TouchableOpacity style={styles().button} onPress={fetchLogin}>
                  <Text style={styles().buttonText}>{i18n.t("login.giris_yap")}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", padding: moderateScale(14) }}>
                  <Text style={{ fontSize: moderateScale(12), fontWeight: "600" }}>{i18n.t("login.uye_degil_misiniz")}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setLogin(false)
                    }}
                  >
                    <Text style={{ fontSize: moderateScale(12), fontWeight: "600", color: "#0300A3" }}>{i18n.t("login.hesap_olustur")}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
    )
  } else {
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
            <View style={styles().card1}>
              <AppIntroSlider
                data={slides}
                ref={sliderRef}
                renderItem={_renderItem}
                renderDoneButton={_renderDoneButton}
                renderNextButton={_renderNextButton}
                renderSkipButton={_renderSkipButton}
                bottomButton={bottomButton}
                onDone={_onEndReached}
                onSkip={_onEndReached}
                dotClickEnabled={true}
                dotStyle={styles().dotStyle}
                activeDotStyle={styles().activeDotStyle}
                showNextButton={false}
                showDoneButton={true}
                showSkipButton={false}
              />
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
    )
  }
}

Login.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object,
  updateUserToken: PropTypes.func.isRequired,
  updateUserLogin: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
