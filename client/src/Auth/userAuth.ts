import axios from "axios";

import { useCallback } from "react";
import { useAccountStore } from "./store";

export enum AuthStatus {
  Unknown = 0,
  Authenticated = 1,
  Guest = 2,
}

export default function userAuth() {
  const { account, setAccount } = useAccountStore();

  let status = AuthStatus.Unknown;

  switch (account) {
    case null:
      status = AuthStatus.Guest;
      break;
    case undefined:
      status = AuthStatus.Unknown;
      break;
    default:
      status = AuthStatus.Authenticated;
  }

  const authenticate = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/me`, { withCredentials: true })
      .then(() => setAccount)
      .catch(() => setAccount(null));
  }, [setAccount]);

  const logout = useCallback(() => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/logout`)
      .then(() => setAccount)
      .catch((e) => console.error(e));
  }, [setAccount]);

  return {
    account,
    status,
    authenticate,
    logout,
  };
}
