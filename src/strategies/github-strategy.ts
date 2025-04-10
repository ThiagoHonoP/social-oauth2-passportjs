import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import "dotenv/config";

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj: any, done) {
  return done(null, obj);
});

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: `http://localhost:${process.env.PORT}/auth/github/callback`,
    },
    function (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) {
      return done(null, profile.id);
    }
  )
);

export default passport;
