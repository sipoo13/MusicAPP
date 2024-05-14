import React, { createContext, useState } from "react";
import { AuthUserInfo } from "../types/types";

export interface AuthContextProps {
  isRegistered: boolean;
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  authUser: AuthUserInfo | undefined;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUserInfo | undefined>>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const defaultState = {
  isRegistered: false,
  isAuth: false,
  authUser: undefined,
} as AuthContextProps;

export const AuthContext = createContext(defaultState);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUserInfo | undefined>(undefined);

  return (
    <AuthContext.Provider value={{ isRegistered, setIsRegistered, isAuth, setIsAuth, authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
