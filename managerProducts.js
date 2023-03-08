import fs from 'fs'
export default class ProductManager{
    constructor(path){
        this.path = path
    }


    async getProduct (){
        if (fs.existsSync(this.path)){
            const infoOfArchive = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(infoOfArchive)
        }
        return []
    }

    async CreateProduct (product) {
        const products = await this.getProduct()
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

    async getProductById(productId){
        const products = await this.getProduct()
        const productFilter = products.find( x => x.id == productId)
        if (productFilter)
            return productFilter
        return console.log("Not Found, Sorry :(")
    }

    async UpdateProductById (productId,list){
        const products = await this.ConsultProduct()
        const findProduct = products.find(x => x.id === productId)
        if (!findProduct)
            return console.log('Error 404, Not Found')
        const updateProduct ={...product,...obj}
        const productIndex = products.findIndex( (x) => x.id === productId)
        products.splice(productIndex,1,updateProduct)
        await fs.promises.writeFile(this.path,JSON.stringify(products))
        return 'Product update'
    }

    async deleteProducts(){
        if (fs.existsSync(this.path)){
            await fs.promises.unlink(this.path)
            return 'Products Deleted'
        }
        return 'The list products is void'
        }

    async deleteProductById(productId){
        const products = await this.getProduct()
        const productFilter = products.findIndex( (x) => x.id !== productId)
        products.splice(productFilter,1)
        if(productFilter === -1 )
            return 'Product is not found'
        products.splice(productFilter,1)
        await fs.promises.writeFile(this.path,JSON.stringify(products))
        return 'products deleted'
    }
}