import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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

const submit = document.getElementById("submit");
const googlebtn = document.getElementById("google-signin");

// Email/password registration
submit.addEventListener("click", function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Account created successfully");
      // Redirect to complete account page with the UID as a query parameter
      window.location.href = `completeAccount.html?uid=${user.uid}`;
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Google Sign-In
googlebtn.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
      // Redirect to complete account page with the UID as a query parameter
      window.location.href = `completeAccount.html?uid=${user.uid}`;
    })
    .catch((error) => {
      alert(error.message);
    });
});
