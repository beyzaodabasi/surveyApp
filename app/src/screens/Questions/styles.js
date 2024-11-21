import { Dimensions } from "react-native"
import EstyleSheet from "react-native-extended-stylesheet"
import { moderateScale } from "react-native-size-matters"

const screenWidth = Dimensions.get("screen").width
const screenHeight = Dimensions.get("screen").height

export const styles = (background, text, lightGray5, primary, dark) =>
  EstyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    topView: {
      backgroundColor: "#0300A3",
      borderBottomLeftRadius: moderateScale(20),
      borderBottomRightRadius: moderateScale(20),
      paddingTop: moderateScale(10),
      paddingRight: moderateScale(20),
      paddingLeft: moderateScale(20),
    },
    bottomView: {
      width: screenWidth,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: moderateScale(34),
    },
    iconView: {
      width: moderateScale(34),
      height: moderateScale(34),
      alignItems: "center",
      justifyContent: "center",
      borderRadius: moderateScale(17),
      backgroundColor: "#FFFFFF",
    },
    top2View: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    subjectTitle: {
      fontSize: moderateScale(14),
      color: "#FFFFFF",
      fontWeight: "700",
      paddingBottom: moderateScale(8),
    },
    animationProgress: {
      alignItems: "flex-end",
      marginBottom: moderateScale(-14),
    },
    surveyView: {
      paddingTop: moderateScale(10),
      paddingBottom: moderateScale(20),
    },
    barView: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    pointTitle: {
      fontSize: moderateScale(15),
      color: "#FFFFFF",
      fontWeight: "400",
    },
    pointTitle2: {
      fontSize: moderateScale(11),
      color: "#4240BA",
      fontWeight: "600",
    },
    circularText: {
      fontSize: moderateScale(14),
      color: "#FFFFFF",
      fontWeight: "400",
    },
    chipView: {
      // flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: moderateScale(12),
    },
    chip: {
      width: moderateScale(60),
      height: moderateScale(40),
      // textAlign: "center",
      alignItems: "center",
      justifyContent: "space-around",
      borderRadius: moderateScale(10),
      // paddingVertical: moderateScale(6),
      // paddingHorizontal: moderateScale(10),
      marginBottom: moderateScale(24),
    },
    chip1: {
      // width: moderateScale(60),
      // height: moderateScale(40),
      // textAlign: "center",
      alignItems: "center",
      justifyContent: "space-around",
      borderRadius: moderateScale(24),
      paddingVertical: moderateScale(10),
      paddingHorizontal: moderateScale(12),
      marginBottom: moderateScale(6),
      marginRight: moderateScale(6),
    },
    chipText: {
      fontSize: moderateScale(8),
      fontWeight: "600",
      textAlign: "center",
    },
    line: {
      // a bottom border line to chip
      position: "absolute",
      bottom: 0,
      width: moderateScale(80),
      height: 4,
      backgroundColor: "#C0C0C0",
      borderRadius: 1,
    },
    selectedLine: {
      // a bottom border line to chip
      position: "absolute",
      bottom: 0,
      width: moderateScale(60),
      height: 4,
      borderRadius: 1,
      //center the line
    },
    textView: {
      paddingTop: moderateScale(120),
      paddingBottom: moderateScale(30),
      paddingHorizontal: moderateScale(50),
    },
    questiontext: {
      fontSize: moderateScale(20),
      fontWeight: "400",
      color: "#1D1D1B",
      textAlign: "center",
    },
    backButton: {
      width: moderateScale(42),
      height: moderateScale(36),
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      
      marginRight: moderateScale(10),
    },
    nextButton: {
      backgroundColor: "#0300A3",
      paddingHorizontal: moderateScale(20),
      paddingVertical: moderateScale(8),
      borderRadius: moderateScale(20),
      marginLeft: moderateScale(10),
    },
    nextButtonText: {
      fontSize: moderateScale(14),
      fontWeight: "500",
      color: "#FFFFFF",
    },
    completedView: {
      justifyContent: "center",
      alignItems: "center",
      paddingTop: moderateScale(120),
      paddingBottom: moderateScale(30),
    },
    completedText: {
      fontSize: moderateScale(20),
      fontWeight: "600",
      color: "#1D1D1B",
      textAlign: "center",
    },
    finishButtonText: {
      fontSize: moderateScale(16),
      fontWeight: "400",
      color: "#1D1D1B",
      textAlign: "center",
    },
  })
