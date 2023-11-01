import Link from "next/link";
import StockCard from "../stockCard/StockCard";
import styles from "../stockList/StockList.module.css";
import { useState } from "react";
const StockList = ({ stocks }) => {
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    console.log("Load more clicked");
  };

  return (
    <>
      <div className={styles.stockList}>
        {stocks?.map((stock, index) => (
          <Link href={`/company/${stock.ticker}`} key={index}>
            <StockCard
              stocksData={{
                ticker: stock.ticker,
                companyName: stock.name,
                companyLogo: "/buildings.svg",
                volume: stock.volume,
                price: stock.price,
                change:
                  Math.round(stock.change_percentage.slice(0, -1) * 100) / 100 +
                  "%",
              }}
            />
          </Link>
        ))}
      </div>
      <div className={styles.loadMore}>
        {loading ? (
          <img height={100} src="/loader2.svg" alt="Loading" />
        ) : (
          <button onClick={handleLoadMore}>Load More</button>
        )}
      </div>
    </>
  );
};

export default StockList;
