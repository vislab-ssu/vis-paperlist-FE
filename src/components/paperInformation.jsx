import React from "react";
import "../styles/paperInformation.css";

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
          <FontAwesomeIcon icon={faBook} style={{ marginRight: "0.2em" }} />
          <span className="session" style={{ marginRight: "1em" }}>
            session
          </span>

          {/* 논문 저자 */}
          <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.2em" }} />
          <span className="authors" style={{ marginRight: "1em" }}>
            Authors: {paper.author}
          </span>

          {/* 논문 DOI */}
          <FontAwesomeIcon
            icon={faUpRightFromSquare}
            style={{ marginRight: "0.2em" }}
          />
          <span className="DOI" style={{ marginRight: "1em" }}>
            DOI Link
          </span>
        </div>

        <p>{paper.abstract}</p>
      </div>
    </div>
  );
}

export default paperInformation;
