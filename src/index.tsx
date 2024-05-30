import App from "App";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Material Dashboard 2 PRO React TS Context Provider
import { MaterialUIControllerProvider } from "context";
const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
