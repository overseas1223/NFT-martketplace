import React from "react";
import Hero from "../components/Hero";
import CardList from "../components/CardList";
import { hotDropsData } from "../constants/MockupData";
import "../styles/Home.css";

const Home = () => {

  return (
    <div id="home">
      <Hero list={hotDropsData} />
      <p id="card-list-header-text"> Hot Drops </p>
      <div id="list-container">
        <CardList list={hotDropsData} />
      </div>
    </div>
  )
}

export default Home;
