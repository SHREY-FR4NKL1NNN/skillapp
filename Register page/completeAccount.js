import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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
const db = getFirestore(app);

// DOM references
const form = document.getElementById('complete-account-form');
const skills = [];
const skillInput = document.getElementById('skill-input');
const skillsList = document.getElementById('skills-list');
const addSkillButton = document.getElementById('add-skill');

// Add skill to list
addSkillButton.addEventListener('click', () => {
    const skill = skillInput.value.trim();
    if (skill) {
        skills.push(skill);
        const listItem = document.createElement('li');
        listItem.textContent = skill;
        skillsList.appendChild(listItem);
        skillInput.value = '';
    } else {
        alert("Please enter a valid skill.");
    }
});

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const country = document.getElementById('country').value.trim();
    const phoneNumber = document.getElementById('phone-number').value.trim();

    if (!username || !country || !/^\d{10}$/.test(phoneNumber)) {
        alert("Please fill in all fields correctly.");
        return;
    }

    console.log("Attempting to save data to Firestore...");

    try {
        await setDoc(doc(db, "users", username), {
            username: username,
            skills: skills,
            country: country,
            phoneNumber: phoneNumber
        });
        alert("Account setup complete! Data saved to Firestore.");
        window.location.href = "../homePage/afterHomePage.html";
    } catch (error) {
        console.error("Error saving data to Firestore:", error);
        alert("An error occurred while saving data. Please try again.");
    }
});
