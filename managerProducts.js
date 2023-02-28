const fs = require('fs');
const path = 'Productos.json'

class ProductManager{
    constructor(path){
        this.path = path
    }

    ConsultProduct= async () => {
        if (fs.existsSync(this.path)){
            const infoOfArchive = await fs.promises.readFile(this.path)
            const product = JSON.parse(infoOfArchive)
            return product
        }
        return []
    }

    CreateProduct = async (product) => {
        const products = await this.ConsultProduct()
        let id 
            if (products.length === 0){
                id = 1
            }else{
                id = products[products.length-1].id + 1
            }
        const newProduct = {id, ...product}
        products.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(products))
        return newProduct
    }

    getProductById = async (productId) => {
        const products = await this.ConsultProduct()
        const productFilter = products.find( el => el.id == productId)
        if (productFilter == undefined)
            return console.log("Not Found, Sorry :(")
        return productFilter
    }

    UpdateProductById = async (productId,list) =>{
        const products = await this.ConsultProduct()
        const positionProduct = products.findIndex(x => x.id === productId)
        if (positionProduct === -1) {
            return console.log('El Producto no existe')
        }
        const userUpdated = {...products[positionProduct], ...list}
        products.splice(positionProduct,1,userUpdated)
        await fs.promises.writeFile(this.path,JSON.stringify(products))
        return products
    }

    deleteProductById = async (productId) => {
        const products = await this.ConsultProduct()
        const productFilter = products.filter( (el) => el.id !== productId)
        await fs.promises.writeFile(this.path, JSON.stringify(productFilter))
        return productFilter        
    }
}
const product1 = {
    code: Math.floor(1 + Math.random()*(10000 - 1 + 1)),
    title: "Devil May Cry 5",
    description: "Juego de PS4",
    price:10200,
    stock:15,
    thumbnail: "https://media.vandal.net/m/54971/devil-may-cry-5-201912413174736_1.jpg"
}

const product2 = {
    code: Math.floor(1 + Math.random()*(10000 - 1 + 1)),
    title: "Drakengard 3",
    description: "Juego de PS3",
    price:2500,
    stock:10,
    thumbnail: "https://media.vandal.net/i/ivandal/1200x630/20654/drakengard-3-2014520125032_1.jpg"
}

async function FuctionManager(){
    const manager = new ProductManager(path)
    //await manager.CreateProduct(product1)
    //await manager.CreateProduct(product2)
    //const productos = await manager.ConsultProduct()
    //console.log(productos)
    //const productById = await manager.getProductById(1)
    //console.log(productById)
    //const updateProductById = await manager.UpdateProductById(2,{title: "Destiny 1"} )
    //console.log(updateProductById)
    const deleteProductById = await manager.deleteProductById(1)
    //console.log(deleteProductById)
}

FuctionManager()