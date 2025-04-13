// This component will provide user data to the rest of the app
import { createContext, useState } from "react";

const UserContext = createContext();

const getUserFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    // Allows user data to be extracted from the token
    return JSON.parse(atob(token.split('.')[1])).payload;
}

function UserProvider({ children }) {
  const [user, setUser] = useState(getUserFromToken());

  // This function will be used to update the user state
  const value = { user, setUser };

  // Data that is passed to the value prop of the provider will be available to all components that are wrapped in the UserProvider
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };
