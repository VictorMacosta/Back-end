class ProductManager{

    constructor(){
        this.products = [],
        this.IdInicial = 0
            }
    
    addProduct = (title, description, price, thumbnail, code, stock) =>{
        const product = {title, description, price, thumbnail, stock, code, id: this.IdInicial++}
        const productAdded = this.products.find((product)=>{product.code === code})

        if(productAdded){
            console.log("no puedes agregar el mismo producto")
        }
        else if(!title || !description || !price || thumbnail || !stock  ){
            console.log("debes completar todos los datos")
        }else{this.products.push(product)}

    }
    getproducts = ()=>{
        
        return(this.products)
    }
        
        getprodutbyid = (id) =>{
            const produc = this.products.find(product.product.id === id)
        }
}



const p1= new ProductManager.addProduct('juguete', 'pelota', 3000, 'en proceso', 'SD159', 1000)

console.log(ProductManager.getproducts())