const responseList = document.getElementById("response-list");
const form = document.getElementById("chat-form");

form.addEventListener("submit", sendChatRequest);

async function sendChatRequest(event) {
  event.preventDefault();
  const prompt = event.target.prompt.value;
  console.log("Prompt sent:", prompt);

  try {
    const response = await fetch("https://gemini-chat-test.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();

    const responseP = document.createElement("p");
    responseP.textContent = data;
    responseList.appendChild(responseP);
  } catch (error) {
    console.error("Error fetching response:", error);
    const responseP = document.createElement("p");
    responseP.textContent = "Error: Could not get response from server.";
    responseList.appendChild(responseP);
  }
}