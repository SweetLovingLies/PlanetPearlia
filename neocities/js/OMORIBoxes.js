function typewriter(prewrittenTexts, characterDisplayName, emotions) {
    const soundUrls = [
        'https://fallenhuman.neocities.org/seni/text1.ogg',
        'https://fallenhuman.neocities.org/seni/text2.ogg',
        'https://fallenhuman.neocities.org/seni/text3.ogg',
        'https://fallenhuman.neocities.org/seni/text4.ogg',
        'https://fallenhuman.neocities.org/seni/text5.ogg'
    ];

    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    document.body.appendChild(lightbox);
    void lightbox.offsetWidth; // Trigger reflow to apply initial styles

    lightbox.classList.add('show');

    let output = document.getElementById("text");
    if (!output) {
        const textboxContainer = document.createElement('div');
        textboxContainer.classList.add('textboxContainer');

        const textboxWrapper = document.createElement('div');
        textboxWrapper.classList.add('textboxWrapper');

        const topWrapper = document.createElement('div');
        topWrapper.classList.add('topWrapper');

        const characterName = document.createElement('p');
        characterName.classList.add('characterName');
        
        // Extract the relevant part of characterDisplayName
        const characterDisplayNameWithoutDW = characterDisplayName.replace(/^DW/i, ''); // Remove Dark World Modifier for name
        characterName.textContent = characterDisplayNameWithoutDW;

        const charName = characterDisplayName.toLowerCase().replace(/\s/g, '');
        const characterIMG = document.createElement('img');
        characterIMG.classList.add('characterIMG');
        characterIMG.src = `${window.location.origin}/shrines/OMORI/omoriAssets/Sprites/${charName}_${emotions[0]}.gif`;

        topWrapper.appendChild(characterName);
        topWrapper.appendChild(characterIMG);

        const textbox = document.createElement('div');
        textbox.classList.add('textbox');

        const cursorImg = document.createElement('img');
        cursorImg.classList.add('cursor');
        cursorImg.src = `${window.location.origin}/shrines/OMORI/omoriAssets/cursor.png`;
        textbox.appendChild(cursorImg);

        output = document.createElement('div');
        output.id = 'text';
        output.textContent = prewrittenTexts[0]; // Initialize with first text
        textbox.appendChild(output);

        textboxWrapper.appendChild(topWrapper);
        textboxWrapper.appendChild(textbox);
        textboxContainer.appendChild(textboxWrapper);
        document.body.appendChild(textboxContainer);
    }

    let textIndex = 0;
    let textToDisplay = prewrittenTexts[textIndex]; 
    let i = 0;
    let interval;
    let playSoundFlag = true;
    let waitingForEnter = true;

    const audioObjects = soundUrls.map((soundUrl) => {
        const audio = new Audio();
        audio.src = soundUrl;
        audio.preload = "auto";
        return audio;
    });

    function playSound() {
        if (playSoundFlag) {
            const randomIndex = Math.floor(Math.random() * audioObjects.length);
            audioObjects[randomIndex].currentTime = 0;
            audioObjects[randomIndex].play();
        }
        playSoundFlag = !playSoundFlag;
    }

    function typeNextChar() {
        if (i >= textToDisplay.length) {
            clearInterval(interval);

            if (textIndex + 1 < prewrittenTexts.length) {
                waitingForEnter = true;
                document.addEventListener('keydown', handleEnterKey);
            } else {
                setTimeout(closeTextbox, 2000);
            }

            return;
        }

        const letterToShow = textToDisplay[i];
        if (letterToShow === "{" && textToDisplay[i + 1] === "$" && textToDisplay[i + 2] === "b" && textToDisplay[i + 3] === "}") {
            setTimeout(function () {
                i += 4;
                typeNextChar();
            }, 500);
            return;
        }

        if (output) {
            output.textContent += letterToShow;
        } else {
            console.error("Element with id='text' not found.");
            return;
        }

        playSound();
        i++;

        interval = setTimeout(typeNextChar, 20);
    }

    setTimeout(() => {
        startTypewriter(textToDisplay);
    }, 500);

    function startTypewriter(text) {
        output.textContent = '';
        textToDisplay = text;
        i = 0;
        
        const charName = characterDisplayName.toLowerCase().replace(/\s/g, '');
        const characterIMG = document.querySelector('.characterIMG');
        characterIMG.src = `${window.location.origin}/shrines/OMORI/omoriAssets/Sprites/${charName}_${emotions[textIndex]}.gif`;

        interval = setTimeout(typeNextChar, 20);
    }

    function closeTextbox() {
        const textboxContainer = document.querySelector('.textboxContainer');
        const textbox = document.querySelector('.textbox');
        if (textbox, textboxContainer) {
            textbox.style.animation = 'closing .2s linear forwards';
            textboxContainer.addEventListener('animationend', () => {
                document.body.removeChild(textboxContainer);
                document.body.removeChild(lightbox);
            });
        }
    }

    function handleEnterKey(event) {
        if (event.key === 'Enter' && waitingForEnter) {
            waitingForEnter = false;
            document.removeEventListener('keydown', handleEnterKey);
            textIndex++;
            if (textIndex < prewrittenTexts.length) {
                startTypewriter(prewrittenTexts[textIndex]);
            }
        }
    }
}