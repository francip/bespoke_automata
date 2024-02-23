import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";

const container = document.getElementById("root");

if (container === null) throw new Error("No app container found");

const root = createRoot(container);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
