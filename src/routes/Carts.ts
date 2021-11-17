import * as express from 'express';
const routes = express.Router()
import { Carts, Products } from '../interfaces/Inventory';
import CartsClass from '../helpers/CartsClass';
import path from 'path';
import { Auth } from '../middleware/Auth'
const filePath = path.join(__dirname,'..', '..', 'data', 'carts.txt');

const HandlerStock = new CartsClass(filePath)


routes.post('/',async(req,res)=>{
    let emptyCart:Carts = { productos: []}
    let result = await HandlerStock.save(emptyCart)   
    let obj:Carts = result[1]; //? get id del nuevo carrito
    let id = obj.id?.toString();
    result[0] && res.send(id)
    ||
    res.status(400).send({ 'status': 'error' });

})

routes.delete('/:id',async(req,res)=>{
    let id:number = parseInt(req.params.id)
    let result = await HandlerStock.deleteById(id)
    result && res.send({ 'status': 'deleted' })
    ||
    res.status(400).send({ 'status': 'error' });

})

routes.get('/:id/productos',async(req,res)=>{
    let id:number = parseInt(req.params.id)
    const result = await HandlerStock.getProductsCart(id)
    
    result && res.send(result)
    ||
    res.status(400).send({'status':'error'})

})

routes.post('/:id/productos',async(req,res)=>{
    let cartId:number = parseInt(req.params.id)
    let productId:number = req.body.id
    if (productId) {
        let result = await HandlerStock.addProductsCart(cartId,productId)
        result ? res.send({ 'status': 'added' }) : res.status(400).send({'status':'error'})
         
    }else{
        res.send({'status':'error, neceistas enviar la key \'id\' con el numbero del producto en el body'})
    }

})

routes.delete('/:id/producto/:id_prod',async(req,res)=>{
    let id:number = parseInt(req.params.id)
    let idProduct:number = parseInt(req.params.id_prod)
    const result = await HandlerStock.deleteProductCart(id,idProduct)
    
    result && res.send({ 'status': 'deleted' })
    ||
    res.status(400).send({'status':'error'})

})
export default routes
