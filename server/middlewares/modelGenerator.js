const fs = require('fs')
const { promisify } = require('util');

module.exports = async (ctx, next) => {
  if(!ctx.generateModel) await next();
  else {
    let props = ctx.request.body.data;
    let propKeys = Object.keys(props.attributes);
    let body = 
`module.exports = (sequelize, DataTypes) => {
    const ${ props.type } = sequelize.define('${ props.type }', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
`;

    propKeys.forEach(item => {
        body += 
`        ${ item }: {
            type: DataTypes.${ props.attributes[item].type.toUpperCase() },
            allowNull: ${ props.attributes[item].allowNull }
        },
`;
    });

    body += 
`        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    }, {
      freezeTableName: true
    });

    return ${ props.type };
};
`;
    await promisify(fs.writeFile)(`./server/models/${ props.type }Model.js`, body);
    require('../models')[props.type].sync()
      .then( async () => {
        await next();
      });
  }
};

