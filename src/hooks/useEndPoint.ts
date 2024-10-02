import { useContext } from "react";

import { EndpointContext } from "../context/EndPointContext";

export const useEndpoint = () => {
  const context = useContext(EndpointContext);

  const { endpoint, setEndpoint } = context;

  return { endpoint, setEndpoint };
};
