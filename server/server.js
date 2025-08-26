import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080; // Render's port or 8080

app.use(cors());
app.use(express.json());

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (request, response) => {
  response.json("This is just the get endpoint. Move along, please");
});

app.post("/chat", async (request, response) => {
  const prompt = request.body.prompt;
  if (!prompt) {
    return response.status(400).json("No prompt given.");
  }

  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const geminiResponse = result.response.text();
    response.json(geminiResponse);
  } catch (error) {
    console.error('Error with Gemini API:', error);
    response.status(500).json("Error generating response from Gemini");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});