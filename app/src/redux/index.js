import { createStore, compose, applyMiddleware } from "redux"
import { thunk } from "redux-thunk"
import rootReducer from "./reducers/index"
import promiseMiddleware from "./middleware/ApiCalls"

let Middleware = [promiseMiddleware]

const reduxStore = createStore(rootReducer, compose(applyMiddleware(...Middleware, thunk)))

export default reduxStore
