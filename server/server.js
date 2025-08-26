import express from 'express';
   import cors from 'cors';
   import dotenv from 'dotenv';
   import { GoogleGenerativeAI } from '@google/generative-ai';

   dotenv.config();

   const app = express();
   const PORT = process.env.PORT || 8080; // Use Render's PORT or default to 8080

   app.use(cors({ origin: '*' })); // Explicit CORS for all origins
   app.use(express.json());

   // Validate API key presence
   if (!process.env.GEMINI_API_KEY) {
     console.error('Error: GEMINI_API_KEY is not set in environment variables');
     process.exit(1);
   }

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
       response.status(500).json(`Error generating response from Gemini: ${error.message}`);
     }
   });

   app.listen(PORT, () => {
     console.log(`Server running on http://localhost:${PORT}`);
   });