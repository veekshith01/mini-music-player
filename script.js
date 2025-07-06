//music from  pixabay and cover from unsplash(free)
let songs = [
  {
    title: "Gorila",
    artist: "Alex_MakeMusic",
    src: "beats/gorila-315977.mp3",
    cover: "covers/tele.jpg",
  },
  {
    title: "lofi",
    artist: "White_Records",
    src: "beats/lofi-295209.mp3",
    cover: "covers/lofi.jpg",
  },
  {
    title: "tell me the truth",
    artist: "Denys_Brodovskyi",
    src: "beats/tell-me-the-truth-260010.mp3",
    cover: "covers/truth.jpg",
  },
];

let i = 0;

// references pointing to elements
let audio = document.getElementById("audio");
let playBtn = document.getElementById("play");
let prevBtn = document.getElementById("prev");
let nextBtn = document.getElementById("next");

let title = document.getElementById("title");
let artist = document.getElementById("artist");
let cover = document.getElementById("cover");

let currTime = document.getElementById("curr-time");
let durTime = document.getElementById("dur-time");
let progress = document.getElementById("progress-bar");

function loadSong(index) {
  let song = songs[index];
  title.innerText = song.title;
  artist.innerText = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
}

function playSong() {
  audio.play();
  playBtn.innerText = "Pause";
}

function pauseSong() {
  audio.pause();
  playBtn.innerText = "Play";
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

prevBtn.addEventListener("click", () => {
  i = (i - 1 + songs.length) % songs.length;
  loadSong(i);
  playSong();
});

nextBtn.addEventListener("click", () => {
  i = (i + 1) % songs.length;
  loadSong(i);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  let current = audio.currentTime;
  let duration = audio.duration;

  progress.value = (current / duration) * 100 || 0;
  currTime.innerText = formatTime(current);
  durTime.innerText = formatTime(duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

function formatTime(seconds) {
  let mins = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" + secs : secs}`;
}

loadSong(i);

const playlist = document.getElementById("playlist");
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.innerHTML = `<img src="${song.cover}"> <span>${song.title}</span>`;
  li.addEventListener("click", () => {
    i = index;
    loadSong(i);
    playSong();
  });
  playlist.appendChild(li);
});
