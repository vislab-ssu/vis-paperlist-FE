import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import "../SearchResult/SearchResult.css";
import YearsBarChart from "../../components/filters/yearsBarChart";
import PaperListPanel from "../../components/paperListPanel/paperListPanel";
import logo from "../../assets/main-logo.png";
import { useGetSearchResults } from "./hooks";

// 검색 결과 페이지
function SearchResult() {
  const location = useLocation();
  const { searchName, searchType } = location.state;
  const searchResults = useGetSearchResults(searchName, searchType);

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
        <div className="left-panel-filter">
          <div>
            <div className="panel-header-filter">filters</div>
            <YearsBarChart />
          </div>
        </div>

        <div className="left-panel-2">
          <div className="panel-section">
            <div className="panel-header-2">left-2</div>1
          </div>
          <div className="panel-section">
            <div className="panel-header-2">left-2</div>2
          </div>
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
