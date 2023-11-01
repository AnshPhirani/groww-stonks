import { useEffect, useState } from "react";
import styles from "./SearchInput.module.css";
import { useAsyncCallback } from "react-async-hook";
import { getSearchResults } from "../../pages/api";
import Link from "next/link";

const SearchInput = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchType, setSearchType] = useState("All");

  const fetchSearchResults = useAsyncCallback(getSearchResults, {
    onSuccess: (data) => {
      setSearchResults(data.data["bestMatches"]);
      console.log(data.data["bestMatches"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    const recentlyViewed = localStorage.getItem("recentlyViewed");
    if (recentlyViewed) {
      setRecentlyViewed(JSON.parse(recentlyViewed));
    }
  }, []);

  useEffect(() => {
    if (!searchText) {
      setSearchResults(recentlyViewed);
      return;
    }

    // debuounce the search text
    const timer = setTimeout(() => {
      if (searchText) {
        // fetch search results
        fetchSearchResults.execute(searchText);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const changeSearchType = (type) => {
    setSearchType(type);
  };

  const handleSearchResultClick = (searchItem) => {
    // add to recently viewed
    const existing = recentlyViewed.find(
      (item) => searchItem["1. symbol"] === item["1. symbol"]
    );
    if (!existing) {
      const updatedRecentlyViewed = [searchItem, ...recentlyViewed.slice(0, 4)];
      setRecentlyViewed(updatedRecentlyViewed);
      localStorage.setItem(
        "recentlyViewed",
        JSON.stringify(updatedRecentlyViewed)
      );
      console.log(updatedRecentlyViewed);
    }

    // clear search text
    setSearchText("");
  };

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleInputChange}
        onFocus={() => setShowSearchResults(true)}
        onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
      />
      <div
        className={styles.resultContainer}
        style={{ display: showSearchResults ? "block" : "none" }}
      >
        <div className={styles.searchOptions}>
          <button
            onClick={() => changeSearchType("All")}
            className={`${styles.option} ${
              searchType === "All" && styles.active
            }`}
          >
            All
          </button>
          <button
            onClick={() => changeSearchType("Equity")}
            className={`${styles.option} ${
              searchType === "Equity" && styles.active
            }`}
          >
            Stocks
          </button>
          <button
            onClick={() => changeSearchType("ETF")}
            className={`${styles.option} ${
              searchType === "ETF" && styles.active
            }`}
          >
            ETFs
          </button>
        </div>
        <ul
          className={`${styles.results} ${
            showSearchResults ? styles.show : ""
          }`}
        >
          {searchResults
            ?.filter(
              (result) =>
                searchType === "All" || result["3. type"] === searchType
            )
            .map((result, index) => (
              <li key={index}>
                <Link
                  onClick={() => handleSearchResultClick(result)}
                  href={`/company/${result["1. symbol"]}`}
                >
                  {result["1. symbol"]}
                  <br />
                  <span>{result["2. name"]}</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchInput;
