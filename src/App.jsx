import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import SearchResult from "./pages/SearchResult/SearchResult";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/searchResult" element={<SearchResult />} />
    </Routes>
  );
}

export default App;
