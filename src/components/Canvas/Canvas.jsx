import { useCallback, useEffect, useRef, useState } from "react";
import "./Canvas.css";
import { Box } from "@mui/system";

const colors = ["black", "red", "green", "coral", "blue", "lightgray"];

const ClearIcon = () => <span>&#8709;</span>;
const StrokeIcon = () => <span>&#9723;</span>;
const FillIcon = () => <span>&#9724;</span>;
const OpenPathIcon = () => <span>&#8767;</span>;
const ClosedPathIcon = () => <span>&#8979;</span>;
const DownloadIcon = () => <span>&#10515;</span>;

export default function Canvas({ canvasOn }) {
  const canvasRef = useRef();
  const ctxRef = useRef();
  const [drawing, setDrawing] = useState(false);
  const [closePath, setClosePath] = useState(false);
  const [color, setColor] = useState(colors[0]);
  const [fill, setFill] = useState(false);
  const downloadLinkRef = useRef();
  const [thickness, setThickness] = useState(3);

  const resetContext = () => {
    ctxRef.current = canvasRef?.current?.getContext("2d");
    ctxRef.current.fillStyle = "transparent";
    ctxRef.current.fillRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    ctxRef.current.lineWidth = thickness;
    ctxRef.current.lineCap = "round";
    ctxRef.current.lineJoin = "round";
    ctxRef.current.strokeStyle = color;
    ctxRef.current.fillStyle = color;
  };

  useEffect(() => {
    canvasRef.current.height = window.innerHeight;
    canvasRef.current.width = window.innerWidth;
    resetContext();
  }, []);

  useEffect(() => {
    ctxRef.current = canvasRef?.current?.getContext("2d");
    ctxRef.current.strokeStyle = color;
    ctxRef.current.fillStyle = color;
    ctxRef.current.lineWidth = thickness;
  }, [color, thickness]);

  const onMouseMove = ({ pageX, pageY }) => {
    if (!drawing) return;
    ctxRef.current.lineTo(pageX, pageY);
    ctxRef.current.stroke();
  };
  const onMouseUp = ({ nativeTarget }) => {
    if (closePath) ctxRef.current.closePath();
    ctxRef.current.stroke();
    if (fill) ctxRef.current.fill();
    setDrawing(false);
  };

  const onMouseDown = ({ nativeTarget }) => {
    ctxRef.current.beginPath();
    setDrawing(true);
  };

  const toggleClosePath = useCallback(() => {
    setClosePath((prev) => !prev);
  }, []);

  const onClear = () => {
    // canvasRef.current.height = window.innerHeight - 100;
    canvasRef.current.width = window.innerWidth;
    resetContext();
  };

  const handleDownload = () => {
    const canvasDataUrl = canvasRef.current.toDataURL("image/png");
    downloadLinkRef.current.href = canvasDataUrl;
    downloadLinkRef.current.click();
  };

  return (
    <Box sx={{ display: canvasOn ? "flex" : "none", position: 'absolute' }}>
      <div className="canvas-wrapper">
        <canvas
          className="canvas-full-screen"
          ref={canvasRef}
          onMouseUp={onMouseUp}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseUp}
        />
        <ul className="toolbar">
          <li>
            <button onClick={onClear} aria-label="Clear">
              <ClearIcon />
            </button>
          </li>
          <li>
            <button
              onClick={() => setFill((f) => !f)}
              aria-label={fill ? "Turn off Fill" : "Turn on Fill"}
            >
              {fill ? <StrokeIcon /> : <FillIcon />}
            </button>
          </li>
          {colors.map((c) => (
            <li key={c}>
              <button
                className={`color-swatch ${c === color ? "current" : ""}`}
                value={c}
                style={{ "--color-swatch": c }}
                onClick={() => setColor(c)}
                aria-label={`Set color to be ${c}`}
              ></button>
            </li>
          ))}
          <li>
            <button
              onClick={toggleClosePath}
              aria-label={closePath ? "Open path" : "Close path"}
            >
              {closePath ? <OpenPathIcon /> : <ClosedPathIcon />}
            </button>
          </li>
          <li>
            <button onClick={handleDownload} aria-label="Download">
              <DownloadIcon />
            </button>
          </li>
        </ul>
        <input
          type="range"
          id="thickness"
          value={thickness}
          min="1"
          max="10"
          onChange={(e) => setThickness(e.target.value)}
        />

        {/* Visually hidden link to trigger download of image */}
        <a
          className="visually-hidden"
          ref={downloadLinkRef}
          download="canvas.png"
          aria-hidden="true"
          href="www.google.com"
          tabIndex="-1"
        >
          link
        </a>
      </div>
    </Box>
  );
}
