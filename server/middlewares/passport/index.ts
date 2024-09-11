//@ts-nocheck

import {User} from "../../models/User"

import passport from 'passport'





passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

passport.use(User.createStrategy());
// use static serialize and deserialize of model for passport session support

  export default passport;