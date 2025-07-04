import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut, deleteUser } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js';
import { getDatabase, ref, get, } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js';

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






const generateActivity = document.getElementById("generateActivity");
generateActivity.addEventListener("click", async () => {
    //gathers GPS coordinates
    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Fetches the user's interest and weather data
        const snapshot = await get(ref(db, 'users/' + auth.currentUser.uid + '/interest'));
        const interest = snapshot.val().interest;
        const weatherAPI = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=REPLACE WITH OWN KEY`);
        const weatherData = await weatherAPI.json();
        const weather = weatherData.weather[0].description;

        // Sends POST request to backend Server
        try {
            const apiRes = await fetch(`http://localhost:3001/api/generate-response`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // sending of user data in readable JSON format
                body: JSON.stringify({
                    location: weatherData.name,
                    weather,
                    interest,
                })
            });

            const apiResponse = await apiRes.json();
            document.getElementById("output").innerText = apiResponse.response.output_text;
        } catch (error) {
            console.error('Error fetching activity:', error);
            document.getElementById("output").innerText = "Error generating activity. Please try again later.";
        }
    });
});

const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    //uses firebase auth to sign out the user
    signOut(auth).then(() => {
        window.location.href = '../html/login.html';
    }).catch((error) => {
        console.error('Sign out error:', error);
    });
});

const deleteAccountButton = document.getElementById("deleteAccount");
deleteAccountButton.addEventListener("click", (e) => {
    e.preventDefault();

    //uses firebase auth to delete the user account
    const user = auth.currentUser;
    deleteUser(user).then(() => {
        console.log("User deleted successfully");
        window.location.href = '../html/login.html';
    }).catch((error) => {
        const errorElement = document.getElementById('deleteMessage');
        errorElement.innerHTML = `error while deleting: ` + error.message;
    });
});

//-- heavily inspired by https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen
let deferredPrompt;
const installBtn = document.getElementById('installButton');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
});

installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt = null;
        installBtn.style.display = 'none';
    }
});
//--

//returns to interest page
const returnToInterest = document.getElementById("InterestReturn");
returnToInterest.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = '../html/interest.html';
});

// Redirect to login if not authenticated
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = '../html/login.html';
    }
}); 
