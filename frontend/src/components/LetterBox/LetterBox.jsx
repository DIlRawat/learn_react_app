import React from 'react';
import speakerIcon from '../../assets/volume-high-solid.svg';
import './LetterBox.css';

const LetterBox = ({ letter }) => {
  const sepeak_letter = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(letter);
    synth.speak(utterance);
  };
  return (
    <div className="letter-box">
      <div className="content-container">
        <span className="letter">{letter}</span>
        <img src={speakerIcon} alt="Speaker" onClick={sepeak_letter} className="speaker-icon"/>
      </div>
    </div>
  );
};

export default LetterBox;