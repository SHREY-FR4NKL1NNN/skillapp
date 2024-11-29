import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import { 
  getAuth, 
  signInWithEmailAndPassword, 
  fetchSignInMethodsForEmail, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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
const provider = new GoogleAuthProvider();

document.addEventListener("DOMContentLoaded", function () {
  const submit = document.getElementById("submit");
  const googlebtn = document.getElementById("google-signin");

  // Email/password login
  submit.addEventListener("click", function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const email = emailInput.value.trim().toLowerCase(); // Normalize email
    const password = passwordInput.value;

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // Check if the account exists
    fetchSignInMethodsForEmail(auth, email)
      .then((signInMethods) => {
        console.log("Sign-in methods for email:", signInMethods); // Debug log
        if (!signInMethods || signInMethods.length === 0) {
          alert("No account found with this email. Please register first.");
        } else if (signInMethods.includes("password")) {
          // Try signing in with email/password
          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              alert("Login successful!");
              // Redirect to the dashboard or home page
              window.location.href = "/homePage/afterHomePage.html";
            })
            .catch((error) => {
              alert(`Login failed: ${error.message}`);
            });
        } else {
          alert("This account is linked with another provider (e.g., Google). Please use that method.");
        }
      })
      .catch((error) => {
        alert(`Error checking email: ${error.message}`);
        console.error(error);
      });
  });

  // Google Sign-In
  googlebtn.addEventListener("click", function () {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Google Sign-In Successful:", user);
        alert("Signed in successfully with Google.");
        // Redirect to the dashboard or home page
        window.location.href = "/homePage/afterHomePage.html";
      })
      .catch((error) => {
        alert(`Google Sign-In Error: ${error.message}`);
        console.error(error);
      });
  });
});
