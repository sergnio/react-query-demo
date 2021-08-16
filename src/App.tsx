import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "./styles.css";
import Layout from "./Layout";

const queryClient = new QueryClient();

export default () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <ThemeProvider theme={theme}>
        <Layout />
        <ReactQueryDevtools initialIsOpen />
      </ThemeProvider>
    </Router>
  </QueryClientProvider>
);

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: "Roboto Mono, monospace",
    },
    h2: {
      fontFamily: "Roboto Mono, monospace",
    },
    h3: {
      fontFamily: "Roboto Mono, monospace",
    },
    h4: {
      fontFamily: "Roboto Mono, monospace",
    },
    h5: {
      fontFamily: "Roboto Mono, monospace",
    },
    h6: {
      fontFamily: "Roboto Mono, monospace",
    },
  },
});
