import { useEffect, useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { ScopedCssBaseline, Sheet, Stack } from "@mui/joy";
import TopMenuBar from "./TopMenuBar";
import LeftPanel from "./LeftPanel";
import { LGraph } from "litegraph.js";
import MyCanvas from "./MyCanvas";
import JSZip from "jszip";
import useRegisterNodes from "@app/hooks/useRegisterNodes";
import useGraphChangeHandler from "@app/hooks/useGraphChangeHandler ";
import usePeriodicSaving from "@app/hooks/usePeriodicSaving";
import useUndoRedo from "@app/hooks/useUndoRedo";

export function App() {
    const [graph, setGraph] = useState<LGraph | null>(null);
    const [fileName, setFileName] = useState("untitled_brain");

    useRegisterNodes();
    useGraphChangeHandler(graph);
    usePeriodicSaving(graph);
    useUndoRedo(graph);

    useEffect(() => {
        const newGraph = new LGraph();
        setGraph(newGraph);
    }, []);

    const handleRun = () => {
        if (graph) {
            graph.runStep();
        }
    };

    const handleSave = () => {
        if (graph) {
            localStorage.setItem(fileName, JSON.stringify(graph.serialize()));
            const fileList = JSON.parse(
                localStorage.getItem("file_list") || "[]"
            );
            if (!fileList.includes(fileName)) {
                fileList.unshift(fileName);
                localStorage.setItem("file_list", JSON.stringify(fileList));
            }
        }
    };

    const handleFileNameChange = (newFileName: string) => {
        setFileName(newFileName);
        localStorage.setItem("current_loaded_graph_name", newFileName);
        document.title = `Bespoke Automata - ${newFileName}`;
    };

    const handleNewBrain = () => {
        if (graph) {
            const currentLoadedGraphName = localStorage.getItem(
                "current_loaded_graph_name"
            );
            if (currentLoadedGraphName) {
                localStorage.setItem(
                    currentLoadedGraphName,
                    JSON.stringify(graph.serialize())
                );
            }
            graph.clear();
            const newFileName = `untitled_brain_${Math.floor(
                Date.now() / 1000
            )}`;
            localStorage.setItem("current_loaded_graph_name", newFileName);
            document.title = `Bespoke Automata - ${newFileName}`;
        }
    };

    const handleImportBrain = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".brain";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const data = event.target?.result as string;
                    if (graph) {
                        graph.configure(JSON.parse(data));
                        const fileName = file.name.split(".")[0];
                        localStorage.setItem(fileName, data);
                        localStorage.setItem(
                            "current_loaded_graph_name",
                            fileName
                        );
                        document.title = `Bespoke Automata - ${fileName}`;
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    };

    const handleExportWorkspace = () => {
        const fileList = JSON.parse(localStorage.getItem("file_list") || "[]");
        const zip = new JSZip();
        fileList.forEach((fileName: string) => {
            const data = localStorage.getItem(fileName);
            if (data) {
                zip.file(fileName, data);
            }
        });
        zip.generateAsync({ type: "blob" }).then((content) => {
            const url = URL.createObjectURL(content);
            const link = document.createElement("a");
            link.href = url;
            link.download = "workspace.zip";
            link.click();
            URL.revokeObjectURL(url);
        });
    };

    const handleImportWorkspace = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".zip";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                JSZip.loadAsync(file).then((zip) => {
                    localStorage.clear();
                    const fileList: string[] = [];
                    zip.forEach((relativePath, zipEntry) => {
                        zipEntry.async("string").then((data) => {
                            const fileName = zipEntry.name.split(".")[0];
                            localStorage.setItem(fileName, data);
                            fileList.push(fileName);
                        });
                    });
                    localStorage.setItem("file_list", JSON.stringify(fileList));
                    const currentLoadedGraphName = fileList[0];
                    localStorage.setItem(
                        "current_loaded_graph_name",
                        currentLoadedGraphName
                    );
                    if (graph) {
                        const data = localStorage.getItem(
                            currentLoadedGraphName
                        );
                        if (data) {
                            graph.configure(JSON.parse(data));
                            document.title = `Bespoke Automata - ${currentLoadedGraphName}`;
                        }
                    }
                });
            }
        };
        input.click();
    };

    const handleClearWorkspace = () => {
        if (window.confirm("Clear workspace?")) {
            localStorage.clear();
            if (graph) {
                graph.clear();
            }
            document.title = "Bespoke Automata";
        }
    };

    const handleFileClick = (fileName: string) => {
        const data = localStorage.getItem(fileName);
        if (data && graph) {
            graph.configure(JSON.parse(data));
            localStorage.setItem("current_loaded_graph_name", fileName);
            document.title = `Bespoke Automata - ${fileName}`;
        }
    };

    return (
        <CssVarsProvider defaultMode="system">
            <ScopedCssBaseline>
                <Sheet>
                    <Stack>
                        <TopMenuBar
                            onRun={handleRun}
                            onSave={handleSave}
                            onFileNameChange={handleFileNameChange}
                            graph={graph}
                        />
                        <Stack direction="row">
                            <LeftPanel
                                onNewBrain={handleNewBrain}
                                onImportBrain={handleImportBrain}
                                onExportWorkspace={handleExportWorkspace}
                                onImportWorkspace={handleImportWorkspace}
                                onClearWorkspace={handleClearWorkspace}
                                onFileClick={handleFileClick}
                            />
                            <MyCanvas graph={graph} />
                        </Stack>
                    </Stack>
                </Sheet>
            </ScopedCssBaseline>
        </CssVarsProvider>
    );
}
