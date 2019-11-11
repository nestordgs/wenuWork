import passport from 'passport';
import userModel from '../src/models/users';
import { Strategy, ExtractJwt } from 'passport-jwt';

passport.use(
  new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.MY_SECRET,
  }, async function(payload, done) {
    try {
      const user = await userModel.findOne({_id: payload['_id']});
      if (!user) {
        return done(new Error(), false);
      }
      return done(null, user)
    } catch (err) {
      return done(new Error(), false)
    }
  }),
);

export default null;
