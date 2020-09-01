import passport from "passport";
import cookieSession from "cookie-session";

const session = (app) => {
  app.use(cookieSession({
      maxAge: 30*24*60*60*1000, // 30 days
      keys: [process.env.COOKIE_KEY]
  }));

  app.use(passport.initialize());

  app.use(passport.session());
};

export default session;
