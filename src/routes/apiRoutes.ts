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
  const {query} = req;
  const keys = Object.keys(query);

  if (keys.length > 0) {
    pool.query(`SELECT * FROM users WHERE userrole = $1`, ['admin'])
      .then((users) => {
        res.json(users.rows);
      })
      .catch((e) => {
        res.send({message: e});
      });
  } else {
    pool.query(`SELECT * FROM users`)
      .then((users) => {
        res.json(users.rows);
      })
      .catch((e) => {
        res.send({message: e});
      });
  }
});

export default router;
