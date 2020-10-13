import passport from "passport";
import GoogleStrategy from "passport-google-oauth20/lib/strategy";
import FacebookStrategy from "passport-facebook/lib/strategy";
import TwitterStrategy from "passport-twitter/lib/strategy";
import pool from '../database/db';

passport.serializeUser((user: any, done) => {
  if (user.id)
    done(null, user.id); //this is not an profile.id, it is an _id from mongo
  else
    done(null, false);
});

passport.deserializeUser((userId, done) => {
  pool.query('SELECT * FROM users WHERE id = $1', [userId])
    .then((users) => {
      done(null, users.rows[0]);
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
      pool.query('SELECT * FROM users WHERE googleId = $1', [profile.id])
        .then((existingUser) => {
          if (existingUser && existingUser.rows[0]) {
            done(null, existingUser.rows[0]);
          } else {
            pool.query('INSERT INTO users (googleId, name) VALUES ($1, $2) RETURNING *', [profile.id, profile.displayName])
              .then((newUser) => {
                if (newUser && newUser.rows[0]) done(null, newUser.rows[0])
              })
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
      pool.query('SELECT * FROM users WHERE facebookId = $1', [profile.id])
        .then((existingUser) => {
          if (existingUser && existingUser.rows[0]) {
            done(null, existingUser.rows[0]);
          } else {
            pool.query('INSERT INTO users (facebookId, name) VALUES ($1, $2) RETURNING *', [profile.id, profile.displayName])
              .then((newUser) => done(null, newUser))
              .catch((e) => console.error(e));
          }
        })
        .catch((e) => console.error(e));
    }
  )
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: "/auth/twitter/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      pool.query('SELECT * FROM users WHERE twitterId = $1', [profile.id])
        .then((existingUser) => {
          if (existingUser && existingUser.rows[0]) {
            done(null, existingUser.rows[0]);
          } else {
            pool.query('INSERT INTO users (twitterId, name) VALUES ($1, $2) RETURNING *', [profile.id, profile.displayName])
              .then((newUser) => done(null, newUser))
              .catch((e) => console.error(e));
          }
        })
        .catch((e) => console.error(e));
    }
  )
);
