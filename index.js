const btnStart = document.getElementById("btn-start");

let started = false;
let exerciseTimer = new easytimer.Timer();
let progressBar = document.getElementById("progress-bar");
let root = document.documentElement;

exerciseTimer.addEventListener('secondsUpdated', function (e) {
    let timeLeft = exerciseTimer.getTimeValues().toString();
    timeLeft = timeLeft.substr(6,2);
    console.log(timeLeft);
    root.style.setProperty("--progress-value", timeLeft + "%");
    progressBar.ariaValueNow = timeLeft;
});

exerciseTimer.addEventListener('targetAchieved', function (e) {
    console.log("TIMER ENDED")
});

function btnStartClick() {
    if (!started) {
        exerciseTimer.start({countdown:true, startValues:{seconds:30}});
        btnStart.innerText = "Pause";
    } else {
        btnStart.innerText = "Start";
        exerciseTimer.pause();
    }
    started = !started;
}

