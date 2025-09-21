import React from "react";
import ReactDOM from "react-dom"; // <-- not 'react-dom/client'
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";

import "./index.css";
import { GlobalStyles, StyledEngineProvider } from "@mui/material";
import { DialogProvider } from "./context/DialogProvider.jsx";

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider enableCssLayer>
      <CssBaseline />
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <DialogProvider>
        <App />
      </DialogProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
