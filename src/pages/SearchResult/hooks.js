import { useState, useEffect } from "react";
import axios from "axios";

export function useGetSearchResults(searchName, searchType) {
  // BE로부터 받은 정보 상태
  const [searchResults, setSearchResults] = useState([]);

  async function getPaper() {
    await axios
      .get("/api/paper", {
        params: {
          search: searchType,
          query: searchName,
        },
      })
      .then((res) => {
        let papers = res.data;
        setSearchResults(papers);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  useEffect(() => {
    getPaper();
  }, []);

  return searchResults;
}
