import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
import Web3 from "web3"
import { useSelector, useDispatch } from "react-redux"
import Button from "../components/base/Button"
import Image from "../components/base/Image"
import TextInput from "../components/base/TextInput"
import { mainAction } from "../redux/actions/mainActions"
import {
  PINATA_API_KEY,
  PINATA_SECRET_API_KEY,
  PINATA_API_FILE_URL,
  PINATA_API_JSON_URL,
  NFT_ADDRESS
} from "../constants/Constants"
import { SET_LOADING, SET_NOTIFICATION } from "../redux/type"
import "../styles/Create.css"

let decimal = 10 ** 18

const Create = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state.main)
  const { wallet, web3Instance, balance, nftContract, marketContract, listingPrice } = state
  const fileInputRef = useRef(null)
  const [uploadFile, setUploadFile] = useState(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")

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
      if(name === "") {
        dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'Name is required', type: 'error' }})
        return
      }
      if(description === "") {
        dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'Description is required', type: 'error' }})
        return
      }
      if(price === "" || Number(price) < 0){
        dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'Price is required', type: 'error' }})
        return
      }
      if(balance < listingPrice) {
        dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'Balance is insufficient', type: 'error' }})
        return
      }
    
      let fileData = new FormData()
      fileData.append("file", uploadFile)
      let jsonData = {
        name: name,
        description: description
      }

      dispatch({ type: SET_LOADING, payload: true })
      const result = await Promise.all([
        axios.post(PINATA_API_JSON_URL, jsonData, {
          maxBodyLength: 'Infinity',
          headers: {
              "Content-Type": "application/json",
              pinata_api_key: PINATA_API_KEY,
              pinata_secret_api_key: PINATA_SECRET_API_KEY
          }
        }),
        axios.post(PINATA_API_FILE_URL, fileData, {
          maxBodyLength: 'Infinity',
          headers: {
              "Content-Type": `multipart/form-data ; boundary= ${fileData._boundary}`,
              pinata_api_key: PINATA_API_KEY,
              pinata_secret_api_key: PINATA_SECRET_API_KEY
          }
        })
      ])
      const fileHash = result[1].data.IpfsHash
      const dataHash = result[0].data.IpfsHash

      await nftContract.methods.createNFT(fileHash, dataHash).send({ from: wallet })
      const id = await nftContract.methods.getCurrentId().call()
      await marketContract.methods.createMarketItem(NFT_ADDRESS, id, Web3.utils.toWei(String(price), 'ether')).send({ from: wallet, value: Web3.utils.toWei(String(listingPrice), 'ether')})
      dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'Created New NFT successfully', type: 'success' }})
      dispatch({ type: SET_LOADING, payload: false})
      dispatch(mainAction.getBalanceOfBNB(web3Instance, wallet))
      setName("")
      setPrice("")
      setDescription("")
      setUploadFile(null)
    } catch (err) {
      console.log(err)
      dispatch({ type: SET_LOADING, payload: false})
    }
  }

  useEffect(() => {
    if(marketContract) dispatch(mainAction.getListingPrice(marketContract))
  }, [marketContract])

  return (
    <div>
      <div className="main-body">
        <h1>Create New NFT</h1>
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
        <div className="button-part">
          <TextInput
            placeholder="Name"
            type="text"
            value={name}
            setValue={setName}
          />
        </div>
        <div className="button-part">
          <TextInput
            placeholder="Description"
            type="text"
            height="200px"
            inputType="textarea"
            value={description}
            setValue={setDescription}
          />
        </div>
        <div className="button-part">
          <TextInput
            placeholder="Price"
            type="number"
            value={price}
            setValue={setPrice}
          />
        </div>
        <div className="button-part" style={{ marginTop: '40px', marginBottom: '30px' }}>
          <Button
            onClick={createNewNFT}
            width={"180px"}
            height={"50px"}
            color="white"
            textColor="black"
            textContent="CREATE"
            fontSize="25px"
          />
        </div>
      </div>
    </div>
  )
}

export default Create;
