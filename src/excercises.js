let completedExercises = [];

function nextExcercise(lastId = 0) {
    let nextId;
    do {
        nextId = Math.floor(Math.random()* (exercises.length));
    } while (nextId == lastId || completedExercises.includes(nextId + 1)); //don't repeat any exercises
    
    let next = exercises[nextId];
    console.log(`next exercise ${nextId + 1} - ${next.name}`);
    return next;
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
    Excercise(12, "Lateral Raise", "Palms inward. Raise both arms into a 'T' pose, elbows straight.", true, "resources/lateral raise.jpg")
];

export {completedExercises, nextExcercise};
