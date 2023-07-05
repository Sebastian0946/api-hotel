import {Router} from 'express'
import { InventariosHabitacionesController } from '../../controller/invetarioController/InventariosHabitacionesController'
import { InventarioHabitacionRepository } from '../../repository/invetarioRepository/InventarioHabitacionRepository';

const router = Router()

const controller = new InventariosHabitacionesController(
    
    new InventarioHabitacionRepository()

);

router.post('/inventario/inventarioHabitacion', controller.create.bind(controller));

router.get('/inventario/inventarioHabitacion', controller.list.bind(controller));

router.get('/inventario/inventarioHabitacion/:id', controller.get.bind(controller));

router.put('/inventario/inventarioHabitacion/:id', controller.update.bind(controller));

router.delete('/inventario/inventarioHabitacion/:id', controller.remove.bind(controller));

export default router;