const Vendors = require('../../db').Vendors
const Products = require('../../db').Products
const route = require('express').Router()
route.get('/', (req, res) => {
    Vendors.findAll()
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
    Vendors.create({
        name: req.body.name,
    }).then((user) => {
        res.status(201).send(user)
    }).catch((err) => {
        res.status(501).send({
            error: err.message
        })
    })
})

route.delete('/', (req, res) => {
    Vendors.destroy({
        where: {
            id: req.body.id
        }
    }).then(() => {
        console.log("Done");
    });

    Products.destroy({
        where: {
            vendorId: null
        }
    })

});

exports = module.exports = route

