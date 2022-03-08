// IMPORTANT - Reflect-Metadata polyfill is required to be imported first for the decorators to work
import "reflect-metadata";

import app from "./app";
import configureDb from "./db/configure";
import connectToDb from "./db/connect";
import { UserDetails } from "./models/user/UserTypes";

const PORT = process.env.PORT || 5000;

declare module "express-session" {
  interface SessionData {
    user: UserDetails;
  }
}

configureDb();
connectToDb().then(() => {
  console.log("Connected to DB successfully");

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

export default app;
