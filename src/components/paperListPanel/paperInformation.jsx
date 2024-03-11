import React from "react";
import "../../styles/paperInformation.css";

import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBook,
  faCalendarDays,
  faQuoteRight,
  faUpRightFromSquare,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

function paperInformation({ paper, searchName, onClose }) {
  if (!paper) return null;

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

  return (
    <div className="paper-information">
      <div className="header-tool-container">
        <div className="back-to-list" onClick={onClose}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
      </div>

      <hr></hr>

      <div className="paper-container">
        <h2 className="paper-title">
          {highlightMatch(paper.title, searchName)}
        </h2>
        <div className="paper-detail">
          {/* 논문 인용횟수 */}
          <FontAwesomeIcon
            icon={faQuoteRight}
            style={{ fontSize: "16px", marginRight: "0.2em" }}
          />
          <span
            className="citation-number"
            style={{ fontSize: "16px", marginRight: "0.5em" }}
          >
            {paper.citation}
          </span>

          {/* 논문 세션 */}
          <FontAwesomeIcon
            icon={faBook}
            style={{ fontSize: "16px", marginRight: "0.2em" }}
          />
          <span
            className="session"
            style={{ fontSize: "16px", marginRight: "0.5em" }}
          >
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
            style={{ fontSize: "16px", marginRight: "0.2em" }}
          />
          <span
            className="year"
            style={{ fontSize: "16px", marginRight: "0.5em" }}
          >
            {moment(paper.date).format("MMMM YYYY")}
          </span>

          {/* 논문 저자 */}
          <FontAwesomeIcon
            icon={faUsers}
            style={{ fontSize: "16px", marginRight: "0.2em" }}
          />
          <span
            className="authors"
            style={{ fontSize: "16px", marginRight: "0.5em" }}
          >
            {paper.author}
          </span>

          {/* 논문 DOI */}
          <FontAwesomeIcon
            icon={faUpRightFromSquare}
            style={{ fontSize: "16px", marginRight: "0.2em" }}
          />
          <a
            className="DOI"
            style={{
              fontSize: "16px",
              marginRight: "1em",
              cursor: "pointer",
              color: "#0071bc",
            }}
            href={paper.DOI}
            target="_blank"
          >
            DOI Link
          </a>
        </div>
        <p style={{ fontSize: "1.3em", lineHeight: "35px" }}>
          {highlightMatch(paper.abstract, searchName)}
        </p>
        {console.log(paper.keywordList)}
      </div>
    </div>
  );
}

export default paperInformation;
