import React, { useState, useEffect } from "react";
import "../styles/mainButton.css";

// 메인 홈 버튼 컴포넌트
function App() {
  const [data, setData] = useState([]);
  const [papers, setPapers] = useState([]);
  const [selectedButton, setSelectedButton] = useState(0);

  useEffect(() => {
    fetch("/data.json") //파일을 비동기적으로 가져옴
      .then((response) => response.json()) //가져온 응답을 json으로 파싱
      .then((data) => setData(data)) //파싱된 data를 setData를 사용하여 저장
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  //data.json에서 각 학회별로 filterling
  const getConferencesByType = (type) => {
    console.log(data);
    const filteredData = data.filter((conf) => conf.name.includes(type));
    console.log(filteredData);
    return filteredData;
  };

  // "인자로 받은 학회" 의 자료를 data 폴더에서 가져오기
  const getThesisByConfName = (confName) => {
    // data에서 confName과 일치하는 학회의 경로를 찾습니다.
    const conference = data.find((conf) => conf.name === confName);
    console.log(conference.path);
    if (conference) {
      fetch(`../src/${conference.path}`)
        .then((response) => response.json())
        .then((theses) => setPapers(theses))
        .catch((err) => console.error("Error loading theses:", err));
    }
  };

  const handleButtonClick = (buttonId) => {
    // console.log(buttonId);
    // console.log(selectedButton);
    buttonId == selectedButton
      ? setSelectedButton(0)
      : setSelectedButton(buttonId);
  };

  return (
    <div className="button-container">
      <div className="btn_box">
        <button
          onClick={() => handleButtonClick(1)}
          className={selectedButton === 1 ? "selected" : ""}
        >
          CHI
        </button>
        <button
          onClick={() => handleButtonClick(2)}
          className={selectedButton === 2 ? "selected" : ""}
        >
          ETRA
        </button>
        <button
          onClick={() => handleButtonClick(3)}
          className={selectedButton === 3 ? "selected" : ""}
        >
          IEEE
        </button>
        <button
          onClick={() => handleButtonClick(4)}
          className={selectedButton === 4 ? "selected" : ""}
        >
          INFOVIS
        </button>
        <button
          onClick={() => handleButtonClick(5)}
          className={selectedButton === 5 ? "selected" : ""}
        >
          SCIVIS
        </button>
        <button
          onClick={() => handleButtonClick(6)}
          className={selectedButton === 6 ? "selected" : ""}
        >
          VAST
        </button>
      </div>
      <div className="content-container">
        {selectedButton === 1 && (
          <div>
            <p>
              CHI is one of the most significant conferences in the field of
              computer science.
              <br /> It primarily focuses on research related to human-computer
              interaction (HCI), user experience, user interface design, and
              related research areas.
              <br /> Researchers and practitioners gather at CHI to present and
              discuss innovations and advancements in making technology more
              user-friendly and efficient for humans.
            </p>
            <ul>
              {getConferencesByType("CHI").map((conf) => (
                <li
                  key={conf.name}
                  onClick={() => {
                    getThesisByConfName(conf.name);
                  }}
                >
                  {conf.name}
                </li>
              ))}
            </ul>
            <p>{console.log(papers)}</p>
          </div>
        )}
        {selectedButton === 2 && (
          <div>
            <p>
              ETRA is a conference that highlights research related to
              eye-tracking technology and its applications.
              <br /> It primarily involves the analysis of users' eye movements
              for interface design, usability testing, and user experience
              research.
              <br /> This conference provides a platform for researchers to
              share insights and developments in eye-tracking technology and its
              practical uses.
            </p>
            <ul>
              {getConferencesByType("ETRA").map((conf) => (
                <li key={conf.name}>{conf.name}</li>
              ))}
            </ul>
          </div>
        )}
        {selectedButton === 3 && (
          <p>
            IEEE is an international technical society that operates in the
            field of electrical and electronics engineering.
            <br /> IEEE supports and publishes research papers, scholarly
            studies, and develops technical standards across various
            technological domains.
            <br /> IEEE societies play a pivotal role in promoting worldwide
            research and technological innovation.
          </p>
        )}
        {selectedButton === 4 && (
          <div>
            <p>
              InfoVis is a conference dedicated to research and publication in
              the field of information visualization.
              <br /> Information visualization focuses on techniques and methods
              for visually representing data and information to make it more
              understandable.
              <br /> It encompasses areas such as data visualization, charts,
              graphs, and interactive visualization.
            </p>
            <ul>
              {getConferencesByType("InfoVis").map((conf) => (
                <li key={conf.name}>{conf.name}</li>
              ))}
            </ul>
          </div>
        )}
        {selectedButton === 5 && (
          <div>
            <p>
              SciVis refers to the field of scientific visualization, which is
              dedicated to visualizing complex scientific data and phenomena.
              <br />
              Scientific visualization is used to create visual representations
              of scientific and engineering data, helping researchers and
              scientists gain insights from large and complex datasets.
              <br /> This field often employs 3D graphics and interactive
              techniques.
            </p>
            <ul>
              {getConferencesByType("SciVis").map((conf) => (
                <li key={conf.name}>{conf.name}</li>
              ))}
            </ul>
          </div>
        )}
        {selectedButton === 6 && (
          <div>
            <p>
              VAST is a conference that focuses on the interdisciplinary field
              of visual analytics,
              <br /> which combines data analysis, interactive visualization,
              and human-computer interaction to solve complex problems.
              <br /> VAST aims to advance research and technologies that enable
              users to gain insights and make decisions through visual
              representations of data and analytical tools.
            </p>
            <ul>
              {getConferencesByType("VAST").map((conf) => (
                <li key={conf.name}>{conf.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
