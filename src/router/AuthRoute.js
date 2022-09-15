import React from 'react'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../layout"

const AuthRoute = ({ child, privateRoute }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const address = localStorage.getItem('wallet')
    if(typeof address === null && privateRoute === true) navigate("/")
  }, [])

  return (
    <div>
      <Layout child={child}/>
    </div>
  )
}

export default AuthRoute