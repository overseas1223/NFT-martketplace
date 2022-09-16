import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import CardList from "../components/CardList"
import Search from "../components/Search"
import { mainAction } from "../redux/actions/mainActions"
import '../styles/Explore.css'

const Explore = () => {
  const dispatch = useDispatch()
  const main = useSelector(state => state.main)
  const { marketItems, marketContract } = main
  const [text, setText] = useState("")

  const SearchItems = (search) => {
    if(search === "") return marketItems
    else return marketItems.filter((item) => item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
  }

  useEffect(() => {
    if(marketContract) dispatch(mainAction.getMarketItems(marketContract))
  }, [marketContract])

  return (
    <div id="explore">
      <h1>NFT Explore</h1>
      <Search value={text} setValue={setText} />
      <div id="list-container">
        <CardList list={SearchItems(text)} mode={false} />
      </div>
    </div>
  );
};

export default Explore;
