const container = require('./src/startup/container')
const server = container.resolve('app')

const {MONGO_URI} = container.resolve('config')

const mongoose = require('mongoose')

mongoose.connect(MONGO_URI, {useNewUrlParser: true})
        .then(() => server.start()) // if mongo is connected
        .catch(console.log)