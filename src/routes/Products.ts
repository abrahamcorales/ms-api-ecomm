import * as express from 'express';
import * as prController  from '../controllers/Productos'
const routes = express.Router()

routes.post('/',prController.save)
routes.get('/',prController.getAll)
routes.get('/:id',prController.getById)
routes.delete('/:id',prController.deleteById)
routes.put('/:id',prController.editById)

export default routes



