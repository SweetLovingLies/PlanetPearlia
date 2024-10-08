window.onload = function () {

    const nowPlayingDiv = document.createElement('div');
    nowPlayingDiv.id = 'nowPlaying';
    nowPlayingDiv.classList.add('now-playing', 'hidden');  
    nowPlayingDiv.innerHTML = `
        <div class="now-playing-inner">
            <img src="/assets/other/pinklotus.png" id="nowplayingLotus">
            <p id="songInfo"></p>
            <div class="controlsWrapper">
            <button id="MusicPauseButton">❚❚</button>
            <input type="range" id="volumeSlider" min="0" max="1" step="0.01" value="0.5" title="Volume">
            </div>
        </div>
    `;
    document.body.appendChild(nowPlayingDiv);

    const songs = document.querySelectorAll('.song');
    const nowPlaying = document.getElementById('nowPlaying');
    const songInfo = document.getElementById('songInfo');
    const pauseButton = document.getElementById('MusicPauseButton');
    const volumeSlider = document.getElementById('volumeSlider');

    let currentSong = null;

    songs.forEach(song => {
        song.pause();
        song.currentTime = 0;
    });

    const randomIndex = Math.floor(Math.random() * songs.length);
    currentSong = songs[randomIndex];

    // Get stored volume and pause/play state

    const savedVolume = localStorage.getItem('songVolume');
    currentSong.volume = savedVolume ? savedVolume : currentSong.getAttribute('data-volume');
    volumeSlider.value = currentSong.volume;

    const isPaused = localStorage.getItem('isPaused') === 'true';
    if (isPaused) {
        pauseButton.textContent = '▶';
    } else {
        currentSong.play();
    }

    // Song Info 
    const title = currentSong.getAttribute('data-title');
    const writer = currentSong.getAttribute('data-writer');
    const OSTWriter = writer.includes('OST') ? ` from the ${writer}` : writer;
    songInfo.textContent = `Now Playing: ${title}${writer.includes('OST') ? '' : ' by '}${OSTWriter}`;

    setTimeout(() => {
        nowPlaying.classList.remove('hidden');
        nowPlaying.classList.add('visible');
    }, 50); 

    pauseButton.addEventListener('click', () => {
        if (currentSong.paused) {
            currentSong.play();
            pauseButton.textContent = '❚❚';
            localStorage.setItem('isPaused', 'false');
        } else {
            currentSong.pause();
            pauseButton.textContent = '▶';
            localStorage.setItem('isPaused', 'true');
        }
    });

    volumeSlider.addEventListener('input', () => {
        currentSong.volume = volumeSlider.value;
        localStorage.setItem('songVolume', volumeSlider.value);
    });

    let timeoutID = setTimeout(hideNowPlaying, 5000);

    function hideNowPlaying() {
        if (!nowPlaying.matches(':hover')) {
            nowPlaying.classList.add('hidden');
            nowPlaying.classList.remove('visible');
        }
    }

    nowPlaying.addEventListener('mouseenter', () => {
        clearTimeout(timeoutID); 
    });

    nowPlaying.addEventListener('mouseleave', () => {
        timeoutID = setTimeout(hideNowPlaying, 2000);  
    });

    document.addEventListener('mousemove', (e) => {
        const windowWidth = window.innerWidth;
        if (e.clientX > windowWidth - 50 && nowPlaying.classList.contains('hidden')) {
            nowPlaying.classList.remove('hidden');
            nowPlaying.classList.add('visible');
        }
    });
};


// If you use this, make sure NOT to put it in the head tag! It will not work otherwise.