import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router";
import { router } from "./routers";
import { Toaster } from "sonner";
import { store } from "./redux/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
      <Toaster richColors />
    </ReduxProvider>
  </StrictMode>
);
