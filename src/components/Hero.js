import React, { useLayoutEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
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
  let navigate = useNavigate()
  const main = useSelector(state => state.main)
  const { wallet } = main

  const goExplore = () => { navigate("/explore")}
  const goCreate = () => {
    if(typeof window.ethereum === 'undefined') {
      alert("Please install Metamask")
      return
    }
    if(wallet) {
      alert("Please connect Wallet")
      return
    }
    navigate("/create")
  }

  const goMine = () => {
    
  }

  return (
    <div id="hero">
      <h1 id="header-text-first"> NFT World </h1>
      <h1 id="header-text-second"> Gateway To The Metaverse </h1>
      <div id="hero-buttons">
        <button id="explore" onClick={goExplore}>Explore</button>
        {width < 900 && <button id="mine" onClick={goMine}>My NFTs</button>}
        <button id="create" onClick={goCreate}>Create</button>
      </div>
    </div>
  );
};

export default Hero;
