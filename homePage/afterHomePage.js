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

// Function to load the profile picture for the logged-in user
function loadProfilePicture() {
    const profileImage = document.getElementById('profileIcon');
    const userId = localStorage.getItem('uid'); // Assume uid is stored in localStorage when the user logs in

    if (!profileImage) {
        console.error("Profile image element not found.");
        return;
    }

    if (!userId) {
        console.warn("No user ID found. Using default image.");
        profileImage.src = 'https://example.com/default-profile-icon.jpg'; // Replace with your default icon URL
        return;
    }

    const userRef = ref(db, `users/${userId}`);
    onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            profileImage.src = userData.profilePicture || 'https://example.com/default-profile-icon.jpg';
        } else {
            console.warn("User data not found in database. Using default image.");
            profileImage.src = 'https://example.com/default-profile-icon.jpg';
        }
    }, (error) => {
        console.error("Error fetching user data:", error);
        profileImage.src = 'https://example.com/default-profile-icon.jpg';
    });
}

// Function to load all users and display them
function loadUsers() {
    const userGrid = document.getElementById('userGrid');
    const usersRef = ref(db, 'users');

    // Listen for real-time updates
    onValue(usersRef, (snapshot) => {
        userGrid.innerHTML = ''; // Clear existing content
        if (snapshot.exists()) {
            const users = snapshot.val();
            for (const userId in users) {
                const user = users[userId];
                const userCard = `
                    <a href="/otheruserprofile/user.html?userId=${userId}" class="user-card">
                        <div data-skills="${user.skills || ''}" data-rating="${user.rating || ''}" data-username="${user.username || ''}">
                            <img src="${user.profilePicture || 'https://example.com/default-profile-icon.jpg'}" alt="User Skill">
                            <h3>${user.username || 'Anonymous'}</h3>
                            <p>${user.skills || 'No Skills Listed'} | ${user.rating || 'No Rating'}⭐</p>
                        </div>
                    </a>`;
                userGrid.innerHTML += userCard;
            }
        } else {
            userGrid.innerHTML = '<p>No users found.</p>';
        }
    });
}

// Function to filter users
function filterUsers() {
    const skillSearch = document.getElementById('skillSearch').value.toLowerCase();
    const rating = document.getElementById('rating').value;
    const searchInput = document.getElementById('searchBar').value.toLowerCase();
    const userCards = document.querySelectorAll('.user-card');

    userCards.forEach((card) => {
        const cardSkills = card.getAttribute('data-skills').toLowerCase();
        const cardRating = card.getAttribute('data-rating');
        const cardUsername = card.getAttribute('data-username').toLowerCase();

        const matchesSkills = !skillSearch || cardSkills.includes(skillSearch);
        const matchesRating = !rating || cardRating === rating;
        const matchesSearch = !searchInput || cardUsername.includes(searchInput);

        if (matchesSkills && matchesRating && matchesSearch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    loadProfilePicture(); // Ensure the profile picture is loaded

    // Add event listeners for filters
    const filterForm = document.getElementById('filterForm');
    filterForm.addEventListener('input', filterUsers); // Update filtering as the user types
});
