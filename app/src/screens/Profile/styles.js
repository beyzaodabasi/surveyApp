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
      paddingRight: moderateScale(20),
      paddingLeft: moderateScale(20),
    },
    mainView: {
      justifyContent: "center",
      alignItems: "center",
      paddingTop: moderateScale(60),
    },
    mainText: {
      textAlign: "center",
      fontSize: moderateScale(14),
      fontWeight: "700",
      color: "#0300A3",
    },
    numText: {
      textAlign: "center",
      fontSize: moderateScale(30),
      fontWeight: "400",
      color: "#0300A3",
    },
    view1: {
      paddingTop: moderateScale(10),
      paddingRight: moderateScale(30),
      // paddingLeft: moderateScale(20),
    },
    view2: {
      paddingTop: moderateScale(10),
      paddingRight: moderateScale(30),
      paddingLeft: moderateScale(30),
    },
    view3: {
      paddingTop: moderateScale(10),
      // paddingRight: moderateScale(20),
      paddingLeft: moderateScale(30),
    },
    listView: {
      //   width: "100%",
      //   paddingTop: moderateScale(20),
    },
    listItem: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      paddingTop: moderateScale(12),
      paddingBottom: moderateScale(8),
    },
    listText: {
      fontSize: moderateScale(12),
      fontWeight: "400",
      color: "#B9B9B9",
    },
    card: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#F1F1F1",
      borderRadius: 5,
      marginBottom: moderateScale(10),
      paddingBottom: moderateScale(12),
      padding: moderateScale(12),
    },
    text1: {
      fontSize: moderateScale(12),
      fontWeight: "400",
      color: "#1D1D1B",
    },
    text2: {
      fontSize: moderateScale(12),
      fontWeight: "400",
      color: "#1D1D1B",
    },
    buttonView: {
      width: "100%",
      justifyContent: "space-between",
      flexDirection: "row",
      //   paddingBottom: moderateScale(12),
      paddingRight: moderateScale(12),
    },
    button: {
      flexDirection: "row",
      backgroundColor: "#0300A3",
      width: "35%",
      height: 35,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: moderateScale(12),
      fontWeight: "400",
      textAlign: "center",
    },
    item1: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: moderateScale(12),
      paddingRight: moderateScale(12),
      paddingTop: moderateScale(12),
      //   paddingBottom: moderateScale(12),
    },
    item2: {
      flexDirection: "row",
      //   justifyContent: "center",
      alignItems: "center",
      paddingRight: moderateScale(12),
      paddingTop: moderateScale(12),
      //   paddingBottom: moderateScale(12),
    },
    iconPerson: {
      paddingRight: moderateScale(5),
      //   paddingLeft: moderateScale(12),
    },
    iconText: {},
    titleText: {
      fontSize: moderateScale(12),
      fontWeight: "500",
      color: "#1D1D1B",
      backgroundColor: "yellow",
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
      // height: moderateScale(100),
      paddingTop: moderateScale(8),
      paddingBottom: moderateScale(8),
      backgroundColor: "#F1F1F1",
      borderRadius: moderateScale(5),
      justifyContent: "center",
      alignItems: "center",
    },
    selectGenderCard: {
      width: "45%",
      // height: moderateScale(100),
      paddingTop: moderateScale(8),
      paddingBottom: moderateScale(8),
      backgroundColor: "#0300A3",
      borderRadius: moderateScale(5),
      justifyContent: "center",
      alignItems: "center",
    },
    nicknameText: {
      fontSize: moderateScale(12),
      fontWeight: "600",
      color: "#1D1D1B",
      paddingBottom: moderateScale(5),
    },
    selectText: {
      fontSize: moderateScale(12),
      fontWeight: "600",
      color: "#fff",
      paddingBottom: moderateScale(5),
    },
    cardText: {
        fontSize: moderateScale(12),
        fontWeight: "400",
        color: "#0300A3",
    }
  })
