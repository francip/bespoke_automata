import { useEffect, useRef } from "react";
import { LGraph } from "litegraph.js";

const usePeriodicSaving = (graph: LGraph | null, interval: number = 5000) => {
    const saveBufferRef = useRef<string[]>([]);
    const saveBufferIndexRef = useRef<number>(0);
    const saveBufferLengthRef = useRef<number>(10);
    const isSavingRef = useRef<boolean>(false);

    useEffect(() => {
        if (!graph) return;

        const periodicSave = () => {
            if (isSavingRef.current) return;

            const data = JSON.stringify(graph.serialize());

            if (data !== localStorage.getItem("current_loaded_graph_name")) {
                localStorage.setItem("current_loaded_graph_name", data);

                if (
                    saveBufferIndexRef.current <
                    saveBufferRef.current.length - 1
                ) {
                    saveBufferRef.current.splice(
                        saveBufferIndexRef.current + 1
                    );
                }
                saveBufferRef.current.push(data);
                if (
                    saveBufferRef.current.length > saveBufferLengthRef.current
                ) {
                    saveBufferRef.current.shift();
                }
                saveBufferIndexRef.current = saveBufferRef.current.length - 1;
            }
        };

        const intervalId = setInterval(periodicSave, interval);

        return () => {
            clearInterval(intervalId);
        };
    }, [graph, interval]);
};

export default usePeriodicSaving;
