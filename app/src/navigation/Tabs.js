import React, { useState } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Image, View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import Home from "../screens/Home/index"
import Profile from "../screens/Profile/index"
import Survey from "../screens/Survey/index"
import Ionicons from "react-native-vector-icons/Ionicons"
import Material from "react-native-vector-icons/MaterialCommunityIcons"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import * as authActions from "../redux/actions/authActions"
import { moderateScale } from "react-native-size-matters"
import { useNavigation } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import i18n from "./../config/i18n.config"
import Loader from "../components/Loader/index"
import axiosConfig from "../config/axios.config"

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const isFocused = state.index === index
        const isMiddle = index === 1

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            // navigation.navigate(route.key)
            navigation.navigate(route.name)
          }
        }

        return (
          <TouchableOpacity 
          key={route.key} 
          onPress={onPress} 
          style={[
            styles.tab, 
            isMiddle && styles.middleTab, 
            isFocused && (isMiddle ? styles.middleTabFocused : styles.tabFocused),
          ]}
          >
            {index === 0 && <Material name="chart-timeline-variant" size={20} color={!isFocused ? "#FFFFFF" : "#9593FF"} />}
            {index === 1 && <Ionicons name="home" size={20} color={"#FFFFFF"} />}
            {index === 2 && <Ionicons name="person" size={20} color={!isFocused ? "#FFFFFF" : "#9593FF"} />}
            {index !== 1 && <Text style={[styles.label, isFocused && (isMiddle ? styles.middleLabelFocused : styles.labelFocused)]}>{route.name}</Text>}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const Tabs = ({ ...props }) => {
  const { updateUserLogin, updateUserAccessToken } = props
  const Tab = createBottomTabNavigator()
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState("")
  const [success, setSuccess] = useState(false)

  return (
    <Tab.Navigator
      initialRouteName="Ana Sayfa"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      
    >
      <Tab.Screen
        name="Anket"
        component={Survey}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Material name="chart-timeline-variant" color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name="Ana Sayfa"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={30} />,
        }}
      />
    </Tab.Navigator>
  )
}

Tabs.propTypes = {}
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#1D1D1B",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    width: Dimensions.get("window").width - 32,
    position: "absolute",
    bottom: 24,
    left: 16, // Add specific left margin
    right: 16, // Add specific right margin
    marginHorizontal: "auto", // Center horizontally
    alignSelf: "center", // Center within parent
    paddingVertical: 8,
    paddingHorizontal: 48,
    justifyContent: "space-between",
  },
  tab: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
  },
  middleTab: {
    backgroundColor: "#1D1D1B",
    width: 52,
    height: 52,
    borderRadius: 32,
    marginTop: -32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabFocused: {
    backgroundColor: "transparent",
  },
  middleTabFocused: {
    backgroundColor: "#0300A3",
    width: 52,
    height: 52,
    borderRadius: 32,
    marginTop: -32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 10,
    fontWeight: "200",
    marginTop: 2,
    marginBottom: 2,
    color: "#FFFFFF",
  },
  labelFocused: {
    color: "#9593FF",
  },
  middleLabelFocused: {
    color: "#FFFFFF",
  },
})

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)
