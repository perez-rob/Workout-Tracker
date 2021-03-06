const router = require("express").Router();
const db = require("../../models");

router.get("/", async (req, res) => {
  // this was the original version i used but the reduce method ended up not being necessary, keeping it in commented out for future reference though

  // const workouts = await db.Workout.aggregate([
  //   {
  //     $addFields: {
  //       totalDuration: {
  //         $reduce: {
  //           input: "$exercises",
  //           initialValue: 0,
  //           in: { $sum: ["$$value", "$$this.duration"] },
  //         },
  //       },
  //     },
  //   },
  // ]).sort({ day: 1 });
  const workouts = await db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ]).sort({ day: 1 });
  res.send(workouts);
});

router.get("/range", async (req, res) => {
  const workouts = await db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .sort({ day: -1 })
    .limit(7);
  res.send(workouts);
});

router.post("/", async (req, res) => {
  const newWorkout = await db.Workout.create(req.body);
  res.json(newWorkout);
});

router.put("/:id", async (req, res) => {
  console.log(req.body);
  // the conditional below is prevent the 'Complete' button from submitting empty forms when it is clicked
  if (req.body.name != "") {
    const newWorkout = await db.Workout.findByIdAndUpdate(req.params.id, {
      $push: { exercises: req.body },
    });
    res.json(newWorkout);
  } else {
    return;
  }
});

module.exports = router;
