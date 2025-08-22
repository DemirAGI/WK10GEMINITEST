import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

app.get("/", function (request, response) {
    response.json("This is just the get endpoint. Mvoe along, please");
});
app.post("/chat", async function (request, response) {
    const prompt = request.body.prompt;
    console.log(prompt); // output will be wahtever into your form.

    //This next line is what the server sends back. For now, it's just a confirmation message, but later we will change it to be the LLM's response.
    response.json("Prompt received")
});

app.listen(8080, function() {
    console.log("Running on port 8080");
});

app.post("/chat", async (request, response) +> {
    const prompt = request.body.prompt;
  
    // stop if we didn't give a prompt, so we don't waste our credits on an empty request
  if (!prompt) {
    response.json("No prompt given.");
  }

  response.json(prompt);

});

const geminiResponse = await ai.models.generateContent({
  // we declare a variable so that we can use the APIs response.
  model: "gemini-2.0-flash", // we specify a model to usel in this case, gemini-2.0-flash is the cheapest!
  contents: prompt, // we give our 'prompt' variable to the requests 'contents'. 'contents' is basically what the user types to the LLM.
  config: {
    systemInstruction: "You are a very helpful assistant.", // this is how we prompt engineer and give the LLM guided instructions.
  },
});

console.log("Geminis response is", geminiResponse.text); // Here you can see what Gemini has responded with!