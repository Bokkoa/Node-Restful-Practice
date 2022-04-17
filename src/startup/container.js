const { createContainer, asClass, asValue, asFunction } = require('awilix')


// config
const config = require('../config')
const app = require('.')  // this file


// services
const { 
    HomeService,
    UserService,
    CommentService,
    IdeaService
} = require('../services')


// Controllers
const { 
    HomeController,
    UserController,
    IdeaController,
    CommentController
} = require('../controllers')


// routes
const Routes = require('../routes')
const {
    HomeRoutes,
    CommentRoutes,
    IdeaRoutes,
    UserRoutes
} = require('../routes/index.routes')


// models
const { User, Comment, Idea } = require('../models')

// repositorues

const {
    UserRepository,
    IdeaRepository,
    CommentRepository
} = require('../repositories')

const container = createContainer();

container.register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config)
}).register({
    HomeService: asClass(HomeService),
    UserService: asClass(UserService),
    CommentService: asClass(CommentService),
    IdeaService: asClass(IdeaService)
}).register({
    HomeController: asClass(HomeController.bind(HomeController)),
    IdeaController: asClass(IdeaController.bind(IdeaController)),
    UserController: asClass(UserController.bind(UserController)),
    CommentController: asClass(CommentController.bind(CommentController)),
}).register({
    HomeRoutes: asFunction(HomeRoutes).singleton(),
    IdeaRoutes: asFunction(IdeaRoutes).singleton(),
    CommentRoutes: asFunction(CommentRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),

}).register({
    User: asValue(User),
    Idea: asValue(Idea),
    Comment: asValue(Comment)
}).register({
    UserRepository: asClass(UserRepository),
    IdeaRepository: asClass(IdeaRepository),
    CommentRepository: asClass(CommentRepository),
})

module.exports = container