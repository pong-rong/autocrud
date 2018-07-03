const db = require('../models');

const createEntityRepo = async (entity, model) => 
  await db[model].create(entity);

const readEntitiesRepo = async (model) => 
  await db[model].findAll();

const readEntityRepo = async (id, model) => 
  await db[model].findById(id);

const updateEntityRepo = async (newEntity, model) => 
  await db[model].update(newEntity, { where: { id: newEntity.id }});

const deleteEntityRepo = async (id, model) => 
  await db[model].findById(id).then(entity => { 
    entity.destroy() 
  });

module.exports = { 
  createEntityRepo, 
  readEntityRepo,
  readEntitiesRepo,
  updateEntityRepo, 
  deleteEntityRepo 
};