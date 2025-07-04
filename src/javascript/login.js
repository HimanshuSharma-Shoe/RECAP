import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js';

const firebaseConfig = {
    apiKey: "REPLACE WITH OWN KEY",
    authDomain: "REPLACE WITH OWN KEY",
    databaseURL: "REPLACE WITH OWN KEY",
    projectId: "REPLACE WITH OWN KEY",
    storageBucket: "REPLACE WITH OWN KEY",
    messagingSenderId: "REPLACE WITH OWN KEY",
    appId: "REPLACE WITH OWN KEY"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const login = document.getElementById('submitLogin');
login.addEventListener('click', async (e) => {
    e.preventDefault();
    submitLogin.disabled = true;//prevents spamming of submissions
    
    const email = document.getElementById('emailIn').value;
    const password = document.getElementById('passwordLogin').value;
    const auth = getAuth();
    
    // attempts to sign in and redirect
    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.replace("../html/main.html");
    } catch (error) {
        const errorElement = document.getElementById('loginMessage');
        errorElement.innerHTML = `Signing In Error: ` + error.message;
        submitLogin.disabled = false;
    }
});

const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', async (e) => {
    e.preventDefault();
    submitLogin.disabled = true;//prevents spamming of submissions
    const email = document.getElementById('emailUp').value;
    const password = document.getElementById('passwordCreate').value;
    const auth = getAuth();

    // atempts to create a new user and redirect
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        window.location.replace("../html/interest.html");
    } catch (error) {
        const errorElement = document.getElementById('signUpMessage');
        errorElement.innerHTML = `Signing Up Error: ` + error.message;
        submitLogin.disabled = false;
    }
});

// Registers basic service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../../service-worker.js')
        .then(reg => {
            console.log('[SW] Registered');
        })
        .catch(err => console.error('[SW] Registration failed', err));
}

// Redirects to main page if user is already logged in
onAuthStateChanged(auth, (user) => {
    if (user && location.pathname.includes('login')) {
        window.location.href = '../html/main.html';
    }
});

