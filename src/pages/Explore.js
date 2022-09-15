import React from "react";
import CardList from "../components/CardList";
import { exploreList } from "../constants/MockupData";
import Search from "../components/Search";
import '../styles/Explore.css';

const Explore = () => {
  return (
    <div id="explore">
      <Search/>
      <div id="list-container">
        <CardList list={exploreList} />
      </div>
    </div>
  );
};

export default Explore;
