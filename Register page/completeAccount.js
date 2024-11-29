import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

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

// Get user UID from URL (passed from the registration page)
const urlParams = new URLSearchParams(window.location.search);
const uid = urlParams.get('uid');

// DOM references
const form = document.getElementById('complete-account-form');
const skills = [];
const skillInput = document.getElementById('skill-input');
const skillsList = document.getElementById('skills-list');
const addSkillButton = document.getElementById('add-skill');
const profilePictureGrid = document.getElementById('profile-picture-grid');
const selectedProfilePicture = document.getElementById('selected-profile-picture');
const profileSelectionError = document.getElementById('profile-selection-error');

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

// Profile picture selection
profilePictureGrid.addEventListener('click', (event) => {
    if (event.target.classList.contains('profile-option')) {
        document.querySelectorAll('.profile-option').forEach((img) => img.classList.remove('selected'));
        event.target.classList.add('selected');
        selectedProfilePicture.value = event.target.src; // Store selected image URL
        profileSelectionError.style.display = 'none'; // Hide error message
    }
});

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const bio = document.getElementById('bio').value.trim();
    const profilePicture = selectedProfilePicture.value;
    const country = document.getElementById('country').value.trim();
    const phoneNumber = document.getElementById('phone-number').value.trim();

    // Validation
    if (!username || !bio || !country || !/^\d{10}$/.test(phoneNumber) || !profilePicture) {
        if (!profilePicture) {
            profileSelectionError.style.display = 'block';
        }
        alert("Please fill in all fields correctly.");
        return;
    }

    try {
        const userRef = ref(db, 'users/' + uid);
        await set(userRef, {
            username,
            bio,
            skills,
            profilePicture,
            country,
            phoneNumber
        });

        console.log("User data saved successfully");
        alert("Account setup complete! Data saved to Realtime Database.");

        localStorage.setItem('uid', uid);
        window.location.href = "../homePage/afterHomePage.html";
    } catch (error) {
        console.error("Error saving data to Realtime Database:", error);
        alert("An error occurred while saving data. Please try again.");
    }
});
