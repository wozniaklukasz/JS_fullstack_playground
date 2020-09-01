import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";
import session from "./helpers/session";

import authRoutes from "./routes/authRoutes";
import apiRoutes from "./routes/apiRoutes";

import "./model/User";
import "./services/passport";

const PORT = process.env.PORT;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

const app = express();

app.use(express.static("public"));

session(app);

// todo: refactor auth routes like api
authRoutes(app);

app.use("/api", apiRoutes);

app.get("*", async (req, res, next) => {
  const store = createStore(req);
  const {path} = req;

  const context = {};

  try {
    const content = await renderer(path, store, context);

    // @ts-ignore
    if (context.url) {
      // requireAuth uses Redirect
      // @ts-ignore
      return res.redirect(301, context.url);
    }

    // @ts-ignore
    if (context.notFound) res.status(404);

    res.send(content);
  } catch (e) {
    next(e);
  }
});

try {
  mongoose.connect(
    MONGODB_CONNECTION_STRING,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log(`Connect to database ${MONGODB_CONNECTION_STRING}`)
  );
} catch {
  console.log(`Connected to database ${MONGODB_CONNECTION_STRING} failed`);
}

app.listen(PORT, () => {
  console.log(`App started on ${PORT}`);
});
