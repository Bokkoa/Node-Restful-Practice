
const { Router } = require('express')
const { AuthMiddleware, 
        ParseIntMiddleware, 
        CacheMiddleware } = require('../middlewares')
const { CacheTimeHelper } = require('../helpers')

module.exports = function({UserController}){

    const router = Router();
    router.get("", [ParseIntMiddleware, 
                    CacheMiddleware(CacheTimeHelper.ONE_HOUR)], UserController.getAll)
    router.get("/:userId", AuthMiddleware, UserController.get)
    router.patch("/:userId", AuthMiddleware, UserController.update)
    router.delete("/:userId", AuthMiddleware, UserController.delete)

    return router
}