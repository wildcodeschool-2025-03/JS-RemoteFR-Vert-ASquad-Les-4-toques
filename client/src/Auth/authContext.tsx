import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Account, ContextType } from "../types/definitions";

type ChildrenType = {
  children: React.ReactNode;
};

const AuthContext = createContext<ContextType | null>(null);

export function AuthProvider({ children }: ChildrenType) {
  const [account, setAccount] = useState<Account | null>(null);

  const isConnected = account != null;

  const authenticate = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/me`, { withCredentials: true })
      .then((response) => setAccount(response.data))
      .catch(() => setAccount(null));
  }, []);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  console.log("context account:", account, "connected?", isConnected);
  return (
    <AuthContext.Provider value={{ account, isConnected, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authState = useContext(AuthContext);
  if (!authState) {
    throw new Error("there's an error with Authprovider");
  }
  return authState;
};
