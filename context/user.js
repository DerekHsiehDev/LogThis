import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const setUserStateAndLocalStorage = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    const data = localStorage.getItem("user");
    const userData = JSON.parse(data);
    setUser(userData);
    setLoading(false);
  }, []);

  const exposed = {
    setUser,
    user,
    loading,
    setUserStateAndLocalStorage,
  };

  return (
    <UserContext.Provider value={exposed}>{children}</UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
