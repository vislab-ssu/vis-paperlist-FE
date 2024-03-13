import React from "react";

import "../../styles/scrappedList.css";

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

function scrappedPaper({
  scrappedList,
  scrapList,
  toggleModal,
  toggleBookMark,
  toggleScrappedList,
}) {
  return (
    <div>
      <div className="right-panel-tool-bar">
        <div className="searchResult-length">{scrapList.length} scraps</div>
        <div className="scrapped-paper-list">
          <img
            src={scrappedList ? StarSolid : StarRegular}
            style={{ width: "1.4em", height: "1.4em", cursor: "pointer" }}
            onClick={toggleBookMark}
          />
        </div>
      </div>
      {scrapList.map((paper, index) => (
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
              {paper.title}
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

              {console.log(paper)}
              {/* 논문 세션 */}
              <FontAwesomeIcon icon={faBook} style={{ marginRight: "0.2em" }} />
              <span className="session" style={{ marginRight: "1em" }}>
                {/* name-> session 으로 우선 설정*/}
                {paper.name}
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
                href={
                  paper.joname == null
                    ? `https://doi.org/${paper.DOI}`
                    : paper.DOI
                }
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

export default scrappedPaper;
