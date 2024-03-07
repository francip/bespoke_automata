import { type FC, useEffect, useRef } from "react";
import { LGraph, LGraphCanvas } from "litegraph.js";

interface MyCanvasProps {
    graph: LGraph | null;
}

const MyCanvas: FC<MyCanvasProps> = ({ graph }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current && graph) {
            const canvas = new LGraphCanvas(canvasRef.current, graph);
            canvas.setZoom(1, [
                canvas.canvas.width / 2,
                canvas.canvas.height / 2,
            ]);
            canvas.startRendering();

            const resizeObserver = new ResizeObserver(() => {
                canvas.resize();
                updateEditorHiPPICanvas(canvasRef.current);
            });
            resizeObserver.observe(canvasRef.current);

            return () => {
                canvas.stopRendering();
                resizeObserver.disconnect();
            };
        }
        return void 0;
    }, [graph]);

    const updateEditorHiPPICanvas = (canvas: HTMLCanvasElement | null) => {
        const ratio = window.devicePixelRatio;
        if (ratio === 1 || !canvas) return;

        const width = Math.max(
            document.documentElement.clientWidth || 0,
            window.innerWidth || 0
        );
        const height = Math.max(
            document.documentElement.clientHeight || 0,
            window.innerHeight || 0
        );

        canvas.width = width * ratio;
        canvas.height = height * ratio;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.getContext("2d")?.scale(ratio, ratio);
    };

    return (
        <canvas
            ref={canvasRef}
            style={{ flexGrow: 1, width: "100%", height: "100%" }}
        />
    );
};

export default MyCanvas;
