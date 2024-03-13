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
    <div>
      <Lottie
        // options={defaultOptions}
        width={300}
        height={300}
        animationData={loadingAnimation}
      ></Lottie>
    </div>
  );
};

export default Loading;
