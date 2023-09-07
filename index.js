const btnStart = document.getElementById("btn-start");
let started = false;

let timeLeft = 0;
let exerciseTimer = new Timer();
let timerId;// = setInterval(btnStartClick, 1000);
let progressBar = document.getElementById("progress-bar");
let root = document.documentElement;

function btnStartClick() {
    if (!started) {
        btnStart.innerText = "Pause";
        timeLeft++
        timerId = setInterval(btnStartClick, 1000);
        if (timeLeft == 30) {
            clearTimeout(timerId);
            timeLeft = 0;       
        } else {
            root.style.setProperty("--progress-value", timeLeft + "%");
            progressBar.ariaValueNow = timeLeft;
        }
    } else {
        btnStart.innerText = "Start";
        clearTimeout(timerId);
    }
    started = !started;
}

