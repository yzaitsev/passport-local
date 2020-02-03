const { model, Schema } = require('../libs/mongoose');
const crypto = require('crypto');
const isEmail = require('isemail');
const config = require('config');


const userSchema = new Schema({
  email: {
    type: String,
    required: `E-mail пользователя не должен быть пустым.`,
    validate: {
      validator: function(value) {
        return isEmail.validate(value);
      },
      message: props => `Некорректный email.`
    },
    
    unique: true
  },
  displayName: {
    type: String,
    required: true,
    max: 30
  },
  salt: {
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  }
}, { timestamps: true })



function generatePassword(salt, password) {
  return new Promise((res, rej) => {
    crypto.pbkdf2(password, salt, 
      config.get('crypto.hash.iteration'), config.get('crypto.hash.length'), 'sha512', 
      (err, derivedKey) => {
      if (err) throw rej(err);
      res(derivedKey.toString('hex')); 
    });
  })
}

userSchema.methods.setPassword = async function(password) {
  if (!password || password.length < 4) {
    throw new Error('Пароль должен быть минимум 4 символа.');
  }

  this.salt = crypto.randomBytes(config.get('crypto.hash.length')).toString('hex');
  this.hashedPassword = await generatePassword(this.salt, password);
}


userSchema.methods.checkPassword = async function(password) {
  if (!password) return false;

  const hash = await generatePassword(this.salt, password);
  return hash === this.hashedPassword;
}

module.exports = model('User', userSchema)