const responseList = document.getElementById("response-list");
         const form = document.getElementById("chat-form");

         form.addEventListener("submit", sendChatRequest);

         async function sendChatRequest(event) {
           event.preventDefault();
           const protein = String(event.target.protein.value).trim();
           const allergens = [
             event.target.allergen1.value.trim(),
             event.target.allergen2.value.trim(),
             event.target.allergen3.value.trim(),
             event.target.allergen4.value.trim(),
             event.target.allergen5.value.trim(),
             event.target.allergen6.value.trim(),
             event.target.allergen7.value.trim(),
             event.target.allergen8.value.trim(),
             event.target.allergen9.value.trim(),
             event.target.allergen10.value.trim()
           ].filter(a => a).join(", "); // Join non-empty allergens
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