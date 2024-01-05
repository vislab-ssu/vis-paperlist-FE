import React, { useState, useEffect } from "react";

import "../styles/paperListPanel.css";
import PaperInformation from "./paperInformation";
import ScrappedList from "./scrappedList";

import moment from "moment";
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

  // 모달 토글
  const toggleModal = (paper = null) => {
    setSelectedPaper(paper);
  };

  // bookMark 토글
  const toggleBookMark = () => {
    setScrappedList((prev) => !prev);
  };

  // bookMark 추가 혹은 삭제 토글
  const toggleScrappedList = (paper) => {
    let newScrapList;
    if (scrapList.includes(paper)) {
      newScrapList = scrapList.filter((p) => p !== paper);
    } else {
      newScrapList = [...scrapList, paper];
    }

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
          <PaperInformation
            paper={selectedPaper}
            onClose={() => toggleModal()}
          />
        ) : searchResults.length > 0 ? (
          <div>
            <div className="right-panel-tool-bar">
              <div className="searchResult-length">
                {searchResults.length} results
              </div>
              <div className="scrapped-paper-list">
                <img
                  src={scrappedList ? StarSolid : StarRegular}
                  style={{ cursor: "pointer" }}
                  onClick={toggleBookMark}
                />
              </div>
            </div>
            {scrappedList ? (
              <ScrappedList scrappedList={scrappedList} />
            ) : (
              searchResults.map((result, index) => (
                <div key={index} className="search-result">
                  <div className="paper">
                    <h4
                      className="paper-title"
                      onClick={() => toggleModal(result)}
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
                        {result.citation}
                      </span>

                      {/* 논문 연도 */}
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        style={{ marginRight: "0.2em" }}
                      />
                      <span className="year" style={{ marginRight: "1em" }}>
                        {moment(result.date).format("MMMM YYYY")}
                      </span>

                      {/* 논문 세션 */}
                      <FontAwesomeIcon
                        icon={faBook}
                        style={{ marginRight: "0.2em" }}
                      />
                      <span className="session" style={{ marginRight: "1em" }}>
                        {/* name-> session 으로 우선 설정*/}
                        {result.name}
                      </span>

                      {/* 논문 저자 */}
                      <FontAwesomeIcon
                        icon={faUsers}
                        style={{ marginRight: "0.2em" }}
                      />
                      {console.log(result)}
                      <span className="authors" style={{ marginRight: "1em" }}>
                        {result.author}
                      </span>

                      {/* 논문 DOI */}
                      <FontAwesomeIcon
                        icon={faUpRightFromSquare}
                        style={{ marginRight: "0.2em" }}
                      />
                      <span className="DOI" style={{ marginRight: "1em" }}>
                        {result.DOI}
                      </span>
                      {/* <p className="abstract">{result.abstract}</p> */}
                    </div>
                  </div>
                  <div className="paper-scrap">
                    <img
                      src={scrapList.includes(result) ? StarSolid : StarRegular}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        toggleScrappedList(result);
                      }}
                    />
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
