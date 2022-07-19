import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const setUserStateAndLocalStorage = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const getUserFromLocalStorage = () => {
    const data = localStorage.getItem("user");
    const userData = JSON.parse(data);
    setUser(userData);
    console.log("Finished setting user data");
    setLoading(false);
  };

  useEffect(() => {
    getUserFromLocalStorage();
  }, []);

  const exposed = {
    setUser,
    user,
    loading,
    setUserStateAndLocalStorage,
    getUserFromLocalStorage,
  };

  return (
    <UserContext.Provider value={exposed}>{children}</UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
