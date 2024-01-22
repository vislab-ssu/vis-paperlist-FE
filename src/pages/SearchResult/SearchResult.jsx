import React, { useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";

// import { useGetSearchResults } from "./hooks";
import "../SearchResult/SearchResult.css";
import YearsBarChart from "../../components/filters/yearsBarChart";
import PaperListPanel from "../../components/paperListPanel/paperListPanel";
import logo from "../../assets/main-logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faFilter } from "@fortawesome/free-solid-svg-icons";

// 검색 결과 페이지
function SearchResult() {
  const navigate = useNavigate();
  // const location = useLocation();
  // const { searchName, searchType } = location.state;
  const [searchParams, setSearchParams] = useSearchParams();
  const searchName = searchParams.get("searchName");
  const searchType = searchParams.get("searchType");

  const [searchResults, setSearchResults] = useState([]);
  // BE로부터 검색 결과 받아오기
  // const searchResults = useGetSearchResults(searchName, searchType);

  const goHome = () => {
    navigate("/");
  };

  useEffect(() => {
    async function getPaper() {
      await axios
        .get("/api/paper", {
          params: {
            search: searchType,
            query: searchName,
          },
        })
        .then((res) => {
          let papers = res.data;
          // let { papers, word_list } = res.data;
          setSearchResults(papers);
          return res;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    }
    getPaper();
  }, [searchType, searchName]);

  // console.log(word_list);

  return (
    <div className="search-result-page">
      <div className="header-container">
        <div className="logo-container" onClick={() => goHome()}>
          <img src={logo} alt="image" width="175" />
        </div>
        <div className="header-search-title">
          🔍 Search Results for {searchType}: "{searchName}"
        </div>
      </div>

      <hr></hr>

      <div className="result-container">
        <div className="left-panel-filter">
          <div className="panel-header-filter">
            <FontAwesomeIcon icon={faFilter} style={{ marginRight: "0.5em" }} />
            <span>Filters</span>
          </div>
          <YearsBarChart searchResults={searchResults} />
        </div>

        <div className="left-panel-2">
          <div className="panel-section">
            <div className="panel-header-2">left-2</div>1
          </div>
          <div className="panel-section">
            <div className="panel-header-2">left-2</div>2
          </div>
          {console.log("메롱")}
        </div>

        <div className="right-panel">
          <div className="panel-header-paperList">
            <FontAwesomeIcon icon={faList} style={{ marginRight: "0.5em" }} />
            <span>Papers</span>
          </div>
          <PaperListPanel
            searchResults={searchResults}
            searchName={searchName}
          />
        </div>
      </div>

      <div className="footer-container">
        <p className="footer-text">ⓒ VisPaperlist. All rights reserved.</p>
      </div>
    </div>
  );
}

export default SearchResult;
