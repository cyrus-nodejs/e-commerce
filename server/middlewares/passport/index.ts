// auth/passport.ts
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';

import dotenv from 'dotenv';
import { User } from '../../models/User';

dotenv.config();

console.log(process.env.GOOGLE_CLIENT_ID!)

console.log( process.env.GOOGLE_CLIENT_SECRET!)

console.log(  process.env.CALLBACK_URL!)
// Use local strategy if using passport-local-mongoose
passport.use(User.createStrategy());

// Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
}, async (accessToken, refreshToken, profile: Profile, done) => {
  try {

    // Try to find user by googleId
    let user = await User.findOne({ googleId: profile.id });

    // If found, return
    if (user) return done(null, user);

    // Try to find user by email to link accounts
    const email = profile.emails?.[0]?.value;
    if (email) {
      user = await User.findOne({ email });
      if (user) {
        user.googleId = profile.id;
        await user.save();
        return done(null, user);
      }
    }
     
    const displayName = profile.displayName || '';
    
    // Split display name into first and last name
    const nameParts = displayName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || ''; // handle middle names too

    // Create a new user
    const newUser = new User({
      googleId: profile.id,
      displayName: profile.displayName,
      firstname: firstName,
      lastname:lastName,
      username:email,
      email: email,
      photo: profile.photos?.[0]?.value,
    });

    await newUser.save();
    done(null, newUser);
  } catch (error) {
    done(error as any, undefined);
  }
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export default passport;