import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import CardList from "../components/CardList"
import Button from "../components/base/Button"
import { mainAction } from "../redux/actions/mainActions"
import '../styles/MyNFTs.css'

const MyNFTS = () => {
  const dispatch = useDispatch()
  const main = useSelector(state => state.main)
  const { mineItems, marketContract, wallet } = main
  const [type, setType] = useState(1)

  useEffect(() => {
    if(marketContract) dispatch(mainAction.getMyNFTItems(marketContract, wallet))
  }, [marketContract, dispatch, wallet])

  return (
    <div id="mynft">
      <h1>My NFTs</h1>
      <div className="tab-buttons">
        <Button
          onClick={() => { setType(1) }}
          width={"150px"}
          height={"40px"}
          color={type === 1 ? "blue" : "white"}
          textColor="black"
          textContent="Wallet"
          fontSize="20px"
        />
        <Button
          onClick={() => { setType(2) }}
          width={"150px"}
          height={"40px"}
          color={type === 2 ? "blue" : "white"}
          textColor="black"
          textContent="Bought"
          fontSize="20px"
        />
      </div>
      <div id="list-container">
        <CardList list={mineItems} mode={true} />
      </div>
    </div>
  )
}

export default MyNFTS
