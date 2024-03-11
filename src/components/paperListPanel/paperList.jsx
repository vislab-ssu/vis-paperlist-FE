import React, { useState, useEffect } from "react";

import "../../styles/paperList.css";

import StarRegular from "../../assets/svg/star-regular.svg";
import StarSolid from "../../assets/svg/star-solid.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCalendarDays,
  faQuoteRight,
  faUpRightFromSquare,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

function paperList({
  searchResults,
  searchName,
  scrappedList,
  scrapList,
  toggleModal,
  toggleBookMark,
  toggleScrappedList,
  barChartSelectedList,
}) {
  const highlightMatch = (text, searchTerm) => {
    // 정규표현식을 이용하여 검색어 분리
    const splitText = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return splitText.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="paper-title-highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const [renderingResults, setRenderingResults] = useState([]);

  // brush 연도 존재 ? filterling 버전 : searchResults 그대로
  useEffect(() => {
    if (barChartSelectedList.length === 0) {
      setRenderingResults(searchResults);
    } else {
      setRenderingResults(
        searchResults.filter((paper) =>
          barChartSelectedList.includes(moment(paper.date).format("YYYY"))
        )
      );
    }
  }, [searchResults, barChartSelectedList]);

  return (
    <div>
      <div className="right-panel-tool-bar">
        <div className="searchResult-length">
          {renderingResults.length} results
        </div>
        <div className="scrapped-paper-list">
          <img
            src={scrappedList ? StarSolid : StarRegular}
            style={{ width: "1.4em", height: "1.4em", cursor: "pointer" }}
            onClick={toggleBookMark}
          />
        </div>
      </div>
      {renderingResults.map((paper, index) => (
        <div key={index} className="search-result">
          <div className="paper-index">
            <div
              className="index"
              style={{
                background:
                  paper.citation > 100
                    ? "#e34a33"
                    : paper.citation > 50
                    ? "#fc8d59"
                    : paper.citation > 20
                    ? "#fdcc8a"
                    : paper.citation > 0
                    ? "#fef0d9"
                    : "#f4f4f4",
                color: paper.citation > 50 ? "#fff" : "#000",
              }}
            >
              {index + 1}
            </div>
          </div>
          <div className="paper">
            <h4 className="paper-title" onClick={() => toggleModal(paper)}>
              {highlightMatch(paper.title, searchName)}
            </h4>

            <div className="paper-detail">
              {/* 논문 인용횟수 */}
              <FontAwesomeIcon
                icon={faQuoteRight}
                style={{ marginRight: "0.2em" }}
              />
              <span className="citation-number" style={{ marginRight: "1em" }}>
                {paper.citation}
              </span>

              {/* 논문 세션 */}
              <FontAwesomeIcon icon={faBook} style={{ marginRight: "0.2em" }} />
              <span className="session" style={{ marginRight: "1em" }}>
                {/* 
                  CHI, ETRA는 
                  session이 있는 경우, name : session명 / joname : CHI 또는 ETRA
                  session이 없는 경우, name : CHI 또는 ETRA / joname : null
                  IEEE Pacific, IEEE TVCG는 name : IEEE ~~~~ / joname : null 
                */}
                {paper.joname == null
                  ? paper.name
                  : paper.joname + " (" + paper.name + ")"}
              </span>

              {/* 논문 연도 */}
              <FontAwesomeIcon
                icon={faCalendarDays}
                style={{ marginRight: "0.2em" }}
              />
              <span className="year" style={{ marginRight: "1em" }}>
                {moment(paper.date).format("MMMM YYYY")}
              </span>

              {/* 논문 저자 */}
              <FontAwesomeIcon
                icon={faUsers}
                style={{ marginRight: "0.2em" }}
              />
              <span className="authors" style={{ marginRight: "1em" }}>
                {paper.author}
              </span>

              {/* 논문 DOI */}
              <FontAwesomeIcon
                icon={faUpRightFromSquare}
                style={{ marginRight: "0.2em" }}
              />
              <a
                className="DOI"
                style={{
                  marginRight: "1em",
                  cursor: "pointer",
                  color: "#0071bc",
                }}
                href={paper.DOI}
                target="_blank"
              >
                DOI Link
              </a>
              {/* <p className="abstract">{paper.abstract}</p> */}
            </div>
          </div>
          <div className="paper-scrap">
            <img
              src={scrapList.includes(paper) ? StarSolid : StarRegular}
              style={{ width: "1.6em", height: "1.6em", cursor: "pointer" }}
              onClick={() => {
                toggleScrappedList(paper);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default paperList;
