import * as express from 'express';
const routes = express.Router()

import CartsClass from '../containers/CartsFS';
import * as cartController  from '../controllers/Carts'
import path from 'path';
const filePath = path.join(__dirname,'..', '..', 'data', 'carts.txt');

const HandlerStock = new CartsClass(filePath)


routes.post('/',cartController.save)
routes.get('/:id/productos',cartController.getProductsCart)
routes.post('/:id/productos',cartController.addProductsCart)

routes.delete('/:id',async(req,res)=>{
    let id:number = parseInt(req.params.id)
    let result = await HandlerStock.deleteById(id)
    result && res.send({ 'status': 'deleted' })
    ||
    res.status(400).send({ 'status': 'error' });

})


//routes.post('/:id/productos',async(req,res)=>{
//    let cartId:number = parseInt(req.params.id)
//    let productId:number = req.body.id
//    if (productId) {
//        let result = await HandlerStock.addProductsCart(cartId,productId)
//        result ? res.send({ 'status': 'added' }) : res.status(400).send({'status':'error'})
//         
//    }else{
//        res.send({'status':'error, neceistas enviar la key \'id\' con el numbero del producto en el body'})
//    }
//
//})

routes.delete('/:id/producto/:id_prod',async(req,res)=>{
    let id:number = parseInt(req.params.id)
    let idProduct:number = parseInt(req.params.id_prod)
    const result = await HandlerStock.deleteProductCart(id,idProduct)
    
    result && res.send({ 'status': 'deleted' })
    ||
    res.status(400).send({'status':'error'})

})
export default routes
