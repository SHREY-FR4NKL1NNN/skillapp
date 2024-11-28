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

// Initialize Realtime Database
const db = getDatabase(app);

// Get user UID from URL (passed from the registration page)
const urlParams = new URLSearchParams(window.location.search);
const uid = urlParams.get('uid');  // Ensure this UID is passed correctly to the page

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
  e.preventDefault(); // Prevent default form submission

  const username = document.getElementById('username').value.trim();
  const country = document.getElementById('country').value.trim();
  const phoneNumber = document.getElementById('phone-number').value.trim();

  // Validation
  if (!username || !country || !/^\d{10}$/.test(phoneNumber)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  try {
    // Save the new user data to Realtime Database under the user's UID
    const userRef = ref(db, 'users/' + uid); // Path to store user data under 'users/{uid}'
    await set(userRef, {
      username: username,
      skills: skills,
      country: country,
      phoneNumber: phoneNumber
    });

    console.log("User data saved successfully");
    alert("Account setup complete! Data saved to Realtime Database.");

    // Store UID in localStorage for future use
    localStorage.setItem('uid', uid);

    // Redirect after saving data
    window.location.href = "../homePage/afterHomePage.html"; // Redirect to homepage or another page
  } catch (error) {
    console.error("Error saving data to Realtime Database:", error);
    alert("An error occurred while saving data. Please try again.");
  }
});
