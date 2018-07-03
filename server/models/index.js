const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const db = {};
const { postgres } = require('../config');
const sequelize = new Sequelize(postgres);

let basename  = path.basename(module.filename);

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    let model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.sequelize.sync();
module.exports = db;
