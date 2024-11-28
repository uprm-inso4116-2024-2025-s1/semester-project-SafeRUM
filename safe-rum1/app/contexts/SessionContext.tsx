import React, { createContext, useState, ReactNode, FC } from 'react';

// Define the type for context value
interface SessionContextProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// Create the context with an initial default value
const SessionContext = createContext<SessionContextProps>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// Create the provider component
export const SessionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <SessionContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
