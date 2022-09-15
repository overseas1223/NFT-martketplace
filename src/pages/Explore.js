import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import CardList from "../components/CardList"
// import Search from "../components/Search"
import { mainAction } from "../redux/actions/mainActions"
import '../styles/Explore.css'

const Explore = () => {
  const dispatch = useDispatch()
  const main = useSelector(state => state.main)
  const { marketItems, marketContract } = main

  useEffect(() => {
    if(marketContract) dispatch(mainAction.getMarketItems(marketContract))
  }, [marketContract])

  return (
    <div id="explore">
      {/* <Search/> */}
      <div id="list-container">
        <CardList list={marketItems.reverse()} />
      </div>
    </div>
  );
};

export default Explore;
