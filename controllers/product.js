'use strict'

const Product = require('../models/product')

function getProduct (req, res){
    let productId = req.params.productId

    Product.findById( productId, (err, product) => {
        if(err) return res.status(500).send({message: `Error al conectar a la base de datos. ${err}`})
        if(!product) return res.status(404).send({message: `Producto no registrado`})

        res.status(200).send( {product} )
})
}

function getProducts (req, res){
    let products = Product.find({}, (err, products) => {
    
        if(err) return res.status(500).send({message: `Error al conectar a la base de datos. ${err}`})
        if(!products) return res.status(404).send({message: `No existen productos`})
    
        res.status(200).send( {products} )    
        })
}

function saveProduct(req, res){
    console.log('POST /api/product')
    console.log(req.body)

    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err, productStored) => {
        if(err) res.status(500).send({message: `Error al salvar en la base de datos. ${err}`})

        res.status(200).send({message: `Productos enviados. ${productStored}`})
    })
}

function updateProduct (req, res){
    let productId = req.params.productId
    let update = req.body

    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if(err) res.status(500).send({message: `Error al salvar en la base de datos. ${err}`})

        res.status(200).send({ productUpdated })
    })
}

function deleteProduct (req, res){
    let productId = req.params.productId

    Product.findById( productId, (err, product) => {
        if (err) res.status(404).send({message: `No existe un producto con ese ID. ${err}`})

        product.remove(err => {
            if (err) res.status(500).send({message: `Error al eliminar el producto . ${err}`})
            res.status(200).send({message: `El producto ha sido eliminado`})
        })
    })
}

module.exports = {
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    saveProduct
}