import {Router} from 'express'
import { ConsumoHabitacionesController } from '../../controller/sistemaController/ConsumoHabitacionesController'
import { ConsumoHabitacionRepository } from '../../repository/sistemaRepository/ConsumoHabitacionRepository';

const router = Router()

const controller = new ConsumoHabitacionesController(
    
    new ConsumoHabitacionRepository()

);

router.post('/sistema/consumoHabitacion', controller.create.bind(controller));

router.get('/sistema/consumoHabitacion', controller.list.bind(controller));

router.get('/sistema/consumoHabitacion/:id', controller.get.bind(controller));

router.put('/sistema/consumoHabitacion/:id', controller.update.bind(controller));

router.put('/sistema/consumoHabitacion/eliminar/:id', controller.remove.bind(controller));

export default router;