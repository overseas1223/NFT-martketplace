import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

let middleware =[thunk]
let configStore =  composeWithDevTools( applyMiddleware(...middleware))
const initialState = {};
const store = createStore( rootReducer, initialState, configStore)

export default store