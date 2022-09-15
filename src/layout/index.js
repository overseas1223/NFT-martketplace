import React from "react"
import Header from "../components/Header"

const Layout = ({ child }) => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: '100px' }}>
        {child}
      </div>
    </div>
  )
}

export default Layout