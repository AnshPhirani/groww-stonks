import { Line } from "react-chartjs-2";
import "chart.js/auto";
import styles from "./PriceChart.module.css";

const PriceChart = ({ dailyStockPriceData }) => {
  return (
    <div className={styles.container}>
      {dailyStockPriceData.length === 0 ? (
        <img height={100} src="/loader.svg" alt="Loading" />
      ) : (
        <Line
          className={styles.chart}
          data={{
            labels: dailyStockPriceData.map(({ date }) => date).reverse(),
            datasets: [
              {
                data: dailyStockPriceData.map(({ price }) => price).reverse(),
                label: "Price",
                borderColor: "#5367FF",
                fill: true,
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default PriceChart;
