import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_SRC;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/searchResult" element={<SearchResult />} />
    </Routes>
  );
}

export default App;
