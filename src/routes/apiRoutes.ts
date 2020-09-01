import { Router } from "express";
import User from "../model/User";

const router = Router();

router.get("/currentUser", (req, res) => {
  res.send(req.user);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/users", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((e) => {
      res.send({ message: e });
    });
});

export default router;
