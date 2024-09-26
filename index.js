const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;
const API_KEY = "AIzaSyBkBjn7dBk5WcA-jxGL4t-jxvWKB2WfXOY";

const createChatLi = (message, className)=>{
    // Create a chat <li> element with passed message and clasName
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = () =>{
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;
    
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          contents: [{ 
            role: "user", 
            parts: [{ text: userMessage }] 
          }] 
        }),
      };
      
      fetch(API_URL, requestOptions).then(res => res.json()).then(data =>{
        console.log(data);
      }).catch((error) => {
        console.log(error);
      })
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    //Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));

    setTimeout(() => {
        //Display "Thinking..." message while waiting for response
        chatbox.appendChild(createChatLi("Thinking...", "incoming"));

    },600);
}

sendChatBtn.addEventListener("click", handleChat);