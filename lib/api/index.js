import axios from "axios";

export const getTopGainersLosers = () => {
  return axios.get(
    `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=IASH770OQULOLPR5`
  );
};

export const getCompanyData = (ticker) => {
  return axios.get(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=IASH770OQULOLPR5`
  );
};

export const getCompanyLogo = (ticker) => {
  return axios.get(
    `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=lWQzKqoCMyv9qNq9Yz_gZretvFFV4VQV`
  );
};

export const getDailyStockPriceData = (ticker) => {
  return axios.get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=IASH770OQULOLPR5`
  );
};

export const getSearchResults = (searchText) => {
  return axios.get(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=IASH770OQULOLPR5`
  );
};
