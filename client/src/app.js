const responseDiv = document.getElementById("responses");
document.querySelector("form").addEventListener("submit", sendChatRequest);

async function sendChatRequest(event) {
    event.preventDefault();
    const prompt = event.target.prompt.value;
    console.log(prompt); // We're checking that we get the value we want!

//We fetch request to where our server is running and to the '/chat' endpoint, and 'await' the response;
const response = await fetch("http://localhost:8080/chat", {
    //in the options, we tell it to use the "POST" method:
    method: "POST",
    headers: {
        "Content-type": "applicaiton/json",
    },
    // and we send the prompt in the 'body' of the request, like so:
    body: JSON.stringify({
        prompt,
    }),
});
// After the fetch request has finished, we want to see what comes back from the server:
const data = await response.json();
console.log(data);
const responseP = document.createElement("p");
responseP.textContent = data;
responsesDiv.appendChild(responseP);
}