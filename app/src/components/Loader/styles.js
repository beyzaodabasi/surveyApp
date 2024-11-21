import EStyleSheet from "react-native-extended-stylesheet";
import { moderateScale } from "react-native-size-matters";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

export const styles = () =>
  EStyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "space-around",
      backgroundColor: "#00000040",
    },
    activityIndicatorWrapper: {
      backgroundColor: "#FFFFFF",
      height: moderateScale(100),
      width: moderateScale(100),
      borderRadius: moderateScale(10),
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
    },
  });
