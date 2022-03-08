import connectToDb from "../db/connect";
import User from "../models/user/User";
import Participant from "../models/participant/Participant";

connectToDb().then(() => {
  console.log("Connected to db");

  return User.find({})
    .then((users) => {
      const participants = users.map((user) => {
        const participant = {
          userId: user.id,
          name: user.name,
          progresses: [],
        };

        return participant;
      });

      return Participant.insertMany(participants);
    })
    .then(() => {
      console.log("Participants seeded");
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      process.exit(0);
    });
});
