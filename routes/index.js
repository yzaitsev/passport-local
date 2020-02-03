const Router = require('koa-router');
const router = new Router();

router.get('/', require('./frontpage').get);
router.post('/login', require('./login').post);
router.post('/logout', require('./logout').post);

module.exports.init = app => app.use(router.routes())