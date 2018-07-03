const Router = require('koa-router');
const router = new Router();
const { 
    distributor, 
    validator, 
    modelGenerator, 
    serializer, 
    param 
} = require('../middlewares');

const { 
    createEntityService, 
    readEntityService,
    updateEntityService, 
    deleteEntityService
} = require('../services/entityService');

router
    .all('/*', distributor)
    .post('/*', validator, modelGenerator, serializer, createEntityService)
    .get('/*:id', param, readEntityService)
    .put('/*', validator, serializer, updateEntityService)
    .delete('/*:id', deleteEntityService)

    module.exports = router;
