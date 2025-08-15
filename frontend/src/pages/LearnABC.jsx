// src/pages/LearnABC.jsx
import React, { useState } from 'react';
import LetterBox from '../components/LetterBox/LetterBox';
import DrawingCanvas from '../components/DrawingCanvas/DrawingCanvas';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const LearnABC = () => {
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const currentLetter = letters[currentLetterIndex];

    const handlePlaySound = () => {
        // Implement sound playing logic here
        console.log("Playing sound for", currentLetter);
      };
  
      const handleNext = () => {
          setCurrentLetterIndex((prevIndex) => Math.min(prevIndex + 1, letters.length-1));
      };
  
      const handlePrevious = () => {
          setCurrentLetterIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      };

  return (
    <div>
      <h1>You are now learning...</h1> {/* Added some content to see it */}
      <LetterBox letter={currentLetter} onPlaySound={handlePlaySound} />
      <DrawingCanvas
        onPrevious={handlePrevious}
        onNext={handleNext}
        disablePrevious={currentLetterIndex === 0}
        disableNext={currentLetterIndex === letters.length - 1}
      />
    </div>
  );
};

export default LearnABC;