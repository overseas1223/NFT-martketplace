import React from "react"
import { useNavigate } from "react-router-dom"
import NFTCard from "./NFTCard"
import "../styles/CardList.css"

const CardList = ({ list, type="horizontal", mode }) => {
  let navigate = useNavigate()

  return (
    <div id="card-list" style={{flexDirection:type=="horizontal" ? "row" : "column"}}>
      {list.map((item,index) => (
        <NFTCard
          mode={mode}
          key={index}
          nftSrc={item.src}
          nftName={item.name}
          price={item.price}
          onClick={()=>{ 
            if(mode) navigate('/detail',{state: { item: item, type: true}})
            else navigate('/detail',{state: { item: item, type: false}})
          }}
        />
      ))}
    </div>
  )
}

export default CardList
