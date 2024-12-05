let apikey="AIzaSyCAkz5CAg4BUZ7C_UtZNtiew0MZwy6Vw1U"
import{
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const genAI = new GoogleGenerativeAI(apikey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 50,
    responseMimeType: "text/plain",
  };
  
 export async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
     return result.response.text()
  }
  