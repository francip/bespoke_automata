import { type FC, useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/joy";

interface LeftPanelProps {
    onNewBrain: () => void;
    onImportBrain: () => void;
    onExportWorkspace: () => void;
    onImportWorkspace: () => void;
    onClearWorkspace: () => void;
    onFileClick: (fileName: string) => void;
}

const LeftPanel: FC<LeftPanelProps> = ({
    onNewBrain,
    onImportBrain,
    onExportWorkspace,
    onImportWorkspace,
    onClearWorkspace,
    onFileClick,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [fileList, setFileList] = useState<string[]>([]);

    useEffect(() => {
        const storedFileList = JSON.parse(
            localStorage.getItem("file_list") || "[]"
        );
        setFileList(storedFileList);
    }, []);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleNewBrainClick = () => {
        onNewBrain();
    };

    const handleImportBrainClick = () => {
        onImportBrain();
    };

    const handleExportWorkspaceClick = () => {
        onExportWorkspace();
    };

    const handleImportWorkspaceClick = () => {
        onImportWorkspace();
    };

    const handleClearWorkspaceClick = () => {
        onClearWorkspace();
    };

    const handleFileClick = (fileName: string) => {
        onFileClick(fileName);
    };

    const handleFileDelete = (fileName: string) => {
        const updatedFileList = fileList.filter((file) => file !== fileName);
        setFileList(updatedFileList);
        localStorage.setItem("file_list", JSON.stringify(updatedFileList));
        localStorage.removeItem(fileName);

        const currentLoadedGraphName = localStorage.getItem(
            "current_loaded_graph_name"
        );
        if (currentLoadedGraphName === fileName) {
            const newCurrentLoadedGraphName = updatedFileList[0] || "";
            localStorage.setItem(
                "current_loaded_graph_name",
                newCurrentLoadedGraphName
            );
            onFileClick(newCurrentLoadedGraphName);
        }
    };

    return (
        <Stack
            data-testid="left-panel"
            className={isVisible ? "visible" : "hidden"}
        >
            <Typography data-testid="file-list-title">Saved Brains</Typography>
            <Stack data-testid="file-list-element" spacing={1}>
                {fileList.map((file) => (
                    <Stack
                        key={file}
                        direction="row"
                        alignItems="center"
                        spacing={1}
                    >
                        <Button onClick={() => handleFileClick(file)}>
                            {file}
                        </Button>
                        <Button onClick={() => handleFileDelete(file)}>
                            X
                        </Button>
                    </Stack>
                ))}
            </Stack>
            <Stack data-testid="panel-bottom-buttons" spacing={1}>
                <Button data-testid="new-brain" onClick={handleNewBrainClick}>
                    New Brain
                </Button>
                <Button
                    data-testid="import-brain"
                    onClick={handleImportBrainClick}
                >
                    Import Brain
                </Button>
                <Button
                    data-testid="export-workspace"
                    onClick={handleExportWorkspaceClick}
                >
                    Export Workspace
                </Button>
                <Button
                    data-testid="import-workspace"
                    onClick={handleImportWorkspaceClick}
                >
                    Import Workspace
                </Button>
                <Button
                    data-testid="clear-workspace"
                    onClick={handleClearWorkspaceClick}
                >
                    Clear Workspace
                </Button>
            </Stack>
            <Button data-testid="left-panel-toggle" onClick={toggleVisibility}>
                {isVisible ? "◀" : "▶"}
            </Button>
        </Stack>
    );
};

export default LeftPanel;
