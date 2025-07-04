const savedTheme = localStorage.getItem('theme');
const themeSheet = document.getElementById('themesheet');

//checks local storage for theme preference
if (savedTheme === 'colorBlind') {
   themeSheet.setAttribute('href', '../../colorBlindStyle.css');
}

const toggleButton = document.getElementById('colourBlind');
toggleButton.addEventListener('click', () => {
    // Toggles between the two stylesheets and updates local storage
    if (themeSheet.getAttribute('href') === '../../style.css') {
        themeSheet.setAttribute('href', '../../colorBlindStyle.css');
        localStorage.setItem('theme', 'colorBlind');
    } else {
        themeSheet.setAttribute('href', '../../style.css');
        localStorage.setItem('theme', 'style');
    }
});