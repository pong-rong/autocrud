const Ajv = require('ajv');

module.exports = (schema, object) => {
	const ajv = new Ajv({});
  const validate = ajv.compile(schema);
  
  return async (ctx, next) => {
    const isValid = validate(object);
    
    if (!isValid) {
      const message = validate.errors.message;
      
      ctx.throw(422, message, {
        error_description: validate.errors
      });
    }

    await next();
  };
};