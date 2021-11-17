import * as express from 'express';
import ProductsClass from '../helpers/ProductsClass'
const routes = express.Router()
import { Products } from '../interfaces/Inventory';
import { Auth } from '../middleware/Auth'
import path from 'path';
const filePath = path.join(__dirname,'..', '..', 'data', 'products.txt');
const HandlerStock = new ProductsClass(filePath)

routes.get('/',async(req,res)=>{
    
    let result = await HandlerStock.getAll()    
    result && res.send(result) 
    ||
    res.status(400).send({ 'status': 'error' });

})

routes.get('/:id',async(req,res)=>{
    let id:number = parseInt(req.params.id)
    let result = await HandlerStock.getById(id)
    res.send(result)
})

routes.post('/',Auth,async(req,res)=>{
    let product:Products = req.body
    let result = await HandlerStock.save(product)
    
    result[0] &&
        res.send({'status':'saved'})
        ||
        res.send({'status':"error"})
})

routes.put('/:id',Auth,async (req,res)=>{
    let product:Products = req.body
    let id:number = parseInt(req.params.id) 
    let result = await HandlerStock.editById(id,product)
    
    result && 
        res.send({'status':'updated'})
        ||
        res.send({'status':"error"})


})

routes.delete('/:id',Auth,async(req,res) =>{
    
    let id:number = parseInt(req.params.id)
    let result = await HandlerStock.deleteById(id)
    
    result && 
        res.send({'status':'deleted'})
        ||
        res.status(400).send({'status':"error"})

})

export default routes



