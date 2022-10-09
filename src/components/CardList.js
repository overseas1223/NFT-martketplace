import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import NFTCard from "./NFTCard"
import { mainAction } from "../redux/actions/mainActions"
import { NFT_ADDRESS } from "../constants/Constants"
import "../styles/CardList.css"

const CardList = ({ list, type="horizontal", mode }) => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const main = useSelector(state => state.main)
  const { wallet, marketContract } = main

  const deList = (itemId, tokenId) => {
    dispatch(mainAction.deList(marketContract, wallet, itemId, NFT_ADDRESS, tokenId))
  }

  return (
    <div id="card-list" style={{flexDirection:type === "horizontal" ? "row" : "column"}}>
      {list.map((item,index) => (
        <NFTCard
          mode={mode}
          key={index}
          nftSrc={item.src}
          nftName={item.name}
          price={item.price}
          onClick={()=>{ 
            if(mode === 1 || mode === 2)navigate('/detail',{state: { item: item, type: mode}})
            else deList(item.id, item.tokenId)
          }}
        />
      ))}
    </div>
  )
}

export default CardList
