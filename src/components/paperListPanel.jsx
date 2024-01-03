import React, { useState, useEffect } from "react";

import "../styles/paperListPanel.css";
import PaperInformation from "./paperInformation";
import ScrappedList from "./scrappedList";

import StarRegular from "../assets/svg/star-regular.svg";
import StarSolid from "../assets/svg/star-solid.svg";
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
function PaperListPanel({ searchResults }) {
  // 선택된 논문의 modal창의 상태
  const [selectedPaper, setSelectedPaper] = useState(null);
  // 북마크의 상태
  const [scrappedList, setScrappedList] = useState(false);

  // 북마크를 위한 localStorage 상태 관리
  const [scrapList, setScrapList] = useState(() => {
    return JSON.parse(localStorage.getItem("scrap")) || [];
  });

  // modal 창 열기
  const handlePaperClick = (paper) => {
    setSelectedPaper(paper);
  };

  // modal 창 닫기
  const handleCloseModal = () => {
    setSelectedPaper(null);
  };

  // bookMark 열기
  const handleOpenScrappedList = () => {
    setScrappedList(true);
  };

  // bookMark 닫기
  const handleCloseScrappedList = () => {
    setScrappedList(false);
  };

  // bookMark 추가하기
  const handleAddScrapList = (title) => {
    if (!scrapList.includes(title)) {
      const newScrapList = [...scrapList, title];
      setScrapList(newScrapList);
      localStorage.setItem("scrap", JSON.stringify(newScrapList));
    }
  };

  // bookMark 삭제하기
  const handleRemoveScrapList = (title) => {
    const newScrapList = scrapList.filter((t) => t != title);
    setScrapList(newScrapList);
    localStorage.setItem("scrap", JSON.stringify(newScrapList));
  };

  return (
    <div className="right-panel">
      <div className="panel-header">
        <FontAwesomeIcon icon={faList} style={{ marginRight: "0.5em" }} />
        <span>Papers</span>
      </div>

      <div className="search-result-container">
        {selectedPaper != null ? (
          <PaperInformation paper={selectedPaper} onClose={handleCloseModal} />
        ) : searchResults.length > 0 ? (
          <div>
            <div className="right-panel-tool-bar">
              <div className="searchResult-length">
                {searchResults.length} results
              </div>
              <div className="scrapped-paper-list">
                {scrappedList ? (
                  <img
                    src={StarSolid}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCloseScrappedList()}
                  />
                ) : (
                  <img
                    src={StarRegular}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleOpenScrappedList()}
                  />
                )}
              </div>
            </div>
            {scrappedList ? (
              <ScrappedList />
            ) : (
              searchResults.map((result, index) => (
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
                      <span className="session" style={{ marginRight: "1em" }}>
                        session
                      </span>

                      {/* 논문 저자 */}
                      <FontAwesomeIcon
                        icon={faUsers}
                        style={{ marginRight: "0.2em" }}
                      />
                      <span className="authors" style={{ marginRight: "1em" }}>
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
                  <div className="paper-scrap">
                    {scrapList.includes(result.title) ? (
                      <img
                        src={StarSolid}
                        alt="Star Solid"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleRemoveScrapList(result.title);
                        }}
                      />
                    ) : (
                      <img
                        src={StarRegular}
                        alt="Star Regular"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleAddScrapList(result.title);
                        }}
                      />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <p className="no-results-message">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default PaperListPanel;
