const btnStart = document.getElementById("btn-start");
const exerciseName = document.getElementById("exercise-name");
const exerciseDescription = document.getElementById("exercise-description");

const exercises = [
    Excercise(1, "Jumping Jacks", "do a jumping jack", null),
    Excercise(2, "Lunges", "step forward & crouch down a bit", null),
    Excercise(3, "Calf Raises", "stand on your tippy toes", null),
    Excercise(4, "Star Jump", "like a jumping jack, but start in a squat", null),
    Excercise(5, "Squat Thrusts", "Start like you're going to do a push up, but kick your legs back instead", null),
    Excercise(6, "Skip Rope", "Use a pretend rope", null)
];

let started = false;
let exerciseTimeUnit = 30;
let restTimeUnit = 10;
let numberOfExercises = 3;
let resting = false;
let exerciseTimer = new easytimer.Timer();
let restTimer = new easytimer.Timer();
let progressBar = document.getElementById("progress-bar");
let root = document.documentElement;
let completedExercises = [];
var currentExcercise = nextExcercise();

displayCurrentExercise();

exerciseTimer.addEventListener('secondsUpdated', function (e) {
    let timeLeft = exerciseTimer.getTimeValues().toString();
    timeLeft = timeLeft.substr(6,2);
    console.log(timeLeft);
    timeLeftRatio = (timeLeft / exerciseTimeUnit) * 100;
    //console.log(timeLeftRatio);
    root.style.setProperty("--progress-value", timeLeftRatio + "%");
});

exerciseTimer.addEventListener('targetAchieved', function (e) {
    console.log(`WORK TIMER ENDED FOR EXCERCISE ${currentExcercise.id} - ${currentExcercise.name}`);
    exerciseTimer.reset();
    exerciseTimer.pause();

    completedExercises.push(currentExcercise.id);
    console.log(completedExercises);

    if (completedExercises.length >= numberOfExercises) {
        //all done! reset UI
        btnStart.innerText = "Start";
        started = !started;
        completedExercises = [];
    } else {
        currentExcercise = nextExcercise(currentExcercise.id);    
        console.log(`next up: ${currentExcercise.name}`);
        displayCurrentExercise()
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

function Excercise(_id, _name, _description, _img)
{
    return {
        id: _id,
        name: _name,
        description: _description,
        image: _img
    };
}

function nextExcercise(lastId = 0) {
    let nextId;
    do {
        nextId = Math.floor(Math.random()* (exercises.length));
        console.log(`should we use exercise ${nextId + 1} ?`)
    } while (nextId == lastId || completedExercises.includes(nextId + 1)); //don't repeat any exercises
    console.log(`using exercise ${nextId + 1}`)
    return exercises[nextId];
}

function displayCurrentExercise() {
    exerciseName.innerText = currentExcercise.name;
    exerciseDescription.innerText = currentExcercise.description;
}