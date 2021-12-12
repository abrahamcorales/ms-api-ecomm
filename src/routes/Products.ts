import * as express from 'express';
import ProductsClass from '../containers/ProductsFile'
import * as prController  from '../controllers/Productos'
const routes = express.Router()
import { Products } from '../interfaces/Inventory';
import { Auth } from '../middleware/Auth'
import path from 'path';
const filePath = path.join(__dirname,'..', '..', 'data', 'products.txt');
const HandlerStock = new ProductsClass(filePath)

routes.post('/',prController.save)
routes.get('/',prController.getAll)
routes.get('/:id',prController.getById)
routes.delete('/:id',prController.deleteById)
routes.put('/:id',prController.editById)


//routes.put('/:id',Auth,async (req,res)=>{
//    let product:Products = req.body
//    let id:number = parseInt(req.params.id) 
//    let result = await HandlerStock.editById(id,product)
//    
//    result && 
//        res.send({'status':'updated'})
//        ||
//        res.send({'status':"error"})
//})

export default routes



