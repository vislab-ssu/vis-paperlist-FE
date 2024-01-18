import React, { useEffect, useRef } from "react";
import "../Home/InputContainer.css";
import searchIcon from "../../assets/Search-icon.png";

//검색 부분 컴포넌트
function InputContainer({
  name,
  setName,
  searchType,
  setSearchType,
  goResult,
  activeEnter,
}) {
  const inputRef = useRef();
  // console.log("render")
  
  useEffect( () => {
    inputRef.current.focus()
  }, [inputRef])

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      goResult();
    }
    activeEnter(e);
  };

  return (
    <div className="input-container">
      <div className="search-container">
        <div className="searchIcon-container">
          <img className="searchIcon" alt="search-icon" src={searchIcon} />
        </div>
        <input
          ref={inputRef}
          className="inputName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search here"
        />
      </div>
      <select
        className="search-type"
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="abstract">Abstract</option>
      </select>
    </div>
  );
}

export default InputContainer;
