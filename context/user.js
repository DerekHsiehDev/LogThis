import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const setUserToLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    const data = localStorage.getItem("user");
    setUser(data);
  }, []);

  useEffect(() => {
    setUserToLocalStorage(user);
  }, [user]);

  const exposed = {
    setUser,
    user,
    setUserToLocalStorage,
  };

  return (
    <UserContext.Provider value={exposed}>{children}</UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
