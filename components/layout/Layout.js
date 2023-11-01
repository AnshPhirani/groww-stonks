import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Tabbar from "../tabbar/Tabbar";
import StockList from "../stockList/StockList";
import { useAsyncCallback } from "react-async-hook";
import { getTopGainersLosers } from "../../pages/api";
import styles from "./Layout.module.css";
const Layout = () => {
  const [activeTab, setActiveTab] = useState("top_gainers");
  const [topGainersLosersData, setTopGainersLosersData] = useState([]);

  const fetchTopGainersLosers = useAsyncCallback(getTopGainersLosers, {
    onSuccess: (response) => {
      setTopGainersLosersData(response.data);
      localStorage.setItem(
        "topGainersLosersData",
        JSON.stringify(response.data)
      );
      localStorage.setItem(
        "topGainersLosersData-expiry",
        Date.now() + 1000 * 60 * 60
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (localStorage.getItem("topGainersLosersData-expiry") > Date.now()) {
      setTopGainersLosersData(
        JSON.parse(localStorage.getItem("topGainersLosersData"))
      );
    } else {
      fetchTopGainersLosers.execute();
    }
  }, []);

  return (
    <>
      <Header />
      <Tabbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {fetchTopGainersLosers.loading ? (
        <div className={styles.loaderContainer}>
          <img height={80} src="/loader.svg" alt="Loading" />
        </div>
      ) : (
        <StockList stocks={topGainersLosersData[activeTab]} />
      )}
    </>
  );
};

export default Layout;
