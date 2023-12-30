import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import "../styles/searchResult.css";
import PaperInformation from "../components/paperInformation";
import logo from "../assets/main-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCalendarDays,
  faList,
  faQuoteRight,
  faUpRightFromSquare,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

// 검색 결과 페이지
function SearchResult() {
  const location = useLocation();
  const { searchName, searchType } = location.state;

  // 선택된 논문의 modal창 상태
  const [selectedPaper, setSelectedPaper] = useState(null);

  const handlePaperClick = (paper) => {
    setSelectedPaper(paper);
  };

  const handleCloseModal = () => {
    setSelectedPaper(null);
  };

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

        <div className="right-panel">
          <div className="panel-header">
            <FontAwesomeIcon icon={faList} style={{ marginRight: "0.5em" }} />
            <span>Papers</span>
          </div>

          <div className="search-result-container">
            {selectedPaper != null ? (
              <PaperInformation
                paper={selectedPaper}
                onClose={handleCloseModal}
              />
            ) : searchResults.length > 0 ? (
              <div>
                {searchResults.map((result, index) => (
                  <div key={index} className="search-result">
                    <div className="paper">
                      <h4
                        className="paper-title"
                        onClick={() => handlePaperClick(result)}
                      >
                        {result.title}
                      </h4>

                      <div className="paper-detail">
                        {/* 논문 인용횟수 */}
                        <FontAwesomeIcon
                          icon={faQuoteRight}
                          style={{ marginRight: "0.2em" }}
                        />
                        <span
                          className="citation-number"
                          style={{ marginRight: "1em" }}
                        >
                          30
                        </span>

                        {/* 논문 연도 */}
                        <FontAwesomeIcon
                          icon={faCalendarDays}
                          style={{ marginRight: "0.2em" }}
                        />
                        <span className="year" style={{ marginRight: "1em" }}>
                          year
                        </span>

                        {/* 논문 세션 */}
                        <FontAwesomeIcon
                          icon={faBook}
                          style={{ marginRight: "0.2em" }}
                        />
                        <span
                          className="session"
                          style={{ marginRight: "1em" }}
                        >
                          session
                        </span>

                        {/* 논문 저자 */}
                        <FontAwesomeIcon
                          icon={faUsers}
                          style={{ marginRight: "0.2em" }}
                        />
                        <span
                          className="authors"
                          style={{ marginRight: "1em" }}
                        >
                          Authors: {result.author}
                        </span>

                        {/* 논문 DOI */}
                        <FontAwesomeIcon
                          icon={faUpRightFromSquare}
                          style={{ marginRight: "0.2em" }}
                        />
                        <span className="DOI" style={{ marginRight: "1em" }}>
                          DOI link
                        </span>
                        {/* <p className="abstract">{result.abstract}</p> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-results-message">검색 결과가 없습니다.</p>
            )}
          </div>
        </div>
      </div>

      <div className="footer-container">
        <p className="footer-text">ⓒ VisPaperlist. All rights reserved.</p>
      </div>
    </div>
  );
}

export default SearchResult;
