import {Router} from 'express';
import passport from "passport";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {failureRedirect: "/"}),
  (req, res) => {
    res.redirect("/");
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook")
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {failureRedirect: "/"}),
  (req, res) => {
    res.redirect("/");
  }
);

router.get(
  "/twitter",
  passport.authenticate("twitter")
);

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {failureRedirect: "/"}),
  (req, res) => {
    res.redirect("/");
  }
);

export default router;
