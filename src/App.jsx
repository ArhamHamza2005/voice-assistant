import React, { useContext } from 'react';
import { datacontext } from './context/UserContext';
import './App.css'; // Import the CSS for styling

function App() {
  const { recognition } = useContext(datacontext);

  return (
    <div className="app-container">
      <h1 className="heading">Hello, I'm Your Voice Assistant</h1>
      <p className="instruction">Click the button below to start listening:</p>
      <button
        className="start-btn"
        onClick={() => {
          recognition.start();
        }}
      >
        Start Listening 🎤
      </button>
    </div>
  );
}

export default App;
