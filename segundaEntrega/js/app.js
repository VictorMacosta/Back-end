const fs = require ('fs')

class ProductManager{

    constructor(filePath){
        this.products = [],
        this.IdInicial = 1,
        this.path = filePath
        try{
            if(this.path){
                const jsonFile = fs.readSync(this.path, JSON.stringify(this.products),'utf-8')
                const data = JSON.parse(jsonFile)
                this.products = data

            }else{
                fs.writeFileSync(this.path, JSON.stringify(this.products),'utf-8')}

        } catch(err){console.log(err)}
    }
    readProducts = async () => {
        const respuesta = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(respuesta)
      }

    addProduct = async (title, description, price, thumbnail, code, stock) =>{
        
        try{
            const product = {title, description, price, thumbnail, stock, code, id: this.IdInicial++}

            const productAdded = this.products.find((product)=>{product.code ===  code})

            if(productAdded){
                console.log("no puedes agregar el mismo producto")
            }
            else if(!title || !description || !price || !thumbnail || !stock || !code ){
                console.log("debes completar todos los datos")
            }else{this.products.push(product)
                if (this.products.length > 0) {
                    this.IdInicial = this.products[this.products.length - 1].id + 1
                }
                this.products.push({ id: this.IdInicial, ...product })
                await fs.promises.writeFile(this.path,JSON.stringify(this.products, "utf-8"))
                console.log("Producto agregado.")
            }
        }catch(err){
            console.log(err) 
        }
    }

    getproducts = async ()=>{
        try{
            return(this.products)
        }
        catch(err){
            console.log(err)
        }
    }
        
    getprodutbyid =  async (id) =>{
        try{

            const product = this.products.find((product)=>{product.id === id})
        }
        catch(err){
            console.log(err)
        }
    }
    updateProduct = async ({ id, ...obj }) => {
        try {
        const productIndex = this.products.findIndex((product) => product.id === id)
    
        if (productIndex === -1) {
            return console.log(`El producto con ID ${id} no existe.`)
        } else {
            await this.deleteProduct(id)
            let oldProduct = await this.readProducts()
            let productModify = [...oldProduct, { id, ...obj }]
            await fs.promises.writeFile(this.path, JSON.stringify(productModify, "utf-8"))
            console.log(`El producto con ID ${id} ha sido modificado y agregado`)
        }
        } catch (err) {
        console.log(err)
        }
    }
    
    deleteProduct = async (id) => {
        try{
        const productIndex = this.products.findIndex((product) => product.id === id)
        const productsFilter = this.products.filter((product) => product.id !== id)
        
        if (productIndex === -1) {
            return console.log(`El producto con ID ${id} no existe.`)
        } else {
            await fs.promises.writeFile(this.path,JSON.stringify(productsFilter, "utf-8"));
            console.log(`El producto con ID ${id} ha sido eliminado correctamente.`)
        }
        
        } catch (err){
        console.log(err)
        }
    }


}


const p1= new ProductManager('./file.json')
p1.addProduct('juguete', 'pelota', 3000, 'en proceso', 'SD159', 1)
const p2 = new ProductManager
p2.addProduct('juguete', 'robot', 9000, 'en proceso', 'SD160', 20)
console.log(p1)


