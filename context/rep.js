import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const RepContext = createContext();

export function RepProvider({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [rep, setRep] = useState([]);

  //   useEffect(() => {
  //     setPage("Log");
  //   }, []);
  useEffect(() => {
    axios
      .post("/api/get-rep", { userID: user._id })
      .then((res) => {
        let json = [];
        for (let index = 0; index < res.data.message.length; index++) {
          json.push(res.data.message[index]);
        }
        setRep(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const exposed = {
    rep,
    setRep,
  };

  return <RepContext.Provider value={exposed}>{children}</RepContext.Provider>;
}

export const useRep = () => useContext(RepContext);
