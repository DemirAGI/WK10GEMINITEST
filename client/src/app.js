const responseList = document.getElementById("response-list");
         const form = document.getElementById("chat-form");

         form.addEventListener("submit", sendChatRequest);

         async function sendChatRequest(event) {
           event.preventDefault();
           const protein = event.target.protein.value;
           const allergens = event.target.allergens.value;
           console.log("Protein target:", protein, "Allergens:", allergens);

           // Validate protein input
           const proteinInt = parseInt(protein);
           if (isNaN(proteinInt) || proteinInt < 0 || proteinInt > 25000 || protein !== proteinInt.toString()) {
             const responseP = document.createElement("p");
             responseP.textContent = "Error: Protein target must be an integer between 0 and 25000.";
             responseList.appendChild(responseP);
             return;
           }

           try {
             const response = await fetch("https://gemini-chat-test.onrender.com/chat", {
               method: "POST",
               headers: {
                 "Content-Type": "application/json"
               },
               body: JSON.stringify({ protein, allergens })
             });

             if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);
             const data = await response.json();

             const responseP = document.createElement("p");
             responseP.textContent = data;
             responseList.appendChild(responseP);
           } catch (error) {
             console.error("Error fetching recipe:", error);
             const responseP = document.createElement("p");
             responseP.textContent = `Error: Could not get recipe from server: ${error.message}`;
             responseList.appendChild(responseP);
           }
         }