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
const db = getDatabase(app);

// Function to fetch and display the profile picture
function loadProfilePicture() {
    const userId = localStorage.getItem('uid');
    const profileImage = document.getElementById('profileIcon');

    if (!profileImage) {
        console.error("Profile image element not found.");
        return;
    }

    if (!userId) {
        console.log("No user logged in.");
        profileImage.src = 'path/to/default-image.jpg';
        profileImage.style.display = 'block';
        return;
    }

    const userRef = ref(db, `users/${userId}`);
    get(userRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                profileImage.src = userData.profilePicture || 'path/to/default-image.jpg';
            } else {
                profileImage.src = 'https://imgs.search.brave.com/Ct_Ry0WKdR3KWGIn5Ibd5znBQpfVaCNY2mPl2n2WlhE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY0LzY3LzYz/LzM2MF9GXzY0Njc2/MzgzX0xkYm1oaU5N/NllwemIzRk00UFB1/RlA5ckhlN3JpOEp1/LmpwZw';
            }
            profileImage.style.display = 'block';
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
            profileImage.src = 'path/to/default-image.jpg';
            profileImage.style.display = 'block';
        });

    profileImage.parentElement.addEventListener('click', () => {
        window.location.href = '/skillapp/profilePage/profilepage.html';
    });
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    loadProfilePicture();
});
