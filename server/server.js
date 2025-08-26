import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());


const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

app.get("/", (request, response) => {
    response.json("This is just the get endpoint. Mvoe along, please");
});

app.post("/chat", async (request, response) => {
    const prompt = request.body.prompt;
if (!prompt) {
    return response.status(400).json("no prompt given.");
}
try {
const model = ai.getGenerativeModel({ model: "gemini-2.0.flash" });
const result = await model.generateContent(prompt);
const geminiResponse = result.response.text();
response.json(geminiResponse);
} catch (error) {
    console.error("Error with Gemini API", error);
    response.status(500).json("Error generating response from Germini");
}
   
});

app.listen(PORT, function() {
    console.log("Running on localhost:${PORT}");
});

