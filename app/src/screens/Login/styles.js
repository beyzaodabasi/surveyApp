import { Dimensions } from "react-native"
import EstyleSheet from "react-native-extended-stylesheet"
import { moderateScale, scale } from "react-native-size-matters"

const screenWidth = Dimensions.get("screen").width
const screenHeight = Dimensions.get("screen").height

export const styles = (background, text, lightGray5, primary, dark) =>
  EstyleSheet.create({
    loginMain: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      //   paddingLeft: moderateScale(20),
      //   paddingRight: moderateScale(20),
    },
    image: {
      flex: 1,
      justifyContent: "flex-end",
      width: screenWidth,
      height: screenHeight / 1.045,
    },
    card: {
      backgroundColor: "#FFFFFFCC",
      height: "65%",
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      paddingLeft: moderateScale(30),
      paddingRight: moderateScale(30),
    },
    card1: {
      height: "75%",
      backgroundColor: "#FFFFFFCC",
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
    },
    card2: {
      paddingLeft: moderateScale(30),
      paddingRight: moderateScale(30),
    },
    welcomeText: {
      fontSize: moderateScale(20),
      fontWeight: "700",
      color: "#1D1D1B",
      textAlign: "center",
      padding: moderateScale(40),
    },
    nicknameText: {
      fontSize: moderateScale(12),
      fontWeight: "600",
      color: "#1D1D1B",
      paddingBottom: moderateScale(5),
    },
    text: {
      fontSize: moderateScale(9),
      fontWeight: "400",
      color: "#1D1D1B",
      paddingTop: moderateScale(5),
    },
    passwordText: {
      fontSize: moderateScale(12),
      fontWeight: "600",
      color: "#1D1D1B",
      paddingTop: moderateScale(10),
      paddingBottom: moderateScale(5),
    },
    passwordText2: {
      fontSize: moderateScale(9),
      fontWeight: "600",
      color: "#787878",
      textAlign: "right",
      paddingTop: moderateScale(5),
    },
    button: {
      backgroundColor: "#0300A3",
      borderRadius: scale(40),
      width: "50%",
      height: scale(50),
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: moderateScale(14),
      fontWeight: "600",
    },
    dotStyle: {
      backgroundColor: "rgba(0, 0, 0, .2)",
    },
    activeDotStyle: {
      backgroundColor: "#0300A3",
    },
    genderText: {
      fontSize: moderateScale(12),
      fontWeight: "600",
      color: "#1D1D1B",
      // textAlign: "center",
      paddingTop: moderateScale(20),
      paddingBottom: moderateScale(10),
    },
    selectGenderCards: {
      width: "100%",
      flexDirection: "row",
      paddingBottom: moderateScale(10),
      justifyContent: "space-between",
      alignItems: "center",
    },
    genderCard: {
      width: "45%",
      // height: scale(100),
      paddingTop: scale(8),
      paddingBottom: scale(8),
      backgroundColor: "#FFFFFF",
      borderRadius: scale(5),
      justifyContent: "center",
      alignItems: "center",
    },
    selectGenderCard: {
      width: "45%",
      // height: scale(100),
      paddingTop: scale(8),
      paddingBottom: scale(8),
      backgroundColor: "#0300A3",
      borderRadius: scale(5),
      justifyContent: "center",
      alignItems: "center",
    },
    selectText: {
      fontSize: moderateScale(12),
      fontWeight: "600",
      color: "#fff",
      paddingBottom: moderateScale(5),
    },
    kvkkText: {
      fontSize: moderateScale(14),
      fontWeight: "600",
      color: "#1D1D1B",
      // textAlign: "center",
      paddingTop: moderateScale(20),
      paddingBottom: moderateScale(8),
    },
    kvkkDes: {
      fontSize: moderateScale(12),
      fontWeight: "400",
      color: "#1D1D1B",
      paddingBottom: moderateScale(40),
      textAlign: "center",
    },
    kvkkDes1: {
      fontSize: moderateScale(12),
      fontWeight: "400",
      color: "#1D1D1B",
    },
    acceptText: {
      fontSize: moderateScale(12),
      fontWeight: "700",
      color: "#1D1D1B",
    },
    textCard: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingBottom: moderateScale(20),
    },
    kvkkTopText: {
      fontSize: moderateScale(12),
      fontWeight: "600",
      color: "#1D1D1B",
      // textAlign: "center",
      paddingTop: moderateScale(40),
      paddingBottom: moderateScale(10),
    },
  })
