import EStyleSheet from "react-native-extended-stylesheet"
import { moderateScale } from "react-native-size-matters"

export const styles = () =>
  EStyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "space-around",
      backgroundColor: "#00000040",
    },
    alertModal: {
      backgroundColor: "#fff",
      height: moderateScale(100),
      width: moderateScale(300),
      borderRadius: moderateScale(10),
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
    },
    header: {
      width: "90%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#fff",
      marginTop: moderateScale(8),
    },
    content: {
      marginBottom: moderateScale(6),
      paddingLeft: moderateScale(10),
      paddingRight: moderateScale(10),
    },
  })
