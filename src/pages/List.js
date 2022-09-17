import React, { useState } from "react"
import axios from "axios"
import Web3 from "web3"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import TextInput from "../components/base/TextInput"
import Select from "../components/base/Select"
import Button from "../components/base/Button"
import { SET_NOTIFICATION, SET_LOADING } from "../redux/type"
import { PINATA_API_KEY, PINATA_API_JSON_URL, PINATA_SECRET_API_KEY } from "../constants/Constants"
import '../styles/List.css'

const List = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const main = useSelector(state => state.main)
  const { marketContract, categories, balance, listingPrice, wallet } = main
  const [address, setAddress] = useState('')
  const [tokenId, setTokenId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')

  const List = async () => {
    try {
      if(address === "") {
        dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'NFT Address is required', type: 'error' }})
        return
      }
      if(tokenId === "") {
        dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'Token Id is required', type: 'error' }})
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
      if(category === ""){
        dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'Category is required', type: 'error' }})
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

      dispatch({ type: SET_LOADING, payload: true })
      let jsonData = {
        name: name,
        description: description
      }
      const response = await axios.post(PINATA_API_JSON_URL, jsonData, {
        maxBodyLength: 'Infinity',
        headers: {
            "Content-Type": "application/json",
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_API_KEY
        }
      })

      const jsonHash = response.data.IpfsHash
      await marketContract.methods.createMarketItem(
        address,
        tokenId,
        Web3.utils.toWei(String(price), 'ether'),
        category,
        jsonHash,
        0,
        0
      ).send({ from: wallet, value: Web3.utils.toWei(String(listingPrice), 'ether')})
      dispatch({ type: SET_LOADING, payload: true })
      navigate("/explore")
    } catch (err) {
      console.log(err)
      dispatch({ type: SET_LOADING, payload: true })
    }
  }

  return (
    <div id="List">
      <h1>List</h1>
      <div id="list-inputs">
        <div className="input-text">
          <TextInput
            placeholder="NFT Address"
            type="text"
            value={address}
            setValue={setAddress}
          />
        </div>
        <div className="input-text">
          <TextInput
            placeholder="Token ID"
            type="text"
            value={tokenId}
            setValue={setTokenId}
          />
        </div>
        <div className="input-text">
          <TextInput
            placeholder="Name"
            type="text"
            value={name}
            setValue={setName}
          />
        </div>
        <div className="input-text">
          <TextInput
            placeholder="Description"
            type="text"
            height="200px"
            inputType="textarea"
            value={description}
            setValue={setDescription}
          />
        </div>
        <div className="input-text" style={{ display: 'flex', justifyContent: 'center' }}>
          <Select
            items={categories}
            onChange={setCategory}
          />
        </div>
        <div className="input-text">
          <TextInput
            placeholder="Price"
            type="Number"
            value={price}
            setValue={setPrice}
          />
        </div>
        <div style={{ marginTop: '20px', marginBottom: '30px' }}>
          <Button
            onClick={List}
            width={"180px"}
            height={"50px"}
            color="white"
            textColor="black"
            textContent="List"
            fontSize="25px"
          />
        </div>
      </div>
    </div>
  )
}

export default List;
