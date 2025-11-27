document.addEventListener("DOMContentLoaded", function () {
    pickAd();
    setInterval(pickAd, 10000);
});

function pickAd() {
    const iframe = document.getElementById('FADIframe');
    if (!iframe) return;

    fetch('/js/billboard/billboardOptions.json')
    .then(response => response.json())
    .then(adData => {
    
        if (!adData.length) {
            console.error("No ads available in JSON.");
            return;
        }
    
        const randomAd = adData[Math.floor(Math.random() * adData.length)];
    
        const fakeName = randomAd.name;
        const fakeSRC = randomAd.src;
        const fakeAlt = randomAd.alt;
    
        iframe.setAttribute('src', fakeSRC);
        iframe.setAttribute('alt', fakeAlt);
    })
    .catch(error => console.error("Error fetching ad data:", error));
}
