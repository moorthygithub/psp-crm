import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { TooltipProvider } from "./components/ui/tooltip.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <TooltipProvider>
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <QueryClientProvider client={queryClient}>
            {" "}
            <App />
          </QueryClientProvider>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  </TooltipProvider>
);
