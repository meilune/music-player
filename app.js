const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progressBar = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const durationTime = document.getElementById("duration");
const previousSong = document.getElementById("prev");
const playSong = document.getElementById("play");
const pauseSong = document.getElementById("pause");
const nextSong = document.getElementById("next");

// Create array with song objects
const music = [
    {
        title: "Warm Eyelids",
        artist: "Motorama",
        src: "music/music-1.mp3",
        image: "art/art-1.jpg"
    },
    {
        title: "Sol",
        artist: "Nils Frahm",
        src: "music/music-2.mp3",
        image: "art/art-2.jpg"
    },
    {
        title: "It's Dark, It's Cold, It's Winter",
        artist: "Sleepmakeswaves",
        src: "music/music-3.mp3",
        image: "art/art-3.jpg"
    },
    {
        title: "Fireflies",
        artist: "Still Corners",
        src: "music/music-4.mp3",
        image: "art/art-4.jpg"
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

//Event Listeners to the previous and next buttons

previousSong.addEventListener("click", playPrev);
nextSong.addEventListener("click", playNext);

