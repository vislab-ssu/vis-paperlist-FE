import React, { useState, useEffect, useMemo } from "react";
import {
  useLocation,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";

// import { useGetSearchResults } from "./hooks";
import "../SearchResult/SearchResult.css";
import PaperListPanel from "../../components/paperListPanel/paperListPanel";
import YearsBarChart from "../../components/filters/yearsBarChart";
import WordcloudChart from "../../components/charts/wordcloudChart";
import CitationChart from "../../components/charts/citationChart";
import EmbeddingChart from "../../components/charts/embeddingChart";
import CheckBox from "../../components/filters/CheckBox";
import logo from "../../assets/main-logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faFilter,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "./loading";

// 검색 결과 페이지
function SearchResult() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // 검색어, 검색조건
  // const location = useLocation();
  // const { searchName, searchType } = location.state;
  const [searchParams, setSearchParams] = useSearchParams();
  const searchName = searchParams.get("searchName");
  const searchType = searchParams.get("searchType");

  const goHome = () => {
    navigate("/");
  };

  // checkboxFilter
  const [selectedItems, setSelectedItems] = useState([
    "CHI",
    "ETRA",
    "IEEE VIS",
    "IEEE TVCG",
    "IEEE Pacific",
    // "IEEE:EUROVIS",
  ]);
  // brush barChartSelectedList
  const [barChartSelectedList, setBarChartSelectedList] = useState([]);
  // wordcloudData
  const [wordcloudData, setWordcloudData] = useState([]);
  // embeddingData
  const [embeddingData, setEmbeddingData] = useState([]);

  // BE로부터 검색 결과 받아오기
  // const searchResults = useGetSearchResults(searchName, searchType);
  const [searchResults, setSearchResults] = useState([]);

  const checkBoxFilteredResults = useMemo(() => {
    return searchResults.filter((result) =>
      result.joname == null
        ? selectedItems.includes(result.name)
        : selectedItems.includes(result.joname)
    );
  }, [searchResults, selectedItems]);

  const itemCounts = useMemo(() => {
    const counts = {};
    selectedItems.forEach((item) => {
      counts[item] = 0;
    });
    searchResults.forEach((result) => {
      const item = result.joname || result.name;
      if (counts.hasOwnProperty(item)) {
        counts[item] += 1;
      }
    });
    return counts;
  }, [searchResults, selectedItems]);

  useEffect(() => {
    async function getPaper() {
      await axios
        .get("/api/paper", {
          params: {
            search: searchType,
            query: searchName,
          },
        })
        .then((res) => {
          // let papers = res.data;
          let { papers, myWords, embeddingData } = res.data;
          setSearchResults(papers);
          setWordcloudData(myWords);
          setEmbeddingData(embeddingData);
          setIsLoading(false);
          return res;
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          return err;
        });
    }
    getPaper();
  }, [searchType, searchName]);

  return (
    <div className="search-result-page">
      <div className="header-container">
        <div className="logo-container" onClick={() => goHome()}>
          <img src={logo} alt="image" width="175" />
        </div>
        <div className="header-search-title">
          🔍 Search Results for {searchType}: "{searchName}"
        </div>
      </div>

      <hr></hr>

      {isLoading ? (
        <div 
          style={{height: "87vh", backgroundColor: "white"}}>
          <Loading />
        </div>
        
      ) : (
        <div className="result-container">
          <div className="left-panel-filter">
            <div className="panel-header-filter">
              <FontAwesomeIcon
                icon={faFilter}
                style={{ marginRight: "0.5em" }}
              />
              <span>Filters</span>
            </div>
            <h4>Conference / Jornal Type</h4>
            <CheckBox
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              itemCounts={itemCounts}
            />
            <h4>Years</h4>
            <YearsBarChart
              searchResults={checkBoxFilteredResults}
              barChartSelectedList={barChartSelectedList}
              setBarChartSelectedList={setBarChartSelectedList}
            />
            <WordcloudChart wordcloudData={wordcloudData} />
          </div>

          <div className="left-panel-2">
            <div className="panel-section">
              <div className="panel-header-2">
                <FontAwesomeIcon
                  icon={faChartLine}
                  style={{ marginRight: "0.5em" }}
                />
                <span>charts</span>
              </div>
              <EmbeddingChart embeddingData={embeddingData} />
            </div>
            <div className="panel-section">
              <div className="panel-header-2">left-2</div>
              <CitationChart searchResults={checkBoxFilteredResults} />
            </div>
          </div>

          <div className="right-panel">
            <div className="panel-header-paperList">
              <FontAwesomeIcon icon={faList} style={{ marginRight: "0.5em" }} />
              <span>Papers</span>
            </div>
            <PaperListPanel
              searchResults={checkBoxFilteredResults}
              searchName={searchName}
              barChartSelectedList={barChartSelectedList}
            />
          </div>
        </div>
      )}

      <div className="footer-container">
        <p className="footer-text">ⓒ VisPaperlist. All rights reserved.</p>
      </div>
    </div>
  );
}

export default SearchResult;
