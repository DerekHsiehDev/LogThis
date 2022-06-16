import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

const LogContext = createContext();

export function LogProvider({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [log, setLog] = useState([]);

  useEffect(() => {
    axios
      .post("/api/get-log", { userID: user._id })
      .then((res) => {
        setLog(res.data.message.practice);
        console.log(user._id);
        console.log(res.data.message.practice);
        console.log(log);
      })
      .catch((err) => {
        setLog([]);
      });
  }, []);

  const exposed = {
    log,
    setLog,
  };

  return <LogContext.Provider value={exposed}>{children}</LogContext.Provider>;
}

export const useLog = () => useContext(LogContext);
