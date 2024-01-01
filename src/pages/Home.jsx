import React, { useState } from "react";
import "../styles/Home.css";
import BasicComponent from "../components/basicComponent";
import ButtonContent from "../components/mainButton";
import InputContainer from "../components/InputContainer"; //검색 부분 컴포넌트로 뺌
//import LandingHome from "../components/landingHome";
import { useNavigate } from "react-router-dom";

//메인 홈 페이지
function Home() {
  const [name, setName] = useState("");
  const [searchType, setSearchType] = useState("title");
  const navigate = useNavigate();

  const goResult = () => {
    navigate("/searchResult", {
      state: {
        searchName: name,
        searchType: searchType,
      },
    });
  };

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      goResult();
    }
  };

  return (
    <div className="search-app">
      <div className="center-fixed-container">
        <BasicComponent />
        <InputContainer
          name={name}
          setName={setName}
          searchType={searchType}
          setSearchType={setSearchType}
          goResult={goResult}
          activeEnter={activeEnter}
        />
      </div>
      <div className="footer-container">
        <p className="footer-text">ⓒ VisPaperlist. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Home;
