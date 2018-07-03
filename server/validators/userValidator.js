const validator = require('../services/validator');
const user = validator({
  type: 'object',
  properties: {
    name: {
      type: "string"
    },
    email: {
      type: "email"
    },
    age: {
      type: "number"
    }
  },
  required: [ 'name', 'email', 'age' ]
});
