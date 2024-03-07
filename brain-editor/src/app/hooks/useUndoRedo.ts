import { useEffect } from "react";
import { LGraph } from "litegraph.js";

const useUndoRedo = (graph: LGraph | null) => {
    useEffect(() => {
        if (!graph) return;

        const handleUndoRedo = (event: KeyboardEvent) => {
            if (event.ctrlKey || event.metaKey) {
                if (event.key === "z") {
                    event.preventDefault();
                    undo();
                } else if (event.key === "y") {
                    event.preventDefault();
                    redo();
                }
            }
        };

        const undo = () => {
            const saveBuffer = JSON.parse(
                localStorage.getItem("save_buffer") || "[]"
            );
            const saveBufferIndex = parseInt(
                localStorage.getItem("save_buffer_index") || "0"
            );

            if (saveBufferIndex > 0) {
                const previousState = saveBuffer[saveBufferIndex - 1];
                graph.configure(JSON.parse(previousState));
                localStorage.setItem(
                    "current_loaded_graph_name",
                    previousState
                );
                localStorage.setItem(
                    "save_buffer_index",
                    (saveBufferIndex - 1).toString()
                );
            }
        };

        const redo = () => {
            const saveBuffer = JSON.parse(
                localStorage.getItem("save_buffer") || "[]"
            );
            const saveBufferIndex = parseInt(
                localStorage.getItem("save_buffer_index") || "0"
            );

            if (saveBufferIndex < saveBuffer.length - 1) {
                const nextState = saveBuffer[saveBufferIndex + 1];
                graph.configure(JSON.parse(nextState));
                localStorage.setItem("current_loaded_graph_name", nextState);
                localStorage.setItem(
                    "save_buffer_index",
                    (saveBufferIndex + 1).toString()
                );
            }
        };

        document.addEventListener("keydown", handleUndoRedo);

        return () => {
            document.removeEventListener("keydown", handleUndoRedo);
        };
    }, [graph]);
};

export default useUndoRedo;
