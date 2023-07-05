import {Router} from 'express'
import { ReservaHabitacionController } from '../../controller/sistemaController/ReservaHabitacionController'
import { ReservaHabitacionRepository } from '../../repository/sistemaRepository/ReservaHabitacionRepository';

const router = Router()

const controller = new ReservaHabitacionController(
    
    new ReservaHabitacionRepository()

);

router.post('/sistema/reservaHabitacion', controller.create.bind(controller));

router.get('/sistema/reservaHabitacion', controller.list.bind(controller));

router.get('/sistema/reservaHabitacion/:id', controller.get.bind(controller));

router.put('/sistema/reservaHabitacion/:id', controller.update.bind(controller));

router.delete('/sistema/reservaHabitacion/:id', controller.remove.bind(controller));

export default router;