import React, { useEffect, useRef, useState } from "react"
import Button from "../components/base/Button"
import Image from "../components/base/Image"
import TextInput from "../components/base/TextInput"
import Header from "../components/Header"
import {
  PINATA_API_KEY,
  PINATA_SECRET_API_KEY,
  PINATA_API_URL
} from "../constants/Constants"
import "../styles/Create.css"

const Create = () => {
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

  const createNewNFT = () => {
    if(uploadFile) {
    let data = new FormData()
    data.append("file", uploadFile)
    axios.post(PINATA_API_URL, data, {
        maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large directories
        headers: {
            "Content-Type": `multipart/form-data ; boundary= ${data._boundary}`,
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_API_KEY
        }
      }).then(response => {
        console.log(response)
      }).catch(err => console.log(err))
    }
  }

  useEffect(()=>{
  },[])

  return (
    <div>
      <Header />
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
        <div className="button-part" style={{ marginTop: '40px' }}>
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
