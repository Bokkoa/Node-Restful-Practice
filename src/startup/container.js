const { createContainer, asClass, asValue, asFunction } = require('awilix')


// config
const config = require('../config')
const app = require('.')  // this file


// services
const { HomeService } = require('../services')


// Controllers
const { HomeController } = require('../controllers')


// routes
const Routes = require('../routes')
const {HomeRoutes} = require('../routes/index.routes')


// models
const { User, comment, Idea } = require('../models')


const container = createContainer();

container.register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config)
}).register({
    HomeService: asClass(HomeService).singleton()
}).register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton()
}).register({
    HomeRoutes: asFunction(HomeRoutes).singleton()
}).register({
    User: asValue(User),
    Idea: asValue(Idea),
    Comment: asValue(Comment)
})

module.exports = container