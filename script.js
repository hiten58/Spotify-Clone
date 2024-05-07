console.log("Welcome To Potify");

// Initializing Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProcessBar = document.getElementById("myProcessBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Space Song - Beach House", filePath: "songs/1.mp3", coverPath:"covers/1.jpg"},
    {songName: "Levitating - Dua Lipa", filePath: "songs/2.mp3", coverPath:"covers/2.jpeg"},
    {songName: "Scared to Live - The Weekend", filePath: "songs/3.mp3", coverPath:"covers/3.jpeg"},
    {songName: "Gul - Anuv Jain", filePath: "songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName: "Dil Ibaadat - KK", filePath: "songs/5.mp3", coverPath:"covers/5.jpeg"}
]

songItem.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;  
})

// audioElement.play();

// Handle play/Pause
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0; 
    }
})

// Listen to Events--
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    // Update seekBar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProcessBar.value = progress;
})  

myProcessBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProcessBar.value * audioElement.duration/100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
    element.addEventListener('click', (e) =>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        masterSongName.innerHTML = songs[songIndex].songName;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
}); 

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=4){
        songIndex=0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        masterSongName.innerHTML = songs[songIndex].songName;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

