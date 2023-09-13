import {nextExcercise, completedExercises} from "./excercises.js";

const btnStart = document.getElementById("btn-start");
const exerciseName = document.getElementById("exercise-name");
const excercisePrompt = document.getElementById("exercise-prompt");
const exerciseDescription = document.getElementById("exercise-description");
const excerciseImage = document.getElementById("excercise-image");
const progressBar = document.getElementById("progress-bar");
const setupModal = new bootstrap.Modal("#modal-setup");

const sound = new Audio();
sound.autoplay = true;

let started = false;
let exerciseTimeUnit = 30;
let restTimeUnit = 10;
let numberOfExercises = 6;
let resting = false;
let exerciseTimer = new easytimer.Timer();
let restTimer = new easytimer.Timer();
let root = document.documentElement;
var currentExcercise = nextExcercise();

setupModal.show();
displayCurrentExercise();
btnStart.addEventListener("click", btnStartClick);

exerciseTimer.addEventListener('secondsUpdated', function (e) {
    let timeLeft = exerciseTimer.getTimeValues().toString();
    timeLeft = timeLeft.substr(6,2);
    let timeLeftRatio = (timeLeft / exerciseTimeUnit) * 100;
    root.style.setProperty("--progress-value", timeLeftRatio + "%");
});

exerciseTimer.addEventListener('targetAchieved', function (e) {
    exerciseTimer.stop();
    completedExercises.push(currentExcercise.id);

    if (completedExercises.length >= numberOfExercises) {
        //all done! reset UI
        playAllDoneSound();
        btnStart.innerText = "Start";
        started = !started;
        completedExercises = [];
    } else {
        currentExcercise = nextExcercise(currentExcercise.id);        
        displayCurrentExercise();
        startRestTimer();
    }

    resting = true;
});

restTimer.addEventListener('targetAchieved', function (e) {
    restTimer.stop();
    startExerciseTimer();    
    resting = false;
})

restTimer.addEventListener('secondsUpdated', function (e) {
    let timeLeft = restTimer.getTimeValues().toString();
    timeLeft = timeLeft.substr(6,2);
    let timeLeftRatio = (timeLeft / restTimeUnit) * 100;
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
    excercisePrompt.innerText = "Next Excercise - get ready..."
    if (restTimer.isPaused()) {
        restTimer.start();
    } else {
        progressBar.classList.add("bg-warning");
        root.style.setProperty("--progress-value", "100%");
        restTimer.start({countdown:true, startValues:{seconds:restTimeUnit + 1}});
        playRestStartSound();
    }
}

function startExerciseTimer() {
    excercisePrompt.innerText = "Go!"
    if (exerciseTimer.isPaused()) {
        exerciseTimer.start();
    } else {
        progressBar.classList.remove("bg-warning");
        root.style.setProperty("--progress-value", "100%");        
        exerciseTimer.start({countdown:true, startValues:{seconds:exerciseTimeUnit + 1}});
        playExcerciseStartSound();
    }    
}

function displayCurrentExercise() {
    exerciseName.innerText = currentExcercise.name;
    exerciseDescription.innerText = currentExcercise.description;
    excerciseImage.src = currentExcercise.image;
}

function playExcerciseStartSound() {
    sound.src = "resources/Train-horn-sound.mp3";
    sound.play();
}

function playRestStartSound() {
    sound.src = "resources/old-roblox-jump-sound.mp3";
    sound.play();
}

function playAllDoneSound() {
    sound.src = "resources/party-kazoo-sound-effect.mp3";
    sound.play();
}
