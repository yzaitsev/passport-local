const path = require('path');


module.exports = {
  port: 3001,
  rootDir: process.cwd(),
  publicDir: path.join(process.cwd(), 'public'),
  templatesDir: path.join(process.cwd(), 'templates'),
  mongodb: {
    uri: 'mongodb://localhost:27017/passport_app',
    debug: true,
    session_names: {
      collection: 'appSession',
      model: 'Session'
    }
  },

  crypto: {
    hash: {
      length: 128,
      iteration: 10 
    }
  }
}