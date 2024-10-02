import { useContext } from "react";

import { ApiContext } from "../context/ApiContext";

export const useApi = () => {
  const context = useContext(ApiContext);

  const { api, setApi } = context;

  return { api, setApi };
};
