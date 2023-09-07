const btnStart = document.getElementById("btn-start");
let started = false;

let timeLeft = 0;
let timerId;// = setInterval(btnStartClick, 1000);
let timer = document.getElementById("timer");
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
            timer.ariaValueNow = timeLeft;
        }
    } else {
        btnStart.innerText = "Start";
        clearTimeout(timerId);
    }
    started = !started;
}

