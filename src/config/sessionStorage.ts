import ConnectMongoDBSession from "connect-mongodb-session";
import session from "express-session";

declare module "express-session" {
  interface Session {
    user?: {
      name: string;
      email: string;
      password: string;
      createdAt: Date;
    };
  }
}

const MongoDBStore = ConnectMongoDBSession(session);

const sessionStore = new MongoDBStore({
  uri: process.env.DATA_BASE_URI as string,
  databaseName: "test",
  collection: "sessions",
});

sessionStore.on("error", function (error) {
  console.log(error);
});

export default sessionStore;
