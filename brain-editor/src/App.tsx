import "./App.module.scss";

import { CssVarsProvider } from "@mui/joy/styles";
import {
    IconButton,
    Sheet,
    Stack,
    Typography,
} from "@mui/joy";
import { PlayCircleOutline } from "@mui/icons-material";

export function App() {
    return (
        <CssVarsProvider defaultMode="system">
            <Sheet>
                <Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography level="body-sm">
                            Bespoke Automata
                        </Typography>
                        <IconButton
                            size="sm"
                            variant="outlined"
                            onClick={() => {}}
                        >
                            <PlayCircleOutline fontSize="small" />
                        </IconButton>
                    </Stack>
                    <div className="app">
                        <h1>💖 Hello World!</h1>
                        <p>Welcome to your Electron application.</p>
                    </div>
                </Stack>
            </Sheet>
        </CssVarsProvider>
    );
}
