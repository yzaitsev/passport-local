const config = require('config');
const app = require('./app');

const port = config.get('port') || 3001;

app.listen(port);
