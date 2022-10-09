import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import NFTCard from "./NFTCard"
import Button from "./base/Button"
import TextInput from "./base/TextInput"
import { Modal } from "react-responsive-modal"
import { mainAction } from "../redux/actions/mainActions"
import { NFT_ADDRESS } from "../constants/Constants"
import { SET_NOTIFICATION } from "../redux/type"
import "react-responsive-modal/styles.css"
import "../styles/CardList.css"

const CardList = ({ list, type = "horizontal", mode }) => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const main = useSelector(state => state.main)
  const { wallet, marketContract, listItems } = main
  const [open, setOpen] = useState(false)
  const [price, setPrice] = useState('')
  const [itemId, setItemId] = useState(null)

  const deList = (itemId, tokenId) => {
    dispatch(mainAction.deList(marketContract, wallet, itemId, NFT_ADDRESS, tokenId, listItems))
  }

  const resetPrice = () => {
    if (price === "" || Number(price) === 0) {
      dispatch({ type: SET_NOTIFICATION, payload: { notify: true, text: 'Price is required', type: 'error' } })
      return
    }

    const value = Number(price)
    dispatch(mainAction.resetPrice(marketContract, wallet, itemId, value, listItems))
    setOpen(false)
  }

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        classNames={{
          overlay: 'customOverlay',
          modal: 'customModal',
        }}
        closeIcon={<span style={{ color: 'white', fontSize: '30px' }}>×</span>}
      >
        <h1 style={{
          fontSize: '25px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
        }}>Reset Price</h1>
        <br /><br />
        <TextInput
          placeholder="Price"
          type="text"
          value={price}
          setValue={setPrice}
        />
        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={resetPrice}
            width={"100px"}
            height={"40px"}
            color="white"
            textColor="black"
            textContent="Confirm"
            fontSize="20px"
          />
        </div>
      </Modal>
      <div id="card-list" style={{ flexDirection: type === "horizontal" ? "row" : "column" }}>
        {list.map((item, index) => (
          <NFTCard
            mode={mode}
            key={index}
            nftSrc={item.src}
            nftName={item.name}
            price={item.price}
            onClick={() => {
              if (mode === 1 || mode === 2) navigate('/detail', { state: { item: item, type: mode } })
              else deList(item.id, item.tokenId)
            }}
            onResetClick={() => {
              setItemId(item.id)
              setOpen(true)
            }}
          />
        ))}
      </div>
    </>
  )
}

export default CardList
