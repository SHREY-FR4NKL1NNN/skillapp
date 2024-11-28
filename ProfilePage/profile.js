import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
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
const db = getDatabase(app);

// DOM references
const usernameElem = document.getElementById('username');
const countryElem = document.getElementById('country');
const phoneNumberElem = document.getElementById('phone-number');
const skillsContainer = document.getElementById('skills-container');
const profilePictureElem = document.getElementById('avatar');

// Listen for authentication state change to get the current user's UID
onAuthStateChanged(auth, (user) => {
    if (user) {
        const userId = user.uid;  // Get the authenticated user's UID
        const userRef = ref(db, 'users/' + userId);  // Reference to the user's data in the database

        // Fetch user data from Realtime Database
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();

                // Populate the profile with the fetched data
                usernameElem.textContent = userData.username || 'No username set';
                countryElem.textContent = userData.country || 'No country set';
                phoneNumberElem.textContent = userData.phoneNumber || 'No phone number set';

                // Populate skills
                if (userData.skills && Array.isArray(userData.skills)) {
                    skillsContainer.innerHTML = '';  // Clear any previous skill data
                    userData.skills.forEach(skill => {
                        const skillElem = document.createElement('p');
                        skillElem.textContent = skill;
                        skillsContainer.appendChild(skillElem);
                    });
                } else {
                    skillsContainer.innerHTML = '<p>No skills added yet.</p>';
                }

                // Optionally, display the profile picture if available
                if (userData.profilePicture) {
                    profilePictureElem.src = userData.profilePicture;  // Assuming you have an <img> tag with this ID
                } else {
                    profilePictureElem.src = 'default-profile-picture-url';  // Default image if no profile picture exists
                }
            } else {
                console.log("No data available for the user.");
                alert("No profile data found.");
            }
        }).catch((error) => {
            console.error("Error fetching data from Realtime Database:", error);
        });
    } else {
        // If no user is signed in, you could redirect or show a message
        alert("User is not signed in.");
    }
});
