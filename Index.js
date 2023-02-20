

class ProductManager {

    constructor () {
        this.products = []
    }

    getProduct(){
        return this.products 
    }

    #generateId(){
        const code = 
            this.products.length === 0 
            ? 1
            : this.products[this.products.length-1].code + 1
        return code
    }

    addProduct(title, description, price, stock, thumbnail) {
        const producto = {
            code: this.#generateId(),
            title,
            description,
            price,
            stock,
            thumbnail,
        }
        const codeDuplicated = this.products.some((el)=> el.code === producto.code)
        if (codeDuplicated) {
            producto.code = this.products[this.products.length-1].code + 1
        }

        const isHasUndefined = Object.values(producto).includes(undefined);
        if (isHasUndefined) {
            return console.log("Todos los campos son obligatorios")
        }else{
            this.products.push(producto)
        }
    }

    getProductById(productId){
        const productFilter = this.products.find( el => el.code == productId)
        if (productFilter == undefined) {
            console.log("Not Found, Sorry :(")
        }else{
            return productFilter
        }
    }
    
}

const productDetail = new ProductManager()
productDetail.addProduct("Devil May Cry 5", "juego de PS4",10200, 15,"img.jpg")
productDetail.addProduct("Drakengard 3", "juego de PS3",2500, 10,"img.jpg")
console.log(productDetail)