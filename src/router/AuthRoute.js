import React from 'react'
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CircleLoader from "react-spinners/CircleLoader"
import Layout from "../layout"
import "../styles/layout.css"

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
}

const AuthRoute = ({ child, privateRoute }) => {
  const navigate = useNavigate()
  const main = useSelector(state => state.main)
  const { loading } = main

  useEffect(() => {
    const address = localStorage.getItem('wallet')
    if(address === null && privateRoute === true) navigate("/")
  }, [navigate, privateRoute])

  return (
    <div>
      {loading &&
        <div className="loading">
          <div className="load">
            <CircleLoader color={"#ffffff"} loading={loading} cssOverride={override} size={150} />
          </div> 
        </div>
      }
      <Layout child={child}/>
    </div>
  )
}

export default AuthRoute