import React from "react";
import logo from "../assets/main-logo.png";

//기본 타이틀 컴포넌트
function BasicComponent() {
  return (
    <div className="header">
      <div className="logo-container">
        <img src={logo} alt="image" width="450" />
      </div>
      <div className="logo-under-container">
        <p className="logo-under-text">
          This page contains a list of CHI, Vis (InfoVis, SciVis, VAST), and
          ETRA papers.
        </p>
      </div>
    </div>
  );
}

export default BasicComponent;
