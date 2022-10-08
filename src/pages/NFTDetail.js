import React, { useState, useEffect, useLayoutEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import Web3 from "web3"
import ReactPlayer from "react-player"
import Card from "../components/base/Card"
import { ColorExtractor } from "react-color-extractor"
import Button from "../components/base/Button"
import TextInput from "../components/base/TextInput"
import { SiBinance } from "react-icons/si"
import { NFT_ADDRESS } from "../constants/Constants"
import { SET_LOADING, SET_NOTIFICATION } from "../redux/type"
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
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const main = useSelector(state => state.main)
  const { balance, marketContract, wallet, resellPrice } = main
  const [colors, setColors] = useState([])
  const [type, setType] = useState(null)
  const { state } = useLocation()
  const [price, setPrice] = useState("")
  const getColors = (colors) => { setColors((c) => [...c, ...colors]) }

  const buyNFT = async () => {
    try {
      dispatch({ type: SET_LOADING, payload: true })
      if (typeof window.ethereum === 'undefined') {
        dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'Please install Metamask', type: 'error' } })
        return
      }
      if (wallet === null) {
        dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'Please connect Wallet', type: 'error' } })
        return
      }
      if (balance < state.item.price) {
        dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'Balance is insufficient', type: 'error' } })
        return
      }
      await marketContract.methods.createMarketSale(NFT_ADDRESS, state.item.id).send({ from: wallet, value: Web3.utils.toWei(String(state.item.price), 'ether') })
      dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'Bought NFT successfully', type: 'success' } })
      dispatch({ type: SET_LOADING, payload: false })
      navigate('/mynfts')
    } catch (err) {
      console.log(err)
      dispatch({ type: SET_LOADING, payload: false })
    }
  }

  const sellNFT = async () => {
    try {
      if (price === '') {
        dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'Price is required', type: 'error' } })
        return
      }
      if (resellPrice > balance) {
        dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'Balance is insufficient', type: 'error' } })
        return
      }
      dispatch({ type: SET_LOADING, payload: true })
      await marketContract.methods.createMarketItem(
        NFT_ADDRESS,
        state.item.tokenId,
        Web3.utils.toWei(String(price), 'ether'),
        state.item.category,
        state.item.metaData,
        state.item.id,
        1
      ).send({ from: wallet, value: Web3.utils.toWei(String(resellPrice), 'ether') })
      dispatch({ type: SET_LOADING, payload: false })
      dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'Listed NFT successfully', type: 'success' } })
      navigate('/explore')
    } catch (err) {
      console.log(err)
      dispatch({ type: SET_LOADING, payload: false })
    }
  }

  useEffect(() => { setColors([]) }, [state])

  const getParameterByName = (name, url) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  }

  useEffect(() => {
    if (state.item.src.indexOf('ipfs') !== -1) {
      const res = getParameterByName('type', state.item.src)
      if (res === null) return
      setType(Number(res))
    } else {

    }
  }, [state.item.src])

  return (
    <div>
      <div id="nft-detail-card-wrapper">
        <h1>NFT Detail</h1>
        <Card
          width={width < 900 ? "80%" : "850px"}
          height={width < 900 ? "800px" : '500px'}
          blurColor={colors[0]}
          child={
            state.type ?
              <div id="detail-content">
                {type === 1 ?
                  <ColorExtractor getColors={getColors}>
                    <img id="detail-image" src={state.item.src} alt="nft detail" />
                  </ColorExtractor>
                  : type === 2 ?
                    <ReactPlayer
                      id="detail-video"
                      url={state.item.src}
                      controls
                    />
                    :
                    type === 3 ?
                      <model-viewer
                        ar-scale="auto"
                        ar ar-modes="webxr scene-viewer quick-look"
                        id="arDetail"
                        loading="eager"
                        camera-controls auto-rotate src={state.item.src} >
                      </model-viewer> : <div></div>}
                <div id="detail-info">
                  <div id='detail-info-container'>
                    <p id="name"> {state.item.name} </p>
                    <p id="category">Category: {state.item.category} </p>
                    <p id="collection">Price: &nbsp;&nbsp;&nbsp;<SiBinance size="12px" />&nbsp;{state.item.price} </p>
                    <p id="description" > {state.item.description} </p>
                  </div>
                  <div id="detail-controls" style={{ flexDirection: 'column', height: '130px', justifyContent: 'center', alignItems: 'center', marginTop: '-20px' }}>
                    <div style={{ width: '80%', marginBottom: '20px' }}>
                      <TextInput
                        placeholder="Price"
                        type="number"
                        value={price}
                        setValue={setPrice}
                      />
                    </div>
                    <Button
                      onClick={sellNFT}
                      width={width < 1000 ? "70%" : "70%"}
                      height="50px"
                      child={
                        <div id="button-child">
                          <p id="price">Sell</p>
                        </div>
                      }
                    ></Button>
                  </div>
                </div>
              </div>
              :
              <div id="detail-content">
                {type === 1 ?
                  <ColorExtractor getColors={getColors}>
                    <img id="detail-image" src={state.item.src} alt="nft detail" />
                  </ColorExtractor>
                  : type === 2 ?
                    <ReactPlayer
                      id="detail-video"
                      url={state.item.src}
                      controls
                    /> :
                    type === 3 ?
                      <model-viewer
                        ar-scale="auto"
                        ar ar-modes="webxr scene-viewer quick-look"
                        id="arDetail"
                        loading="eager"
                        camera-controls auto-rotate src={state.item.src} >
                      </model-viewer> : <div></div>}
                <div id="detail-info">
                  <div id='detail-info-container'>
                    <p id="name"> {state.item.name} </p>
                    <p id="category">Category: {state.item.category} </p>
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