const btnStart = document.getElementById("btn-start");

let started = false;
let exerciseTimeUnit = 30;
// let restTimeUnit = 10;
// let numberOfExercises = 6;
let exerciseTimer = new easytimer.Timer();
// let restTimer = new easyTimer.Timer();
let progressBar = document.getElementById("progress-bar");
let root = document.documentElement;

exerciseTimer.addEventListener('secondsUpdated', function (e) {
    let timeLeft = exerciseTimer.getTimeValues().toString();
    timeLeft = timeLeft.substr(6,2);
    console.log(timeLeft);
    timeLeftRatio = (timeLeft / exerciseTimeUnit) * 100;
    console.log(timeLeftRatio);
    root.style.setProperty("--progress-value", timeLeftRatio + "%");
});

exerciseTimer.addEventListener('targetAchieved', function (e) {
    console.log("TIMER ENDED");
    exerciseTimer.reset();
    exerciseTimer.pause();
    btnStart.innerText = "Start";
    started = !started;
});

function btnStartClick() {
    if (!started) {        
        root.style.setProperty("--progress-value", "100%");
        exerciseTimer.start({countdown:true, startValues:{seconds:exerciseTimeUnit}});
        btnStart.innerText = "Pause";
    } else {
        btnStart.innerText = "Start";
        exerciseTimer.pause();
    }
    started = !started;
}

