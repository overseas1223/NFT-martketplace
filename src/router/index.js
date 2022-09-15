import React from "react"
import { Routes, Route, Navigate } from 'react-router-dom'
import AuthRoute from "./AuthRoute"

import Home from "../pages/Home"
import Create from "../pages/Create"
import Explore from "../pages/Explore"
import NFTDetail from "../pages/NFTDetail"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthRoute child={<Home />} />} />
      <Route path="/create" element={<AuthRoute child={<Create />} privateRoute={true} />} />
      <Route path="/explore" element={<AuthRoute child={<Explore />} />} />
      <Route path="/detail" element={<AuthRoute child={<NFTDetail />} />} />
    </Routes>
  )
}

export default AppRoutes