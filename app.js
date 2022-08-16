const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationTimeEl = document.getElementById("duration");
const previousSong = document.getElementById("prev");
const playSong = document.getElementById("play");
const pauseSong = document.getElementById("pause");
const nextSong = document.getElementById("next");

// Create array with song objects
const music = [
    {
        title: "Warm Eyelids",
        artist: "Motorama",
        src: "https://meilune.github.io/music-player/music/music-1.mp3",
        image: "https://meilune.github.io/music-player/art/art-1.jpg"
    },
    {
        title: "Sol",
        artist: "Nils Frahm",
        src: "https://meilune.github.io/music-player/music/music-2.mp3",
        image: "https://meilune.github.io/music-player/art/art-2.jpg"
    },
    {
        title: "It's Dark, It's Cold, It's Winter",
        artist: "Sleepmakeswaves",
        src: "https://meilune.github.io/music-player/music/music-3.mp3",
        image: "https://meilune.github.io/music-player/art/art-3.jpg"
    },
    {
        title: "Fireflies",
        artist: "Still Corners",
        src: "https://meilune.github.io/music-player/music/music-4.mp3",
        image: "https://meilune.github.io/music-player/art/art-4.jpg"
    }
]
//Audio function
let musicSound = new Audio();

//Checking if the audio is playing
let isPlaying = false;
pauseSong.style.display = "none";

//Play music functionality
function playMusic() {
    isPlaying = true;
    musicSound.play();
    pauseSong.style.display = "inline-block";
    playSong.style.display = "none";
  }

function pauseMusic() {
    isPlaying = false;
    musicSound.pause();
    pauseSong.style.display = "none";
    playSong.style.display =  "inline-block";
  }

function togglePlay() {
    isPlaying ? pauseMusic() : playMusic();
};

//Event listeners for play/pause of songs
playSong.addEventListener("click", togglePlay);
pauseSong.addEventListener("click", togglePlay);

//Update the DOM
function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    musicSound.src = song.src;
    image.src = song.image;
}

//Current Song
let songIndex = 0;

//Next Song
function playNext() {
    songIndex++;
    if (songIndex > music.length - 1){
        songIndex = 0;
    }
    loadSong(music[songIndex]);
    playMusic();
}

//Previous Song
function playPrev() {
    songIndex--;
    if(songIndex < 0 ) {
        songIndex = music.length - 1;
    }
    loadSong(music[songIndex]);
    playMusic();
}

//on load select first song
loadSong(music[songIndex]);

//Update Progress Bar and time
function updateProgressBar(e) {
    if(isPlaying) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        //Calculate the display for the duration
        let durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        //Delay switching the Element to avoid NaN
        if(durationSeconds) {
            durationTimeEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        //Calculate the display for the current time stamp
        let currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        //Delay switching the Element to avoid NaN
        if(currentSeconds) {
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }
}

//Set Progress bar
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = musicSound;
    musicSound.currentTime = (clickX / width) * duration;
}

//Event Listeners to the previous and next buttons
previousSong.addEventListener("click", playPrev);
nextSong.addEventListener("click", playNext);
musicSound.addEventListener("ended", playNext);

//Event listener for the progress bar
musicSound.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);