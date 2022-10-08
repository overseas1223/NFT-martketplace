import React, { useRef, useState } from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import ReactPlayer from "react-player"
import Button from "../components/base/Button"
import Image from "../components/base/Image"
import { mainAction } from "../redux/actions/mainActions"
import { PINATA_API_KEY, PINATA_SECRET_API_KEY, PINATA_API_FILE_URL, } from "../constants/Constants"
import { SET_LOADING, SET_NOTIFICATION } from "../redux/type"
import "../styles/Mint.css"

const imageFileFormats = ['png', 'jpg', 'gif', 'svg']
const mediaFileFormats = ['mp4', 'webm', 'mp3', 'wav', 'ogg']
const threeDFileFormats = ['glb', 'gltf']

const Create = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state.main)
  const { wallet, web3Instance, nftContract } = state
  const fileInputRef = useRef(null)
  const [uploadFile, setUploadFile] = useState(null)
  const [fileType, setFileType] = useState(null)

  const handleUpload = (e) => {
    const { files } = e.target
    if (files.length === 0) return
    if (files[0].size >= 100 * 1024 * 1024) {
      dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'File size is over 100MB', type: 'error' } })
      return
    }
    const loadFile = Object.assign(files[0], { preview: URL.createObjectURL(files[0]) })
    const src = loadFile.name.split(".")
    const extension = src[src.length - 1]
    const type = imageFileFormats.indexOf(extension) !== -1 ? 1 : mediaFileFormats.indexOf(extension) !== -1 ? 2 : threeDFileFormats.indexOf(extension) !== -1 ? 3 : 0
    if (type === 0) {
      dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'Unsupported File Format!!!', type: 'error' } })
      return
    }
    setFileType(type)
    setUploadFile(loadFile)
  }

  const createNewNFT = async () => {
    try {
      if (uploadFile === null) {
        dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'File is required', type: 'error' } })
        return
      }

      let fileData = new FormData()
      fileData.append("file", uploadFile)

      dispatch({ type: SET_LOADING, payload: true })
      const response = await axios.post(PINATA_API_FILE_URL, fileData, {
        maxBodyLength: 'Infinity',
        headers: {
          "Content-Type": `multipart/form-data ; boundary= ${fileData._boundary}`,
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY
        }
      })

      const fileHash = response.data.IpfsHash
      await nftContract.methods.createNFT(`${fileHash}?type=${fileType}`).send({ from: wallet })
      dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'Mint NFT successfully', type: 'success' } })
      dispatch({ type: SET_LOADING, payload: false })
      dispatch(mainAction.getBalanceOfBNB(web3Instance, wallet))
      setUploadFile(null)
      setFileType(null)
    } catch (err) {
      console.log(err)
      dispatch({ type: SET_LOADING, payload: false })
    }
  }

  const removeUploadFile = () => {
    setUploadFile(null)
    setFileType(null)
  }

  return (
    <div>
      <div className="main-body">
        <h1>NFT Mint</h1>
        <div className="image-upload" onClick={() => { if (uploadFile === null) fileInputRef.current.click() }}>
          {(uploadFile !== null && fileType !== null) ?
            <>
              <div className="close-button" onClick={removeUploadFile}>×</div>
              {fileType === 1 ?
                <Image
                  src={uploadFile.preview}
                  width={'350px'}
                  height={'270px'}
                />
                :
                fileType === 2 ?
                  <ReactPlayer
                    width={350}
                    height={270}
                    url={uploadFile.preview}
                    controls
                  />
                  :
                  <model-viewer
                    ar-scale="auto"
                    ar ar-modes="webxr scene-viewer quick-look"
                    id="reveal"
                    loading="eager"
                    camera-controls auto-rotate src={uploadFile.preview} ></model-viewer>
              }
            </> :
            <Image
              src={null}
              width={'350px'}
              height={'270px'}
            />
          }
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          hidden
          accept=".jpg, .png, .gif, .svg, .mp4, .webm, .mp3, .wav, .ogg, .glb, .gltf"
          value=""
        />
        <div className="file-supported" style={{ color: '#BBBBBB', marginTop: '10px', width: '350px', lineHeight: '20px' }}>
          <span>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF.<br />Max size: 100 MB</span>
        </div>
        <div style={{ marginTop: '50px', marginBottom: '30px' }}>
          <Button
            onClick={createNewNFT}
            width={"180px"}
            height={"50px"}
            color="white"
            textColor="black"
            textContent="Mint"
            fontSize="25px"
          />
        </div>
      </div>
    </div>
  )
}

export default Create;
