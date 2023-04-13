const express = require('express')
const ProductManager = require ('./app.js')


const PM = new ProductManager('./file.json')
const puerto = 8080
const server = express()



server.get('/productos', async (req, res)=> {
    let productos = await PM.getProducts()
    const limit = parseInt(req.query.limit)

    productos = productos.slice(0, limit)

    res.send(productos) 
})

server.get('/productos/:Id', async (req, res) =>{
    const productId = await PM.getProdutbyid(parseInt(req.params.Id))
    
    if(!productId){
        res.send({error:'no hubo coincidencias'})
    }else{
        res.send(productId)
    }
    
})






server.listen(puerto, ()=>{
    console.log('corre?')
})