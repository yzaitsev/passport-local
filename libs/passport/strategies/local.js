const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../../../models/User');

module.exports = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async function(email, password, done) {
    try {
      const user = await User.findOne({ email })
      if (!user) return done(null, false, { message: 'Incorrect email.' });
      
      const isValidPassword = await user.checkPassword(password);

      if (!isValidPassword) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      
      return done(null, user, { message: 'Welcome!' });
    } catch(err) {
      console.error(err);
      done(err)
    }
  }
)