import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

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
const auth = getAuth(app);
const db = getDatabase(app); // Initialize the database

const form = document.querySelector('.edit-profile-form');
const profilePictureSelection = document.getElementById('profile-picture-selection');
const profilePicturePreview = document.getElementById('profile-picture-preview');
const usernameInput = document.getElementById('username');
const countryInput = document.getElementById('country');
const phoneNumberInput = document.getElementById('phone-number');
const skillInput = document.getElementById('skill-input');
const skillsList = document.getElementById('skills-list');
const addSkillButton = document.getElementById('add-skill');

// Get userId from localStorage
const userId = localStorage.getItem('uid'); // Fetch the user's UID from localStorage

let skills = [];

// Load user data from Firebase Realtime Database
function loadUserData() {
    console.log("Loading user data for userId:", userId);  // Log the user ID

    const userRef = ref(db, 'users/' + userId);
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            console.log("User data fetched:", userData);  // Log the user data to check if it's correct

            // Pre-fill input fields
            usernameInput.value = userData.username || '';
            countryInput.value = userData.country || '';
            phoneNumberInput.value = userData.phoneNumber || '';

            // Display skills
            if (userData.skills) {
                skillsList.innerHTML = ''; // Clear existing skills list
                userData.skills.forEach((skill, index) => {
                    const listItem = document.createElement('li');
                    listItem.textContent = skill;

                    // Add a remove button next to each skill
                    const removeButton = document.createElement('button');
                    removeButton.textContent = 'Remove';
                    removeButton.addEventListener('click', () => removeSkill(index));

                    listItem.appendChild(removeButton);
                    skillsList.appendChild(listItem);
                });
                skills = userData.skills; // Load existing skills into the array
            }

            // Display profile picture if available
            if (userData.profilePicture) {
                profilePicturePreview.src = userData.profilePicture;
            } else {
                console.log("No profile picture found.");
            }
        } else {
            console.log("No data available for the user.");
        }
    }).catch((error) => {
        console.error("Error fetching user data:", error);
    });
}

// Call loadUserData on page load
loadUserData();

// Handle profile picture selection
profilePictureSelection.addEventListener('click', (e) => {
    // Ensure the clicked target is an image with the class 'profile-option'
    if (e.target && e.target.classList.contains('profile-option')) {
        const selectedImage = e.target.getAttribute('data-image');
        profilePicturePreview.src = selectedImage;
    }
});

// Handle form submission for updating profile data
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const profilePictureURL = profilePicturePreview.src; // Get the selected image URL
    const username = usernameInput.value;
    const country = countryInput.value;
    const phoneNumber = phoneNumberInput.value;

    // Update profile information in Realtime Database
    const userRef = ref(db, 'users/' + userId);  // Update under 'users/{uid}'
    const updatedData = {
        username: username,
        country: country,
        phoneNumber: phoneNumber,
        skills: skills, // Skills are already in an array
        profilePicture: profilePictureURL || '', // Update with selected image URL
    };

    update(userRef, updatedData)
        .then(() => {
            alert('Profile updated successfully!');
            window.location.href = "../ProfilePage/profile.html"; // Redirect to profile page
        })
        .catch((error) => {
            alert('Error updating profile: ' + error.message);
        });
});

// Add skill functionality
addSkillButton.addEventListener('click', () => {
    const newSkill = skillInput.value.trim();
    if (newSkill) {
        // Add skill to the skills list UI
        const listItem = document.createElement('li');
        listItem.textContent = newSkill;

        // Add a remove button next to the new skill
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeSkill(skills.length));

        listItem.appendChild(removeButton);
        skillsList.appendChild(listItem);

        // Add skill to the skills array
        skills.push(newSkill);

        // Clear the input field
        skillInput.value = '';

        // Update skills in Firebase
        const userRef = ref(db, 'users/' + userId); // Reference to the user's data
        update(userRef, {
            skills: skills
        })
        .then(() => {
            console.log("Skill added successfully!");
        })
        .catch((error) => {
            console.error("Error updating skills in Firebase:", error);
        });
    } else {
        alert('Please enter a skill.');
    }
});

// Remove skill functionality
function removeSkill(index) {
    // Remove the skill from the array
    skills.splice(index, 1);

    // Update the UI to reflect the change
    skillsList.innerHTML = ''; // Clear the list
    skills.forEach((skill, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = skill;

        // Add a remove button next to each skill
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeSkill(index));

        listItem.appendChild(removeButton);
        skillsList.appendChild(listItem);
    });

    // Update the skills in Firebase
    const userRef = ref(db, 'users/' + userId); // Reference to the user's data
    update(userRef, {
        skills: skills
    })
    .then(() => {
        console.log("Skill removed successfully!");
    })
    .catch((error) => {
        console.error("Error updating skills in Firebase:", error);
    });
}
