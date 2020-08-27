import passport from "passport";
import GoogleStrategy from "passport-google-oauth20/lib/strategy";
import FacebookStrategy from "passport-facebook/lib/strategy";
import mongoose from "mongoose";

const User = mongoose.model("User");

passport.serializeUser((user, done) => {
  done(null, user.id); //this is not an profile.id, it is an _id from mongo
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((e) => console.error(e));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new User({
              googleId: profile.id,
              name: profile.displayName,
            })
              .save()
              .then((newUser) => done(null, newUser))
              .catch((e) => console.error(e));
          }
        })
        .catch((e) => console.error(e));
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new User({
              facebookId: profile.id,
              name: profile.displayName,
            })
              .save()
              .then((newUser) => done(null, newUser))
              .catch((e) => console.error(e));
          }
        })
        .catch((e) => console.error(e));
    }
  )
);
