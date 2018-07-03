const {
    createEntityRepo, 
    readEntitiesRepo,
    readEntityRepo,
    updateEntityRepo,
    deleteEntityRepo
} = require('../repositories/modelRepository');

const createEntityService = async (ctx) => {
    let model = ctx.url.split('/')[1];
    ctx.body = await createEntityRepo(ctx.entity, model);
};

const readEntityService = async (ctx) => {
    let model = ctx.url.split('/')[1];
    if(ctx.params && ctx.params.id){
        ctx.body = await readEntityRepo(ctx.params.id, model);
    } else ctx.body = await readEntitiesRepo(model);
};

const updateEntityService = async (ctx) => {
    let model = ctx.url.split('/')[1];
    let entity = await updateEntityRepo(ctx.entity, model);
};

const deleteEntityService = async (ctx) => {
    let model = ctx.url.split('/')[1];
    let id = ctx.params && ctx.params.id ? ctx.params.id : null;
    let result = await deleteEntityRepo(id, model);
};

module.exports = { 
    createEntityService,
    readEntityService,
    updateEntityService, 
    deleteEntityService
};