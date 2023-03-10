import "../styles/globals.css";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import axios from "axios";
import baseUrl from "config/AppBaseURL";
import { QueryClient, QueryClientProvider } from "react-query";

const theme = {
  primary: "#40A9FF",
  primary_200: "#deeaff",
  icon_dark_grey: "#61656f",
  icon_light_grey: "#8292ac",
  text_grey_1: "#61656c",
  bg_grey_3: "#d2ddec",
  text_grey_2: "#a1a3a8",
  primary_drawer_icon: "#0565ff",
  light_yes_no: "#EEF3F8",
  error_box_bg: "#EEF3F9",
  error_text: "#DF4440",
};

axios.defaults.baseURL = baseUrl;

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
