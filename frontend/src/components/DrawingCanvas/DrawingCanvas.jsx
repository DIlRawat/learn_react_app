import React, { useRef, useEffect, useState } from 'react';
import './DrawingCanvas.css';

const DrawingCanvas = ({ onPrevious, onNext, disablePrevious, disableNext }) => {

  // reference to the canvas DOM element. 
  // To interact with the canvas API(getContext) without re-rendering the component
  const canvasRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState(null);

  // Initializing the drawing environment by retrieving the canva's 2d context: ctx via canvas.getContext(2d)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas defaults
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // calculates the mouse position relative to the canvas
    const getMousePos = (canvas, evt) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
      };
    };

    // Mouse Event Handlers

    // captures the starting position of the mouse when the user clicks on the canvas.
    // Enable the drawing mode by setting isDrawing to true.
    const handleMouseDown = (e) => {
      const pos = getMousePos(canvas, e);
      setLastPos(pos);
      setIsDrawing(true);
    };

    // Checks if the user is actively drawing and if a starting position exists
    const handleMouseMove = (e) => {
      if (!isDrawing || !lastPos) return;

      const pos = getMousePos(canvas, e);
      ctx.beginPath(); // Starts a new path for drawing
      ctx.moveTo(lastPos.x, lastPos.y); //Moves the starting point of the path to the last recorded position.
      ctx.lineTo(pos.x, pos.y); // Draws a line to  the new mouse position
      ctx.stroke(); // Applies the stroke to render the line

      setLastPos(pos);
    };

    // Stop drawing by setting isDrawing to false
    // Reset the lastPos to null to terminate the path
    const handleMouseUp = () => {
      setIsDrawing(false);
      setLastPos(null); // Reset last position
    };

    // 
    const handleMouseOut = () => {
      setIsDrawing(false);
      setLastPos(null); // Reset last position when mouse leaves the canvas
    };

    // Attach event listeners to the canvas for the relevant mouse evelnts
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseout', handleMouseOut);

    return () => {
      // Cleanup event listeners on unmount to prevent memory leaks and unexpected behaviour
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isDrawing, lastPos]); // Dependencies 
  // If the value of isDrawing and lastPos changes, the effect will re-run to ensure the handlers have access to the latest values.

  // Clear the canvas by erasing everything within the canvas boundaries
  const handleClear = () => {
    // Clear the prediction text with transition
    const predicted_text = document.getElementsByClassName("ocr-prediction")[0];
    if (predicted_text) {
      predicted_text.classList.add("fade-out"); // Start fade-out animation
      setTimeout(() => {
        predicted_text.textContent = "";
        predicted_text.classList.remove("fade-out"); // Remove after transition
      }, 300); // Match the CSS transition duration
    }


    const canvas = canvasRef.current; // retrieves the current DOM node for the canvas element using the React useRef Hook
    if (!canvas) return; // If the canvas element is not rendered or no longr exists, the fnction exists early with return
    const ctx = canvas.getContext('2d'); // Retrieves the 2D rendering context of the canvas. Needed to draw or clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clearning the entire canvas starting at the 0,0: top left
  };

  //handle check function
  const handleCheckLetter = async () => {
    const canvas = document.getElementById("ref-canvas");
    const fullDataURL = canvas.toDataURL();
    const dataURL = fullDataURL.replace(/^data:image\/\w+;base64,/, "");
    // console.log(dataURL);

    try {
      const response = await fetch("http://127.0.0.1:8000/easyocr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ img_str: dataURL }),
      });

      if (response.ok) {
        const result = await response.json();
        const prediction_text = document.getElementsByClassName("ocr-prediction")[0];
        if (prediction_text) {
          prediction_text.classList.remove("fade-out"); // Ensure visible
          prediction_text.textContent = "Prediction: " + result.result[0];
        }
      }
      else {
        console.error("Failed to get response from the server");
      }
    }
    catch (error) {
      console.error("Error:", error);
    }
  };

  // Clear the prediction section
  // function clearPredictionText() {
  //   const predicted_text  = document.getElementsByClassName("ocr-prediction");
  //   predicted_text.textContent = " ";

  // }

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        width={500}
        height={300}
        id="ref-canvas"
      />
      <div className='button-wrapper'>
        <button onClick={() => { handleClear(); onPrevious(); }} disabled={disablePrevious}>Previous</button>
        <button onClick={handleClear} className='clear-button '>Clear</button>
        <button onClick={() => { handleClear(); onNext(); }} disabled={disableNext}>Next</button>
        <button onClick={handleCheckLetter}>Check Me</button>
      </div>
      <div className='prediction-container'>
        <p className='ocr-prediction'></p>
      </div>

    </div>
  );
};

export default DrawingCanvas;
