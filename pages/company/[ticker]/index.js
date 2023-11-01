import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import Header from "../../../components/header/Header";
import PriceChart from "../../../components/priceChart/PriceChart";
import { useAsyncCallback } from "react-async-hook";
import AboutCompany from "../../../components/aboutCompany/AboutCompany";
import {
  getCompanyData,
  getCompanyLogo,
  getDailyStockPriceData,
} from "../../api";
import StockCard from "../../../components/stockCard/StockCard";

const CompanyDetails = () => {
  const router = useRouter();
  const { ticker } = router.query;
  const [companyData, setCompanyData] = useState({});
  const [companyLogo, setCompanyLogo] = useState(null);
  const [dailyStockPriceData, setDailyStockPriceData] = useState([]); // [{date, price}]

  const fetchCompanyData = useAsyncCallback(getCompanyData, {
    onSuccess: (response) => {
      setCompanyData(response.data);
      localStorage.setItem(
        "companyData-" + ticker,
        JSON.stringify(response.data)
      );
      localStorage.setItem(
        "companyData-expiry-" + ticker,
        Date.now() + 1000 * 60 * 60
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const fetchCompanyLogo = useAsyncCallback(getCompanyLogo, {
    onSuccess: (response) => {
      const logoUrl = response.data?.results?.branding?.icon_url;
      if (logoUrl) {
        setCompanyLogo(logoUrl + "?apiKey=lWQzKqoCMyv9qNq9Yz_gZretvFFV4VQV");
        localStorage.setItem(
          "companyLogo-" + ticker,
          logoUrl + "?apiKey=lWQzKqoCMyv9qNq9Yz_gZretvFFV4VQV"
        );
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const fetchDailyStockPriceData = useAsyncCallback(getDailyStockPriceData, {
    onSuccess: (data) => {
      const formattedData = Object.entries(
        data.data["Time Series (Daily)"]
      ).map(([date, { "5. adjusted close": price }]) => ({ date, price }));
      setDailyStockPriceData(formattedData);
      localStorage.setItem(
        "dailyStockPriceData-" + ticker,
        JSON.stringify(formattedData)
      );
      localStorage.setItem(
        "dailyStockPriceData-expiry-" + ticker,
        Date.now() + 1000 * 60 * 60
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (router.isReady) {
      if (localStorage.getItem("companyData-expiry-" + ticker) > Date.now()) {
        setCompanyData(
          JSON.parse(localStorage.getItem("companyData-" + ticker))
        );
      } else {
        fetchCompanyData.execute(ticker);
      }

      if (localStorage.getItem("companyLogo-" + ticker)) {
        setCompanyLogo(localStorage.getItem("companyLogo-" + ticker));
      } else {
        fetchCompanyLogo.execute(ticker);
      }

      if (
        localStorage.getItem("dailyStockPriceData-expiry-" + ticker) >
        Date.now()
      ) {
        setDailyStockPriceData(
          JSON.parse(localStorage.getItem("dailyStockPriceData-" + ticker))
        );
      } else {
        fetchDailyStockPriceData.execute(ticker);
      }
    }
  }, [router.isReady]);

  const { MarketCapitalization, PERatio, Beta, DividendYield, ProfitMargin } =
    companyData;

  console.log(companyData);
  return (
    <div className={styles.overview}>
      <Header />
      <div className={styles.container}>
        <StockCard
          stocksData={{
            companyLogo: companyLogo ? companyLogo : "/images/groww.svg",
            companyName: companyData.Name,
            ticker: ticker,
            "52 Week High": companyData["52WeekHigh"],
            "52 Week Low": companyData["52WeekLow"],
            "Market Cap":
              Math.round(
                (companyData.MarketCapitalization / 1000000000) * 100
              ) /
                100 +
              "B",
            "P/E Ratio": companyData.PERatio,
            Beta: companyData.Beta,
            "Dividend Yield": companyData.DividendYield,
            "Profit Margin": companyData.ProfitMargin,
          }}
        />
        <PriceChart
          companyLogo={companyLogo ?? "/images/groww.svg"}
          dailyStockPriceData={dailyStockPriceData}
        />
      </div>

      {/* <RangeSlider
        currentPrice={dailyStockPriceData[0]?.price}
        companyData={companyData}
      /> */}
      {fetchCompanyData.Loading ? (
        <h2>Loading...</h2>
      ) : (
        <AboutCompany companyData={companyData} />
      )}
    </div>
  );
};

export default CompanyDetails;
