import React, { useState, useEffect } from "react"
import { ColorExtractor } from 'react-color-extractor'
import ReactPlayer from "react-player"
import Card from "./base/Card"
import "../styles/NFTCard.css"

const WalletNFTCard = ({ nftName, number, nftSrc }) => {
  const [colors, setColors] = useState([])
  const [type, setType] = useState(null)
  const getColors = colors => {
    setColors(c => [...c, ...colors])
  }

  const getParameterByName = (name, url) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  }

  useEffect(() => {
    if (nftSrc.indexOf('ipfs') !== -1) {
      const res = getParameterByName('type', nftSrc)
      if (res === null) return
      setType(Number(res))
    } else {

    }
  }, [nftSrc])

  return (
    <Card
      blurColor={colors[type ? type : 0]}
      height={'210px'}
      child={
        <>
          {type === 1 ?
            <ColorExtractor getColors={getColors}>
              <img className="nft-image" src={nftSrc} alt="MFT" />
            </ColorExtractor>
            : type === 2 ?
              <ReactPlayer
                className="nft-react-player"
                width={240}
                height={170}
                url={nftSrc}
                controls
              />
              : type === 3 ?
                <div className="nft-3d-wrapper">
                  <model-viewer
                    ar-scale="auto"
                    ar ar-modes="webxr scene-viewer quick-look"
                    className="nft-3d"
                    loading="eager"
                    camera-controls auto-rotate src={nftSrc} ></model-viewer>
                </div>
                : <div></div>
          }
          <div className="nft-name"><span>{nftName}#{number}</span></div>
        </>}>
    </Card>
  )
}

export default WalletNFTCard