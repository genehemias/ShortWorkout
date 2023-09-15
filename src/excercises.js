let completedExercises = [];

function nextExcercise(useHandWeights, lastId = 0) {
    let next;

    if (lastId) {
        let last = exercises[lastId - 1];//-1 b/c our exercise ids start @ 1 instead of 0
        //check if this exercise must be paired with another
        //TODO if we're selecting the final exercise of the workout, DON'T allow selection of a paired exercise
        if (last.mustAlsoDo && ! completedExercises.includes(last.mustAlsoDo)) {
            next = exercises[last.mustAlsoDo - 1];
        }
    }
        
    if (!next) {//it doesn't require pairing. get a random one. 
        let nextId;
        do {
            nextId = Math.floor(Math.random() * (exercises.length));
        } while (nextId == lastId || alreadyDidThisExercise(nextId) || dumbellSettingIsNotMet(useHandWeights, nextId)); 
        
        next = exercises[nextId];//TODO should this be nextId - 1 ?
    }

    console.log(`next exercise ${next.id} - ${next.name}`);
    return next;
}

function resetCompletedExcercises() {
    completedExercises = [];
}

function alreadyDidThisExercise(index) {
    return completedExercises.includes(index + 1); // +1 b/c our exercise ids start @ 1 instead of 0
}

function dumbellSettingIsNotMet(useHandWeights, id) {
    return (!useHandWeights && exercises[id].needsBells);
}

function Excercise(_id, _name, _description, _weights, _img, _mustAlsoDo = null)
{
    return {
        id: _id,
        name: _name,
        description: _description,
        needsBells: _weights,
        image: _img,
        mustAlsoDo: _mustAlsoDo,        
    };
}

const exercises = [
    Excercise(1, "Jumping Jacks", "do a jumping jack", false, "resources/jumping jack.jpg"),
    Excercise(2, "Lunges", "step forward & crouch down a bit", false, "resources/lunge.jpg"),
    Excercise(3, "Calf Raises", "stand on your tippy toes", false, "resources/calf raise.jpg"),
    Excercise(4, "Star Jump", "like a jumping jack, but start in a squat", false, "resources/star jump.jpg"),
    Excercise(5, "Squat Thrusts", "Start like you're going to do a push up, but kick your legs back instead", false, "resources/squat thrust.jpg"),
    Excercise(6, "Skip Rope", "Use a pretend rope", false, "resources/skip rope.jpg"),
    Excercise(7, "Bridging", "Lay on your back, knees bent, and elevate your hips", false, "resources/bridging.jpg"),
    Excercise(8, "Dumbell Curl", "Palms forward. Elbows in. Both arms.", true, "resources/dumbell curl.jpg"),
    Excercise(9, "Wide Pushup", "Like a pushup but your hands are farther apart. lower till your elbows are 90 degrees", false, "resources/wide pushup.png"),
    Excercise(10, "Standing Row", "Palms down. Raise weights to chest height, elbows out.", true, "resources/upright row.jpg"),
    Excercise(11, "Reverse Dumbell Curl", "Palms down. Elbows in. Both arms.", true, "resources/reverse dumbell curl.jpg"),
    Excercise(12, "Lateral Raise", "Palms inward. Raise both arms into a 'T' pose, elbows straight.", true, "resources/lateral raise.jpg"),
    Excercise(13, "Abdominal Crunch", "Like the first half a situp. Don't lower your chin.", false, "resources/abdominal crunch.jpg"),
    Excercise(14, "Reverse Chrunch", "On your back, with legs in the air, knees bent. Flex your abs until your butt comes off the ground. Relax, repeat.", false, "resources/reverse crunch.jpg"),
    Excercise(15, "Russian Twist", "Balance on your bottom only. Twist your torso side to side.", false, "resources/russian twist.jpg"),
    Excercise(16, "Dorsal Raise", "Lay flat on your tummy, then make like Superman.", false, "resources/dorsal raise.jpg"),
    Excercise(17, "Decline Pushup", "Put your feet on something and then do pushups.", false, "resources/decline pushup.jpg"),
    Excercise(18, "Tricep Kickback (Right)", "Rest left leg and arm on something. Right upper arm parallel with floor. Extend/straighten right arm.", false, "resources/tricep kickback right.jpg", 19),
    Excercise(19, "Tricep Kickback (Left)", "Rest right leg and arm on something. Left upper arm parallel with floor. Extend/straighten left arm.", false, "resources/tricep kickback left.jpg", 18),
];

export {completedExercises, nextExcercise, resetCompletedExcercises};
