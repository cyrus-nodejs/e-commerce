//@ts-nocheck

import { Strategy as LocalStrategy } from 'passport-local';
import User from "../../models/User"
import bcrypt from "bcrypt"
export const localstrategy = new LocalStrategy(
	{
		usernameField: 'username' // not necessary, DEFAULT
	},
	function(username, password, done) {
		User.findOne({ username: username }, (err:any, user:any) => {
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!user.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, user)
		})
	}
)

export const localstrategy2 = new LocalStrategy(async (username, password, done) => { 
  try { 
      // Find the user by username in the database 
      const user = await User.findOne({ username }); 
      // If the user does not exist, return an error 
      if (!user) { 
          return done(null, false, { error: "Incorrect username" }); 
      } 

      // Compare the provided password with the  
      // hashed password in the database 
      const passwordsMatch = await bcrypt.compare( 
          password, 
          user.password 
      ); 

      // If the passwords match, return the user object 
      if (passwordsMatch) { 
          return done(null, user); 
      } else { 
          // If the passwords don't match, return an error 
          return done(null, false, { error: "Incorrect password" }); 
      } 
  } catch (err) { 
      return done(err); 
  } 
}) 

export const localstrategy3 = new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
)

