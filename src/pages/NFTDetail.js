import React, { useState, useEffect, useLayoutEffect } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import Web3 from "web3"
import Card from "../components/base/Card"
import { ColorExtractor } from "react-color-extractor"
import Button from "../components/base/Button"
import { SiBinance } from "react-icons/si"
import { useARStatus } from "../hooks/isARStatus"
import { NFT_ADDRESS } from "../constants/Constants"
import "../styles/NFTDetail.css"

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

const NFTDetail = () => {
  const width = useWindowSize()
  const main = useSelector(state => state.main)
  const { balance, marketContract, wallet } = main
  const [colors, setColors] = useState([])
  const { state } = useLocation()
  const isARSupport = useARStatus(state.item.src)
  const getColors = (colors) => { setColors((c) => [...c, ...colors])}

  const buyNFT = async () => {
    if(typeof window.ethereum === 'undefined') {
      alert("Please install Metamask")
      return
    }
    if(wallet === null) {
      alert("Please connect Wallet")
      return
    }
    if(balance < state.item.price) {
      alert("Balance is insufficient")
      return
    }
    await marketContract.methods.createMarketSale(NFT_ADDRESS, state.item.id).send({ from: wallet, value: Web3.utils.toWei(String(state.item.price), 'ether')})
  }

  useEffect(() => { setColors([]) }, [state])

  return (
    <div>
      <div id="nft-detail-card-wrapper">
        <h1>NFT Detail</h1>
        <Card
          width={width < 1000 ? "80%" : "55vw"}
          height={width < 1000 ? "650px" : "55vh"}
          blurColor={colors[0]}
          child={
            <div id="detail-content">
             {isARSupport ? <model-viewer ar-scale="auto" ar ar-modes="webxr scene-viewer quick-look" id="arDetail" loading="eager" camera-controls auto-rotate src={state.item.src} > </model-viewer> 
             : <> <ColorExtractor getColors={getColors}>
                <img id="detail-image" src={state.item.src} />
              </ColorExtractor></>}
              <div id="detail-info">
                <div id='detail-info-container'>
                  <p id="name"> {state.item.name} </p>
                  <p id="description" > {state.item.description} </p>
                </div>
                <div id="detail-controls">
                  <Button
                    onClick={buyNFT}
                    width={width < 1000 ? "70%" : "70%"}
                    height="50px"
                    child={
                      <div id="button-child">
                        <SiBinance size="20px" />&nbsp;&nbsp;&nbsp;
                        <p id="price">{state.item.price}</p>
                      </div>
                    }
                  ></Button>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  )
}

export default NFTDetail