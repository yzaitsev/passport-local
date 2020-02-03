const passport = require('koa-passport');

const User = require('../../models/User');
const localStrategy = require('./strategies/local');


passport.use(localStrategy);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});



module.exports = passport;