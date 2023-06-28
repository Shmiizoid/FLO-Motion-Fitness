const workouts = [
    {
        name: "Pull",
        exercises: 5,
        sets: 4,
        reps: 10,
        equipment: "Free weights and pull-up bar",
        cardio: true,
        cardioAmount: 20,
        description: "Deadlifts, pulldowns, t-bar rows, dumbbell rows, shrugs. 1 minute rest between sets. Each set to failure. If you can't hit 6 reps, drop weight",
        isFeatured: true
    },
    {
        name: "Push",
        exercises: 5,
        sets: 4,
        reps: 10,
        equipment: "Free weights, cable machine",
        cardio: true,
        cardioAmount: 20,
        description: "Barbell Bench Press, incline bench press with dumbbells, chest flys with cables or dumbbells, dips, tricep extensions, If you can't hit 6 reps, drop weight",
        isFeatured: true
    },
    {
        name: "Legs",
        exercises: 6,
        sets: 4,
        reps: 10,
        equipment: "Free weights, leg machines, area for lunges approx 15 feet.",
        cardio: false,
        cardioAmount: 0,
        description: "Barbell squat, bulgarian split squat, RDLs, hamstring Curls, leg extensions, lunges. If you can't hit 6 reps, drop weight",
        isFeatured: true,
    },
    {
        name: "Arms",
        exercises: 6,
        sets: 4,
        reps: 10,
        equipment: "Free weights",
        cardio: true,
        cardioAmount: 20,
        description: "Dumbbells Hammer Curl, Skullcrushers, cable curl, tricep rope extensions, reverse grip curl, close grip bench press.",
        isFeatured: true
    },
    {
        name: "Shoulders",
        exercises: 5,
        sets: 4,
        reps: 10,
        equipment: "Free weights, cable machines",
        cardio: true,
        cardioAmount: 20,
        description: "Seated Military Press, side raises, front raises, rear delt fly, front barbell raise.",
        isFeatured: true
    },
]

module.exports = workouts