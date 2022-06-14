import { createContext, useState, useContext, useEffect } from "react";

const PageContext = createContext();

export function PageProvider({ children }) {
  const [page, setPage] = useState("Repertoire");

  //   useEffect(() => {
  //     setPage("Log");
  //   }, []);

  const exposed = {
    page,
    setPage,
  };

  return (
    <PageContext.Provider value={exposed}>{children}</PageContext.Provider>
  );
}

export const usePage = () => useContext(PageContext);
