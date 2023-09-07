const btnStart = document.getElementById("btn-start");

let started = false;
let exerciseTimeUnit = 6;
let restTimeUnit = 3;
let numberOfExercises = 6;
let resting = false;
let exercisesDone = 0;
let exerciseTimer = new easytimer.Timer();
let restTimer = new easytimer.Timer();
let progressBar = document.getElementById("progress-bar");
let root = document.documentElement;

exerciseTimer.addEventListener('secondsUpdated', function (e) {
    let timeLeft = exerciseTimer.getTimeValues().toString();
    timeLeft = timeLeft.substr(6,2);
    console.log(timeLeft);
    timeLeftRatio = (timeLeft / exerciseTimeUnit) * 100;
    //console.log(timeLeftRatio);
    root.style.setProperty("--progress-value", timeLeftRatio + "%");
});

exerciseTimer.addEventListener('targetAchieved', function (e) {
    console.log("WORK TIMER ENDED");
    exerciseTimer.reset();
    exerciseTimer.pause();

    exercisesDone++;
    
    console.log(`resting: ${resting}`)
    
    if (exercisesDone >= numberOfExercises) {
        //all done! reset UI
        btnStart.innerText = "Start";
        started = !started;
    } else {
        startRestTimer();
    }

    resting = true;
});

restTimer.addEventListener('targetAchieved', function (e) {
    console.log("REST TIMER ENDED");
    restTimer.reset();
    restTimer.pause();
    startExerciseTimer();
    resting = false;
})

restTimer.addEventListener('secondsUpdated', function (e) {
    let timeLeft = restTimer.getTimeValues().toString();
    timeLeft = timeLeft.substr(6,2);
    console.log(timeLeft);
    timeLeftRatio = (timeLeft / restTimeUnit) * 100;
    root.style.setProperty("--progress-value", timeLeftRatio + "%");
});

function btnStartClick() {
    if (!started) {
        if (!resting)
        { startExerciseTimer(); }
        else
        { startRestTimer(); }
        btnStart.innerText = "Pause";
    } else {
        btnStart.innerText = "Start";
        exerciseTimer.pause();
        restTimer.pause();
    }
    started = !started;
}

function startRestTimer() {
    console.log("starting REST timer");
    if (restTimer.isPaused()) {
        restTimer.start();
    } else {
        root.style.setProperty("--progress-value", "100%");
        restTimer.start({countdown:true, startValues:{seconds:restTimeUnit + 1}});    
    }
}

function startExerciseTimer() {
    console.log("starting WORK timer");
    if (exerciseTimer.isPaused()) {
        exerciseTimer.start();
    } else {
        root.style.setProperty("--progress-value", "100%");
        exerciseTimer.start({countdown:true, startValues:{seconds:exerciseTimeUnit + 1}});    
    }    
}