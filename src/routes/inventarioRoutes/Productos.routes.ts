import {Router} from 'express'
import { ProductoController } from '../../controller/invetarioController/ProductoController'
import { ProductoRepository } from '../../repository/invetarioRepository/ProductoRepository';

const router = Router()

const controller = new ProductoController(
    
    new ProductoRepository()

);

router.post('/inventario/producto', controller.create.bind(controller));

router.get('/inventario/producto', controller.list.bind(controller));

router.get('/inventario/producto/:id', controller.get.bind(controller));

router.put('/inventario/producto/:id', controller.update.bind(controller));

router.delete('/inventario/producto/:id', controller.remove.bind(controller));

export default router;