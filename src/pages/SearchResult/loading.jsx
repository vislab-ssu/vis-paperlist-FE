import React from "react";

import Lottie from "lottie-react";

import loadingAnimation from "../../assets/lottie/Animation_Load.json";

const Loading = () => {
  // const defaultOptions = {
  //   //예제1
  //   loop: true,
  //   autoplay: true,
  //   animationData: LottieData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
    >
      <Lottie
        // options={defaultOptions}
        style={{width: 500, height: 500, background: "transparent"}}
        animationData={loadingAnimation}
      ></Lottie>
    </div>
  );
};

export default Loading;
