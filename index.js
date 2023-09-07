const btnStart = document.getElementById("btn-start");

let started = false;
let exerciseTimer = new easytimer.Timer();
let progressBar = document.getElementById("progress-bar");
let root = document.documentElement;

exerciseTimer.addEventListener('secondsUpdated', function (e) {
    let timeLeft = exerciseTimer.getTimeValues().toString();
    timeLeft = timeLeft.substr(6,2);
    console.log(timeLeft);
    timeLeftRatio = (timeLeft / 30) * 100;
    console.log(timeLeftRatio);
    root.style.setProperty("--progress-value", timeLeftRatio + "%");
    progressBar.ariaValueNow = timeLeftRatio;
});

exerciseTimer.addEventListener('targetAchieved', function (e) {
    console.log("TIMER ENDED");
    //exerciseTimer.reset();
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

