import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import connectMongoDBSession from "connect-mongodb-session";
import { InversifyExpressServer } from "inversify-express-utils";

import container from "../inversify.config";
import errorMiddleware from "./middlwares/errorMiddleware";
import { DB_URI } from "./db/dbConstants";

const oneWeek = 1000 * 60 * 60 * 24 * 7;
const MongoDbStore = connectMongoDBSession(session);

const store = new MongoDbStore(
  {
    uri: DB_URI,
    collection: "sessions",
  },
  (err) => {
    if (err) {
      console.log(err);
    }
  },
);

store.on("error", (error) => {
  console.log(error);
});

const server = new InversifyExpressServer(container, null, { rootPath: "/api/v1" });

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(
    session({
      secret: "my-special-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: oneWeek,
      },
      store,
    }),
  );

  app.use(errorMiddleware);
});

const app = server.build();

export default app;
