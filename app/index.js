// import { registerRootComponent } from "expo"

// import App from "./App"

// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App)


import "react-native-gesture-handler"
import React, { useEffect } from "react"
import RootNavigation from "./src/navigation/index"
import { Provider } from "react-redux"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
import reduxStore from "./src/redux"
import EStyleSheet from "react-native-extended-stylesheet"

export const reduxPersistStore = persistStore(reduxStore)
const App = () => {
  useEffect(() => {
    EStyleSheet.build()
  }, [])

  return (
    <Provider store={reduxStore}>
      <PersistGate persistor={reduxPersistStore}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  )
}

export default App
