const ProductManager = require('../productManager')
const express = require('express')

const router = express.Router()


const PM = new ProductManager('./file.json')


router.get('/', async (req, res) => {
    let productos = await PM.getProducts()

    const limit = parseInt(req.query.limit)

    productos = productos.slice(0, limit)

    res.send(productos)

})

router.get('/:Id', async (req, res) => {
    const productId = await PM.getProdutbyid(parseInt(req.params.Id))

    if (!productId) {
        res.statusCode(200).send({ error: 'no hubo coincidencias' })
    } else {
        res.send(productId)
    }

})


router.post('/', async (req, res) => {

    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    const product = await PM.addProduct(title, description, price, thumbnails, code, stock, category, status)

    if (product) {

        res.send(product)

    } else {

        res.status(500).send({ error: 'no se pudo agregar el producto' })

    }
    console.log(product)
})

router.put('/', async (req, res) => {
    const { Id, obj } = req.body
    const product = await PM.updateProduct(Id)
    if(Id){
        res.send(Idñ)
    }else{
        res.status(500).send({error : 'no se pudo actualizar el producto'})
    }

})













module.exports = router