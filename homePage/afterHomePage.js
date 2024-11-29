import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

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

// Get userId from localStorage
const userId = localStorage.getItem('uid'); // Fetch the user's UID from localStorage

// Reference to the profile image element
const profileImage = document.getElementById('profile-picture');

// Function to fetch and display the profile picture
function loadProfilePicture() {
    console.log("Fetching profile picture for user:", userId); // Debug log
    if (userId) {
        const userRef = ref(db, 'users/' + userId); // Reference to user's data
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                console.log("User data fetched:", userData); // Log user data for debugging

                if (userData.profilePicture) {
                    console.log("Profile Picture URL:", userData.profilePicture); // Debug log
                    profileImage.src = userData.profilePicture; // Set the profile image to the fetched URL
                    profileImage.style.display = 'block'; // Ensure the image is visible
                } else {
                    console.log("No profile picture available.");
                    profileImage.src = 'path/to/default-image.jpg'; // Set a fallback image
                    profileImage.style.display = 'block'; // Ensure it's visible even with fallback
                }
            } else {
                console.log("No data available for this user.");
            }
        }).catch((error) => {
            console.error("Error fetching user data:", error);
        });
    } else {
        console.log("No user logged in.");
    }
}

// Wait for DOM content to be fully loaded before executing the script
window.addEventListener('DOMContentLoaded', (event) => {
    loadProfilePicture(); // Call the function to load the profile picture
});

