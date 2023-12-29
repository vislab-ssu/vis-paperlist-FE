import React from "react";
import "../styles/InputContainer.css";

//검색 부분 컴포넌트
function InputContainer({
  name,
  setName,
  searchType,
  setSearchType,
  goResult,
  activeEnter,
}) {
  return (
    <div className="input-container">
      <input
        className="inputName"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => activeEnter(e)}
        placeholder="🔍 Paper name or keywords..."
      ></input>
      <select
        className="search-type"
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="abstract">Abstract</option>
      </select>
      <button className="search-button" onClick={goResult}>
        Search
      </button>
    </div>
  );
}

export default InputContainer;
