import {Router} from 'express'
import { TipoHabitacionesController } from '../../controller/parametrizacionController/TipoHabitacionesController'
import { TipoHabitacionRepository } from '../../repository/parametrizacionRepository/TipoHabitacionRepostiroty';

const router = Router()

const controller = new TipoHabitacionesController(
    
    new TipoHabitacionRepository()

);

router.post('/parametrizacion/tipoHabitacion', controller.create.bind(controller));

router.get('/parametrizacion/tipoHabitacion', controller.list.bind(controller));

router.get('/parametrizacion/tipoHabitacion/:id', controller.get.bind(controller));

router.put('/parametrizacion/tipoHabitacion/:id', controller.update.bind(controller));

router.delete('/parametrizacion/tipoHabitacion/:id', controller.remove.bind(controller));

export default router;