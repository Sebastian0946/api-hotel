import {Router} from 'express'
import { HuespedController } from '../../controller/sistemaController/HuespedController'
import { HuespedRepository } from '../../repository/sistemaRepository/HuespedRepository';

const router = Router()

const controller = new HuespedController(
    
    new HuespedRepository()

);

router.post('/sistema/huesped', controller.create.bind(controller));

router.get('/sistema/huesped', controller.list.bind(controller));

router.get('/sistema/huesped/:id', controller.get.bind(controller));

router.put('/sistema/huesped/:id', controller.update.bind(controller));

router.delete('/sistema/huesped/:id', controller.remove.bind(controller));

export default router;