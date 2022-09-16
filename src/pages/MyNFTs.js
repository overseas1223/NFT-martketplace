import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import CardList from "../components/CardList"
import Search from "../components/Search"
import { mainAction } from "../redux/actions/mainActions"
import '../styles/Explore.css'

const MyNFTS = () => {
  const dispatch = useDispatch()
  const main = useSelector(state => state.main)
  const { mineItems, marketContract, wallet } = main
  const [text, setText] = useState("")

  const SearchItems = (search) => {
    if(search === "") return mineItems
    else return mineItems.filter((item) => item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
  }

  useEffect(() => {
    if(marketContract) dispatch(mainAction.getMyNFTItems(marketContract, wallet))
  }, [marketContract])

  return (
    <div id="explore">
      <h1>My NFTs</h1>
      <Search value={text} setValue={setText} />
      <div id="list-container">
        <CardList list={SearchItems(text)} mode={true} />
      </div>
    </div>
  );
};

export default MyNFTS;
