import "@fontsource/poppins";
import "@fontsource/poppins/500.css";
import "../styles/globals.css";
import "../styles/typography.css";
import "../styles/toggleSwitchStyles.css";
import "../styles/burguerMenuStyles.css";
import "regenerator-runtime/runtime.js";
import "react-toastify/dist/ReactToastify.css";
import "../styles/tooltipStyles.css";
import "react-loading-skeleton/dist/skeleton.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { ApiProvider } from "../context/ApiContext";
import { AuthProvider } from "../context/AuthContext";
import { EndpointProvider } from "../context/EndPointContext";
import { GoogleAuthProvider } from "../context/GoogleAuthContext";
import { queryClient } from "../lib/query";
import store from "../redux/store";
import { MainTemplate } from "../templates";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GoogleAuthProvider>
          <AuthProvider>
            <ApiProvider>
              <EndpointProvider>
                <ThemeProvider attribute="class">
                  <MainTemplate>
                    <Component {...pageProps} />
                    <ToastContainer autoClose={10000} />
                  </MainTemplate>
                </ThemeProvider>
              </EndpointProvider>
            </ApiProvider>
          </AuthProvider>
        </GoogleAuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
