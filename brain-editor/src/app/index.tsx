import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource-variable/inter";
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/inter/slnt.css";

import { App } from "./components/App";

const container = document.getElementById("app");

if (container === null) throw new Error("No app container found");

const root = createRoot(container);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
