import express from "express";
import "dotenv/config";

import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";
import session from "./helpers/session";

import authRoutes from "./routes/authRoutes";
import apiRoutes from "./routes/apiRoutes";

import "./services/passport";

const PORT = process.env.PORT;

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

app.listen(PORT, () => {
  console.log(`App started on ${PORT}`);
});
