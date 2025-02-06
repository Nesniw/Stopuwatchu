const time = document.getElementById('time');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('reset');
const lapList = document.getElementById('lap'); // Get lap list

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let lastLapTime = 0; // Track previous lap time
let lapCounter = 1;  // Lap count

const play = () => {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        playBtn.style.display = "none";
        pauseBtn.style.display = "block";
        lapBtn.style.display = "block";
        resetBtn.style.display = "none";
        isRunning = true;
    }
}

const pause = () => {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        playBtn.style.display = "block";
        pauseBtn.style.display = "none"
        lapBtn.style.display = "none";
        resetBtn.style.display = "block";
        isRunning = false;
    }
}

const reset = () => {
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    lastLapTime = 0; // Track previous lap time
    lapCounter = 1;  // Lap count
    lapList.innerHTML = "";
    time.textContent = "00:00:00:00";
    playBtn.style.display = "block";
    pauseBtn.style.display = "none";
    lapBtn.style.display = "none";
    resetBtn.style.display = "none";
    isRunning = false;
}

const lapping = () => {
    if (!isRunning) return;

    let absoluteTime = calculation(elapsedTime);
    let lapTime = calculation(elapsedTime - lastLapTime); // Get time since last lap
    lastLapTime = elapsedTime; // Update last lap time

    let lapItem = document.createElement("li");
    lapItem.className = "lap-item";
    lapItem.innerHTML = `<h3>#${lapCounter++}</h3><h3>:</h3><h3>${absoluteTime}</h3><h3 class="elapsed">${lapTime}</h3>`;
    lapList.prepend(lapItem); // Add lap to the top
}


const update = () => {
    elapsedTime = Date.now() - startTime;
    time.textContent = calculation(elapsedTime);
}

const calculation = (ms) => {
    let hours = Math.floor(ms / (1000 * 60 * 60));
    let minutes = Math.floor(ms / (1000 * 60) % 60);
    let seconds = Math.floor(ms / 1000 % 60);
    let milliseconds = Math.floor(ms % 1000 / 10);

    return `${String(hours).padStart(2, '0')}:` +
           `${String(minutes).padStart(2, '0')}:` +
           `${String(seconds).padStart(2, '0')}:` +
           `${String(milliseconds).padStart(2, '0')}`;
}