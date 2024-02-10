const workDurationInput = document.getElementById('workDuration');
const breakDurationInput = document.getElementById('breakDuration');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const timerDisplay = document.getElementById('timer');
const alarmSound = document.getElementById('alarmSound');

let timer;
let timeLeft;
let isWorking = true;
let isRunning = false;

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startButton.textContent = 'Pause';
    const duration = isWorking ? workDurationInput.value : breakDurationInput.value;
    timeLeft = duration * 60;
    timer = setInterval(updateTimer, 1000);
  } else {
    isRunning = false;
    startButton.textContent = 'Resume';
    clearInterval(timer);
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  startButton.textContent = 'Start';
  timerDisplay.textContent = '25:00';
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  timerDisplay.textContent = `${minutes}:${seconds}`;

  if (timeLeft <= 0) {
    clearInterval(timer);
    isRunning = false;
    startButton.textContent = 'Start';
    alarmSound.play();
    alert(isWorking ? 'Work session is over!' : 'Break time is over!');
    isWorking = !isWorking;
    startTimer();
  }
  timeLeft--;
}
