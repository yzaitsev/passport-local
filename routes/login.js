const passport = require('../libs/passport');



module.exports.post = passport.authenticate(
  'local', 
  { successRedirect: '/',
    successFlash: true,
    failureRedirect: '/',
    failureFlash: true 
  }
)