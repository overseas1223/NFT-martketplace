import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from 'react-redux'
import Store from './redux/store'

import Home from "./pages/Home"
import Create from "./pages/Create"
import Explore from "./pages/Explore"
import NFTDetail from "./pages/NFTDetail"

ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/detail" element={<NFTDetail />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)

reportWebVitals();
