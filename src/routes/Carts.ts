import express from 'express';
import * as cartController  from '../controllers/Carts.js'
const routes = express.Router()

routes.post('/',cartController.save)
routes.get('/:id/productos',cartController.getProductsCart)
routes.post('/:id/productos',cartController.addProductsCart)
routes.delete('/:id/producto/:id_prod',cartController.deleteProductCart)
routes.delete('/:id',cartController.deleteById)

export default routes
