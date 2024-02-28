import "./App.module.scss";
import background from "@assets/background.jpg";

import { CssVarsProvider } from "@mui/joy/styles";
import {
    IconButton,
    ScopedCssBaseline,
    Sheet,
    Stack,
    Typography,
} from "@mui/joy";
import { PlayCircleOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";

export function App() {
    const [root, setRoot] = useState<HTMLDivElement | null>(null);
    const [height, setHeight] = useState(window.innerHeight);

    console.log(background);

    useEffect(() => {
        const updateHeight = (): void => {
            setHeight(window.innerHeight);
        };

        window.addEventListener("resize", updateHeight);

        return (): void => {
            window.removeEventListener("resize", updateHeight);
        };
    }, []);

    return (
        <CssVarsProvider colorSchemeNode={root} defaultMode="system">
            <ScopedCssBaseline ref={(element) => setRoot(element)}>
                <Sheet>
                    <Stack
                        height={`${height}px`}
                        flex="1"
                        justifyContent="stretch"
                        alignItems="stretch"
                        padding="16px"
                        sx={{
                            backgroundImage: `url('${background}')`,
                            backgroundRepeat: "repeat",
                            backgroundColor: "cyan",
                        }}
                    >
                        <Stack direction="row" justifyContent="space-between">
                            <Typography level="body-lg">
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
                        <Stack
                            flex="1"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <h1>💖 Hello World!</h1>
                            <p>Welcome to your Electron application.</p>
                        </Stack>
                    </Stack>
                </Sheet>
            </ScopedCssBaseline>
        </CssVarsProvider>
    );
}
