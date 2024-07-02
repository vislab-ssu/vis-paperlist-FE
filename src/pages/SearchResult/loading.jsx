import React from "react";

import Lottie from "lottie-react";

import loadingAnimation from "../../assets/lottie/Animation_Load.json";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie
        style={{ width: 500, height: 500, background: "transparent" }}
        animationData={loadingAnimation}
      ></Lottie>
    </div>
  );
};

export default Loading;
