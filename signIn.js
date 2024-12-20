// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwvsjMbt9BAcD4SNHV0Hw7fGUxUZXfRec",
  authDomain: "newproj-ae1e9.firebaseapp.com",
  projectId: "newproj-ae1e9",
  storageBucket: "newproj-ae1e9.appspot.com", // Corrected storage bucket URL
  messagingSenderId: "102052024239",
  appId: "1:102052024239:web:4c7edd3d1feb050cece95a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase Initialized:", app);

// Get Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Function to display messages
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Event listener for sign-up button
const signUpButton = document.getElementById("submit");
signUpButton.addEventListener("click", (event) => {
  event.preventDefault();

  // Retrieve input values
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    showMessage("Email and password are required", "signUpMessage");
    return;
  }

  // Create a new user
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User created successfully:", user);

      // Prepare user data to store in Firestore
      const userData = { Email: email ,Password:password};

      // Save user data in Firestore
      const docRef = doc(db, "users", user.uid);
      return setDoc(docRef, userData);
    })
    .then(() => {
      showMessage("Account created successfully!", "signUpMessage");
      alert('Click Ok To Get Redirected')
      console.log("User data saved to Firestore");
      window.location.href = "home.html"; // Redirect to home page
    })
    .catch((error) => {
      console.error("Error during sign-up:", error);
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        showMessage("Email already exists", "signUpMessage");
      } else if (errorCode === "auth/weak-password") {
        showMessage("Password is too weak", "signUpMessage");
      } else {
        showMessage(`Error: ${error.message}`, "signUpMessage");
      }
    });
});

const logout = document.querySelector('#new').addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log('User Signed Out');
  }).catch((error) => {
    console.error('Error signing out:', error);
  });
});
