
module.exports.init = (app) => app.use(async (ctx, next) => {
  const messages = ctx.session.messages || {};
  delete ctx.session.messages; 


  ctx.flash = function(type, messageText) {
    if (!ctx.session.messages) {
      ctx.session.messages = {};
    }

    ctx.session.messages[type] = messageText;
  }

  ctx.getFlashMessages = function() {
    return messages;
  }

  await next()

  if (ctx.status == 302 && !ctx.session.messages) {
    // pass on the flash over a redirect - just set value back into session wich we clear on the top of middleware 
    ctx.session.messages = messages;
  }

})