import { nextExcercise, completedExercises, resetCompletedExcercises } from "./excercises.js";

const btnStart = document.getElementById("btn-start");
const btnNext = document.getElementById("btn-next");
const btnStartModal = document.getElementById("btn-start-modal");
const exerciseName = document.getElementById("exercise-name");
const excercisePrompt = document.getElementById("exercise-prompt");
const exerciseDescription = document.getElementById("exercise-description");
const excerciseImage = document.getElementById("excercise-image");
const progressBar = document.getElementById("progress-bar");
const setupModal = new bootstrap.Modal("#modal-setup");
const finishedModal = new bootstrap.Modal("#modal-finished");

const sound = new Audio();
sound.autoplay = true;

let started = false;
let useHandWeights = false;
let exerciseTimeUnit = 30;
let restTimeUnit = 12;
let numberOfExercises = 6;
let resting = false;
let exerciseTimer = new easytimer.Timer();
let restTimer = new easytimer.Timer();
let root = document.documentElement;
var currentExcercise = nextExcercise(false);//1st excercise will never use wieghts b/c we don't know user selection yet

document.getElementById("modal-finished").addEventListener("hidden.bs.modal", () => setupModal.show());
setupModal.show();
btnStartModal.addEventListener("click", hideModalAndStart);
btnStart.addEventListener("click", btnStartClick);
btnNext.addEventListener("click", btnNextClick);
displayCurrentExercise();

exerciseTimer.addEventListener('secondsUpdated', function (e) {
    let timeLeft = exerciseTimer.getTimeValues().toString();
    timeLeft = timeLeft.substr(6, 2);
    let timeLeftRatio = (timeLeft / exerciseTimeUnit) * 100;
    root.style.setProperty("--progress-value", timeLeftRatio + "%");
});

exerciseTimer.addEventListener('targetAchieved', function (e) {
    exerciseTimer.stop();
    completedExercises.push(currentExcercise.id);

    if (completedExercises.length >= numberOfExercises) {
        //all done! reset UI
        playAllDoneSound();
        finishedModal.show();

        btnStart.innerText = "Start";
        started = !started;
        resetCompletedExcercises();
        currentExcercise = nextExcercise(false);
    } else {
        currentExcercise = nextExcercise(useHandWeights, currentExcercise.id);                
        startRestTimer();
    }
    displayCurrentExercise();

    resting = true;
});

restTimer.addEventListener('targetAchieved', function (e) {
    restTimer.stop();
    startExerciseTimer();
    resting = false;
})

restTimer.addEventListener('secondsUpdated', function (e) {
    let timeLeft = restTimer.getTimeValues().toString();
    timeLeft = timeLeft.substr(6, 2);
    let timeLeftRatio = (timeLeft / restTimeUnit) * 100;
    root.style.setProperty("--progress-value", timeLeftRatio + "%");
});

function hideModalAndStart() {
    useHandWeights = document.getElementById("chkHandWeights").checked;
    setupModal.hide();
    btnStartClick();
}

function btnStartClick() {
    if (!started) {
        if (!resting) { startExerciseTimer(); }
        else { startRestTimer(); }
        btnStart.innerText = "Pause";
    } else {
        btnStart.innerText = "Start";
        if (exerciseTimer.isRunning()) { exerciseTimer.pause(); }
        if (restTimer.isRunning()) { restTimer.pause(); }
    }
    started = !started;
}

function btnNextClick() {
    currentExcercise = nextExcercise(useHandWeights, currentExcercise.id);
    displayCurrentExercise()
}

function startRestTimer() {
    excercisePrompt.innerText = "Next Excercise - get ready..."
    btnNext.classList.remove("disabled");
    btnNext.removeAttribute("disabled");
    if (restTimer.isPaused()) {
        restTimer.start();
    } else {
        progressBar.classList.add("bg-warning");
        root.style.setProperty("--progress-value", "100%");
        restTimer.start({ countdown: true, startValues: { seconds: restTimeUnit + 1 } });
        playRestStartSound();
    }
}

function startExerciseTimer() {
    excercisePrompt.innerText = "Go!"
    btnNext.classList.add("disabled");
    btnNext.setAttribute('disabled', '');
    if (exerciseTimer.isPaused()) {
        exerciseTimer.start();
    } else {
        progressBar.classList.remove("bg-warning");
        root.style.setProperty("--progress-value", "100%");
        exerciseTimer.start({ countdown: true, startValues: { seconds: exerciseTimeUnit + 1 } });
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
