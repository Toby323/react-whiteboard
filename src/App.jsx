import { useState, useRef, useEffect } from "react";
import { FaPen, FaEraser, FaArrowsAltH } from "react-icons/fa";
import "./App.css";

function App() {
  const canvasRef = useRef();
  const sliderRef = useRef();

  const [slider, setSliderShow] = useState("none");
  const [mouseDownHeld, setMouseDown] = useState(false);
  const [pen, setPen] = useState(true);
  const [eraser, setEraser] = useState(false);

  function handlePenSwitch() {
    setPen(true);
    setEraser(false);
  }

  function handleEraserSwitch() {
    setEraser(true);
    setPen(false);
  }

  function handleSliderShow() {
    if (slider === "none") {
      setSliderShow("block");
    } else {
      setSliderShow("none");
    }
  }

  function drawLine(e) {
    if (mouseDownHeld) {
      if (pen) {
        const ctx = canvasRef.current.getContext("2d");
        ctx.lineWidth = sliderRef.current.value;
        ctx.strokeStyle = "black";
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.closePath();
      }
      if (eraser) {
        const ctx = canvasRef.current.getContext("2d");
        ctx.lineWidth = 100;
        ctx.strokeStyle = "white";
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }

  // Set our canvas size to the size of the viewport
  useEffect(() => {
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="DrawArea"
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
        onMouseMove={drawLine}></canvas>
      <div id="ControlContainer">
        <div
          className="FeatureContainer"
          id="PenContainer"
          onClick={handlePenSwitch}>
          <FaPen className="Features" id="PenFeature" />
        </div>
        <div id="InputLineSizeContainer" style={{ display: slider }}>
          <input
            type="range"
            id="LineSizeInput"
            step="2"
            min="1"
            max="100"
            orient="vertical"
            ref={sliderRef}></input>
        </div>
        <div
          onClick={handleSliderShow}
          className="FeatureContainer"
          id="LineSize">
          <FaArrowsAltH className="Features" id="LineSizeFeature" />
        </div>
        <div
          className="FeatureContainer"
          id="EraserContainer"
          onClick={handleEraserSwitch}>
          <FaEraser className="Features" id="EraserFeature" />
        </div>
      </div>
    </>
  );
}

export default App;
