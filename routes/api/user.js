const Users = require('../../db').Users
const route = require('express').Router()

route.post('/', (req, res) => {
    Users.findOrCreate({
        where: {
            email: req.body.email
        },
        defaults: {
            username: req.body.username
        }
    }).then((user) => {
        let u = user[0]
        res.status(201).send({ success: true, id: u.dataValues.id })
    }).catch((err) => {
        res.status(501).send({
            success: false,
            error: err.message
        })
    })
})

exports = module.exports = route