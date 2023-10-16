import {Router} from 'express'
import { HabitacionController } from '../../controller/sistemaController/HabitacionController'
import { HabitacionRepository } from '../../repository/sistemaRepository/HabitacionRepository';

const router = Router()

const controller = new HabitacionController(
    
    new HabitacionRepository()

);

router.post('/sistema/habitacion', controller.create.bind(controller));

router.get('/sistema/habitacion', controller.list.bind(controller));

router.get('/sistema/habitacion/:id', controller.get.bind(controller));

router.put('/sistema/habitacion/:id', controller.update.bind(controller));

router.put('/sistema/habitacion/eliminar/:id', controller.remove.bind(controller));

export default router;