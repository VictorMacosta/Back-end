class ProductManager{

    constructor(){
        this.products = [],
        this.IdInicial = 0
            }
    
    addProduct = (title, description, price, thumbnail, code, stock) =>{
        const product = {title, description, price, thumbnail, stock, code, id: this.IdInicial++}
        const productAdded = this.products.find((product)=>{product.code ===  sd159})

        if(productAdded){
            console.log("no puedes agregar el mismo producto")
        }
        else if(!title || !description || !price || !thumbnail || !stock || !code ){
            console.log("debes completar todos los datos")
        }else{this.products.push(product)
        }
    }

    getproducts = ()=>{
        return(this.products)
    }
        
    getprodutbyid = (id) =>{
        const product = this.products.find((product)=>{product.id === id})
    }
    
    changeProduct = (id, name, description, price, thumbnail, code, stock)=>{
        const product = this.products.map((product)=>{product.id === id})
        const newProduct = product
        newProduct.map((product)=>{product.name === name, description, price, thumbnail, code, stock})
    }

}


const p1= new ProductManager
p1.addProduct('juguete', 'pelota', 3000, 'en proceso', 'SD159', 1)



console.log(p1)