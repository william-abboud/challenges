import Chance from "chance";

import Challenge from "../models/challenge/Challenge";
import connectToDb from "../db/connect";

const chance = new Chance();
const examples = [
  "Pushups",
  "Pullups",
  "Squats",
  "Situps",
  "Jumping Jacks",
  "Kettlebell Swings",
  "Burpees",
  "High Knees",
  "Lunges",
  "Reverse Lunges",
  "Plank",
];

connectToDb().then(() => {
  console.log("Connected to db");

  const challenges = new Array(5).fill(null).map(() => {
    const reps = chance.integer({ min: 10, max: 100 });
    const exercise = chance.pickone(examples);
    const minutes = chance.integer({ min: 10, max: 60 });
    const startDate = chance.date();
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate(),
    );
    const rule = "No cheating";

    return new Challenge({
      name: `${reps} ${exercise} in ${minutes} minutes`,
      description: `Do ${reps} reps of ${exercise} for ${minutes} minutes`,
      rules: [rule],
      participants: [],
      awards: [],
      bets: [],
      owner: null,
      startDate,
      endDate,
    });
  });

  return Challenge.insertMany(challenges)
    .then(() => {
      console.log("Challenges seeded");
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      process.exit(0);
    });
});
