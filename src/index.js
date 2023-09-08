const btnStart = document.getElementById("btn-start");
const exerciseName = document.getElementById("exercise-name");
const exerciseDescription = document.getElementById("exercise-description");

const exercises = [
    Excercise(1, "Jumping Jacks", "do a jumping jack", false, null),
    Excercise(2, "Lunges", "step forward & crouch down a bit", false, null),
    Excercise(3, "Calf Raises", "stand on your tippy toes", false, null),
    Excercise(4, "Star Jump", "like a jumping jack, but start in a squat", false, null),
    Excercise(5, "Squat Thrusts", "Start like you're going to do a push up, but kick your legs back instead", false, null),
    Excercise(6, "Skip Rope", "Use a pretend rope", false, null),
    Excercise(7, "Bridging", "Lay on your back, knees bent, and elevate your hips", false, null),
    Excercise(8, "Dumbell Curl", "Palms forward. Elbows in. Both arms.", true, null),
    Excercise(9, "Wide Pushup", "Like a pushup but your hands are farther apart. lower till your elbows are 90 degrees", false, null ),
    Excercise(10, "Standing Row", "Palms down. Raise weights to chest height, elbows out.", true, null),
    Excercise(11, "Reverse Dumbell Curl", "Palms down. Elbows in. Both arms.", true, null),
    Excercise(12, "Lateral Raise", "Palms inward. Raise both arms into a 'T' pose, elbows straight.", true, null)
];

let started = false;
let exerciseTimeUnit = 30;
let restTimeUnit = 10;
let numberOfExercises = 6;
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
    timeLeftRatio = (timeLeft / exerciseTimeUnit) * 100;
    root.style.setProperty("--progress-value", timeLeftRatio + "%");
});

exerciseTimer.addEventListener('targetAchieved', function (e) {
    exerciseTimer.reset();
    exerciseTimer.pause();

    completedExercises.push(currentExcercise.id);

    if (completedExercises.length >= numberOfExercises) {
        //all done! reset UI
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
    restTimer.reset();
    restTimer.pause();    
    startExerciseTimer();    
    resting = false;
})

restTimer.addEventListener('secondsUpdated', function (e) {
    let timeLeft = restTimer.getTimeValues().toString();
    timeLeft = timeLeft.substr(6,2);
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
    if (restTimer.isPaused()) {
        restTimer.start();
    } else {
        root.style.setProperty("--progress-value", "100%");
        restTimer.start({countdown:true, startValues:{seconds:restTimeUnit + 1}});    
    }
}

function startExerciseTimer() {
    if (exerciseTimer.isPaused()) {
        exerciseTimer.start();
    } else {
        root.style.setProperty("--progress-value", "100%");        
        exerciseTimer.start({countdown:true, startValues:{seconds:exerciseTimeUnit + 1}});
        playExcerciseStartSound();
    }    
}

function Excercise(_id, _name, _description, _weights, _img)
{
    return {
        id: _id,
        name: _name,
        description: _description,
        needsBells: _weights,
        image: _img
    };
}

function nextExcercise(lastId = 0) {
    let nextId;
    do {
        nextId = Math.floor(Math.random()* (exercises.length));
    } while (nextId == lastId || completedExercises.includes(nextId + 1)); //don't repeat any exercises
    
    let next = exercises[nextId];
console.log(`next exercise ${nextId + 1} - ${next.name}`);
    return next;
}

function displayCurrentExercise() {
    exerciseName.innerText = currentExcercise.name;
    exerciseDescription.innerText = currentExcercise.description;
}
 function playExcerciseStartSound() {
    let sound = new Audio("resources/Train-horn-sound.mp3");
    sound.play();
 }