import React from "react"
import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"
import { Provider } from 'react-redux'
import Store from './redux/store'
import App from "./App"
import "./index.css"

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
)

reportWebVitals();
