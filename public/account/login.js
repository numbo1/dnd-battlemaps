import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";


const firebaseConfig = {
    apiKey: "AIzaSyC2gACxqoROZTzLCxxaqXtZXUCm9eSWjJY",
    authDomain: "your-dnd-companion.firebaseapp.com",
    databaseURL: "https://your-dnd-companion-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "your-dnd-companion",
    storageBucket: "your-dnd-companion.firebasestorage.app",
    messagingSenderId: "127008817731",
    appId: "1:127008817731:web:90ffbc6f026110a7f58af6",
    measurementId: "G-HLR04TZK6P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const messageElement = document.getElementById("message");

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('User signed in:', user);
      messageElement.style.color = "green";
      messageElement.textContent = "You are now logged in";
      window.location.href = "/public/index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error signing in:', errorCode, errorMessage);
      messageElement.style.color = "red";
      messageElement.textContent = `Error: ${error.message}`;
    });
});