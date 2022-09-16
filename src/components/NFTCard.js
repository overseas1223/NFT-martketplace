import React, { useState } from "react"
import { SiBinance } from "react-icons/si"
import { ColorExtractor } from 'react-color-extractor'
import Card from "./base/Card"
import Button from "./base/Button"
import { Colors } from "../constants/Colors"
import { useARStatus } from "../hooks/isARStatus"
import "../styles/NFTCard.css"

const NFTCard = ({ nftName, price, nftSrc, onClick, mode }) => {
  const [colors, setColors] = useState([])
  const isARSupport = useARStatus(nftSrc)

  const getColors = colors => {
    setColors(c => [...c, ...colors])
  }

  return (
    <Card
      blurColor={colors[0]}
      child={<>
        {isARSupport ? <model-viewer ar-scale="auto" ar ar-modes="webxr scene-viewer quick-look" id="reveal" loading="eager" camera-controls auto-rotate src={nftSrc} > </model-viewer> : <><ColorExtractor getColors={getColors}>
          <img className="nft-image" src={nftSrc} />
        </ColorExtractor></>}
        <div className="wrapper">
          <div className="info-container">
            <p className="owner">Name</p>
            <p className="name">{nftName}</p>
          </div>

          <div className="price-container">
            <p className="price-label">Price</p>
            <p className="price">
              {" "}
              <SiBinance /> {price}
            </p>
          </div>
        </div>
        <div className="buttons">
          <Button color={Colors.buttons.primary} textContent={ mode ? "Sell" : "Buy Now" } onClick={onClick} />
        </div>
      </>}>
    </Card>
  )
}

export default NFTCard