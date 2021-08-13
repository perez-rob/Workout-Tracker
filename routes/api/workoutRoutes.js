const router = require("express").Router();
const db = require("../../models");

router.get("/", async (req, res) => {
  const workouts = await db.Workout.find({}).sort({ date: 1 });
  console.log(workouts);
});

router.post("/", async (req, res) => {
  const newWorkout = await db.Workout.create(req.body);
  res.json(newWorkout);
});

router.put("/:id", async (req, res) => {
  const newWorkout = await db.Workout.findByIdAndUpdate(req.params.id, {
    $push: { exercises: req.body },
  });
  res.json(newWorkout);
});

module.exports = router;
