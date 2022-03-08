import Chance from "chance";

import connectToDb from "../db/connect";
import User from "../models/user/User";

connectToDb().then(() => {
  const chance = new Chance();

  console.log("Connected to db");

  const users = new Array(50000).fill(null).map(() => {
    return {
      name: chance.name(),
      email: chance.email(),
    };
  });

  return User.insertMany(users)
    .then(() => {
      console.log("Users seeded");
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      process.exit(0);
    });
});
