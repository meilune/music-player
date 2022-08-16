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
        src: "music/music-1.mp3"
    },
    {
        title: "Sol",
        artist: "Nils Frahm",
        src: "music/music-2.mp3"
    },
    {
        title: "It's Dark, It's Cold, It's Winter",
        artist: "Sleepmakeswaves",
        src: "music/music-3.mp3"
    },
    {
        title: "Fireflies",
        artist: "Still Corners",
        src: "music/music-4.mp3"
    }
]
//Audio function
let musicSound = new Audio(music[2].src);

//Checking if the audio is playing
let isPlaying = false;
pauseSong.style.display = "none";

//Play music functionality
function togglePlay() {
    isPlaying ? musicSound.pause() : musicSound.play();
  };
  
  musicSound.onplaying = function() {
    isPlaying = true;
    pauseSong.style.display = "inline-block";
    playSong.style.display = "none";
  };
  musicSound.onpause = function() {
    isPlaying = false;
    pauseSong.style.display = "none";
    playSong.style.display =  "inline-block";
  };