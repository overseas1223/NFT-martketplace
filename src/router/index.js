import React from "react"
import { Routes, Route } from 'react-router-dom'
import AuthRoute from "./AuthRoute"

import Home from "../pages/Home"
import Create from "../pages/Create"
import Explore from "../pages/Explore"
import NFTDetail from "../pages/NFTDetail"
import MyNFTS from "../pages/MyNFTs"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthRoute child={<Home />} />} />
      <Route path="/create" element={<AuthRoute child={<Create />} privateRoute={true} />} />
      <Route path="/explore" element={<AuthRoute child={<Explore />} />} />
      <Route path="/detail" element={<AuthRoute child={<NFTDetail />} />} />
      <Route path="/mynfts" element={<AuthRoute child={<MyNFTS />} privateRoute={true} />} />
    </Routes>
  )
}

export default AppRoutes