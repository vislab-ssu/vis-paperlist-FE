import React, { useState } from "react";
import "../Home/Home.css";
import InputContainer from "./InputContainer";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Vis_logo.png";

//메인 홈 페이지
function Home() {
  const [name, setName] = useState("");
  const [searchType, setSearchType] = useState("title");
  const navigate = useNavigate();

  const goResult = () => {
    navigate(`/searchResult?searchName=${name}&searchType=${searchType}`);
  };

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      goResult();
    }
  };

  return (
    <div className="search-app">
      <div className="title-container">
        <p className="title-text">Paperlist</p>
      </div>
      <div className="Home-search-container">
        <InputContainer
          name={name}
          setName={setName}
          searchType={searchType}
          setSearchType={setSearchType}
          goResult={goResult}
          activeEnter={activeEnter}
        />
      </div>
      <div
        className="description"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div>
          Total [<strong>10,574</strong>] papers.{" "}
        </div>
        <p>
          {`try : `}
          <a
            className="usage"
            href="http://localhost:5173/searchResult?searchName=uncertainty&searchType=abstract"
            style={{ color: "#237aaa" }}
          >
            uncertainty
          </a>
        </p>
      </div>

      <div className="home-footer-container">
        <p className="home-footer-text">ⓒ VisPaperlist. All rights reserved.</p>
      </div>

      <img src={logo} alt="image" className="logo" />
    </div>
  );
}

export default Home;
