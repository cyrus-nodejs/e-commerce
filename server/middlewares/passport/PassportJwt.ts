//@ts-nocheck
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt as ExtractJwt } from 'passport-jwt';
import passport from 'passport'
import User from '../../models/User';
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET
opts.issuer = process.env.JWT_ISSUER
opts.audience = process.env.AUDIENCE
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


passport.serializeUser(function (user, cb) {
    cb(null, user.id);
  });
  
  passport.deserializeUser(function (id, cb) {
    User.findById(id, function (err, user) {
      if (err) {
        return cb(err);
      }
      cb(null, user);
    });
  });
  

export default passport;