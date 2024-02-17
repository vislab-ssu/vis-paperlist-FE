import React from "react";
import "../../styles/filteredPaperVisualizer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faQuoteRight,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import { useContext } from "react";
import { DataContext } from "../../Context";

const FilteredPaperVisualizer = ({ searchResults }) => {
  const { filteredPaper, setFilteredPaper } = useContext(DataContext);

  const brushedPapers = [];
  const nonBrushedPapers = [];

  searchResults.forEach((paper) => {
    let found = false;
    for (let filtered of filteredPaper) {
      if (paper.title === filtered.title) {
        brushedPapers.push(paper);
        found = true;
        return;
      }
    }
    if (!found) {
      nonBrushedPapers.push(paper);
    }
  });

  return (
    <div style={{ display: "flex" }}>
      <div className="non-BrushedPaper-rendering">
        <div>[ nonBrushedPaper ]</div>
        {nonBrushedPapers.map((paper, index) => (
          <div className="paper" key={index}>
            <h4 className="paper-title">{paper.title}</h4>
            <div className="paper-detail">
              {/* 논문 인용횟수 */}
              <FontAwesomeIcon
                icon={faQuoteRight}
                style={{ marginRight: "0.2em" }}
              />
              <span className="citation-number" style={{ marginRight: "1em" }}>
                {paper.citation}
              </span>

              {/* 논문 연도 */}
              <FontAwesomeIcon
                icon={faCalendarDays}
                style={{ marginRight: "0.2em" }}
              />
              <span className="year" style={{ marginRight: "1em" }}>
                {moment(paper.date).format("MMMM YYYY")}
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
                ACM Digital Library
              </a>
            </div>

            <p>{paper.abstract}</p>
          </div>
        ))}
      </div>
      <div className="BrushedPaper-rendering">
        <div>[ BrushedPaper ]</div>
        {brushedPapers.map((paper, index) => (
          <div className="paper" key={index}>
            <h4 className="paper-title">{paper.title}</h4>
            <div className="paper-detail">
              {/* 논문 인용횟수 */}
              <FontAwesomeIcon
                icon={faQuoteRight}
                style={{ marginRight: "0.2em" }}
              />
              <span className="citation-number" style={{ marginRight: "1em" }}>
                {paper.citation}
              </span>

              {/* 논문 연도 */}
              <FontAwesomeIcon
                icon={faCalendarDays}
                style={{ marginRight: "0.2em" }}
              />
              <span className="year" style={{ marginRight: "1em" }}>
                {moment(paper.date).format("MMMM YYYY")}
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
                ACM Digital Library
              </a>
            </div>

            <p>{paper.abstract}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilteredPaperVisualizer;
