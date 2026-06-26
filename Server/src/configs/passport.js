import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

export const passportLocalConfig = (passport) => {
  passport.use(
    new LocalStrategy({usernameField: "email"}, async (email, password, done) => {
      try {
        const user = await User.findByEmail(email);
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!user || !isMatch) return done(null, false, {message: 'Invalid credentials'})

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
