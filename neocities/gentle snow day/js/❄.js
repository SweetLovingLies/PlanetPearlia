document.addEventListener('DOMContentLoaded', function() { // Our Clock
    function updateTime() {
        const timeDisplay = document.getElementById('time');
        if (!timeDisplay) return; 

        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateTime, 1000);
});

function showSection(sectionId) { // Extremely simple tab section swapper
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    document.getElementById(sectionId).style.display = 'flex'; 
}