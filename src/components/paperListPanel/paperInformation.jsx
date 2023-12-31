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

function paperInformation({ paper, onClose }) {
  if (!paper) return null;

  return (
    <div className="paper-information">
      <div className="header-tool-container">
        <div className="back-to-list" onClick={onClose}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
      </div>

      <hr></hr>

      <div className="paper-container">
        <h3 className="paper-title">{paper.title}</h3>

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
          <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.2em" }} />
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
            style={{ marginRight: "1em", cursor: "pointer", color: "#0071bc" }}
            href={paper.DOI}
            target="_blank"
          >
            ACM Digital Library
          </a>
        </div>

        <p>{paper.abstract}</p>
      </div>
    </div>
  );
}

export default paperInformation;
