import React from "react";
import Image from "next/image";
import BookmarkIcon from "../../public/bookmark.svg";
import styles from "./StockCard.module.css";
import Bookmark from "../../public/icons/Bookmark";

const StockCard = (props) => {
  const { companyLogo, companyName, ticker, ...data } = props.stocksData;

  const handleBookmark = (e) => {
    e.preventDefault();
    console.log("Bookmark clicked");
  };

  return (
    <div className={styles.stockCard}>
      <div className={styles.companyInfo}>
        <img src={companyLogo} alt={`${ticker} logo`} className={styles.logo} />
        <h2 className={styles.name}>
          <span>{ticker}</span>
          {companyName && <span>{companyName}</span>}
        </h2>
        <div className={styles.bookmark} onClick={handleBookmark}>
          <Bookmark onClick={handleBookmark} />
        </div>
      </div>

      <div className={styles.stockData}>
        {Object.entries(data).map(([key, value]) => (
          <div className={styles.dataItem} key={key}>
            <span className={styles.dataKey}>{key}</span>
            <span className={styles.dataValue}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockCard;
