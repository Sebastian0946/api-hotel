import {Router} from 'express'
import { TipoHabitacionesController } from '../../controller/parametrizacionController/TipoHabitacionesController'
import { TipoHabitacionRepository } from '../../repository/parametrizacionRepository/TipoHabitacionRepostiroty';

const router = Router()

const controller = new TipoHabitacionesController(
    
    new TipoHabitacionRepository()

);

router.post('/parametrizacion/tipoHabitacion', controller.create.bind(controller));

router.get('/inventario/tipoHabitacion', controller.list.bind(controller));

router.get('/inventario/tipoHabitacion/:id', controller.get.bind(controller));

router.put('/inventario/tipoHabitacion/:id', controller.update.bind(controller));

router.delete('/inventario/tipoHabitacion/:id', controller.remove.bind(controller));

export default router;