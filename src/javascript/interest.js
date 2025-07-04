import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js';
import { getDatabase, ref, set, } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js';

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
const db = getDatabase(app);


const interestForm = document.getElementById('interestForm');
interestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Save the user's interest to the database
    const userId = auth.currentUser.uid;
    const interest = document.querySelector('input[name="activities"]:checked').value;
    const reference = ref(db, 'users/' + userId + '/interest');
    set(reference, {
        interest: interest
    }).then(() => {
        window.location.href = '../html/main.html';
    }).catch((error) => {
        console.error('Error saving interest:', error);
    });
}
);

// Redirect to login if not authenticated
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = '../html/login.html';
    }
});
