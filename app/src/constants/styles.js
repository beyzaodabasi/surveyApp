import { StyleSheet, Dimensions, Platform } from "react-native";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

export default StyleSheet.create({
  container36: {
    flex: 1,
    backgroundColor: "#8A39E1",
  },
  container30: {
    flex: 1,
    backgroundColor: "#B667F1",
    paddingHorizontal: 30,
    height: screenHeight,
    width: screenWidth,
  },
  decoration: {
    width: 300,
    height: 300,
    backgroundColor: "#B667F1",
    borderRadius: 150,
    right: 100,
    bottom: 400,
    opacity: 0.2,
  },
  decoration2: {
    width: 200,
    height: 200,
    backgroundColor: "#8A39E1",
    borderRadius: 150,
    bottom: 640,
    right: 50,
  },
  decoration3: {
    width: 300,
    height: 300,
    backgroundColor: "#B667F1",
    borderRadius: 150,
    left: 240,
    top: 150,
    opacity: 0.4,
  },
  decoration4: {
    width: 200,
    height: 200,
    backgroundColor: "#FFF",
    borderRadius: 150,
    left: 300,
    bottom: 90,
  },
  goText: {
    marginTop: 15,
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  goIcon: {
    zIndex: 1,
    width: 80,
    height: 80,
  },
  goIcon1: {
    position: "absolute",
    left: 0,
    paddingHorizontal: 0,
    paddingVertical: Platform.OS == "ios" ? 0 : 0,
    fontSize: 90,
    marginTop: 0,
    color: "white",
  },
  gsm: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 120,
  },
  gsm1: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input1: {
    backgroundColor: "#F0F0F0",
    height: 50,
    width: 260,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 15,
    paddingHorizontal: 20,
    marginTop: 0,
    shadowColor: "#FFFF",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.33,
    shadowRadius: 6,
    elevation: 2,
    alignSelf: "stretch",
    alignItems: "center",
    flex: 1.3,
    marginRight: 30,
  },
  input: {
    backgroundColor: "#F0F0F0",
    height: 50,
    width: 70,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 15,
    paddingHorizontal: 20,
    marginTop: 0,
    shadowColor: "#FFFF",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.33,
    shadowRadius: 6,
    elevation: 2,
    alignSelf: "stretch",
    alignItems: "center",
    flex: 0.2,
    margin: 20,
  },
  inputCode: {
    backgroundColor: "#F0F0F0",
    height: 70,
    width: 60,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 15,
    paddingHorizontal: 20,
    bottom: 630,
  },

  inputCode1: {
    backgroundColor: "#F0F0F0",
    height: 70,
    width: 250,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#FFFF",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.33,
    shadowRadius: 6,
    elevation: 2,
    alignSelf: "stretch",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 70,
    paddingHorizontal: 80,
  },
  loginText: {
    left: Platform.OS == "ios" ? 25 : 10,
    color: "white",
    fontSize: 16,
  },
  loginText1: {
    bottom: 240,
    left: Platform.OS == "ios" ? 15 : 0,
    backgroundColor: "white",
    fontSize: 10,
    borderRadius: 20,
    fontWeight: "bold",
  },
  checkbox: {
    backgroundColor: "red",
    bottom: 700,
  },
  enteredCodeTitle: {
    marginTop: 50,
    fontSize: 34,
    color: "white",
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
  enteredCodeText: {
    fontSize: 16,
    color: "white",
    marginTop: 10,
  },
  enteredCodeText1: {
    bottom: 750,
    left: 130,
    fontSize: 16,
    color: "white",
    fontSize: 24,
  },
  logo: {
    zIndex: 999,
    marginTop: Platform.OS == "ios" ? 160 : 100,
    flex: 1,
    alignItems: "center",
    resizeMode: "contain",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: 400,
    right: 15,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 2,
    shadowRadius: 4,
    elevation: 5,
  },
});
