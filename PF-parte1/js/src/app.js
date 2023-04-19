
const express = require('express')
const bodyParser = require('body-parser')




const productsRouter = require('./Routes/productos.routes.js')
const cartsRouter = require('./Routes/carrito.routes.js')



const puerto = 8080
const server = express()
server.use(express.urlencoded({ extended: true }))
server.use(bodyParser.json())




server.use('/api/products', productsRouter)
server.use('/api/carts', cartsRouter)




server.listen(puerto, () => {
    console.log('corre?')
})