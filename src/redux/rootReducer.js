import { combineReducers } from "redux"
import mainReducer from "./reducers/mainReducer"

const rootReducer = combineReducers({
    main: mainReducer
})

export default rootReducer