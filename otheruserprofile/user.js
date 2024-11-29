// Open Chat Box
function openChat() {
    document.getElementById("chat-box").classList.remove("hidden");
}

// Close Chat Box
function closeChat() {
    document.getElementById("chat-box").classList.add("hidden");
}

// Handle Sending Messages
function sendMessage() {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value.trim();
    if (message) {
        addMessage("You", message);
        messageInput.value = "";
        // Simulate a reply from John Doe (for demo purposes)
        setTimeout(() => addMessage("John Doe", "Thank you for reaching out!"), 1000);
    }
}

// Add Messages to the Chat Window
function addMessage(sender, message) {
    const chatMessages = document.getElementById("chat-messages");
    const messageElement = document.createElement("div");
    messageElement.className = "message";
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
}

// Handle Enter Key to Send Message
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
