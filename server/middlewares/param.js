module.exports = async (ctx, next) => {
  let vals = Object.keys(ctx.params);
  if(!parseInt(ctx.params[vals[1]])) delete ctx.params;
  await next();
};