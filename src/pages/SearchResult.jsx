import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import "../styles/searchResult.css";
import PaperListPanel from "../components/paperListPanel";
import logo from "../assets/main-logo.png";

// 검색 결과 페이지
function SearchResult() {
  const location = useLocation();
  const { searchName, searchType } = location.state;

  // BE로부터 받은 정보 상태
  const [searchResults, setSearchResults] = useState([]);

  async function getPaper() {
    await axios
      .get("/paper", {
        params: {
          search: searchType,
          query: searchName,
        },
      })
      .then((res) => {
        let papers = res.data;
        setSearchResults(papers);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  useEffect(() => {
    getPaper();
  }, []);

  return (
    <div className="search-result-page">
      <div className="header-container">
        <div className="logo-container">
          <img src={logo} alt="image" width="175" />
        </div>
        <div className="header-search-title">
          🔍 Search Results for {searchType}: "{searchName}"
        </div>
      </div>

      <hr></hr>

      <div className="result-container">
        <div className="left-panel">
          <div className="panel-header">Left Panel Title</div>
          test
        </div>

        <PaperListPanel searchResults={searchResults} />
      </div>

      <div className="footer-container">
        <p className="footer-text">ⓒ VisPaperlist. All rights reserved.</p>
      </div>
    </div>
  );
}

export default SearchResult;
