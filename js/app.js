// Function to update date time display
function updateDateTimeDisplay() {
    const date = new Date();
    const formattedDate = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')} ${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}:${String(date.getUTCSeconds()).padStart(2, '0')}`;
    document.getElementById('dateTimeDisplay').innerText = formattedDate;
}

// Function to update lunar date display
function updateLunarDateDisplay() {
    // Lunar date calculation logic here
    // Dummy implementation
    const lunarDate = 'Lunar Date: ...';
    document.getElementById('lunarDateDisplay').innerText = lunarDate;
}

// Function for stick tube shaking animation
function shakeStickTube() {
    const stickTube = document.getElementById('stickTube');
    stickTube.classList.add('shake');
    setTimeout(() => {
        stickTube.classList.remove('shake');
    }, 1000);
}

// Function for interactive fortune drawing
document.getElementById('stickTube').addEventListener('click', () => {
    shakeStickTube();
    // Logic for drawing a fortune
    // Dummy implementation
    alert('Fortune drawn!');
});

setInterval(updateDateTimeDisplay, 1000);
updateLunarDateDisplay();