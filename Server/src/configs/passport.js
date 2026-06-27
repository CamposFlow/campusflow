import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

export const passportLocalConfig = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await User.findByEmail(email);
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!user || !isMatch) return done(null, false, { message: 'Invalid credentials' })

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  };
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(Number(jwt_payload.id));
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        return done(err, null);
      }
    })
  );
};

export const passportOauthGoogleConfig = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",

  }, async (accessToken, refreshToken, profile, done) => {
    console.log({googleId: profile.id, });
  }))
}