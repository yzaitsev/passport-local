const pug = require('pug');
const path = require('path');
const config = require('config');

module.exports.init = app => app.use(async (ctx, next) => {
  ctx.locals = {
    get user() {
      return ctx.state.user
    },
    get flash() {
      return ctx.getFlashMessages();
    }
  }

  ctx.render = (templatePath, locals) => {
    return pug.renderFile(
      path.join(config.get('templatesDir'), templatePath),
      Object.assign({}, locals, ctx.locals)
    )
  }

  await next()
})