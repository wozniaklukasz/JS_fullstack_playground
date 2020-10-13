import {Router} from "express";
import pool from '../database/db';

const router = Router();

router.get("/currentUser", (req, res) => {
  res.send(req.user);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/users", (req, res) => {
  pool.query('SELECT * FROM users')
    .then((users) => {
      res.json(users.rows);
    })
    .catch((e) => {
      res.send({message: e});
    });
});

export default router;
