// routes
import React from "react";
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import "bootstrap/dist/css/bootstrap.min.css";

import CertifyDocument from "./pages/CertifyDocument";

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
      < CertifyDocument/>
    </ThemeProvider>
  );
}



