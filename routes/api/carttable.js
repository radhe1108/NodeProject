const { CartItems, Products, Vendors } = require('../../db')
const route = require('express').Router()

route.get('/:id', (req, res) => {
    CartItems.findAll({
        where: {
            userId: req.params.id
        }
    }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(err);
    })
})

route.get('/', (req, res) => {
    CartItems.findAll({
        include: [
            {
                model: Products,
                include: [Vendors]
            }
        ]

    })
        .then((users) => {
            res.send(users)
        })
        .catch((err) => {
            res.status(500).send({
                error: "could not retrive users"
            })
        })

})

route.post('/', (req, res) => {
    CartItems.create({
        quantity: req.body.quantity,
        productId: req.body.productId,
        userId: req.body.userId,
    }).then((user) => {
        res.status(201).send(user)
    }).catch((err) => {
        res.status(501).send({
            error: err.message
        })
    })
})


exports = module.exports = route