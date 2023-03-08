import express from "express";
import ProductManager from './managerProducts.js'

const app = express()
const productManager = new ProductManager('./products.json')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', async (req,res)=>{
    res.send('Bienvenidos al MundoGamer')
})

app.get('/products', async (req,res)=>{
    const products = await productManager.getProduct()
    const {limite} = req.query
    if (limite > 0){
        res.json(products.slice(0,limite))
    }else{
        res.json({products})
    }
})

app.get('/products/:idProd',async(req,res)=>{
    const {idProd} = req.params
    const product = await productManager.getProductById(+idProd)
    res.json({product})
})

app.post('/products', async (req,res) =>{
    const obj = req.body 
    const newProduct = await productManager.CreateProduct(obj)
    res.json({message: 'Product Created', product: newProduct})
})

app.put('/products/:idProd',async(req,res)=>{
    const {idProd} = req.params
    const list = req.body
    const product = await productManager.UpdateProductById(+idProd,list)
    res.json({product})
})

app.delete('/products',async(req,res)=>{
    const alert = await productManager.deleteProducts()
    res.json(alert)
})

app.delete('/products/:idProd',async(req,res)=>{
    const {idProd} = req.params
    const product = await productManager.deleteProductById(+idProd)
    res.json({product})
})





app.listen(8080,()=>{
    console.log('Escuchando al puerto 8080')
})