console.log("Hello Coder");

let songIndex = 1;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar");
let gif = document.getElementById("gif");
let masterSong = document.getElementById("masterSong");
let songItems = Array.from(document.getElementsByClassName("song"));
const clickCounts = {};

let songs= [
    {songName: "Singarala" , filePath:"songs/1.mp3"},
    {songName: "Sundari Neeve" , filePath:"songs/2.mp3"},
    {songName: "Muddabanti" , filePath:"songs/3.mp3"},
    {songName: "Ada Janmaku" , filePath:"songs/4.mp3"},
    {songName: "Yamuna Thatilo - Sad" , filePath:"songs/5.mp3"},
    {songName: "Chilakamma" , filePath:"songs/6.mp3"},
    {songName: "Yamuna Thatilo" , filePath:"songs/7.mp3"},
];

songItems.forEach((ele,i)=>{
     ele.getElementsByClassName("eachSong")[0].innerText=`${i+1}. ${songs[i].songName}`;
});

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('playingSong')).forEach((ele)=>{
        ele.classList.remove('fa-pause-circle');
        ele.classList.add('fa-play-circle');
    });
};

const playSong = (index) => {
    songIndex = index;
    audioElement.src = songs[songIndex - 1].filePath;
    masterSong.innerText = songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  
    // Update icon for the current song button
    makeAllPlays();
    document.getElementById(songIndex).classList.remove("fa-play-circle");
    document.getElementById(songIndex).classList.add("fa-pause-circle");
  };

masterPlay.addEventListener("click",()=>{

    if(audioElement.paused || audioElement.currentTime <= 0){
        playSong(songIndex);
    }else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity=0;
        makeAllPlays();
    }
})

audioElement.addEventListener("timeupdate",()=>{

    let progress = parseInt((audioElement.currentTime)/(audioElement.duration)*100);
    progressBar.value = progress;
});

progressBar.addEventListener("change",()=>{
    audioElement.currentTime = (progressBar.value*audioElement.duration)/100;
})


Array.from(document.getElementsByClassName("playingSong")).forEach((ele,i)=>{
    ele.addEventListener("click", (e) => {
        const clickedIndex = parseInt(e.target.id);

    if (songIndex === clickedIndex && !audioElement.paused) {

        audioElement.pause();
        e.target.classList.remove("fa-pause-circle");
        e.target.classList.add("fa-play-circle");
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    } else {
        playSong(clickedIndex);
    }
}); 
});

document.getElementById("prev").addEventListener("click",()=>{
    songIndex = songIndex > 1 ? songIndex - 1 : songs.length;
    playSong(songIndex);
})

document.getElementById("for").addEventListener("click",()=>{
    songIndex = songIndex < songs.length ? songIndex + 1 : 1;
    playSong(songIndex);
})



