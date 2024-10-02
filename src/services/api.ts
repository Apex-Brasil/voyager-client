import axios from "axios";

import { config } from "../utils/config";

export const api = axios.create({
  baseURL: `${config.apiEndpoint}`,
});
