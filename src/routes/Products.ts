import express from 'express';
import * as prController  from '../controllers/Productos.js'
import { Auth } from '../middleware/Auth.js'
const routes = express.Router()

routes.post('/',Auth,prController.save)
routes.get('/',prController.getAll)
routes.get('/:id',prController.getById)
routes.delete('/:id',Auth,prController.deleteById)
routes.put('/:id',Auth,prController.editById)

export default routes



