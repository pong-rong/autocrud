const validator = require('../services/validator');

module.exports = async (ctx, next) => {
    const json = ctx.request.body.data.attributes;
    const keys = Object.keys(json);
    let valModel = { 
        type: 'object',
        attributes: {
            required: []
        }
    };
    let obj = {}; 
    keys.forEach(item => {
        valModel.attributes[item] = json[item].type
        if(!json[item].allowNull) valModel.attributes.required.push(item);
        obj[item] = json[item].value;
    })
    validator(valModel, obj)(ctx, next);
};

