import "@babel/polyfill";
import express from "express";
import { matchRoutes } from "react-router-config";
import mongoose from "mongoose";
import "dotenv/config";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";
import session from "./helpers/session";
import Routes from "./client/Routes";
import authRoutes from "./routes/authRoutes";
import apiRoutes from "./routes/apiRoutes";
import "./model/User";
import "./services/passport";

const PORT = process.env.PORT;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

const app = express();

app.use(express.static("public"));

session(app);

authRoutes(app);

app.use("/api", apiRoutes);

app.get("*", (req, res) => {
  const store = createStore(req);
  const { path } = req;

  // Get components to render on given URL and call theirs loadData()
  const promises = matchRoutes(Routes, path)
    .map(({ route }) => (route.loadData ? route.loadData(store) : null))
    .map((promise) => {
      if (promise) {
        // second map with alvays resolved promises - SSR approach to render app even if some api fails
        return new Promise((resolve, reject) =>
          promise.then(resolve).catch((e) => {
            console.log(`Error while rendering ${path}:`, e);
            resolve();
          })
        );
      }
    });

  // thanks to above logic, all promises will be resolved so Promise.all alvays will be resolved to (and do render)
  Promise.all(promises)
    .then(() => {
      const context = {};
      const content = renderer(path, store, context);

      if (context.url) {
        // requireAuth uses Redirect
        return res.redirect(301, context.url);
      }

      if (context.notFound) res.status(404);

      res.send(content);
    })
    .catch((e) => console.log(e));
});

try {
  mongoose.connect(
    MONGODB_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(`Connect to database ${MONGODB_CONNECTION_STRING}`)
  );
} catch {
  console.log(`Connected to database ${MONGODB_CONNECTION_STRING} failed`);
}


app.listen(PORT, () => {
  console.log(`App started on ${PORT}`);
});
