import { createContext, useState } from "react";

export const DataContext = createContext(null);

export function GlobalContext({ children }) {
  const [filteredPaper, setFilteredPaper] = useState([]);

  return (
    <DataContext.Provider value={{ filteredPaper, setFilteredPaper }}>
      {children}
      {console.log(filteredPaper)}
    </DataContext.Provider>
  );
}
