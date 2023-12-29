import React from "react";
import Lottie from "lottie-react";
import "../styles/landingHome.css";
import readingGlasses from "../assets/anim/readingGlasses.json";

//홈 페이지 첫 번째 인풋박스 컴포넌트
function landingHome() {
  return (
    <div className="paperContent-container">
      <div className="input-container">
        <h2 className="input-text">
          What kind of paper are
          <br /> you looking for?
        </h2>
        <div className="readingGlasses-anim">
          <Lottie animationData={readingGlasses} />
        </div>
      </div>
    </div>
  );
}
export default landingHome;
