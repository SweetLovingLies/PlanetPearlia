window.onload = function () {
    const songs = document.querySelectorAll('.song');
    const nowPlaying = document.getElementById('nowPlaying');
    const songInfo = document.getElementById('songInfo');

    songs.forEach(song => {
        song.pause();
        song.currentTime = 0;
    });

    const randomIndex = Math.floor(Math.random() * songs.length);
    const selectedSong = songs[randomIndex];

    const volume = selectedSong.getAttribute('data-volume');
    selectedSong.volume = volume;

    const title = selectedSong.getAttribute('data-title');
    const writer = selectedSong.getAttribute('data-writer');

    const OSTWriter = writer.includes('OST') ? ` from the ${writer}` : writer;

    songInfo.textContent = `Now Playing: ${title}${writer.includes('OST') ? '' : ' by '}${OSTWriter}`;

    nowPlaying.classList.remove('hidden');
    nowPlaying.classList.add('visible');

    selectedSong.play();

    setTimeout(() => {
        nowPlaying.classList.add('hidden');
        nowPlaying.classList.remove('visible');
    }, 5000);
};

// If you use this, make sure NOT to put it in the head tag! It will not work otherwise.