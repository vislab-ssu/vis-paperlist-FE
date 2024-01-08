import React, { useState, useEffect } from "react";

import "../../styles/paperListPanel.css";
import PaperList from "./paperList";
import PaperInformation from "./paperInformation";
import ScrappedList from "./scrappedList";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

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

  // bookMark 추가/삭제 토글
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

  // // // // // // // // //
  // // rendering code // //
  // // // // // // // // //

  const renderContent = () => {
    if (selectedPaper != null) {
      return (
        <PaperInformation paper={selectedPaper} onClose={() => toggleModal()} />
      );
    }

    if (scrappedList) {
      return <ScrappedList scrappedList={scrappedList} />;
    }

    return (
      <PaperList
        searchResults={searchResults}
        scrappedList={scrappedList}
        scrapList={scrapList}
        toggleModal={toggleModal}
        toggleBookMark={toggleBookMark}
        toggleScrappedList={toggleScrappedList}
      />
    );
  };

  return (
    <div className="right-panel">
      <div className="panel-header-paperList">
        <FontAwesomeIcon icon={faList} style={{ marginRight: "0.5em" }} />
        <span>Papers</span>
      </div>

      <div className="search-result-container">
        {searchResults.length > 0 ? (
          renderContent()
        ) : (
          <p className="no-results-message">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default PaperListPanel;
