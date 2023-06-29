import {Router} from 'express'
import { InventarioController} from '../../controller/invetarioController/InventarioController'
import { inventarioRepository } from '../../repository/invetarioRepository/InventarioRepository';

const router = Router()

const controller = new InventarioController(
    
    new inventarioRepository()

);

router.post('/inventario/inventario', controller.create.bind(controller));

router.get('/inventario/inventario', controller.list.bind(controller));

router.get('/inventario/inventario/:id', controller.get.bind(controller));

router.put('/inventario/inventario/:id', controller.update.bind(controller));

router.delete('/inventario/inventario/:id', controller.remove.bind(controller));

export default router;