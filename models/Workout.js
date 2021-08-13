const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this schema is pretty basic and could have been more precise, but it works fine given how flexible MongoDB is
const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: Array,
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
