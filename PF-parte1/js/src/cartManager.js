const fs = require('fs')

class CartManager {
    constructor(filePath) {
        this.carts = [],
            //cantidad = 1,
            this.path = filePath,
            this.IdInicial = 1

        try {
            if (this.path) {

                const jsonFile = fs.readFileSync(this.path, 'utf-8')
                if (jsonFile) {
                    const data = JSON.parse(jsonFile)
                    this.carts = data
                }

            } else {
                fs.writeFileSync(this.path, JSON.stringify(this.carts), 'utf-8')
            }

        } catch (err) { console.log(err) }

    }

    createCarts = async (obj) => {
        try {
            if (this.carts.length > 0) {
                this.IdInicial = this.carts[this.carts.length - 1].id + 1
            }
            const newCart = { id: this.IdInicial, ...obj }
            this.carts.push(newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, "utf-8"))
            return "Carrito Creado."

        } catch (error) {
            console.log(error)
        }
    }

    getCart = async () => {
        const respuesta = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(respuesta)
    }

    getCartId = async (id) => {
        try {
            if (id) {
                const CartId = this.carts.find((cart) => { return cart.id === id })

                if (CartId) {
                    return CartId
                } else {
                    return 'no hubo coincidencias'
                }
            }
        }
        catch (err) {
            console.log(err)
        }

    }

    addtoCar = async () => {
        push(carts.id)
    }

}







const Carrito = new CartManager('./carrito.json')
//Carrito.getCart()
//Carrito.getCartId(1)
Carrito.createCarts('hola')
