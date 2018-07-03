const { promisify } = require('util');
const fs = require('fs');
const sequelize = require('../models/index.js');

module.exports = async (ctx, next) => {
    let model = ctx.url.split('/')[1]+"Model.js";
    let models = await promisify(fs.readdir)('./server/models/');
    if(!models.includes(model)) {
        console.log('not found')
        if(ctx.method != 'POST') ctx.throw(404, 'model not found');
        else ctx.generateModel = true;
    }
    await next();
};