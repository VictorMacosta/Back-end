const fs = require('fs')

class ProductManager {

    constructor(filePath) {
        this.products = [],
            this.IdInicial = 1,
            this.path = filePath
        try {
            if (this.path) {
                // const jsonFile = fs.readSync(this.path, JSON.stringify(this.products),'utf-8') <-- genera error
                const jsonFile = fs.readFileSync(this.path, 'utf-8')
                if (jsonFile) {
                    const data = JSON.parse(jsonFile)
                    this.products = data
                }

            } else {
                fs.writeFileSync(this.path, JSON.stringify(this.products), 'utf-8')
            }

        } catch (err) { console.log(err) }
    }

    addProduct = async (title, description, price, thumbnail = [], code, stock, category, status = true) => {

        try {
            const product = { title, description, price, thumbnail, stock, code, id: this.IdInicial++ }

            const productAdded = this.products.find((product) => { return product.code === code })

            if (productAdded) {
                return "no puedes agregar el mismo producto"
            }
            else if (!title || !description || !price || !stock || !code || !category) {
                return "debes completar todos los datos"
            } else {
                //this.products.push(product)
                if (this.products.length > 0) {
                    this.IdInicial = this.products[this.products.length - 1].id + 1
                }
                this.products.push({ id: this.IdInicial, ...product })
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, "utf-8"))
                return "Producto agregado."
            }
        } catch (err) {
            return err
        }
    }
    getProducts = async () => {
        const respuesta = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(respuesta)
    }

    getProdutbyid = async (id) => {
        try {
            if (id) {
                const product = this.products.find((product) => { return product.id === id })

                if (product) {
                    return product
                } else {
                    return 'no hubo coincidencias'
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    updateProduct = async ({ id, ...obj }) => {
        try {
            const productIndex = this.products.findIndex((product) => product.id === id)

            if (productIndex === -1) {
                return `El producto con ID ${id} no existe.`
            } else {
                await this.deleteProduct(id)
                let oldProduct = await this.readProducts()
                let productModify = [...oldProduct, { id, ...obj }]
                await fs.promises.writeFile(this.path, JSON.stringify(productModify, "utf-8"))
                return `El producto con ID ${id} ha sido modificado y agregado`
            }
        } catch (err) {
            return err
        }
    }

    deleteProduct = async (id) => {
        try {
            const productIndex = this.products.findIndex((product) => product.id === id)
            const productsFilter = this.products.filter((product) => product.id !== id)

            if (productIndex === -1) {
                return console.log(`El producto con ID ${id} no existe.`)
            } else {
                // await fs.promises.writeFile(this.path,JSON.stringify(productsFilter, "utf-8"));  <-- error de tipeo en JSON.stringify
                await fs.promises.writeFile(this.path, JSON.stringify(productsFilter), "utf-8");
                console.log(`El producto con ID ${id} ha sido eliminado correctamente.`)
            }

        } catch (err) {
            console.log(err)
        }
    }


}


const PM = new ProductManager('./file.json')
PM.getProducts()
/* PM.getProdutbyid(1) */

//PM.addProduct('juguete', 'pelota', 3000, 'en proceso', 'SD159', 100)
//PM.addProduct('juguete', 'robot', 900, 'en proceso', 'SD256', 60 )

module.exports = ProductManager