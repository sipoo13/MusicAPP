import React, { createContext, useState } from "react";

export interface AuthContextProps {
  isRegistered: boolean;
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const defaultState = {
  isRegistered: false,
  isAuth: false,
} as AuthContextProps;

export const AuthContext = createContext(defaultState);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <AuthContext.Provider value={{ isRegistered, setIsRegistered, isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
