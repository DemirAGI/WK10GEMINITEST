import express from 'express';
         import cors from 'cors';
         import dotenv from 'dotenv';
         import { GoogleGenerativeAI } from '@google/generative-ai';

         dotenv.config();

         const app = express();
         const PORT = process.env.PORT || 8080;

         app.use(cors({ origin: '*' }));
         app.use(express.json());

         if (!process.env.GEMINI_API_KEY) {
           console.error('Error: GEMINI_API_KEY is not set in environment variables');
           process.exit(1);
         }

         const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

         app.get("/", (request, response) => {
           response.json("This is just the get endpoint. Move along, please");
         });

         app.post("/chat", async (request, response) => {
           const { protein, allergens } = request.body;
           if (!protein || typeof protein !== 'string' || protein.trim() === "") {
             return response.status(400).json("No valid protein target provided.");
           }

           try {
             const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
             const prompt = `I'm on a strict diet, I need to hit a certain amount of protein per day. Can you give me a recipe that hits ${protein} grams of protein and excludes the following allergens: ${allergens || 'none'}. Limit cooking time to 30 mins including prep.`;
             const result = await model.generateContent(prompt);
             const geminiResponse = result.response.text();
             response.json(geminiResponse);
           } catch (error) {
             console.error('Error with Gemini API:', error);
             response.status(500).json(`Error generating recipe: ${error.message}`);
           }
         });

         app.listen(PORT, () => {
           console.log(`Server running on http://localhost:${PORT}`);
         });