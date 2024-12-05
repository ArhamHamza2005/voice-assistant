import React, { createContext } from 'react';
import { run } from '../gemini';

export const datacontext = createContext();

function UserContext({ children }) {
  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1; 
    text_speak.rate = 1;   
    text_speak.pitch = 1;  
      const voices = window.speechSynthesis.getVoices();
    const selectedVoice = 
      voices.find((voice) => voice.lang.startsWith("en") && voice.name.toLowerCase().includes("google")) ||
      voices.find((voice) => voice.lang.startsWith("en")) || 
      voices[0]; 
    if (selectedVoice) {
      text_speak.voice = selectedVoice;
    } else {
      console.warn("No suitable voice found, using default voice.");
    }
      window.speechSynthesis.speak(text_speak);
  }
   window.speechSynthesis.onvoiceschanged = () => {
  };
  
  async function aiReponce(prompt) {
    let text = await run(prompt);

    let newText = text
      .split("**").join("") // Remove "**"
      .split("*").join("")  // Remove "*"
      .replace(/google/gi, "arham hamza")
        speak(newText);
    
  }
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();

  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript;
    console.log('Transcript:', transcript);
    // aiReponce(transcript);
    takecommand(transcript.toLowerCase())
  };

  function takecommand(command) {
    if (command.includes("open") && command.includes("google")) {
      window.open("https://www.google.com", "_blank");
      speak("Opening Google");
    } else if (command.includes("open") && command.includes("facebook")) {
      window.open("https://www.facebook.com", "_blank");
      speak("Opening Facebook");
    } else if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com", "_blank");
      speak("Opening YouTube");
    } else if (command.includes("open") && command.includes("calculator")) {
      window.open("https://www.calculator.net", "_blank");
      speak("Opening Calculator");
    } else if (command.includes("open") && command.includes("linkedin")) {
      window.open("https://www.linkedin.com", "_blank");
      speak("Opening LinkedIn");
    } else if (command.includes("open") && command.includes("instagram")) {
      window.open("https://www.instagram.com", "_blank");
      speak("Opening Instagram");
    } else if (command.includes("open") && command.includes("twitter")) {
      window.open("https://www.twitter.com", "_blank");
      speak("Opening Twitter");
    } else {
      // Handle undefined commands with AI response
      aiReponce(command);
    }
  }

  let value = {
    recognition,
  };

  return (
    <div>
      <datacontext.Provider value={value}>
        {children}
      </datacontext.Provider>
    </div>
  );
}

export default UserContext;
