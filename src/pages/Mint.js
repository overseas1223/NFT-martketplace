import React, { useRef, useState } from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import Button from "../components/base/Button"
import Image from "../components/base/Image"
import { mainAction } from "../redux/actions/mainActions"
import { PINATA_API_KEY, PINATA_SECRET_API_KEY, PINATA_API_FILE_URL, } from "../constants/Constants"
import { SET_LOADING, SET_NOTIFICATION } from "../redux/type"
import "../styles/Mint.css"

const Create = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state.main)
  const { wallet, web3Instance, nftContract } = state
  const fileInputRef = useRef(null)
  const [uploadFile, setUploadFile] = useState(null)

  const handleUpload = (e) => {
    const { files } = e.target
    const loadFile = Object.assign(files[0], { preview: URL.createObjectURL(files[0]) })
    setUploadFile(loadFile)
  }

  const createNewNFT = async () => {
    try {
      if(uploadFile === null) {
        dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'Image is required', type: 'error' }})
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
      await nftContract.methods.createNFT(fileHash).send({ from: wallet })
      dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'Mint NFT successfully', type: 'success' }})
      dispatch({ type: SET_LOADING, payload: false})
      dispatch(mainAction.getBalanceOfBNB(web3Instance, wallet))
      setUploadFile(null)
    } catch (err) {
      console.log(err)
      dispatch({ type: SET_LOADING, payload: false})
    }
  }

  return (
    <div>
      <div className="main-body">
        <h1>NFT Mint</h1>
        <div className="image-upload" onClick={() => { fileInputRef.current.click() }}>
          <Image
            src={uploadFile ? uploadFile.preview : null}
            width={'350px'}
            height={'270px'}
          />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          hidden
          accept="image/*"
          value=""
        />
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
