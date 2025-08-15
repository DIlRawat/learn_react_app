import React, { useState } from 'react';
import LetterBox from '../components/LetterBox/LetterBox';
import DrawingCanvas from '../components/DrawingCanvas/DrawingCanvas';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']; // Array of numbers

const Learn123 = () => {
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const currentNumber = numbers[currentNumberIndex];

  const handlePlaySound = () => {
    // Implement sound playing logic here for numbers
    console.log("Playing sound for", currentNumber);
  };

  const handleNext = () => {
    setCurrentNumberIndex((prevIndex) => Math.min(prevIndex + 1, numbers.length - 1));
  };

  const handlePrevious = () => {
    setCurrentNumberIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div>
      <h1>You are now learning...</h1> {/* Added some content to see it */}
      <LetterBox letter={currentNumber} onPlaySound={handlePlaySound} />
      <DrawingCanvas
        onPrevious={handlePrevious}
        onNext={handleNext}
        disablePrevious={currentNumberIndex === 0}
        disableNext={currentNumberIndex === numbers.length - 1}
      />
    </div>
  );
};

export default Learn123;

//<DrawingCanvas />