const Products = require('../../db').Products
const CartItems = require('../../db').CartItems
const route = require('express').Router()

route.get('/', (req, res) => {
    Products.findAll()
        .then((product) => {
            res.send(product)
        })
        .catch((err) => {
            res.status(500).send({
                error: err.message
            })
        })

})

route.get('/:id', (req, res) => {
    Products.findAll({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(err);
    })
})


route.post('/', (req, res) => {
    Products.create({
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        vendorId: req.body.vendorId

    }).then((product) => {
        res.status(201).send(product)
    }).catch((err) => {
        res.status(501).send({
            error: err.message
        })
    })
})

route.delete('/', (req, res) => {
    Products.destroy({
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.send({ success: true })
    });

    CartItems.destroy({
        where: {
            productId: null
        }
    })

});

exports = module.exports = route