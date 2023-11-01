import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Tabbar from "../tabbar/Tabbar";
import StockList from "../stockList/StockList";
import { useAsyncCallback } from "react-async-hook";
import { getTopGainersLosers } from "../../lib/api";
import styles from "./Layout.module.css";
const Layout = () => {
  const [activeTab, setActiveTab] = useState("top_gainers");
  const [topGainersLosersData, setTopGainersLosersData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const fetchTopGainersLosers = useAsyncCallback(getTopGainersLosers, {
    onSuccess: (response) => {
      if (response.data.Information) {
        setErrorMessage(response.data.Information);
        return;
      }

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

  if (errorMessage) {
    return (
      <div className={styles.errorContainer}>
        <h3>Something went wrong!</h3>
        <p>{errorMessage}</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Tabbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {fetchTopGainersLosers.error && (
        <div className={styles.errorContainer}>
          <h3>Something went wrong!</h3>
          <p>Please try again later.</p>
        </div>
      )}

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
