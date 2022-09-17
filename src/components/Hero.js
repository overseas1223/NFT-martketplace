import React, { useLayoutEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { SET_NOTIFICATION } from "../redux/type"
import "../styles/Hero.css"

const useWindowSize = () => {
  const [size, setSize] = useState(0)
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize(window.innerWidth)
    }
    window.addEventListener("resize", updateSize)
    updateSize()
    return () => window.removeEventListener("resize", updateSize)
  }, [])
  return size
}

const Hero = () => {
  const width = useWindowSize()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const main = useSelector(state => state.main)
  const { wallet } = main

  const goExplore = () => { navigate("/explore")}
  const goCreate = () => {
    if(typeof window.ethereum === 'undefined') {
      dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'Please install Metamask', type: 'error' }})
      return
    }
    if(wallet === null) {
      dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'Please connect Metamask', type: 'error' }})
      return
    }
    navigate("/mint")
  }
  const goMine = () => { navigate('/mynfts') }
  const goList = () => { navigate('/list') }

  return (
    <div id="hero">
      <h1 id="header-text-first"> NFT World </h1>
      <h1 id="header-text-second"> Gateway To The Metaverse </h1>
      <div id="hero-buttons">
        <button id="explore" onClick={goExplore}>Explore</button>
        {(width < 900 && wallet) && <button id="mine" onClick={goMine}>My NFTs</button>}
        {(width < 900 && wallet) && <button id="mine" onClick={goList}>List</button>}
        <button id="create" onClick={goCreate}>Mint</button>
      </div>
    </div>
  );
};

export default Hero;
