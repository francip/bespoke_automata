import { useEffect } from "react";
import { LGraph } from "litegraph.js";

const useGraphChangeHandler = (graph: LGraph | null) => {
    useEffect(() => {
        if (!graph) return;

        const handleGraphChange = () => {
            const graph_data = JSON.stringify(graph.serialize());
            localStorage.setItem("current_loaded_graph_name", graph_data);
        };

        graph.setCallback("onAfterChange", handleGraphChange);

        return () => {
            graph.setCallback("onAfterChange", () => {});
        };
    }, [graph]);
};

export default useGraphChangeHandler;
