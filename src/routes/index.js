

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
require('express-async-errors')

const { NotFoundMiddleware, ErrorMiddleware } = require('../middlewares')

module.exports = function({HomeRoutes, UserRoutes, CommentRoutes, IdeaRoutes}){

    const router = express.Router()
    const apiRoutes = express.Router()

    // middlewares
    apiRoutes
        .use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression())

        apiRoutes.use('/home', HomeRoutes);
        apiRoutes.use('/user', UserRoutes);
        apiRoutes.use('/comment', CommentRoutes);
        apiRoutes.use('/idea', IdeaRoutes);

        router.use('/api', apiRoutes);

        router.use(NotFoundMiddleware);
        router.use(ErrorMiddleware);

        return router;
}