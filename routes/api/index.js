const route = require('express').Router()
 
route.use('/vendor',require('./vendor'))
route.use('/product',require('./product'))
route.use('/carttable',require('./carttable'))
route.use('/user',require('./user'))
exports= module.exports = {
    route
}