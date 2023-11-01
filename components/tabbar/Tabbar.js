import React from "react";
import styles from "./Tabbar.module.css";

const Tabbar = (props) => {
  const { activeTab, setActiveTab } = props;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.tabbar}>
      <div className={styles.tabLeft}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "top_gainers" && styles.activeTab
          }`}
          onClick={() => handleTabChange("top_gainers")}
        >
          Top Gainers
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "top_losers" && styles.activeTab
          }`}
          onClick={() => handleTabChange("top_losers")}
        >
          Top Losers
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "most_actively_traded" && styles.activeTab
          }`}
          onClick={() => handleTabChange("most_actively_traded")}
        >
          Most Active
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "watchlist" && styles.activeTab
          }`}
          onClick={() => handleTabChange("watchlist")}
        >
          WatchList
        </button>
      </div>
      <div className={styles.tabRight}></div>
    </div>
  );
};

export default Tabbar;
