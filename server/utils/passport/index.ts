//@ts-nocheck
import localstrategy from "../passport/Localstrategy"

import User from "../../models/User"
import passport from 'passport'



  passport.use(localstrategy);
  
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
  

  export default passport