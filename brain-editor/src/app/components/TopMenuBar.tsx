import { type FC, useState, useEffect } from "react";
import { Button, Input, Stack, Typography } from "@mui/joy";
import { PlayCircle as PlayCircleIcon } from "@mui/icons-material";
import type { LGraph } from "litegraph.js";

interface TopMenuBarProps {
    onRun: () => void;
    onSave: () => void;
    onFileNameChange: (fileName: string) => void;
    graph: LGraph | null;
}

const TopMenuBar: FC<TopMenuBarProps> = ({
    onRun,
    onSave,
    onFileNameChange,
    graph,
}) => {
    const [fileName, setFileName] = useState("untitled_brain");

    const handleFileNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newFileName = event.target.value;
        setFileName(newFileName);
        onFileNameChange(newFileName);
    };

    const handleFileNameBlur = () => {
        const currentLoadedGraphName = localStorage.getItem(
            "current_loaded_graph_name"
        );
        const fileList = JSON.parse(localStorage.getItem("file_list") || "[]");

        if (
            localStorage.getItem(fileName) &&
            fileName !== currentLoadedGraphName
        ) {
            if (window.confirm(`Overwrite ${fileName}?`)) {
                localStorage.setItem(
                    fileName,
                    JSON.stringify(graph?.serialize())
                );
                if (fileList.includes(fileName)) {
                    fileList.splice(fileList.indexOf(fileName), 1);
                    fileList.unshift(fileName);
                } else {
                    fileList.unshift(fileName);
                }
            } else {
                setFileName(currentLoadedGraphName || "");
            }
        } else {
            localStorage.setItem(fileName, JSON.stringify(graph?.serialize()));
            if (fileList.includes(fileName)) {
                fileList.splice(fileList.indexOf(fileName), 1);
                fileList.unshift(fileName);
            } else {
                fileList.unshift(fileName);
            }
        }

        localStorage.setItem("file_list", JSON.stringify(fileList));
        localStorage.setItem("current_loaded_graph_name", fileName);
        document.title = `Bespoke Automata - ${fileName}`;
    };
    const handleFileNameKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    const handleRunClick = () => {
        onRun();
    };

    const handleSaveHotkey = (event: KeyboardEvent) => {
        if (event.key === "s" && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            onSave();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleSaveHotkey);
        return () => {
            document.removeEventListener("keydown", handleSaveHotkey);
        };
    }, []);

    return (
        <Stack
            id="top_menu_bar"
            direction="row"
            alignItems="center"
            spacing={1}
        >
            <Stack direction="row" alignItems="center" spacing={1}>
                <Typography level="h1" fontSize="24px" margin={0}>
                    <span id="site_title_first">BESPOKE</span>
                    <span id="site_title_last">AUTOMATA</span>
                </Typography>
                <img id="site_icon" src="icon.svg" alt="icon" />
            </Stack>
            <Input
                id="top_menu_file_name"
                value={fileName}
                onChange={handleFileNameChange}
                onBlur={handleFileNameBlur}
                onKeyDown={handleFileNameKeyDown}
            />
            <div className="menu_gap" />
            <Button
                id="run"
                variant="outlined"
                onClick={handleRunClick}
                startDecorator={<PlayCircleIcon />}
            >
                Run
            </Button>
        </Stack>
    );
};

export default TopMenuBar;
