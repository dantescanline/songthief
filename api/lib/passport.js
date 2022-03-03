import passport from 'passport'
import localStrategy from 'passport-local'
import prisma from './prisma.js';
import bcrypt from 'bcrypt'

passport.use(new localStrategy(async function verify(username, password, cb) {
  const user = await prisma.user.findFirst({
    where: {
      name: username
    }
  })

  if (!user) {
    return cb(null, false, { message: 'Incorrect username or password' })
  }

  bcrypt.compare(password, user.password, function (error, result) {
    if (result) {
      return cb(null, user);
    }
    return cb(null, false, { message: 'Incorrect username or password' })
  })

}));


passport.serializeUser(function (user, done) {
  done(null, user.id)
});

passport.deserializeUser(async function (userID, done) {
  const user = await prisma.user.findFirst({
    where: {
      id: userID
    }
  })

  if (!user) {
    return done(`Cant find user ${userID} in db`)
  }

  done(null, user);
});

export default passport