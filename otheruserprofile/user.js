import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAiKb62wolxendqGdHNXgJbpD9iW1AZ_2o",
    authDomain: "login-a6bd8.firebaseapp.com",
    projectId: "login-a6bd8",
    storageBucket: "login-a6bd8.appspot.com",
    messagingSenderId: "438254811414",
    appId: "1:438254811414:web:e99cc823002faf74e33837",
    measurementId: "G-H4291FRM9W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to load the profile data based on the `userId`
function loadUserProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    
    if (!userId) {
        console.error("No userId in URL.");
        return;
    }

    const userRef = ref(db, `users/${userId}`);
    onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
            const user = snapshot.val();

            // Fetch and show each available user detail
            document.getElementById("avatar").src = user.profilePicture || 'https://example.com/default-profile-icon.jpg';
            document.getElementById("username").textContent = user.username || 'Anonymous';
            document.getElementById("country").textContent = user.country || 'Unknown';

            // Handle Skills, ensuring we show only if available
            const skillsContainer = document.getElementById("skills-container");
            if (user.skills && Array.isArray(user.skills)) {
                skillsContainer.innerHTML = '';
                user.skills.forEach(skill => {
                    const skillItem = document.createElement("div");
                    skillItem.className = "skill-item";
                    skillItem.textContent = skill;
                    skillsContainer.appendChild(skillItem);
                });
            } else {
                skillsContainer.textContent = 'No Skills Available';
            }

            // Handle Bio, if present
            const bio = user.bio || 'No Bio Available';
            document.getElementById("bio").textContent = bio;

            // Handle Phone Number
            const phoneNumber = user.phoneNumber || 'Phone number not available';
            document.getElementById("phone-number").textContent = phoneNumber;

            // Handle Availability
            const availability = user.availability || 'Not Available';
            document.getElementById("availability").textContent = availability;
        } else {
            console.warn("User data not found.");
        }
    });
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', loadUserProfile);