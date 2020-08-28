import passport from "passport";

const authRoutes = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get(
    "/auth/facebook",
    passport.authenticate("facebook")
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get(
    "/auth/twitter",
    passport.authenticate("twitter")
  );

  app.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/");
    }
  );
};

export default authRoutes;
