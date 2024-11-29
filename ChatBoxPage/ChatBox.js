
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyC5nNlEvHGxjL6mUpVU-Sj3mfX3xL813D8",
    authDomain: "chat-app-ffc61.firebaseapp.com",
    databaseURL: "https://chat-app-ffc61-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat-app-ffc61",
    storageBucket: "chat-app-ffc61.appspot.com",
    messagingSenderId: "142416175178",
    appId: "1:142416175178:web:bda5388ab401b4d883c6b3",
    measurementId: "G-03CJE05Y3E"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");


const messagesRef = ref(db, "messages");


const sender = prompt("Enter your name") || "Anonymous";


sendButton.addEventListener("click", () => {
    const messageText = chatInput.value.trim();
    if (messageText) {
        const message = {
            text: messageText,
            timestamp: Date.now(),
            sender: sender
        };
        push(messagesRef, message);
        chatInput.value = "";
    }
});


onChildAdded(messagesRef, (snapshot) => {
    const message = snapshot.val();
    appendMessage(message.text, message.sender === sender ? "sent" : "received", message.sender);
});


function appendMessage(text, type, senderName) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", type);
    messageDiv.innerHTML = `<strong>${senderName}:</strong> ${text}`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}