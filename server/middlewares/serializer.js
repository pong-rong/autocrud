module.exports = async (ctx, next) => {
    const values = ctx.request.body.data.attributes;
    ctx.entity = {};
    Object.keys(values).forEach(item => {
      ctx.entity[item] = values[item].value; 
    });
    await next();
};