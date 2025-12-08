window.onload = function () {
    const nowPlayingDiv = document.createElement('div');
    nowPlayingDiv.id = 'nowPlaying';
    nowPlayingDiv.innerHTML = `
        <div id="cloudPlayer" class="hidden">
            <svg id="graphicParent" width="350" height="600" viewBox="0 0 1300 2200">
                <g id="swingGroup">
                    <path id="string" d="M600,-30 Q600,300 600,600" stroke="white" fill="none" stroke-width="18" />
                    <path id="string2" d="M600, 1160 Q600,1000 600, 1600" stroke="gray" fill="none" stroke-width="8" /> 
                    <path id="cloud" stroke="#c6d6e7" fill="white" stroke-width="22" stroke-linejoin="round"
                        d="M600,607.4c-14.4-5.4-68.7-24-132.5-1.6-62.3,21.8-93,68.4-101.2,81.9-9.9,2.5-74.4,19.7-108.2,85.2-31.4,60.7-13.4,118.5-10,129-34.4,43.8-37.8,104.3-8.7,150.3,26.9,42.5,76.9,65.5,127.7,58.7,5.2,8.6,41.1,66.4,113.8,78.7,59.4,10,104.4-17,115.4-24,9.9,9.3,59.5,53.8,134.9,52,64-1.5,106.8-35.4,119-45.9,5,.4,80.4,5,127.2-57.1,45.7-60.6,22.8-129.8,20.9-135.2,6.2-7.7,57.6-73.7,36.7-156.9-17.6-69.8-78.9-123.2-154.8-134.1-9-16-40.2-66.9-104.7-92.4-86.8-34.2-164,5.1-175.7,11.3Z" />
                    <path id="star" stroke="#FFF5CF" stroke-width="22" stroke-linejoin="round" fill="white" d="M610,1590l64.3,71.2,87.6,39.2c7.1,3.2,10,11.9,6.1,18.7l-47.9,83.2-10.2,95.4c-.8,7.8-8.2,13.1-15.9,11.5l-93.9-19.8-93.9,19.8c-7.7,1.6-15-3.7-15.9-11.5l-10.2-95.4-47.9-83.2c-3.9-6.8-1.1-15.5,6.1-18.7l87.6-39.2,64.3-71.2c5.2-5.8,14.4-5.8,19.6,0Z"/>
                </g>
            </svg>

            <div id="details">
                <p id="songInfo"></p>
                <div class="controlsWrapper">
                    <button id="MusicPauseButton">❚❚</button>
                    <input type="range" id="volumeSlider" min="0" max="1" step="0.01" value="0.5" title="Volume">
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(nowPlayingDiv);

    const songs = document.querySelectorAll('.song');
    const songInfo = document.getElementById('songInfo');
    const pauseButton = document.getElementById('MusicPauseButton');
    const volumeSlider = document.getElementById('volumeSlider');
    const cloudPlayer = document.getElementById('cloudPlayer');
    const graphicParent = document.getElementById('graphicParent');
    const swingGroup = document.getElementById('swingGroup');
    const details = document.getElementById('details')

    let currentSong = null;

    // Initialize Songs
    songs.forEach(song => {
        song.pause();
        song.currentTime = 0;
        song.muted = true;
    });

    // Select a random song
    currentSong = songs[Math.floor(Math.random() * songs.length)];

    // Set volume
    const savedVolume = localStorage.getItem('songVolume');
    currentSong.volume = savedVolume ?? currentSong.getAttribute('data-volume');
    volumeSlider.value = currentSong.volume;

    // Set Song Info
    const title = currentSong.getAttribute('data-title');
    const writer = currentSong.getAttribute('data-writer');
    const OSTWriter = writer.includes('OST') ? ` from the ${writer}` : writer;
    songInfo.textContent = `Now Playing: ${title}${writer.includes('OST') ? '' : ' by '}${OSTWriter}`;

    // Event Listeners
    pauseButton.addEventListener('click', togglePlayback);
    volumeSlider.addEventListener('input', updateVolume);

    function updateVolume() {
        currentSong.volume = volumeSlider.value;
        localStorage.setItem('songVolume', volumeSlider.value);
    }

    // Animation Stuffs
    let isHovered = false;

    const introAnimation = () => {
        gsap.set("#swingGroup", {
            rotate: 0,
            transformOrigin: "50% 0%",
        });
        gsap.set("#string", {
            attr: { d: "M600,0 Q600,300 600,600" },
        });
        gsap.set("#details", {
            x: 20,
            rotate: 0
        });

        gsap.to("#swingGroup", {
            rotate: -10,
            transformOrigin: "50% 0%",
            duration: 2,
            ease: "power2.inOut",
        });

        gsap.to("#string", {
            attr: { d: "M600,0 Q545,300 600,600" },
            duration: 2,
            ease: "power2.inOut",
        });

        gsap.to("#details", {
            x: 55,
            rotate: -14,
            duration: 2,
            ease: "power2.inOut",

            onComplete: () => {
                resumeAnimations();
            }
        });
    };

    const smoothStop = () => {
        gsap.killTweensOf("#swingGroup");
        gsap.killTweensOf("#string");
        gsap.killTweensOf("#details");

        gsap.to("#swingGroup", {
            rotate: 0,
            duration: 2,
            transformOrigin: "50% 0%",
            ease: "power2.out",
        });

        gsap.to("#string", {
            attr: { d: "M600,0 Q600,300 600,600" },
            duration: 2,
            ease: "power2.out",
        });

        gsap.to("#details", {
            x: 20,
            rotate: 0,
            duration: 2,
            ease: "power2.out",
        });
    };

    const resumeAnimations = () => {
        if (!currentSong.paused && !isHovered) {
            gsap.fromTo(
                "#swingGroup",
                { rotate: -10 },
                {
                    rotate: 10,
                    transformOrigin: "50% 0%",
                    duration: 2,
                    ease: "power1.inOut",
                    repeat: -1,
                    yoyo: true
                }
            );

            gsap.fromTo(
                "#string",
                { attr: { d: "M600,0 Q545,300 600,600" } }, // Left
                {
                    attr: { d: "M600,0 Q640,300 600,600" }, // Right
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut"
                }
            );

            gsap.fromTo(
                "#details",
                { x: 55, rotate: -14 },
                {
                    x: -20, // Move to the left
                    rotate: 22,

                    transformOrigin: "50% 0%",

                    duration: 2,
                    ease: "power1.inOut",
                    repeat: -1,
                    yoyo: true
                }
            );
        }
    };

    let isHoveredgraphicParent = false;
    let isHoveredDetails = false;

    const elementsToHover = [graphicParent, details];

    elementsToHover.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (element === swingGroup) {
                isHoveredSwingGroup = true;
            } else if (element === details) {
                isHoveredDetails = true;
            }

            // console.log("isHoveredgraphicParent:", isHoveredgraphicParent, "isHoveredDetails:", isHoveredDetails);
            smoothStop();
        });

        element.addEventListener('mouseleave', () => {
            if (element === swingGroup) {
                isHoveredgraphicParent = false;
            } else if (element === details) {
                isHoveredDetails = false;
            }

            // console.log("isHoveredgraphicParent:", isHoveredgraphicParent, "isHoveredDetails:", isHoveredDetails);

            // If neither is hovered, start the animation
            if (!isHoveredgraphicParent && !isHoveredDetails && !currentSong.paused) {
                introAnimation();
            }
        });
    });

    star.addEventListener('click', () => {
        cloudPlayer.classList.toggle('visible');
        cloudPlayer.classList.toggle('hidden', !cloudPlayer.classList.contains('visible'));
    });

    // Playback

    if (localStorage.getItem('isPaused') === null) {
        localStorage.setItem('isPaused', 'true');
    }

    function togglePlayback() {
        const currentlyPaused = currentSong.paused;

        if (currentlyPaused) {
            currentSong.play();
            currentSong.muted = false;
            pauseButton.textContent = '❚❚';
            localStorage.setItem('isPaused', 'false');
            
            if (!isHoveredgraphicParent && !isHoveredDetails && !currentSong.paused) {
                introAnimation();
            }


        } else {
            currentSong.pause();
            smoothStop();
            pauseButton.textContent = '▶';
            localStorage.setItem('isPaused', 'true');
        }
    }

    const isPaused = localStorage.getItem('isPaused') === 'true';
    updatePlaybackState(isPaused); // Ensure the correct state is set

    function updatePlaybackState(isPaused) {
        if (isPaused) {
            currentSong.pause();
            pauseButton.textContent = '▶';
        } else {
            currentSong.play();
            currentSong.muted = false;
            pauseButton.textContent = '❚❚';
            
            if (!isHoveredgraphicParent && !isHoveredDetails && !currentSong.paused) {
                introAnimation();
            }

        }
    }

    updatePlaybackState(isPaused);

    if (!isPaused) {
        currentSong.play();
    }
};
