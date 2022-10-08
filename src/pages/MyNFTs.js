import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import CardList from "../components/CardList"
import Button from "../components/base/Button"
import WalletNFTCard from "../components/WalletNFTCard"
import { mainAction } from "../redux/actions/mainActions"
import '../styles/MyNFTs.css'

const MyNFTS = () => {
  const dispatch = useDispatch()
  const main = useSelector(state => state.main)
  const { mineItems, marketContract, wallet, boughtItems } = main
  const [type, setType] = useState(1)
  
  useEffect(() => {
    if(wallet) {
      if(type === 1) dispatch(mainAction.getNFTsFromWallet(wallet))
      else dispatch(mainAction.getMyNFTItems(marketContract, wallet))
    }
  }, [type, wallet, marketContract, dispatch])

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
      <div className="list-container">
        {type === 1 ?
          <div className="wallet-nfts">
            {mineItems.filter((item) => item.token_uri.indexOf('https') !== -1).map((item, index) => (
              <WalletNFTCard key={index} nftSrc={item.token_uri} number={item.token_id} nftName={item.name} />
            ))}
          </div>
          :
          <CardList list={boughtItems} mode={true} />
        }
      </div>
    </div>
  )
}

export default MyNFTS
