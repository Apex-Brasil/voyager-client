import { useContext } from "react";

import { GoogleAuthContext } from "../context/GoogleAuthContext";

export const useGoogleAuth = () => {
  const context = useContext(GoogleAuthContext);

  return context;
};
